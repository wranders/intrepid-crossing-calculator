import { LookupItem } from '../models';

export class Parser {
    public static InventoryRegex = /^([\S ]+)\t([\d,\.]+)?\t([\S ]+)\t([\S ]*)\t([\S ]*)\t([\d,\.]+ m3)$/i;
    public static ListRegex = /^([\d,]+)\s(?:x\s)?([\S ]+)$/i;
    public static FittingsRegex = /^([\d\-A-Za-z ]+?)(?:x)?(\d*)?$/i;
    public static FittingTitleRegex = /^\[(.*)$/i

    public static parse(string: string): Array<LookupItem> {
        return string.split('\n').map(line => line.split(',')).reduce((a,b) => a.concat(b)).map(Parser.parseLine);
    }

    public static parseLine(line: string): LookupItem {
        try {
            if (line.trim() === '') {
                return undefined;
            }
            console.log(line);
            if (Parser.InventoryRegex.test(line)) {
                let match = line.match(Parser.InventoryRegex);
                return new LookupItem(match[1], Parser.stringToIntWithDefault(match[2], 1));
            } else if (Parser.ListRegex.test(line)) {
                let match = line.match(Parser.ListRegex);
                return new LookupItem(match[2], Parser.stringToIntWithDefault(match[1], 1));
            } else if (Parser.FittingsRegex.test(line)) {
                let match = line.match(Parser.FittingsRegex);
                return new LookupItem(match[1], Parser.stringToIntWithDefault(match[2], 1));
            } else if (Parser.FittingTitleRegex.test(line)) {
                let match = line.match(Parser.FittingTitleRegex);
                return new LookupItem(match[1], 1);
            }
        } catch (e) {
            console.log("ERROR" + line);
        }

    }

    private static stringToIntWithDefault(string: string, def: number): number {
        let num = +string;
        if (isNaN(num)) {
            return def;
        }
        return num;
    }
}