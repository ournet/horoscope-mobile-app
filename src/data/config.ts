
export type ConfigType = {
    ApiHost: string
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
