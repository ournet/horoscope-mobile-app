
export type ConfigType = {
    ApiHost: string
    ApiClient: string
    Storage: any
}

let Config: ConfigType = null;

export function getConfig() {
    if (!Config) {
        throw new Error(`Config must be inited`);
    }
    return Config;
}

export function init(config: ConfigType) {
    Config = config;
}
