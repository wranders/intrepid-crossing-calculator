import { GetCharactersCharacterIdLocationInternalServerError } from '../esiclient';
import { LookupItem } from '../models';

export class Parser {
    public static InventoryRegex = /^([\S ]+)\t([\d,\.]+)?\t([\S ]+)\t([\S ]*)\t([\S ]*)\t([\d,\.]+ m3)$/i;
    public static ListRegex = /^([\d,]+)\s(?:x\s)?([\S ]+)$/i;
    public static FittingsRegex = /^([\d\-A-Za-z' ]+?)(?:x)?(\d*)?$/i;
    public static FittingTitleRegex = /^\[(.*)$/i;
    public static IndustryRegex = /^(\d+)[\s]*x (.*)$/i;
    public static ContractRegex = /^([\S ]+)\s([\d,]+).*$/i;

    public static parse(string: string): Array<LookupItem> {
        return string.split('\n')
            .map(line => {
                if (line.startsWith('[')) {
                    return line.split(',');
                }
                return [line];
            })
            .reduce((a, b) => a.concat(b))
            .map(Parser.parseLine)
            .filter(res => res != undefined);
    }

    public static parseLine(line: string): LookupItem {
        try {
            if (line.trim() === '' || line.endsWith(']')) {
                return undefined;
            }
            line = line.trim().replace(/    /g, '\t').replace(',','');
            if (Parser.InventoryRegex.test(line)) {
                let match = line.match(Parser.InventoryRegex);
                return new LookupItem(match[1], Parser.stringToIntWithDefault(match[2], 1));
            } else if (Parser.ContractRegex.test(line)) {
                let match = line.match(Parser.ContractRegex);
                return new LookupItem(match[1], Parser.stringToIntWithDefault(match[2], 1));
            } else if (Parser.IndustryRegex.test(line)) {
                let match = line.match(Parser.IndustryRegex);
                return new LookupItem(match[2], Parser.stringToIntWithDefault(match[1], 1));
            } else if (Parser.ListRegex.test(line)) {
                let match = line.match(Parser.ListRegex);
                return new LookupItem(match[2], Parser.stringToIntWithDefault(match[1], 1));
            } else if (Parser.FittingTitleRegex.test(line)) {
                let match = line.match(Parser.FittingTitleRegex);
                return new LookupItem(match[1], 1);
            } else if (Parser.FittingsRegex.test(line)) {
                let match = line.match(Parser.FittingsRegex);
                return new LookupItem(match[1], Parser.stringToIntWithDefault(match[2], 1));
            } else {
                console.log(`Could not parse line: \n\t${line}`);
            }
        } catch (e) {
            console.log("ERROR" + line);
            return undefined;
        }

    }

    private static stringToIntWithDefault(str: string, def: number): number {
        try {
            let num = parseFloat(str.replace(',', ''));
            return num;
        }
        catch (e) {
            return def;
        }
    }
}