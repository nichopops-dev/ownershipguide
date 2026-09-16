#!/usr/bin/env python3
"""Local static server with Cloudflare-style extensionless HTML routes."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit, urlunsplit
import argparse


ROOT = Path(__file__).resolve().parent


class ExtensionlessHandler(SimpleHTTPRequestHandler):
    def _resolve_html_route(self):
        parsed = urlsplit(self.path)
        relative = unquote(parsed.path).lstrip('/')
        if relative and not parsed.path.endswith('/') and not Path(relative).suffix:
            candidate = ROOT / (relative + '.html')
            if candidate.is_file():
                self.path = urlunsplit(parsed._replace(path=parsed.path + '.html'))

    def do_GET(self):
        self._resolve_html_route()
        super().do_GET()

    def do_HEAD(self):
        self._resolve_html_route()
        super().do_HEAD()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=8765)
    parser.add_argument('--bind', default='127.0.0.1')
    args = parser.parse_args()
    server = ThreadingHTTPServer((args.bind, args.port),
                                 lambda *handler_args, **kwargs:
                                 ExtensionlessHandler(*handler_args, directory=ROOT, **kwargs))
    print(f'Serving {ROOT} at http://{args.bind}:{args.port}/')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == '__main__':
    main()
