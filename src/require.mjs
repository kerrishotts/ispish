import listDictionary from '../dictionary/list.mjs';
import standardDictionary from '../dictionary/standard.mjs';
import gfxDictionary from '../dictionary/gfx.mjs';
import turtleDictionary from '../dictionary/turtle.mjs';
import mathDictionary from '../dictionary/math.mjs';

const modules = {
    MATH: mathDictionary,
    LIST: listDictionary,
    STANDARD: standardDictionary,
    GFX: gfxDictionary,
    TURTLE: turtleDictionary,
};

export default function __require__(module) {
    return modules[module.toUpperCase()] || '';
}
