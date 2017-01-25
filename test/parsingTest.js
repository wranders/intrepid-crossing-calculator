"use strict";
require("reflect-metadata");
const models_1 = require("../src/models");
const parsing_1 = require("../src/parsing");
const assert = require("assert");
let parseLineTests = {};
function addParseLineTest(input, name, quantity) {
    parseLineTests[input] = new models_1.LookupItem(name, quantity);
}
addParseLineTest('Tritanium', 'Tritanium', 1);
addParseLineTest('3 Tritanium', 'Tritanium', 3);
addParseLineTest('3x Tritanium', 'Tritanium', 3);
addParseLineTest('Tritanium x4', 'Tritanium', 4);
addParseLineTest('Tritanium 5', 'Tritanium', 5);
addParseLineTest('7th Tier Overseer\'s Personal Effects', '7th Tier Overseer\'s Personal Effects', 1);
addParseLineTest('Liquid Ozone	197,473	Ice Product			78,989.20 m3', 'Liquid Ozone', 197473);
addParseLineTest('Liquid Ozone    197,473    Ice Product            78,989.20 m3', 'Liquid Ozone', 197473);
addParseLineTest('Gneiss	31	Gneiss			155 m3', 'Gneiss', 31);
addParseLineTest('Gneiss    31    Gneiss            155 m3', 'Gneiss', 31);
addParseLineTest("1 x 'Augmented' Hammerhead", "'Augmented' Hammerhead", 1);
addParseLineTest('Fusion M	100	Projectile Ammo	Charge', 'Fusion M', 100);
let multiLineInventoryString = `Liquid Ozone    197,473    Ice Product            78,989.20 m3
Oxygen Isotopes    50,071    Ice Product            5,007.10 m3
Compressed Iridescent Gneiss    1,109    Gneiss            1,996.20 m3
Compressed Bright Spodumain    937    Spodumain            26,236 m3
Iridescent Gneiss    99    Gneiss            495 m3
Bistot    74    Bistot            1,184 m3
Condensed Scordite    55    Scordite            8.25 m3
Silvery Omber    48    Omber            28.80 m3
Concentrated Veldspar    33    Veldspar            3.30 m3
Gneiss    31    Gneiss            155 m3
Triclinic Bistot    28    Bistot            448 m3
Onyx Ochre    27    Dark Ochre            216 m3
Veldspar    26    Veldspar            2.60 m3
Bright Spodumain    20    Spodumain            320 m3
Sharp Crokite    18    Crokite            288 m3
Arkonor    13    Arkonor            208 m3
Dark Ochre    12    Dark Ochre            96 m3
Crimson Arkonor    11    Arkonor            176 m3
Scordite    10    Scordite            1.50 m3
Crokite    2    Crokite            32 m3`;
let multiLineFittingString = `
[Thrasher, Thrasher]
Gyrostabilizer I
Gyrostabilizer I

5MN Microwarpdrive I
Medium Shield Extender I
Warp Scrambler I

200mm AutoCannon I
200mm AutoCannon I
200mm AutoCannon I
200mm AutoCannon I
200mm AutoCannon I
200mm AutoCannon I
200mm AutoCannon I
Small Energy Neutralizer I

Small Anti-EM Screen Reinforcer I
Small Core Defense Field Extender I
Small Core Defense Field Extender I

EMP S x3840
Fusion S x3000
`;
describe('Parser', () => {
    describe('parseLine', () => {
        for (let test in parseLineTests) {
            it(`should parse "${test}"`, () => {
                let result = parsing_1.Parser.parseLine(test);
                assert.deepEqual(result, parseLineTests[test]);
            });
        }
        it(`should return undefined for empty string`, () => {
            let result = parsing_1.Parser.parseLine('');
            assert.equal(result, undefined);
        });
        it(`should return undefined for whitespace string`, () => {
            let result = parsing_1.Parser.parseLine('    			');
            assert.equal(result, undefined);
        });
    });
    describe('parse', () => {
        it('should successfully parse', () => {
            let results = parsing_1.Parser.parse(multiLineFittingString);
            let expected = [
                { "name": "Thrasher", "quantity": 1 },
                { "name": "Gyrostabilizer I", "quantity": 1 },
                { "name": "Gyrostabilizer I", "quantity": 1 },
                { "name": "5MN Microwarpdrive I", "quantity": 1 },
                { "name": "Medium Shield Extender I", "quantity": 1 },
                { "name": "Warp Scrambler I", "quantity": 1 },
                { "name": "200mm AutoCannon I", "quantity": 1 },
                { "name": "200mm AutoCannon I", "quantity": 1 },
                { "name": "200mm AutoCannon I", "quantity": 1 },
                { "name": "200mm AutoCannon I", "quantity": 1 },
                { "name": "200mm AutoCannon I", "quantity": 1 },
                { "name": "200mm AutoCannon I", "quantity": 1 },
                { "name": "200mm AutoCannon I", "quantity": 1 },
                { "name": "Small Energy Neutralizer I", "quantity": 1 },
                { "name": "Small Anti-EM Screen Reinforcer I", "quantity": 1 },
                { "name": "Small Core Defense Field Extender I", "quantity": 1 },
                { "name": "Small Core Defense Field Extender I", "quantity": 1 },
                { "name": "EMP S", "quantity": 3840 },
                { "name": "Fusion S", "quantity": 3000 }
            ];
            assert.deepEqual(results, expected);
        });
    });
});
//# sourceMappingURL=parsingTest.js.map