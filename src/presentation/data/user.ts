import { User as DataUser } from '../../domain/entities/User';
import { ViewZodiacSign, createViewZodiacSign } from "./zodiac-sign";
import { Config } from '../config';
import { ValidLanguage } from '../languages';

export class ViewUser {
    private _hash: string;
    constructor(
        readonly language?: ValidLanguage,
        readonly zodiacSign?: ViewZodiacSign) {
        this._hash = `${language || '-'}|${zodiacSign && zodiacSign.id || '-'}`;
    }

    get hash() {
        return this._hash;
    }
}

export class ViewUserMapper {
    static fromDataUser(data: DataUser): ViewUser {
        if (!data) {
            return new ViewUser();
        }
        return new ViewUser(
            data.language as ValidLanguage,
            data.zodiacSign && createViewZodiacSign(data.zodiacSign, (data.language || Config.CurrentLanguage) as ValidLanguage),
        )
    }
}
