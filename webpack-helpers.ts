import * as path from 'path';

export function root(...paths: string[]) {
    return path.join.apply(path, [__dirname].concat(paths));
}
