import { _ as _slicedToArray, a as _createForOfIteratorHelper } from './_rollupPluginBabelHelpers-303d2ab1.js';

var buildIdentifier = "[0-9A-Za-z-]+";
var build = "(?:\\+(".concat(buildIdentifier, "(?:\\.").concat(buildIdentifier, ")*))");
var numericIdentifier = "0|[1-9]\\d*";
var numericIdentifierLoose = "[0-9]+";
var nonNumericIdentifier = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
var preReleaseIdentifierLoose = "(?:".concat(numericIdentifierLoose, "|").concat(nonNumericIdentifier, ")");
var preReleaseLoose = "(?:-?(".concat(preReleaseIdentifierLoose, "(?:\\.").concat(preReleaseIdentifierLoose, ")*))");
var preReleaseIdentifier = "(?:".concat(numericIdentifier, "|").concat(nonNumericIdentifier, ")");
var preRelease = "(?:-(".concat(preReleaseIdentifier, "(?:\\.").concat(preReleaseIdentifier, ")*))");
var xRangeIdentifier = "".concat(numericIdentifier, "|x|X|\\*");
var xRangePlain = "[v=\\s]*(".concat(xRangeIdentifier, ")(?:\\.(").concat(xRangeIdentifier, ")(?:\\.(").concat(xRangeIdentifier, ")(?:").concat(preRelease, ")?").concat(build, "?)?)?");
var hyphenRange = "^\\s*(".concat(xRangePlain, ")\\s+-\\s+(").concat(xRangePlain, ")\\s*$");
var mainVersionLoose = "(".concat(numericIdentifierLoose, ")\\.(").concat(numericIdentifierLoose, ")\\.(").concat(numericIdentifierLoose, ")");
var loosePlain = "[v=\\s]*".concat(mainVersionLoose).concat(preReleaseLoose, "?").concat(build, "?");
var gtlt = "((?:<|>)?=?)";
var comparatorTrim = "(\\s*)".concat(gtlt, "\\s*(").concat(loosePlain, "|").concat(xRangePlain, ")");
var loneTilde = "(?:~>?)";
var tildeTrim = "(\\s*)".concat(loneTilde, "\\s+");
var loneCaret = "(?:\\^)";
var caretTrim = "(\\s*)".concat(loneCaret, "\\s+");
var star = "(<|>)?=?\\s*\\*";
var caret = "^".concat(loneCaret).concat(xRangePlain, "$");
var mainVersion = "(".concat(numericIdentifier, ")\\.(").concat(numericIdentifier, ")\\.(").concat(numericIdentifier, ")");
var fullPlain = "v?".concat(mainVersion).concat(preRelease, "?").concat(build, "?");
var tilde = "^".concat(loneTilde).concat(xRangePlain, "$");
var xRange = "^".concat(gtlt, "\\s*").concat(xRangePlain, "$");
var comparator = "^".concat(gtlt, "\\s*(").concat(fullPlain, ")$|^$");
var gte0 = "^\\s*>=\\s*0.0.0\\s*$";
function parseRegex(source) {
  return new RegExp(source);
}
function isXVersion(version) {
  return !version || version.toLowerCase() === "x" || version === "*";
}
function pipe() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }
  return function (x) {
    return fns.reduce(function (v, f) {
      return f(v);
    }, x);
  };
}
function extractComparator(comparatorString) {
  return comparatorString.match(parseRegex(comparator));
}
function combineVersion(major, minor, patch, preRelease2) {
  var mainVersion2 = "".concat(major, ".").concat(minor, ".").concat(patch);
  if (preRelease2) {
    return "".concat(mainVersion2, "-").concat(preRelease2);
  }
  return mainVersion2;
}
function parseHyphen(range) {
  return range.replace(parseRegex(hyphenRange), function (_range, from, fromMajor, fromMinor, fromPatch, _fromPreRelease, _fromBuild, to, toMajor, toMinor, toPatch, toPreRelease) {
    if (isXVersion(fromMajor)) {
      from = "";
    } else if (isXVersion(fromMinor)) {
      from = ">=".concat(fromMajor, ".0.0");
    } else if (isXVersion(fromPatch)) {
      from = ">=".concat(fromMajor, ".").concat(fromMinor, ".0");
    } else {
      from = ">=".concat(from);
    }
    if (isXVersion(toMajor)) {
      to = "";
    } else if (isXVersion(toMinor)) {
      to = "<".concat(+toMajor + 1, ".0.0-0");
    } else if (isXVersion(toPatch)) {
      to = "<".concat(toMajor, ".").concat(+toMinor + 1, ".0-0");
    } else if (toPreRelease) {
      to = "<=".concat(toMajor, ".").concat(toMinor, ".").concat(toPatch, "-").concat(toPreRelease);
    } else {
      to = "<=".concat(to);
    }
    return "".concat(from, " ").concat(to).trim();
  });
}
function parseComparatorTrim(range) {
  return range.replace(parseRegex(comparatorTrim), "$1$2$3");
}
function parseTildeTrim(range) {
  return range.replace(parseRegex(tildeTrim), "$1~");
}
function parseCaretTrim(range) {
  return range.replace(parseRegex(caretTrim), "$1^");
}
function parseCarets(range) {
  return range.trim().split(/\s+/).map(function (rangeVersion) {
    return rangeVersion.replace(parseRegex(caret), function (_, major, minor, patch, preRelease2) {
      if (isXVersion(major)) {
        return "";
      } else if (isXVersion(minor)) {
        return ">=".concat(major, ".0.0 <").concat(+major + 1, ".0.0-0");
      } else if (isXVersion(patch)) {
        if (major === "0") {
          return ">=".concat(major, ".").concat(minor, ".0 <").concat(major, ".").concat(+minor + 1, ".0-0");
        } else {
          return ">=".concat(major, ".").concat(minor, ".0 <").concat(+major + 1, ".0.0-0");
        }
      } else if (preRelease2) {
        if (major === "0") {
          if (minor === "0") {
            return ">=".concat(major, ".").concat(minor, ".").concat(patch, "-").concat(preRelease2, " <").concat(major, ".").concat(minor, ".").concat(+patch + 1, "-0");
          } else {
            return ">=".concat(major, ".").concat(minor, ".").concat(patch, "-").concat(preRelease2, " <").concat(major, ".").concat(+minor + 1, ".0-0");
          }
        } else {
          return ">=".concat(major, ".").concat(minor, ".").concat(patch, "-").concat(preRelease2, " <").concat(+major + 1, ".0.0-0");
        }
      } else {
        if (major === "0") {
          if (minor === "0") {
            return ">=".concat(major, ".").concat(minor, ".").concat(patch, " <").concat(major, ".").concat(minor, ".").concat(+patch + 1, "-0");
          } else {
            return ">=".concat(major, ".").concat(minor, ".").concat(patch, " <").concat(major, ".").concat(+minor + 1, ".0-0");
          }
        }
        return ">=".concat(major, ".").concat(minor, ".").concat(patch, " <").concat(+major + 1, ".0.0-0");
      }
    });
  }).join(" ");
}
function parseTildes(range) {
  return range.trim().split(/\s+/).map(function (rangeVersion) {
    return rangeVersion.replace(parseRegex(tilde), function (_, major, minor, patch, preRelease2) {
      if (isXVersion(major)) {
        return "";
      } else if (isXVersion(minor)) {
        return ">=".concat(major, ".0.0 <").concat(+major + 1, ".0.0-0");
      } else if (isXVersion(patch)) {
        return ">=".concat(major, ".").concat(minor, ".0 <").concat(major, ".").concat(+minor + 1, ".0-0");
      } else if (preRelease2) {
        return ">=".concat(major, ".").concat(minor, ".").concat(patch, "-").concat(preRelease2, " <").concat(major, ".").concat(+minor + 1, ".0-0");
      }
      return ">=".concat(major, ".").concat(minor, ".").concat(patch, " <").concat(major, ".").concat(+minor + 1, ".0-0");
    });
  }).join(" ");
}
function parseXRanges(range) {
  return range.split(/\s+/).map(function (rangeVersion) {
    return rangeVersion.trim().replace(parseRegex(xRange), function (ret, gtlt2, major, minor, patch, preRelease2) {
      var isXMajor = isXVersion(major);
      var isXMinor = isXMajor || isXVersion(minor);
      var isXPatch = isXMinor || isXVersion(patch);
      if (gtlt2 === "=" && isXPatch) {
        gtlt2 = "";
      }
      preRelease2 = "";
      if (isXMajor) {
        if (gtlt2 === ">" || gtlt2 === "<") {
          return "<0.0.0-0";
        } else {
          return "*";
        }
      } else if (gtlt2 && isXPatch) {
        if (isXMinor) {
          minor = 0;
        }
        patch = 0;
        if (gtlt2 === ">") {
          gtlt2 = ">=";
          if (isXMinor) {
            major = +major + 1;
            minor = 0;
            patch = 0;
          } else {
            minor = +minor + 1;
            patch = 0;
          }
        } else if (gtlt2 === "<=") {
          gtlt2 = "<";
          if (isXMinor) {
            major = +major + 1;
          } else {
            minor = +minor + 1;
          }
        }
        if (gtlt2 === "<") {
          preRelease2 = "-0";
        }
        return "".concat(gtlt2 + major, ".").concat(minor, ".").concat(patch).concat(preRelease2);
      } else if (isXMinor) {
        return ">=".concat(major, ".0.0").concat(preRelease2, " <").concat(+major + 1, ".0.0-0");
      } else if (isXPatch) {
        return ">=".concat(major, ".").concat(minor, ".0").concat(preRelease2, " <").concat(major, ".").concat(+minor + 1, ".0-0");
      }
      return ret;
    });
  }).join(" ");
}
function parseStar(range) {
  return range.trim().replace(parseRegex(star), "");
}
function parseGTE0(comparatorString) {
  return comparatorString.trim().replace(parseRegex(gte0), "");
}
function compareAtom(rangeAtom, versionAtom) {
  rangeAtom = +rangeAtom || rangeAtom;
  versionAtom = +versionAtom || versionAtom;
  if (rangeAtom > versionAtom) {
    return 1;
  }
  if (rangeAtom === versionAtom) {
    return 0;
  }
  return -1;
}
function comparePreRelease(rangeAtom, versionAtom) {
  var rangePreRelease = rangeAtom.preRelease;
  var versionPreRelease = versionAtom.preRelease;
  if (rangePreRelease === void 0 && !!versionPreRelease) {
    return 1;
  }
  if (!!rangePreRelease && versionPreRelease === void 0) {
    return -1;
  }
  if (rangePreRelease === void 0 && versionPreRelease === void 0) {
    return 0;
  }
  for (var i = 0, n = rangePreRelease.length; i <= n; i++) {
    var rangeElement = rangePreRelease[i];
    var versionElement = versionPreRelease[i];
    if (rangeElement === versionElement) {
      continue;
    }
    if (rangeElement === void 0 && versionElement === void 0) {
      return 0;
    }
    if (!rangeElement) {
      return 1;
    }
    if (!versionElement) {
      return -1;
    }
    return compareAtom(rangeElement, versionElement);
  }
  return 0;
}
function compareVersion(rangeAtom, versionAtom) {
  return compareAtom(rangeAtom.major, versionAtom.major) || compareAtom(rangeAtom.minor, versionAtom.minor) || compareAtom(rangeAtom.patch, versionAtom.patch) || comparePreRelease(rangeAtom, versionAtom);
}
function eq(rangeAtom, versionAtom) {
  return rangeAtom.version === versionAtom.version;
}
function compare(rangeAtom, versionAtom) {
  switch (rangeAtom.operator) {
    case "":
    case "=":
      return eq(rangeAtom, versionAtom);
    case ">":
      return compareVersion(rangeAtom, versionAtom) < 0;
    case ">=":
      return eq(rangeAtom, versionAtom) || compareVersion(rangeAtom, versionAtom) < 0;
    case "<":
      return compareVersion(rangeAtom, versionAtom) > 0;
    case "<=":
      return eq(rangeAtom, versionAtom) || compareVersion(rangeAtom, versionAtom) > 0;
    case void 0:
      {
        return true;
      }
    default:
      return false;
  }
}
function parseComparatorString(range) {
  return pipe(parseCarets, parseTildes, parseXRanges, parseStar)(range);
}
function parseRange(range) {
  return pipe(parseHyphen, parseComparatorTrim, parseTildeTrim, parseCaretTrim)(range.trim()).split(/\s+/).join(" ");
}
function satisfy(version, range) {
  if (!version) {
    return false;
  }
  var parsedRange = parseRange(range);
  var parsedComparator = parsedRange.split(" ").map(function (rangeVersion) {
    return parseComparatorString(rangeVersion);
  }).join(" ");
  var comparators = parsedComparator.split(/\s+/).map(function (comparator2) {
    return parseGTE0(comparator2);
  });
  var extractedVersion = extractComparator(version);
  if (!extractedVersion) {
    return false;
  }
  var _extractedVersion = _slicedToArray(extractedVersion, 7),
    versionOperator = _extractedVersion[1],
    versionMajor = _extractedVersion[3],
    versionMinor = _extractedVersion[4],
    versionPatch = _extractedVersion[5],
    versionPreRelease = _extractedVersion[6];
  var versionAtom = {
    operator: versionOperator,
    version: combineVersion(versionMajor, versionMinor, versionPatch, versionPreRelease),
    major: versionMajor,
    minor: versionMinor,
    patch: versionPatch,
    preRelease: versionPreRelease == null ? void 0 : versionPreRelease.split(".")
  };
  var _iterator = _createForOfIteratorHelper(comparators),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var comparator2 = _step.value;
      var extractedComparator = extractComparator(comparator2);
      if (!extractedComparator) {
        return false;
      }
      var _extractedComparator = _slicedToArray(extractedComparator, 7),
        rangeOperator = _extractedComparator[1],
        rangeMajor = _extractedComparator[3],
        rangeMinor = _extractedComparator[4],
        rangePatch = _extractedComparator[5],
        rangePreRelease = _extractedComparator[6];
      var rangeAtom = {
        operator: rangeOperator,
        version: combineVersion(rangeMajor, rangeMinor, rangePatch, rangePreRelease),
        major: rangeMajor,
        minor: rangeMinor,
        patch: rangePatch,
        preRelease: rangePreRelease == null ? void 0 : rangePreRelease.split(".")
      };
      if (!compare(rangeAtom, versionAtom)) {
        return false;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return true;
}

// eslint-disable-next-line no-undef
const moduleMap = {'react':{get:()=>()=>__federation_import(new URL('__federation_shared_react-7d7c7482.js', import.meta.url).href),import:true},'react-dom':{get:()=>()=>__federation_import(new URL('__federation_shared_react-dom-f61c0f3a.js', import.meta.url).href),import:false,requiredVersion:'19.0.0-rc-f38c22b244-20240704'}};
const moduleCache = Object.create(null);
async function importShared(name, shareScope = 'default') {
  return moduleCache[name]
    ? new Promise((r) => r(moduleCache[name]))
    : (await getSharedFromRuntime(name, shareScope)) || getSharedFromLocal(name)
}
// eslint-disable-next-line
async function __federation_import(name) {
  return import(name)
}
async function getSharedFromRuntime(name, shareScope) {
  let module = null;
  if (globalThis?.__federation_shared__?.[shareScope]?.[name]) {
    const versionObj = globalThis.__federation_shared__[shareScope][name];
    const versionKey = Object.keys(versionObj)[0];
    const versionValue = Object.values(versionObj)[0];
    if (moduleMap[name]?.requiredVersion) {
      // judge version satisfy
      if (satisfy(versionKey, moduleMap[name].requiredVersion)) {
        module = await (await versionValue.get())();
      } else {
        console.log(
          `provider support ${name}(${versionKey}) is not satisfied requiredVersion(\${moduleMap[name].requiredVersion})`
        );
      }
    } else {
      module = await (await versionValue.get())();
    }
  }
  if (module) {
    return flattenModule(module, name)
  }
}
async function getSharedFromLocal(name) {
  if (moduleMap[name]?.import) {
    let module = await (await moduleMap[name].get())();
    return flattenModule(module, name)
  } else {
    console.error(
      `consumer config import=false,so cant use callback shared module`
    );
  }
}
function flattenModule(module, name) {
  // use a shared module which export default a function will getting error 'TypeError: xxx is not a function'
  if (typeof module.default === 'function') {
    Object.keys(module).forEach((key) => {
      if (key !== 'default') {
        module.default[key] = module[key];
      }
    });
    moduleCache[name] = module.default;
    return module.default
  }
  if (module.default) module = Object.assign({}, module.default, module);
  moduleCache[name] = module;
  return module
}

export { importShared, getSharedFromLocal as importSharedLocal, getSharedFromRuntime as importSharedRuntime };
