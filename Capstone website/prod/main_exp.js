(function() {
    (function(global, factory) {
        if (typeof module === "object" && typeof module.exports === "object") {
            module.exports = global.document ? factory(global, !0) : function(w) {
                if (!w.document) {
                    throw new Error("jQuery requires a window with a document")
                }
                return factory(w)
            }
        } else {
            factory(global)
        }
    }(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
        var arr = [];
        var slice = arr.slice;
        var concat = arr.concat;
        var push = arr.push;
        var indexOf = arr.indexOf;
        var class2type = {};
        var toString = class2type.toString;
        var hasOwn = class2type.hasOwnProperty;
        var support = {};
        var document = window.document,
            version = "2.1.4",
            jQuery = function(selector, context) {
                return new jQuery.fn.init(selector, context)
            },
            rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            rmsPrefix = /^-ms-/,
            rdashAlpha = /-([\da-z])/gi,
            fcamelCase = function(all, letter) {
                return letter.toUpperCase()
            };
        jQuery.fn = jQuery.prototype = {
            jquery: version,
            constructor: jQuery,
            selector: "",
            length: 0,
            toArray: function() {
                return slice.call(this)
            },
            get: function(num) {
                return num != null ? (num < 0 ? this[num + this.length] : this[num]) : slice.call(this)
            },
            pushStack: function(elems) {
                var ret = jQuery.merge(this.constructor(), elems);
                ret.prevObject = this;
                ret.context = this.context;
                return ret
            },
            each: function(callback, args) {
                return jQuery.each(this, callback, args)
            },
            map: function(callback) {
                return this.pushStack(jQuery.map(this, function(elem, i) {
                    return callback.call(elem, i, elem)
                }))
            },
            slice: function() {
                return this.pushStack(slice.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(i) {
                var len = this.length,
                    j = +i + (i < 0 ? len : 0);
                return this.pushStack(j >= 0 && j < len ? [this[j]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor(null)
            },
            push: push,
            sort: arr.sort,
            splice: arr.splice
        };
        jQuery.extend = jQuery.fn.extend = function() {
            var options,
                name,
                src,
                copy,
                copyIsArray,
                clone,
                target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = !1;
            if (typeof target === "boolean") {
                deep = target;
                target = arguments[i] || {};
                i++
            }
            if (typeof target !== "object" && !jQuery.isFunction(target)) {
                target = {}
            }
            if (i === length) {
                target = this;
                i--
            }
            for (; i < length; i++) {
                if ((options = arguments[i]) != null) {
                    for (name in options) {
                        src = target[name];
                        copy = options[name];
                        if (target === copy) {
                            continue
                        }
                        if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                            if (copyIsArray) {
                                copyIsArray = !1;
                                clone = src && jQuery.isArray(src) ? src : []
                            } else {
                                clone = src && jQuery.isPlainObject(src) ? src : {}
                            }
                            target[name] = jQuery.extend(deep, clone, copy)
                        } else if (copy !== undefined) {
                            target[name] = copy
                        }
                    }
                }
            }
            return target
        };
        jQuery.extend({
            expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(msg) {
                throw new Error(msg)
            },
            noop: function() {},
            isFunction: function(obj) {
                return jQuery.type(obj) === "function"
            },
            isArray: Array.isArray,
            isWindow: function(obj) {
                return obj != null && obj === obj.window
            },
            isNumeric: function(obj) {
                return !jQuery.isArray(obj) && (obj - parseFloat(obj) + 1) >= 0
            },
            isPlainObject: function(obj) {
                if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                    return !1
                }
                if (obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                    return !1
                }
                return !0
            },
            isEmptyObject: function(obj) {
                var name;
                for (name in obj) {
                    return !1
                }
                return !0
            },
            type: function(obj) {
                if (obj == null) {
                    return obj + ""
                }
                return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj
            },
            globalEval: function(code) {
                var script,
                    indirect = eval;
                code = jQuery.trim(code);
                if (code) {
                    if (code.indexOf("use strict") === 1) {
                        script = document.createElement("script");
                        script.text = code;
                        document.head.appendChild(script).parentNode.removeChild(script)
                    } else {
                        indirect(code)
                    }
                }
            },
            camelCase: function(string) {
                return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
            },
            nodeName: function(elem, name) {
                return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
            },
            each: function(obj, callback, args) {
                var value,
                    i = 0,
                    length = obj.length,
                    isArray = isArraylike(obj);
                if (args) {
                    if (isArray) {
                        for (; i < length; i++) {
                            value = callback.apply(obj[i], args);
                            if (value === !1) {
                                break
                            }
                        }
                    } else {
                        for (i in obj) {
                            value = callback.apply(obj[i], args);
                            if (value === !1) {
                                break
                            }
                        }
                    }
                } else {
                    if (isArray) {
                        for (; i < length; i++) {
                            value = callback.call(obj[i], i, obj[i]);
                            if (value === !1) {
                                break
                            }
                        }
                    } else {
                        for (i in obj) {
                            value = callback.call(obj[i], i, obj[i]);
                            if (value === !1) {
                                break
                            }
                        }
                    }
                }
                return obj
            },
            trim: function(text) {
                return text == null ? "" : (text + "").replace(rtrim, "")
            },
            makeArray: function(arr, results) {
                var ret = results || [];
                if (arr != null) {
                    if (isArraylike(Object(arr))) {
                        jQuery.merge(ret, typeof arr === "string" ? [arr] : arr)
                    } else {
                        push.call(ret, arr)
                    }
                }
                return ret
            },
            inArray: function(elem, arr, i) {
                return arr == null ? -1 : indexOf.call(arr, elem, i)
            },
            merge: function(first, second) {
                var len = +second.length,
                    j = 0,
                    i = first.length;
                for (; j < len; j++) {
                    first[i++] = second[j]
                }
                first.length = i;
                return first
            },
            grep: function(elems, callback, invert) {
                var callbackInverse,
                    matches = [],
                    i = 0,
                    length = elems.length,
                    callbackExpect = !invert;
                for (; i < length; i++) {
                    callbackInverse = !callback(elems[i], i);
                    if (callbackInverse !== callbackExpect) {
                        matches.push(elems[i])
                    }
                }
                return matches
            },
            map: function(elems, callback, arg) {
                var value,
                    i = 0,
                    length = elems.length,
                    isArray = isArraylike(elems),
                    ret = [];
                if (isArray) {
                    for (; i < length; i++) {
                        value = callback(elems[i], i, arg);
                        if (value != null) {
                            ret.push(value)
                        }
                    }
                } else {
                    for (i in elems) {
                        value = callback(elems[i], i, arg);
                        if (value != null) {
                            ret.push(value)
                        }
                    }
                }
                return concat.apply([], ret)
            },
            guid: 1,
            proxy: function(fn, context) {
                var tmp,
                    args,
                    proxy;
                if (typeof context === "string") {
                    tmp = fn[context];
                    context = fn;
                    fn = tmp
                }
                if (!jQuery.isFunction(fn)) {
                    return undefined
                }
                args = slice.call(arguments, 2);
                proxy = function() {
                    return fn.apply(context || this, args.concat(slice.call(arguments)))
                };
                proxy.guid = fn.guid = fn.guid || jQuery.guid++;
                return proxy
            },
            now: Date.now,
            support: support
        });
        jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase()
        });
        function isArraylike(obj) {
            var length = "length" in obj && obj.length,
                type = jQuery.type(obj);
            if (type === "function" || jQuery.isWindow(obj)) {
                return !1
            }
            if (obj.nodeType === 1 && length) {
                return !0
            }
            return type === "array" || length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj
        }
        var Sizzle = (function(window) {
            var i,
                support,
                Expr,
                getText,
                isXML,
                tokenize,
                compile,
                select,
                outermostContext,
                sortInput,
                hasDuplicate,
                setDocument,
                document,
                docElem,
                documentIsHTML,
                rbuggyQSA,
                rbuggyMatches,
                matches,
                contains,
                expando = "sizzle" + 1 * new Date(),
                preferredDoc = window.document,
                dirruns = 0,
                done = 0,
                classCache = createCache(),
                tokenCache = createCache(),
                compilerCache = createCache(),
                sortOrder = function(a, b) {
                    if (a === b) {
                        hasDuplicate = !0
                    }
                    return 0
                },
                MAX_NEGATIVE = 1 << 31,
                hasOwn = ({}).hasOwnProperty,
                arr = [],
                pop = arr.pop,
                push_native = arr.push,
                push = arr.push,
                slice = arr.slice,
                indexOf = function(list, elem) {
                    var i = 0,
                        len = list.length;
                    for (; i < len; i++) {
                        if (list[i] === elem) {
                            return i
                        }
                    }
                    return -1
                },
                booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                whitespace = "[\\x20\\t\\r\\n\\f]",
                characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                identifier = characterEncoding.replace("w", "w#"),
                attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
                pseudos = ":(" + characterEncoding + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" + ".*" + ")\\)|)",
                rwhitespace = new RegExp(whitespace + "+", "g"),
                rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
                rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
                rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
                rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
                rpseudo = new RegExp(pseudos),
                ridentifier = new RegExp("^" + identifier + "$"),
                matchExpr = {
                    "ID": new RegExp("^#(" + characterEncoding + ")"),
                    "CLASS": new RegExp("^\\.(" + characterEncoding + ")"),
                    "TAG": new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
                    "ATTR": new RegExp("^" + attributes),
                    "PSEUDO": new RegExp("^" + pseudos),
                    "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                    "bool": new RegExp("^(?:" + booleans + ")$", "i"),
                    "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
                },
                rinputs = /^(?:input|select|textarea|button)$/i,
                rheader = /^h\d$/i,
                rnative = /^[^{]+\{\s*\[native \w/,
                rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                rsibling = /[+~]/,
                rescape = /'|\\/g,
                runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
                funescape = function(_, escaped, escapedWhitespace) {
                    var high = "0x" + escaped - 0x10000;
                    return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 0x10000) : String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00)
                },
                unloadHandler = function() {
                    setDocument()
                };
            try {
                push.apply((arr = slice.call(preferredDoc.childNodes)), preferredDoc.childNodes);
                arr[preferredDoc.childNodes.length].nodeType
            } catch (e) {
                push = {
                    apply: arr.length ? function(target, els) {
                        push_native.apply(target, slice.call(els))
                    } : function(target, els) {
                        var j = target.length,
                            i = 0;
                        while ((target[j++] = els[i++])) {}
                        target.length = j - 1
                    }
                }
            }
            function Sizzle(selector, context, results, seed) {
                var match,
                    elem,
                    m,
                    nodeType,
                    i,
                    groups,
                    old,
                    nid,
                    newContext,
                    newSelector;
                if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
                    setDocument(context)
                }
                context = context || document;
                results = results || [];
                nodeType = context.nodeType;
                if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
                    return results
                }
                if (!seed && documentIsHTML) {
                    if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
                        if ((m = match[1])) {
                            if (nodeType === 9) {
                                elem = context.getElementById(m);
                                if (elem && elem.parentNode) {
                                    if (elem.id === m) {
                                        results.push(elem);
                                        return results
                                    }
                                } else {
                                    return results
                                }
                            } else {
                                if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
                                    results.push(elem);
                                    return results
                                }
                            }
                        } else if (match[2]) {
                            push.apply(results, context.getElementsByTagName(selector));
                            return results
                        } else if ((m = match[3]) && support.getElementsByClassName) {
                            push.apply(results, context.getElementsByClassName(m));
                            return results
                        }
                    }
                    if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                        nid = old = expando;
                        newContext = context;
                        newSelector = nodeType !== 1 && selector;
                        if (nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                            groups = tokenize(selector);
                            if ((old = context.getAttribute("id"))) {
                                nid = old.replace(rescape, "\\$&")
                            } else {
                                context.setAttribute("id", nid)
                            }
                            nid = "[id='" + nid + "'] ";
                            i = groups.length;
                            while (i--) {
                                groups[i] = nid + toSelector(groups[i])
                            }
                            newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
                            newSelector = groups.join(",")
                        }
                        if (newSelector) {
                            try {
                                push.apply(results, newContext.querySelectorAll(newSelector));
                                return results
                            } catch (qsaError) {} finally {
                                if (!old) {
                                    context.removeAttribute("id")
                                }
                            }
                        }
                    }
                }
                return select(selector.replace(rtrim, "$1"), context, results, seed)
            }
            function createCache() {
                var keys = [];
                function cache(key, value) {
                    if (keys.push(key + " ") > Expr.cacheLength) {
                        delete cache[keys.shift()]
                    }
                    return ( cache[key + " "] = value)
                }
                return cache
            }
            function markFunction(fn) {
                fn[expando] = !0;
                return fn
            }
            function assert(fn) {
                var div = document.createElement("div");
                try {
                    return !!fn(div)
                } catch (e) {
                    return !1
                } finally {
                    if (div.parentNode) {
                        div.parentNode.removeChild(div)
                    }
                    div = null
                }
            }
            function addHandle(attrs, handler) {
                var arr = attrs.split("|"),
                    i = attrs.length;
                while (i--) {
                    Expr.attrHandle[arr[i]] = handler
                }
            }
            function siblingCheck(a, b) {
                var cur = b && a,
                    diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
                if (diff) {
                    return diff
                }
                if (cur) {
                    while ((cur = cur.nextSibling)) {
                        if (cur === b) {
                            return -1
                        }
                    }
                }
                return a ? 1 : -1
            }
            function createInputPseudo(type) {
                return function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === type
                }
            }
            function createButtonPseudo(type) {
                return function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return (name === "input" || name === "button") && elem.type === type
                }
            }
            function createPositionalPseudo(fn) {
                return markFunction(function(argument) {
                    argument = +argument;
                    return markFunction(function(seed, matches) {
                        var j,
                            matchIndexes = fn([], seed.length, argument),
                            i = matchIndexes.length;
                        while (i--) {
                            if (seed[(j = matchIndexes[i])]) {
                                seed[j] = !(matches[j] = seed[j])
                            }
                        }
                    })
                })
            }
            function testContext(context) {
                return context && typeof context.getElementsByTagName !== "undefined" && context
            }
            support = Sizzle.support = {};
            isXML = Sizzle.isXML = function(elem) {
                var documentElement = elem && (elem.ownerDocument || elem).documentElement;
                return documentElement ? documentElement.nodeName !== "HTML" : !1
            };
            setDocument = Sizzle.setDocument = function(node) {
                var hasCompare,
                    parent,
                    doc = node ? node.ownerDocument || node : preferredDoc;
                if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
                    return document
                }
                document = doc;
                docElem = doc.documentElement;
                parent = doc.defaultView;
                if (parent && parent !== parent.top) {
                    if (parent.addEventListener) {
                        parent.addEventListener("unload", unloadHandler, !1)
                    } else if (parent.attachEvent) {
                        parent.attachEvent("onunload", unloadHandler)
                    }
                }
                documentIsHTML = !isXML(doc);
                support.attributes = assert(function(div) {
                    div.className = "i";
                    return !div.getAttribute("className")
                });
                support.getElementsByTagName = assert(function(div) {
                    div.appendChild(doc.createComment(""));
                    return !div.getElementsByTagName("*").length
                });
                support.getElementsByClassName = rnative.test(doc.getElementsByClassName);
                support.getById = assert(function(div) {
                    docElem.appendChild(div).id = expando;
                    return !doc.getElementsByName || !doc.getElementsByName(expando).length
                });
                if (support.getById) {
                    Expr.find.ID = function(id, context) {
                        if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                            var m = context.getElementById(id);
                            return m && m.parentNode ? [m] : []
                        }
                    };
                    Expr.filter.ID = function(id) {
                        var attrId = id.replace(runescape, funescape);
                        return function(elem) {
                            return elem.getAttribute("id") === attrId
                        }
                    }
                } else {
                    delete Expr.find.ID;
                    Expr.filter.ID = function(id) {
                        var attrId = id.replace(runescape, funescape);
                        return function(elem) {
                            var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                            return node && node.value === attrId
                        }
                    }
                }
                Expr.find.TAG = support.getElementsByTagName ? function(tag, context) {
                    if (typeof context.getElementsByTagName !== "undefined") {
                        return context.getElementsByTagName(tag)
                    } else if (support.qsa) {
                        return context.querySelectorAll(tag)
                    }
                } : function(tag, context) {
                    var elem,
                        tmp = [],
                        i = 0,
                        results = context.getElementsByTagName(tag);
                    if (tag === "*") {
                        while ((elem = results[i++])) {
                            if (elem.nodeType === 1) {
                                tmp.push(elem)
                            }
                        }
                        return tmp
                    }
                    return results
                };
                Expr.find.CLASS = support.getElementsByClassName && function(className, context) {
                    if (documentIsHTML) {
                        return context.getElementsByClassName(className)
                    }
                };
                rbuggyMatches = [];
                rbuggyQSA = [];
                if ((support.qsa = rnative.test(doc.querySelectorAll))) {
                    assert(function(div) {
                        docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\f]' msallowcapture=''>" + "<option selected=''></option></select>";
                        if (div.querySelectorAll("[msallowcapture^='']").length) {
                            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")")
                        }
                        if (!div.querySelectorAll("[selected]").length) {
                            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")")
                        }
                        if (!div.querySelectorAll("[id~=" + expando + "-]").length) {
                            rbuggyQSA.push("~=")
                        }
                        if (!div.querySelectorAll(":checked").length) {
                            rbuggyQSA.push(":checked")
                        }
                        if (!div.querySelectorAll("a#" + expando + "+*").length) {
                            rbuggyQSA.push(".#.+[+~]")
                        }
                    });
                    assert(function(div) {
                        var input = doc.createElement("input");
                        input.setAttribute("type", "hidden");
                        div.appendChild(input).setAttribute("name", "D");
                        if (div.querySelectorAll("[name=d]").length) {
                            rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=")
                        }
                        if (!div.querySelectorAll(":enabled").length) {
                            rbuggyQSA.push(":enabled", ":disabled")
                        }
                        div.querySelectorAll("*,:x");
                        rbuggyQSA.push(",.*:")
                    })
                }
                if ((support.matchesSelector = rnative.test((matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)))) {
                    assert(function(div) {
                        support.disconnectedMatch = matches.call(div, "div");
                        matches.call(div, "[s!='']:x");
                        rbuggyMatches.push("!=", pseudos)
                    })
                }
                rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
                rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
                hasCompare = rnative.test(docElem.compareDocumentPosition);
                contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
                    var adown = a.nodeType === 9 ? a.documentElement : a,
                        bup = b && b.parentNode;
                    return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16))
                } : function(a, b) {
                    if (b) {
                        while ((b = b.parentNode)) {
                            if (b === a) {
                                return !0
                            }
                        }
                    }
                    return !1
                };
                sortOrder = hasCompare ? function(a, b) {
                    if (a === b) {
                        hasDuplicate = !0;
                        return 0
                    }
                    var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                    if (compare) {
                        return compare
                    }
                    compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;
                    if (compare & 1 || (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {
                        if (a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
                            return -1
                        }
                        if (b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
                            return 1
                        }
                        return sortInput ? (indexOf(sortInput, a) - indexOf(sortInput, b)) : 0
                    }
                    return compare & 4 ? -1 : 1
                } : function(a, b) {
                    if (a === b) {
                        hasDuplicate = !0;
                        return 0
                    }
                    var cur,
                        i = 0,
                        aup = a.parentNode,
                        bup = b.parentNode,
                        ap = [a],
                        bp = [b];
                    if (!aup || !bup) {
                        return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? (indexOf(sortInput, a) - indexOf(sortInput, b)) : 0
                    } else if (aup === bup) {
                        return siblingCheck(a, b)
                    }
                    cur = a;
                    while ((cur = cur.parentNode)) {
                        ap.unshift(cur)
                    }
                    cur = b;
                    while ((cur = cur.parentNode)) {
                        bp.unshift(cur)
                    }
                    while (ap[i] === bp[i]) {
                        i++
                    }
                    return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0
                };
                return doc
            };
            Sizzle.matches = function(expr, elements) {
                return Sizzle(expr, null, null, elements)
            };
            Sizzle.matchesSelector = function(elem, expr) {
                if ((elem.ownerDocument || elem) !== document) {
                    setDocument(elem)
                }
                expr = expr.replace(rattributeQuotes, "='$1']");
                if (support.matchesSelector && documentIsHTML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
                    try {
                        var ret = matches.call(elem, expr);
                        if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
                            return ret
                        }
                    } catch (e) {}
                }
                return Sizzle(expr, document, null, [elem]).length > 0
            };
            Sizzle.contains = function(context, elem) {
                if ((context.ownerDocument || context) !== document) {
                    setDocument(context)
                }
                return contains(context, elem)
            };
            Sizzle.attr = function(elem, name) {
                if ((elem.ownerDocument || elem) !== document) {
                    setDocument(elem)
                }
                var fn = Expr.attrHandle[name.toLowerCase()],
                    val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
                return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null
            };
            Sizzle.error = function(msg) {
                throw new Error("Syntax error, unrecognized expression: " + msg)
            };
            Sizzle.uniqueSort = function(results) {
                var elem,
                    duplicates = [],
                    j = 0,
                    i = 0;
                hasDuplicate = !support.detectDuplicates;
                sortInput = !support.sortStable && results.slice(0);
                results.sort(sortOrder);
                if (hasDuplicate) {
                    while ((elem = results[i++])) {
                        if (elem === results[i]) {
                            j = duplicates.push(i)
                        }
                    }
                    while (j--) {
                        results.splice(duplicates[j], 1)
                    }
                }
                sortInput = null;
                return results
            };
            getText = Sizzle.getText = function(elem) {
                var node,
                    ret = "",
                    i = 0,
                    nodeType = elem.nodeType;
                if (!nodeType) {
                    while ((node = elem[i++])) {
                        ret += getText(node)
                    }
                } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                    if (typeof elem.textContent === "string") {
                        return elem.textContent
                    } else {
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            ret += getText(elem)
                        }
                    }
                } else if (nodeType === 3 || nodeType === 4) {
                    return elem.nodeValue
                }
                return ret
            };
            Expr = Sizzle.selectors = {
                cacheLength: 50,
                createPseudo: markFunction,
                match: matchExpr,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    "ATTR": function(match) {
                        match[1] = match[1].replace(runescape, funescape);
                        match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
                        if (match[2] === "~=") {
                            match[3] = " " + match[3] + " "
                        }
                        return match.slice(0, 4)
                    },
                    "CHILD": function(match) {
                        match[1] = match[1].toLowerCase();
                        if (match[1].slice(0, 3) === "nth") {
                            if (!match[3]) {
                                Sizzle.error(match[0])
                            }
                            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                            match[5] = +((match[7] + match[8]) || match[3] === "odd")
                        } else if (match[3]) {
                            Sizzle.error(match[0])
                        }
                        return match
                    },
                    "PSEUDO": function(match) {
                        var excess,
                            unquoted = !match[6] && match[2];
                        if (matchExpr.CHILD.test(match[0])) {
                            return null
                        }
                        if (match[3]) {
                            match[2] = match[4] || match[5] || ""
                        } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                            match[0] = match[0].slice(0, excess);
                            match[2] = unquoted.slice(0, excess)
                        }
                        return match.slice(0, 3)
                    }
                },
                filter: {
                    "TAG": function(nodeNameSelector) {
                        var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                        return nodeNameSelector === "*" ? function() {
                            return !0
                        } : function(elem) {
                            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName
                        }
                    },
                    "CLASS": function(className) {
                        var pattern = classCache[className + " "];
                        return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                                return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "")
                            })
                    },
                    "ATTR": function(name, operator, check) {
                        return function(elem) {
                            var result = Sizzle.attr(elem, name);
                            if (result == null) {
                                return operator === "!="
                            }
                            if (!operator) {
                                return !0
                            }
                            result += "";
                            return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : !1
                        }
                    },
                    "CHILD": function(type, what, argument, first, last) {
                        var simple = type.slice(0, 3) !== "nth",
                            forward = type.slice(-4) !== "last",
                            ofType = what === "of-type";
                        return first === 1 && last === 0 ? function(elem) {
                            return !!elem.parentNode
                        } : function(elem, context, xml) {
                            var cache,
                                outerCache,
                                node,
                                diff,
                                nodeIndex,
                                start,
                                dir = simple !== forward ? "nextSibling" : "previousSibling",
                                parent = elem.parentNode,
                                name = ofType && elem.nodeName.toLowerCase(),
                                useCache = !xml && !ofType;
                            if (parent) {
                                if (simple) {
                                    while (dir) {
                                        node = elem;
                                        while ((node = node[dir])) {
                                            if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                                                return !1
                                            }
                                        }
                                        start = dir = type === "only" && !start && "nextSibling"
                                    }
                                    return !0
                                }
                                start = [forward ? parent.firstChild : parent.lastChild];
                                if (forward && useCache) {
                                    outerCache = parent[expando] || (parent[expando] = {});
                                    cache = outerCache[type] || [];
                                    nodeIndex = cache[0] === dirruns && cache[1];
                                    diff = cache[0] === dirruns && cache[2];
                                    node = nodeIndex && parent.childNodes[nodeIndex];
                                    while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                                        if (node.nodeType === 1 && ++diff && node === elem) {
                                            outerCache[type] = [dirruns, nodeIndex, diff];
                                            break
                                        }
                                    }
                                } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
                                    diff = cache[1]
                                } else {
                                    while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                                        if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                                            if (useCache) {
                                                (node[expando] || (node[expando] = {}))[type] = [dirruns, diff]
                                            }
                                            if (node === elem) {
                                                break
                                            }
                                        }
                                    }
                                }
                                diff -= last;
                                return diff === first || (diff % first === 0 && diff / first >= 0)
                            }
                        }
                    },
                    "PSEUDO": function(pseudo, argument) {
                        var args,
                            fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                        if (fn[expando]) {
                            return fn(argument)
                        }
                        if (fn.length > 1) {
                            args = [pseudo, pseudo, "", argument];
                            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                                var idx,
                                    matched = fn(seed, argument),
                                    i = matched.length;
                                while (i--) {
                                    idx = indexOf(seed, matched[i]);
                                    seed[idx] = !(matches[idx] = matched[i])
                                }
                            }) : function(elem) {
                                return fn(elem, 0, args)
                            }
                        }
                        return fn
                    }
                },
                pseudos: {
                    "not": markFunction(function(selector) {
                        var input = [],
                            results = [],
                            matcher = compile(selector.replace(rtrim, "$1"));
                        return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                            var elem,
                                unmatched = matcher(seed, null, xml, []),
                                i = seed.length;
                            while (i--) {
                                if ((elem = unmatched[i])) {
                                    seed[i] = !(matches[i] = elem)
                                }
                            }
                        }) : function(elem, context, xml) {
                            input[0] = elem;
                            matcher(input, null, xml, results);
                            input[0] = null;
                            return !results.pop()
                        }
                    }),
                    "has": markFunction(function(selector) {
                        return function(elem) {
                            return Sizzle(selector, elem).length > 0
                        }
                    }),
                    "contains": markFunction(function(text) {
                        text = text.replace(runescape, funescape);
                        return function(elem) {
                            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1
                        }
                    }),
                    "lang": markFunction(function(lang) {
                        if (!ridentifier.test(lang || "")) {
                            Sizzle.error("unsupported lang: " + lang)
                        }
                        lang = lang.replace(runescape, funescape).toLowerCase();
                        return function(elem) {
                            var elemLang;
                            do {
                                if ((elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {
                                    elemLang = elemLang.toLowerCase();
                                    return elemLang === lang || elemLang.indexOf(lang + "-") === 0
                                }
                            } while ((elem = elem.parentNode) && elem.nodeType === 1);
                            return !1
                        }
                    }),
                    "target": function(elem) {
                        var hash = window.location && window.location.hash;
                        return hash && hash.slice(1) === elem.id
                    },
                    "root": function(elem) {
                        return elem === docElem
                    },
                    "focus": function(elem) {
                        return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex)
                    },
                    "enabled": function(elem) {
                        return elem.disabled === !1
                    },
                    "disabled": function(elem) {
                        return elem.disabled === !0
                    },
                    "checked": function(elem) {
                        var nodeName = elem.nodeName.toLowerCase();
                        return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected)
                    },
                    "selected": function(elem) {
                        if (elem.parentNode) {
                            elem.parentNode.selectedIndex
                        }
                        return elem.selected === !0
                    },
                    "empty": function(elem) {
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            if (elem.nodeType < 6) {
                                return !1
                            }
                        }
                        return !0
                    },
                    "parent": function(elem) {
                        return !Expr.pseudos.empty(elem)
                    },
                    "header": function(elem) {
                        return rheader.test(elem.nodeName)
                    },
                    "input": function(elem) {
                        return rinputs.test(elem.nodeName)
                    },
                    "button": function(elem) {
                        var name = elem.nodeName.toLowerCase();
                        return name === "input" && elem.type === "button" || name === "button"
                    },
                    "text": function(elem) {
                        var attr;
                        return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text")
                    },
                    "first": createPositionalPseudo(function() {
                        return [0]
                    }),
                    "last": createPositionalPseudo(function(matchIndexes, length) {
                        return [length - 1]
                    }),
                    "eq": createPositionalPseudo(function(matchIndexes, length, argument) {
                        return [argument < 0 ? argument + length : argument]
                    }),
                    "even": createPositionalPseudo(function(matchIndexes, length) {
                        var i = 0;
                        for (; i < length; i += 2) {
                            matchIndexes.push(i)
                        }
                        return matchIndexes
                    }),
                    "odd": createPositionalPseudo(function(matchIndexes, length) {
                        var i = 1;
                        for (; i < length; i += 2) {
                            matchIndexes.push(i)
                        }
                        return matchIndexes
                    }),
                    "lt": createPositionalPseudo(function(matchIndexes, length, argument) {
                        var i = argument < 0 ? argument + length : argument;
                        for (; --i >= 0;) {
                            matchIndexes.push(i)
                        }
                        return matchIndexes
                    }),
                    "gt": createPositionalPseudo(function(matchIndexes, length, argument) {
                        var i = argument < 0 ? argument + length : argument;
                        for (; ++i < length;) {
                            matchIndexes.push(i)
                        }
                        return matchIndexes
                    })
                }
            };
            Expr.pseudos.nth = Expr.pseudos.eq;
            for (i in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) {
                Expr.pseudos[i] = createInputPseudo(i)
            }
            for (i in {
                submit: !0,
                reset: !0
            }) {
                Expr.pseudos[i] = createButtonPseudo(i)
            }
            function setFilters() {}
            setFilters.prototype = Expr.filters = Expr.pseudos;
            Expr.setFilters = new setFilters();
            tokenize = Sizzle.tokenize = function(selector, parseOnly) {
                var matched,
                    match,
                    tokens,
                    type,
                    soFar,
                    groups,
                    preFilters,
                    cached = tokenCache[selector + " "];
                if (cached) {
                    return parseOnly ? 0 : cached.slice(0)
                }
                soFar = selector;
                groups = [];
                preFilters = Expr.preFilter;
                while (soFar) {
                    if (!matched || (match = rcomma.exec(soFar))) {
                        if (match) {
                            soFar = soFar.slice(match[0].length) || soFar
                        }
                        groups.push((tokens = []))
                    }
                    matched = !1;
                    if ((match = rcombinators.exec(soFar))) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,
                            type: match[0].replace(rtrim, " ")
                        });
                        soFar = soFar.slice(matched.length)
                    }
                    for (type in Expr.filter) {
                        if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
                            matched = match.shift();
                            tokens.push({
                                value: matched,
                                type: type,
                                matches: match
                            });
                            soFar = soFar.slice(matched.length)
                        }
                    }
                    if (!matched) {
                        break
                    }
                }
                return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0)
            };
            function toSelector(tokens) {
                var i = 0,
                    len = tokens.length,
                    selector = "";
                for (; i < len; i++) {
                    selector += tokens[i].value
                }
                return selector
            }
            function addCombinator(matcher, combinator, base) {
                var dir = combinator.dir,
                    checkNonElements = base && dir === "parentNode",
                    doneName = done++;
                return combinator.first ? function(elem, context, xml) {
                    while ((elem = elem[dir])) {
                        if (elem.nodeType === 1 || checkNonElements) {
                            return matcher(elem, context, xml)
                        }
                    }
                } : function(elem, context, xml) {
                    var oldCache,
                        outerCache,
                        newCache = [dirruns, doneName];
                    if (xml) {
                        while ((elem = elem[dir])) {
                            if (elem.nodeType === 1 || checkNonElements) {
                                if (matcher(elem, context, xml)) {
                                    return !0
                                }
                            }
                        }
                    } else {
                        while ((elem = elem[dir])) {
                            if (elem.nodeType === 1 || checkNonElements) {
                                outerCache = elem[expando] || (elem[expando] = {});
                                if ((oldCache = outerCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                                    return ( newCache[2] = oldCache[2])
                                } else {
                                    outerCache[dir] = newCache;
                                    if ((newCache[2] = matcher(elem, context, xml))) {
                                        return !0
                                    }
                                }
                            }
                        }
                    }
                }
            }
            function elementMatcher(matchers) {
                return matchers.length > 1 ? function(elem, context, xml) {
                    var i = matchers.length;
                    while (i--) {
                        if (!matchers[i](elem, context, xml)) {
                            return !1
                        }
                    }
                    return !0
                } : matchers[0]
            }
            function multipleContexts(selector, contexts, results) {
                var i = 0,
                    len = contexts.length;
                for (; i < len; i++) {
                    Sizzle(selector, contexts[i], results)
                }
                return results
            }
            function condense(unmatched, map, filter, context, xml) {
                var elem,
                    newUnmatched = [],
                    i = 0,
                    len = unmatched.length,
                    mapped = map != null;
                for (; i < len; i++) {
                    if ((elem = unmatched[i])) {
                        if (!filter || filter(elem, context, xml)) {
                            newUnmatched.push(elem);
                            if (mapped) {
                                map.push(i)
                            }
                        }
                    }
                }
                return newUnmatched
            }
            function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
                if (postFilter && !postFilter[expando]) {
                    postFilter = setMatcher(postFilter)
                }
                if (postFinder && !postFinder[expando]) {
                    postFinder = setMatcher(postFinder, postSelector)
                }
                return markFunction(function(seed, results, context, xml) {
                    var temp,
                        i,
                        elem,
                        preMap = [],
                        postMap = [],
                        preexisting = results.length,
                        elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
                        matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
                        matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                    if (matcher) {
                        matcher(matcherIn, matcherOut, context, xml)
                    }
                    if (postFilter) {
                        temp = condense(matcherOut, postMap);
                        postFilter(temp, [], context, xml);
                        i = temp.length;
                        while (i--) {
                            if ((elem = temp[i])) {
                                matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem)
                            }
                        }
                    }
                    if (seed) {
                        if (postFinder || preFilter) {
                            if (postFinder) {
                                temp = [];
                                i = matcherOut.length;
                                while (i--) {
                                    if ((elem = matcherOut[i])) {
                                        temp.push((matcherIn[i] = elem))
                                    }
                                }
                                postFinder(null, (matcherOut = []), temp, xml)
                            }
                            i = matcherOut.length;
                            while (i--) {
                                if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
                                    seed[temp] = !(results[temp] = elem)
                                }
                            }
                        }
                    } else {
                        matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
                        if (postFinder) {
                            postFinder(null, results, matcherOut, xml)
                        } else {
                            push.apply(results, matcherOut)
                        }
                    }
                })
            }
            function matcherFromTokens(tokens) {
                var checkContext,
                    matcher,
                    j,
                    len = tokens.length,
                    leadingRelative = Expr.relative[tokens[0].type],
                    implicitRelative = leadingRelative || Expr.relative[" "],
                    i = leadingRelative ? 1 : 0,
                    matchContext = addCombinator(function(elem) {
                        return elem === checkContext
                    }, implicitRelative, !0),
                    matchAnyContext = addCombinator(function(elem) {
                        return indexOf(checkContext, elem) > -1
                    }, implicitRelative, !0),
                    matchers = [function(elem, context, xml) {
                        var ret = (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
                        checkContext = null;
                        return ret
                    }];
                for (; i < len; i++) {
                    if ((matcher = Expr.relative[tokens[i].type])) {
                        matchers = [addCombinator(elementMatcher(matchers), matcher)]
                    } else {
                        matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
                        if (matcher[expando]) {
                            j = ++i;
                            for (; j < len; j++) {
                                if (Expr.relative[tokens[j].type]) {
                                    break
                                }
                            }
                            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                                value: tokens[i - 2].type === " " ? "*" : ""
                            })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && toSelector(tokens))
                        }
                        matchers.push(matcher)
                    }
                }
                return elementMatcher(matchers)
            }
            function matcherFromGroupMatchers(elementMatchers, setMatchers) {
                var bySet = setMatchers.length > 0,
                    byElement = elementMatchers.length > 0,
                    superMatcher = function(seed, context, xml, results, outermost) {
                        var elem,
                            j,
                            matcher,
                            matchedCount = 0,
                            i = "0",
                            unmatched = seed && [],
                            setMatched = [],
                            contextBackup = outermostContext,
                            elems = seed || byElement && Expr.find.TAG("*", outermost),
                            dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                            len = elems.length;
                        if (outermost) {
                            outermostContext = context !== document && context
                        }
                        for (; i !== len && (elem = elems[i]) != null; i++) {
                            if (byElement && elem) {
                                j = 0;
                                while ((matcher = elementMatchers[j++])) {
                                    if (matcher(elem, context, xml)) {
                                        results.push(elem);
                                        break
                                    }
                                }
                                if (outermost) {
                                    dirruns = dirrunsUnique
                                }
                            }
                            if (bySet) {
                                if ((elem = !matcher && elem)) {
                                    matchedCount--
                                }
                                if (seed) {
                                    unmatched.push(elem)
                                }
                            }
                        }
                        matchedCount += i;
                        if (bySet && i !== matchedCount) {
                            j = 0;
                            while ((matcher = setMatchers[j++])) {
                                matcher(unmatched, setMatched, context, xml)
                            }
                            if (seed) {
                                if (matchedCount > 0) {
                                    while (i--) {
                                        if (!(unmatched[i] || setMatched[i])) {
                                            setMatched[i] = pop.call(results)
                                        }
                                    }
                                }
                                setMatched = condense(setMatched)
                            }
                            push.apply(results, setMatched);
                            if (outermost && !seed && setMatched.length > 0 && (matchedCount + setMatchers.length) > 1) {
                                Sizzle.uniqueSort(results)
                            }
                        }
                        if (outermost) {
                            dirruns = dirrunsUnique;
                            outermostContext = contextBackup
                        }
                        return unmatched
                    };
                return bySet ? markFunction(superMatcher) : superMatcher
            }
            compile = Sizzle.compile = function(selector, match) {
                var i,
                    setMatchers = [],
                    elementMatchers = [],
                    cached = compilerCache[selector + " "];
                if (!cached) {
                    if (!match) {
                        match = tokenize(selector)
                    }
                    i = match.length;
                    while (i--) {
                        cached = matcherFromTokens(match[i]);
                        if (cached[expando]) {
                            setMatchers.push(cached)
                        } else {
                            elementMatchers.push(cached)
                        }
                    }
                    cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
                    cached.selector = selector
                }
                return cached
            };
            select = Sizzle.select = function(selector, context, results, seed) {
                var i,
                    tokens,
                    token,
                    type,
                    find,
                    compiled = typeof selector === "function" && selector,
                    match = !seed && tokenize((selector = compiled.selector || selector));
                results = results || [];
                if (match.length === 1) {
                    tokens = match[0] = match[0].slice(0);
                    if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
                        context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0];
                        if (!context) {
                            return results
                        } else if (compiled) {
                            context = context.parentNode
                        }
                        selector = selector.slice(tokens.shift().value.length)
                    }
                    i = matchExpr.needsContext.test(selector) ? 0 : tokens.length;
                    while (i--) {
                        token = tokens[i];
                        if (Expr.relative[(type = token.type)]) {
                            break
                        }
                        if ((find = Expr.find[type])) {
                            if ((seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
                                tokens.splice(i, 1);
                                selector = seed.length && toSelector(tokens);
                                if (!selector) {
                                    push.apply(results, seed);
                                    return results
                                }
                                break
                            }
                        }
                    }
                }
                (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, rsibling.test(selector) && testContext(context.parentNode) || context);
                return results
            };
            support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
            support.detectDuplicates = !!hasDuplicate;
            setDocument();
            support.sortDetached = assert(function(div1) {
                return div1.compareDocumentPosition(document.createElement("div")) & 1
            });
            if (!assert(function(div) {
                div.innerHTML = "<a href='#'></a>";
                return div.firstChild.getAttribute("href") === "#"
            })) {
                addHandle("type|href|height|width", function(elem, name, isXML) {
                    if (!isXML) {
                        return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2)
                    }
                })
            }
            if (!support.attributes || !assert(function(div) {
                div.innerHTML = "<input/>";
                div.firstChild.setAttribute("value", "");
                return div.firstChild.getAttribute("value") === ""
            })) {
                addHandle("value", function(elem, name, isXML) {
                    if (!isXML && elem.nodeName.toLowerCase() === "input") {
                        return elem.defaultValue
                    }
                })
            }
            if (!assert(function(div) {
                return div.getAttribute("disabled") == null
            })) {
                addHandle(booleans, function(elem, name, isXML) {
                    var val;
                    if (!isXML) {
                        return elem[name] === !0 ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null
                    }
                })
            }
            return Sizzle
        })(window);
        jQuery.find = Sizzle;
        jQuery.expr = Sizzle.selectors;
        jQuery.expr[":"] = jQuery.expr.pseudos;
        jQuery.unique = Sizzle.uniqueSort;
        jQuery.text = Sizzle.getText;
        jQuery.isXMLDoc = Sizzle.isXML;
        jQuery.contains = Sizzle.contains;
        var rneedsContext = jQuery.expr.match.needsContext;
        var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);
        var risSimple = /^.[^:#\[\.,]*$/;
        function winnow(elements, qualifier, not) {
            if (jQuery.isFunction(qualifier)) {
                return jQuery.grep(elements, function(elem, i) {
                    return !!qualifier.call(elem, i, elem) !== not
                })
            }
            if (qualifier.nodeType) {
                return jQuery.grep(elements, function(elem) {
                    return (elem === qualifier) !== not
                })
            }
            if (typeof qualifier === "string") {
                if (risSimple.test(qualifier)) {
                    return jQuery.filter(qualifier, elements, not)
                }
                qualifier = jQuery.filter(qualifier, elements)
            }
            return jQuery.grep(elements, function(elem) {
                return (indexOf.call(qualifier, elem) >= 0) !== not
            })
        }
        jQuery.filter = function(expr, elems, not) {
            var elem = elems[0];
            if (not) {
                expr = ":not(" + expr + ")"
            }
            return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
                return elem.nodeType === 1
            }))
        };
        jQuery.fn.extend({
            find: function(selector) {
                var i,
                    len = this.length,
                    ret = [],
                    self = this;
                if (typeof selector !== "string") {
                    return this.pushStack(jQuery(selector).filter(function() {
                        for (i = 0; i < len; i++) {
                            if (jQuery.contains(self[i], this)) {
                                return !0
                            }
                        }
                    }))
                }
                for (i = 0; i < len; i++) {
                    jQuery.find(selector, self[i], ret)
                }
                ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
                ret.selector = this.selector ? this.selector + " " + selector : selector;
                return ret
            },
            filter: function(selector) {
                return this.pushStack(winnow(this, selector || [], !1))
            },
            not: function(selector) {
                return this.pushStack(winnow(this, selector || [], !0))
            },
            is: function(selector) {
                return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], !1).length
            }
        });
        var rootjQuery,
            rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
            init = jQuery.fn.init = function(selector, context) {
                var match,
                    elem;
                if (!selector) {
                    return this
                }
                if (typeof selector === "string") {
                    if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
                        match = [null, selector, null]
                    } else {
                        match = rquickExpr.exec(selector)
                    }
                    if (match && (match[1] || !context)) {
                        if (match[1]) {
                            context = context instanceof jQuery ? context[0] : context;
                            jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, !0));
                            if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                                for (match in context) {
                                    if (jQuery.isFunction(this[match])) {
                                        this[match](context[match])
                                    } else {
                                        this.attr(match, context[match])
                                    }
                                }
                            }
                            return this
                        } else {
                            elem = document.getElementById(match[2]);
                            if (elem && elem.parentNode) {
                                this.length = 1;
                                this[0] = elem
                            }
                            this.context = document;
                            this.selector = selector;
                            return this
                        }
                    } else if (!context || context.jquery) {
                        return (context || rootjQuery).find(selector)
                    } else {
                        return this.constructor(context).find(selector)
                    }
                } else if (selector.nodeType) {
                    this.context = this[0] = selector;
                    this.length = 1;
                    return this
                } else if (jQuery.isFunction(selector)) {
                    return typeof rootjQuery.ready !== "undefined" ? rootjQuery.ready(selector) : selector(jQuery)
                }
                if (selector.selector !== undefined) {
                    this.selector = selector.selector;
                    this.context = selector.context
                }
                return jQuery.makeArray(selector, this)
            };
        init.prototype = jQuery.fn;
        rootjQuery = jQuery(document);
        var rparentsprev = /^(?:parents|prev(?:Until|All))/,
            guaranteedUnique = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        jQuery.extend({
            dir: function(elem, dir, until) {
                var matched = [],
                    truncate = until !== undefined;
                while ((elem = elem[dir]) && elem.nodeType !== 9) {
                    if (elem.nodeType === 1) {
                        if (truncate && jQuery(elem).is(until)) {
                            break
                        }
                        matched.push(elem)
                    }
                }
                return matched
            },
            sibling: function(n, elem) {
                var matched = [];
                for (; n; n = n.nextSibling) {
                    if (n.nodeType === 1 && n !== elem) {
                        matched.push(n)
                    }
                }
                return matched
            }
        });
        jQuery.fn.extend({
            has: function(target) {
                var targets = jQuery(target, this),
                    l = targets.length;
                return this.filter(function() {
                    var i = 0;
                    for (; i < l; i++) {
                        if (jQuery.contains(this, targets[i])) {
                            return !0
                        }
                    }
                })
            },
            closest: function(selectors, context) {
                var cur,
                    i = 0,
                    l = this.length,
                    matched = [],
                    pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
                for (; i < l; i++) {
                    for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                        if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
                            matched.push(cur);
                            break
                        }
                    }
                }
                return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched)
            },
            index: function(elem) {
                if (!elem) {
                    return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1
                }
                if (typeof elem === "string") {
                    return indexOf.call(jQuery(elem), this[0])
                }
                return indexOf.call(this, elem.jquery ? elem[0] : elem)
            },
            add: function(selector, context) {
                return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(selector, context))))
            },
            addBack: function(selector) {
                return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector))
            }
        });
        function sibling(cur, dir) {
            while ((cur = cur[dir]) && cur.nodeType !== 1) {}
            return cur
        }
        jQuery.each({
            parent: function(elem) {
                var parent = elem.parentNode;
                return parent && parent.nodeType !== 11 ? parent : null
            },
            parents: function(elem) {
                return jQuery.dir(elem, "parentNode")
            },
            parentsUntil: function(elem, i, until) {
                return jQuery.dir(elem, "parentNode", until)
            },
            next: function(elem) {
                return sibling(elem, "nextSibling")
            },
            prev: function(elem) {
                return sibling(elem, "previousSibling")
            },
            nextAll: function(elem) {
                return jQuery.dir(elem, "nextSibling")
            },
            prevAll: function(elem) {
                return jQuery.dir(elem, "previousSibling")
            },
            nextUntil: function(elem, i, until) {
                return jQuery.dir(elem, "nextSibling", until)
            },
            prevUntil: function(elem, i, until) {
                return jQuery.dir(elem, "previousSibling", until)
            },
            siblings: function(elem) {
                return jQuery.sibling((elem.parentNode || {}).firstChild, elem)
            },
            children: function(elem) {
                return jQuery.sibling(elem.firstChild)
            },
            contents: function(elem) {
                return elem.contentDocument || jQuery.merge([], elem.childNodes)
            }
        }, function(name, fn) {
            jQuery.fn[name] = function(until, selector) {
                var matched = jQuery.map(this, fn, until);
                if (name.slice(-5) !== "Until") {
                    selector = until
                }
                if (selector && typeof selector === "string") {
                    matched = jQuery.filter(selector, matched)
                }
                if (this.length > 1) {
                    if (!guaranteedUnique[name]) {
                        jQuery.unique(matched)
                    }
                    if (rparentsprev.test(name)) {
                        matched.reverse()
                    }
                }
                return this.pushStack(matched)
            }
        });
        var rnotwhite = (/\S+/g);
        var optionsCache = {};
        function createOptions(options) {
            var object = optionsCache[options] = {};
            jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
                object[flag] = !0
            });
            return object
        }
        jQuery.Callbacks = function(options) {
            options = typeof options === "string" ? (optionsCache[options] || createOptions(options)) : jQuery.extend({}, options);
            var memory,
                fired,
                firing,
                firingStart,
                firingLength,
                firingIndex,
                list = [],
                stack = !options.once && [],
                fire = function(data) {
                    memory = options.memory && data;
                    fired = !0;
                    firingIndex = firingStart || 0;
                    firingStart = 0;
                    firingLength = list.length;
                    firing = !0;
                    for (; list && firingIndex < firingLength; firingIndex++) {
                        if (list[firingIndex].apply(data[0], data[1]) === !1 && options.stopOnFalse) {
                            memory = !1;
                            break
                        }
                    }
                    firing = !1;
                    if (list) {
                        if (stack) {
                            if (stack.length) {
                                fire(stack.shift())
                            }
                        } else if (memory) {
                            list = []
                        } else {
                            self.disable()
                        }
                    }
                },
                self = {
                    add: function() {
                        if (list) {
                            var start = list.length;
                            (function add(args) {
                                jQuery.each(args, function(_, arg) {
                                    var type = jQuery.type(arg);
                                    if (type === "function") {
                                        if (!options.unique || !self.has(arg)) {
                                            list.push(arg)
                                        }
                                    } else if (arg && arg.length && type !== "string") {
                                        add(arg)
                                    }
                                })
                            })(arguments);
                            if (firing) {
                                firingLength = list.length
                            } else if (memory) {
                                firingStart = start;
                                fire(memory)
                            }
                        }
                        return this
                    },
                    remove: function() {
                        if (list) {
                            jQuery.each(arguments, function(_, arg) {
                                var index;
                                while ((index = jQuery.inArray(arg, list, index)) > -1) {
                                    list.splice(index, 1);
                                    if (firing) {
                                        if (index <= firingLength) {
                                            firingLength--
                                        }
                                        if (index <= firingIndex) {
                                            firingIndex--
                                        }
                                    }
                                }
                            })
                        }
                        return this
                    },
                    has: function(fn) {
                        return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length)
                    },
                    empty: function() {
                        list = [];
                        firingLength = 0;
                        return this
                    },
                    disable: function() {
                        list = stack = memory = undefined;
                        return this
                    },
                    disabled: function() {
                        return !list
                    },
                    lock: function() {
                        stack = undefined;
                        if (!memory) {
                            self.disable()
                        }
                        return this
                    },
                    locked: function() {
                        return !stack
                    },
                    fireWith: function(context, args) {
                        if (list && (!fired || stack)) {
                            args = args || [];
                            args = [context, args.slice ? args.slice() : args];
                            if (firing) {
                                stack.push(args)
                            } else {
                                fire(args)
                            }
                        }
                        return this
                    },
                    fire: function() {
                        self.fireWith(this, arguments);
                        return this
                    },
                    fired: function() {
                        return !!fired
                    }
                };
            return self
        };
        jQuery.extend({
            Deferred: function(func) {
                var tuples = [["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]],
                    state = "pending",
                    promise = {
                        state: function() {
                            return state
                        },
                        always: function() {
                            deferred.done(arguments).fail(arguments);
                            return this
                        },
                        then: function() {
                            var fns = arguments;
                            return jQuery.Deferred(function(newDefer) {
                                jQuery.each(tuples, function(i, tuple) {
                                    var fn = jQuery.isFunction(fns[i]) && fns[i];
                                    deferred[tuple[1]](function() {
                                        var returned = fn && fn.apply(this, arguments);
                                        if (returned && jQuery.isFunction(returned.promise)) {
                                            returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify)
                                        } else {
                                            newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments)
                                        }
                                    })
                                });
                                fns = null
                            }).promise()
                        },
                        promise: function(obj) {
                            return obj != null ? jQuery.extend(obj, promise) : promise
                        }
                    },
                    deferred = {};
                promise.pipe = promise.then;
                jQuery.each(tuples, function(i, tuple) {
                    var list = tuple[2],
                        stateString = tuple[3];
                    promise[tuple[1]] = list.add;
                    if (stateString) {
                        list.add(function() {
                            state = stateString
                        }, tuples[i ^ 1][2].disable, tuples[2][2].lock)
                    }
                    deferred[tuple[0]] = function() {
                        deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
                        return this
                    };
                    deferred[tuple[0] + "With"] = list.fireWith
                });
                promise.promise(deferred);
                if (func) {
                    func.call(deferred, deferred)
                }
                return deferred
            },
            when: function(subordinate) {
                var i = 0,
                    resolveValues = slice.call(arguments),
                    length = resolveValues.length,
                    remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0,
                    deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
                    updateFunc = function(i, contexts, values) {
                        return function(value) {
                            contexts[i] = this;
                            values[i] = arguments.length > 1 ? slice.call(arguments) : value;
                            if (values === progressValues) {
                                deferred.notifyWith(contexts, values)
                            } else if (!(--remaining)) {
                                deferred.resolveWith(contexts, values)
                            }
                        }
                    },
                    progressValues,
                    progressContexts,
                    resolveContexts;
                if (length > 1) {
                    progressValues = new Array(length);
                    progressContexts = new Array(length);
                    resolveContexts = new Array(length);
                    for (; i < length; i++) {
                        if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
                            resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues))
                        } else {
                            --remaining
                        }
                    }
                }
                if (!remaining) {
                    deferred.resolveWith(resolveContexts, resolveValues)
                }
                return deferred.promise()
            }
        });
        var readyList;
        jQuery.fn.ready = function(fn) {
            jQuery.ready.promise().done(fn);
            return this
        };
        jQuery.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function(hold) {
                if (hold) {
                    jQuery.readyWait++
                } else {
                    jQuery.ready(!0)
                }
            },
            ready: function(wait) {
                if (wait === !0 ? --jQuery.readyWait : jQuery.isReady) {
                    return
                }
                jQuery.isReady = !0;
                if (wait !== !0 && --jQuery.readyWait > 0) {
                    return
                }
                readyList.resolveWith(document, [jQuery]);
                if (jQuery.fn.triggerHandler) {
                    jQuery(document).triggerHandler("ready");
                    jQuery(document).off("ready")
                }
            }
        });
        function completed() {
            document.removeEventListener("DOMContentLoaded", completed, !1);
            window.removeEventListener("load", completed, !1);
            jQuery.ready()
        }
        jQuery.ready.promise = function(obj) {
            if (!readyList) {
                readyList = jQuery.Deferred();
                if (document.readyState === "complete") {
                    setTimeout(jQuery.ready)
                } else {
                    document.addEventListener("DOMContentLoaded", completed, !1);
                    window.addEventListener("load", completed, !1)
                }
            }
            return readyList.promise(obj)
        };
        jQuery.ready.promise();
        var access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
            var i = 0,
                len = elems.length,
                bulk = key == null;
            if (jQuery.type(key) === "object") {
                chainable = !0;
                for (i in key) {
                    jQuery.access(elems, fn, i, key[i], !0, emptyGet, raw)
                }
            } else if (value !== undefined) {
                chainable = !0;
                if (!jQuery.isFunction(value)) {
                    raw = !0
                }
                if (bulk) {
                    if (raw) {
                        fn.call(elems, value);
                        fn = null
                    } else {
                        bulk = fn;
                        fn = function(elem, key, value) {
                            return bulk.call(jQuery(elem), value)
                        }
                    }
                }
                if (fn) {
                    for (; i < len; i++) {
                        fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)))
                    }
                }
            }
            return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet
        };
        jQuery.acceptData = function(owner) {
            return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType)
        };
        function Data() {
            Object.defineProperty(this.cache = {}, 0, {
                get: function() {
                    return {}
                }
            });
            this.expando = jQuery.expando + Data.uid++
        }
        Data.uid = 1;
        Data.accepts = jQuery.acceptData;
        Data.prototype = {
            key: function(owner) {
                if (!Data.accepts(owner)) {
                    return 0
                }
                var descriptor = {},
                    unlock = owner[this.expando];
                if (!unlock) {
                    unlock = Data.uid++;
                    try {
                        descriptor[this.expando] = {
                            value: unlock
                        };
                        Object.defineProperties(owner, descriptor)
                    } catch (e) {
                        descriptor[this.expando] = unlock;
                        jQuery.extend(owner, descriptor)
                    }
                }
                if (!this.cache[unlock]) {
                    this.cache[unlock] = {}
                }
                return unlock
            },
            set: function(owner, data, value) {
                var prop,
                    unlock = this.key(owner),
                    cache = this.cache[unlock];
                if (typeof data === "string") {
                    cache[data] = value
                } else {
                    if (jQuery.isEmptyObject(cache)) {
                        jQuery.extend(this.cache[unlock], data)
                    } else {
                        for (prop in data) {
                            cache[prop] = data[prop]
                        }
                    }
                }
                return cache
            },
            get: function(owner, key) {
                var cache = this.cache[this.key(owner)];
                return key === undefined ? cache : cache[key]
            },
            access: function(owner, key, value) {
                var stored;
                if (key === undefined || ((key && typeof key === "string") && value === undefined)) {
                    stored = this.get(owner, key);
                    return stored !== undefined ? stored : this.get(owner, jQuery.camelCase(key))
                }
                this.set(owner, key, value);
                return value !== undefined ? value : key
            },
            remove: function(owner, key) {
                var i,
                    name,
                    camel,
                    unlock = this.key(owner),
                    cache = this.cache[unlock];
                if (key === undefined) {
                    this.cache[unlock] = {}
                } else {
                    if (jQuery.isArray(key)) {
                        name = key.concat(key.map(jQuery.camelCase))
                    } else {
                        camel = jQuery.camelCase(key);
                        if (key in cache) {
                            name = [key, camel]
                        } else {
                            name = camel;
                            name = name in cache ? [name] : (name.match(rnotwhite) || [])
                        }
                    }
                    i = name.length;
                    while (i--) {
                        delete cache[name[i]]
                    }
                }
            },
            hasData: function(owner) {
                return !jQuery.isEmptyObject(this.cache[owner[this.expando]] || {})
            },
            discard: function(owner) {
                if (owner[this.expando]) {
                    delete this.cache[owner[this.expando]]
                }
            }
        };
        var data_priv = new Data();
        var data_user = new Data();
        var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            rmultiDash = /([A-Z])/g;
        function dataAttr(elem, key, data) {
            var name;
            if (data === undefined && elem.nodeType === 1) {
                name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
                data = elem.getAttribute(name);
                if (typeof data === "string") {
                    try {
                        data = data === "true" ? !0 : data === "false" ? !1 : data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data
                    } catch (e) {}
                    data_user.set(elem, key, data)
                } else {
                    data = undefined
                }
            }
            return data
        }
        jQuery.extend({
            hasData: function(elem) {
                return data_user.hasData(elem) || data_priv.hasData(elem)
            },
            data: function(elem, name, data) {
                return data_user.access(elem, name, data)
            },
            removeData: function(elem, name) {
                data_user.remove(elem, name)
            },
            _data: function(elem, name, data) {
                return data_priv.access(elem, name, data)
            },
            _removeData: function(elem, name) {
                data_priv.remove(elem, name)
            }
        });
        jQuery.fn.extend({
            data: function(key, value) {
                var i,
                    name,
                    data,
                    elem = this[0],
                    attrs = elem && elem.attributes;
                if (key === undefined) {
                    if (this.length) {
                        data = data_user.get(elem);
                        if (elem.nodeType === 1 && !data_priv.get(elem, "hasDataAttrs")) {
                            i = attrs.length;
                            while (i--) {
                                if (attrs[i]) {
                                    name = attrs[i].name;
                                    if (name.indexOf("data-") === 0) {
                                        name = jQuery.camelCase(name.slice(5));
                                        dataAttr(elem, name, data[name])
                                    }
                                }
                            }
                            data_priv.set(elem, "hasDataAttrs", !0)
                        }
                    }
                    return data
                }
                if (typeof key === "object") {
                    return this.each(function() {
                        data_user.set(this, key)
                    })
                }
                return access(this, function(value) {
                    var data,
                        camelKey = jQuery.camelCase(key);
                    if (elem && value === undefined) {
                        data = data_user.get(elem, key);
                        if (data !== undefined) {
                            return data
                        }
                        data = data_user.get(elem, camelKey);
                        if (data !== undefined) {
                            return data
                        }
                        data = dataAttr(elem, camelKey, undefined);
                        if (data !== undefined) {
                            return data
                        }
                        return
                    }
                    this.each(function() {
                        var data = data_user.get(this, camelKey);
                        data_user.set(this, camelKey, value);
                        if (key.indexOf("-") !== -1 && data !== undefined) {
                            data_user.set(this, key, value)
                        }
                    })
                }, null, value, arguments.length > 1, null, !0)
            },
            removeData: function(key) {
                return this.each(function() {
                    data_user.remove(this, key)
                })
            }
        });
        jQuery.extend({
            queue: function(elem, type, data) {
                var queue;
                if (elem) {
                    type = (type || "fx") + "queue";
                    queue = data_priv.get(elem, type);
                    if (data) {
                        if (!queue || jQuery.isArray(data)) {
                            queue = data_priv.access(elem, type, jQuery.makeArray(data))
                        } else {
                            queue.push(data)
                        }
                    }
                    return queue || []
                }
            },
            dequeue: function(elem, type) {
                type = type || "fx";
                var queue = jQuery.queue(elem, type),
                    startLength = queue.length,
                    fn = queue.shift(),
                    hooks = jQuery._queueHooks(elem, type),
                    next = function() {
                        jQuery.dequeue(elem, type)
                    };
                if (fn === "inprogress") {
                    fn = queue.shift();
                    startLength--
                }
                if (fn) {
                    if (type === "fx") {
                        queue.unshift("inprogress")
                    }
                    delete hooks.stop;
                    fn.call(elem, next, hooks)
                }
                if (!startLength && hooks) {
                    hooks.empty.fire()
                }
            },
            _queueHooks: function(elem, type) {
                var key = type + "queueHooks";
                return data_priv.get(elem, key) || data_priv.access(elem, key, {
                        empty: jQuery.Callbacks("once memory").add(function() {
                            data_priv.remove(elem, [type + "queue", key])
                        })
                    })
            }
        });
        jQuery.fn.extend({
            queue: function(type, data) {
                var setter = 2;
                if (typeof type !== "string") {
                    data = type;
                    type = "fx";
                    setter--
                }
                if (arguments.length < setter) {
                    return jQuery.queue(this[0], type)
                }
                return data === undefined ? this : this.each(function() {
                    var queue = jQuery.queue(this, type, data);
                    jQuery._queueHooks(this, type);
                    if (type === "fx" && queue[0] !== "inprogress") {
                        jQuery.dequeue(this, type)
                    }
                })
            },
            dequeue: function(type) {
                return this.each(function() {
                    jQuery.dequeue(this, type)
                })
            },
            clearQueue: function(type) {
                return this.queue(type || "fx", [])
            },
            promise: function(type, obj) {
                var tmp,
                    count = 1,
                    defer = jQuery.Deferred(),
                    elements = this,
                    i = this.length,
                    resolve = function() {
                        if (!(--count)) {
                            defer.resolveWith(elements, [elements])
                        }
                    };
                if (typeof type !== "string") {
                    obj = type;
                    type = undefined
                }
                type = type || "fx";
                while (i--) {
                    tmp = data_priv.get(elements[i], type + "queueHooks");
                    if (tmp && tmp.empty) {
                        count++;
                        tmp.empty.add(resolve)
                    }
                }
                resolve();
                return defer.promise(obj)
            }
        });
        var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
        var cssExpand = ["Top", "Right", "Bottom", "Left"];
        var isHidden = function(elem, el) {
            elem = el || elem;
            return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem)
        };
        var rcheckableType = (/^(?:checkbox|radio)$/i);
        (function() {
            var fragment = document.createDocumentFragment(),
                div = fragment.appendChild(document.createElement("div")),
                input = document.createElement("input");
            input.setAttribute("type", "radio");
            input.setAttribute("checked", "checked");
            input.setAttribute("name", "t");
            div.appendChild(input);
            support.checkClone = div.cloneNode(!0).cloneNode(!0).lastChild.checked;
            div.innerHTML = "<textarea>x</textarea>";
            support.noCloneChecked = !!div.cloneNode(!0).lastChild.defaultValue
        })();
        var strundefined = typeof undefined;
        support.focusinBubbles = "onfocusin" in window;
        var rkeyEvent = /^key/,
            rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
            rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
            rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
        function returnTrue() {
            return !0
        }
        function returnFalse() {
            return !1
        }
        function safeActiveElement() {
            try {
                return document.activeElement
            } catch (err) {}
        }
        jQuery.event = {
            global: {},
            add: function(elem, types, handler, data, selector) {
                var handleObjIn,
                    eventHandle,
                    tmp,
                    events,
                    t,
                    handleObj,
                    special,
                    handlers,
                    type,
                    namespaces,
                    origType,
                    elemData = data_priv.get(elem);
                if (!elemData) {
                    return
                }
                if (handler.handler) {
                    handleObjIn = handler;
                    handler = handleObjIn.handler;
                    selector = handleObjIn.selector
                }
                if (!handler.guid) {
                    handler.guid = jQuery.guid++
                }
                if (!(events = elemData.events)) {
                    events = elemData.events = {}
                }
                if (!(eventHandle = elemData.handle)) {
                    eventHandle = elemData.handle = function(e) {
                        return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined
                    }
                }
                types = (types || "").match(rnotwhite) || [""];
                t = types.length;
                while (t--) {
                    tmp = rtypenamespace.exec(types[t]) || [];
                    type = origType = tmp[1];
                    namespaces = (tmp[2] || "").split(".").sort();
                    if (!type) {
                        continue
                    }
                    special = jQuery.event.special[type] || {};
                    type = (selector ? special.delegateType : special.bindType) || type;
                    special = jQuery.event.special[type] || {};
                    handleObj = jQuery.extend({
                        type: type,
                        origType: origType,
                        data: data,
                        handler: handler,
                        guid: handler.guid,
                        selector: selector,
                        needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                        namespace: namespaces.join(".")
                    }, handleObjIn);
                    if (!(handlers = events[type])) {
                        handlers = events[type] = [];
                        handlers.delegateCount = 0;
                        if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === !1) {
                            if (elem.addEventListener) {
                                elem.addEventListener(type, eventHandle, !1)
                            }
                        }
                    }
                    if (special.add) {
                        special.add.call(elem, handleObj);
                        if (!handleObj.handler.guid) {
                            handleObj.handler.guid = handler.guid
                        }
                    }
                    if (selector) {
                        handlers.splice(handlers.delegateCount++, 0, handleObj)
                    } else {
                        handlers.push(handleObj)
                    }
                    jQuery.event.global[type] = !0
                }
            },
            remove: function(elem, types, handler, selector, mappedTypes) {
                var j,
                    origCount,
                    tmp,
                    events,
                    t,
                    handleObj,
                    special,
                    handlers,
                    type,
                    namespaces,
                    origType,
                    elemData = data_priv.hasData(elem) && data_priv.get(elem);
                if (!elemData || !(events = elemData.events)) {
                    return
                }
                types = (types || "").match(rnotwhite) || [""];
                t = types.length;
                while (t--) {
                    tmp = rtypenamespace.exec(types[t]) || [];
                    type = origType = tmp[1];
                    namespaces = (tmp[2] || "").split(".").sort();
                    if (!type) {
                        for (type in events) {
                            jQuery.event.remove(elem, type + types[t], handler, selector, !0)
                        }
                        continue
                    }
                    special = jQuery.event.special[type] || {};
                    type = (selector ? special.delegateType : special.bindType) || type;
                    handlers = events[type] || [];
                    tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
                    origCount = j = handlers.length;
                    while (j--) {
                        handleObj = handlers[j];
                        if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                            handlers.splice(j, 1);
                            if (handleObj.selector) {
                                handlers.delegateCount--
                            }
                            if (special.remove) {
                                special.remove.call(elem, handleObj)
                            }
                        }
                    }
                    if (origCount && !handlers.length) {
                        if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === !1) {
                            jQuery.removeEvent(elem, type, elemData.handle)
                        }
                        delete events[type]
                    }
                }
                if (jQuery.isEmptyObject(events)) {
                    delete elemData.handle;
                    data_priv.remove(elem, "events")
                }
            },
            trigger: function(event, data, elem, onlyHandlers) {
                var i,
                    cur,
                    tmp,
                    bubbleType,
                    ontype,
                    handle,
                    special,
                    eventPath = [elem || document],
                    type = hasOwn.call(event, "type") ? event.type : event,
                    namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
                cur = tmp = elem = elem || document;
                if (elem.nodeType === 3 || elem.nodeType === 8) {
                    return
                }
                if (rfocusMorph.test(type + jQuery.event.triggered)) {
                    return
                }
                if (type.indexOf(".") >= 0) {
                    namespaces = type.split(".");
                    type = namespaces.shift();
                    namespaces.sort()
                }
                ontype = type.indexOf(":") < 0 && "on" + type;
                event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
                event.isTrigger = onlyHandlers ? 2 : 3;
                event.namespace = namespaces.join(".");
                event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                event.result = undefined;
                if (!event.target) {
                    event.target = elem
                }
                data = data == null ? [event] : jQuery.makeArray(data, [event]);
                special = jQuery.event.special[type] || {};
                if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === !1) {
                    return
                }
                if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                    bubbleType = special.delegateType || type;
                    if (!rfocusMorph.test(bubbleType + type)) {
                        cur = cur.parentNode
                    }
                    for (; cur; cur = cur.parentNode) {
                        eventPath.push(cur);
                        tmp = cur
                    }
                    if (tmp === (elem.ownerDocument || document)) {
                        eventPath.push(tmp.defaultView || tmp.parentWindow || window)
                    }
                }
                i = 0;
                while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
                    event.type = i > 1 ? bubbleType : special.bindType || type;
                    handle = (data_priv.get(cur, "events") || {})[event.type] && data_priv.get(cur, "handle");
                    if (handle) {
                        handle.apply(cur, data)
                    }
                    handle = ontype && cur[ontype];
                    if (handle && handle.apply && jQuery.acceptData(cur)) {
                        event.result = handle.apply(cur, data);
                        if (event.result === !1) {
                            event.preventDefault()
                        }
                    }
                }
                event.type = type;
                if (!onlyHandlers && !event.isDefaultPrevented()) {
                    if ((!special._default || special._default.apply(eventPath.pop(), data) === !1) && jQuery.acceptData(elem)) {
                        if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {
                            tmp = elem[ontype];
                            if (tmp) {
                                elem[ontype] = null
                            }
                            jQuery.event.triggered = type;
                            elem[type]();
                            jQuery.event.triggered = undefined;
                            if (tmp) {
                                elem[ontype] = tmp
                            }
                        }
                    }
                }
                return event.result
            },
            dispatch: function(event) {
                event = jQuery.event.fix(event);
                var i,
                    j,
                    ret,
                    matched,
                    handleObj,
                    handlerQueue = [],
                    args = slice.call(arguments),
                    handlers = (data_priv.get(this, "events") || {})[event.type] || [],
                    special = jQuery.event.special[event.type] || {};
                args[0] = event;
                event.delegateTarget = this;
                if (special.preDispatch && special.preDispatch.call(this, event) === !1) {
                    return
                }
                handlerQueue = jQuery.event.handlers.call(this, event, handlers);
                i = 0;
                while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
                    event.currentTarget = matched.elem;
                    j = 0;
                    while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
                        if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {
                            event.handleObj = handleObj;
                            event.data = handleObj.data;
                            ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                            if (ret !== undefined) {
                                if ((event.result = ret) === !1) {
                                    event.preventDefault();
                                    event.stopPropagation()
                                }
                            }
                        }
                    }
                }
                if (special.postDispatch) {
                    special.postDispatch.call(this, event)
                }
                return event.result
            },
            handlers: function(event, handlers) {
                var i,
                    matches,
                    sel,
                    handleObj,
                    handlerQueue = [],
                    delegateCount = handlers.delegateCount,
                    cur = event.target;
                if (delegateCount && cur.nodeType && (!event.button || event.type !== "click")) {
                    for (; cur !== this; cur = cur.parentNode || this) {
                        if (cur.disabled !== !0 || event.type !== "click") {
                            matches = [];
                            for (i = 0; i < delegateCount; i++) {
                                handleObj = handlers[i];
                                sel = handleObj.selector + " ";
                                if (matches[sel] === undefined) {
                                    matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length
                                }
                                if (matches[sel]) {
                                    matches.push(handleObj)
                                }
                            }
                            if (matches.length) {
                                handlerQueue.push({
                                    elem: cur,
                                    handlers: matches
                                })
                            }
                        }
                    }
                }
                if (delegateCount < handlers.length) {
                    handlerQueue.push({
                        elem: this,
                        handlers: handlers.slice(delegateCount)
                    })
                }
                return handlerQueue
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(event, original) {
                    if (event.which == null) {
                        event.which = original.charCode != null ? original.charCode : original.keyCode
                    }
                    return event
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function(event, original) {
                    var eventDoc,
                        doc,
                        body,
                        button = original.button;
                    if (event.pageX == null && original.clientX != null) {
                        eventDoc = event.target.ownerDocument || document;
                        doc = eventDoc.documentElement;
                        body = eventDoc.body;
                        event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                        event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)
                    }
                    if (!event.which && button !== undefined) {
                        event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)))
                    }
                    return event
                }
            },
            fix: function(event) {
                if (event[jQuery.expando]) {
                    return event
                }
                var i,
                    prop,
                    copy,
                    type = event.type,
                    originalEvent = event,
                    fixHook = this.fixHooks[type];
                if (!fixHook) {
                    this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {}
                }
                copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
                event = new jQuery.Event(originalEvent);
                i = copy.length;
                while (i--) {
                    prop = copy[i];
                    event[prop] = originalEvent[prop]
                }
                if (!event.target) {
                    event.target = document
                }
                if (event.target.nodeType === 3) {
                    event.target = event.target.parentNode
                }
                return fixHook.filter ? fixHook.filter(event, originalEvent) : event
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function() {
                        if (this !== safeActiveElement() && this.focus) {
                            this.focus();
                            return !1
                        }
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        if (this === safeActiveElement() && this.blur) {
                            this.blur();
                            return !1
                        }
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) {
                            this.click();
                            return !1
                        }
                    },
                    _default: function(event) {
                        return jQuery.nodeName(event.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(event) {
                        if (event.result !== undefined && event.originalEvent) {
                            event.originalEvent.returnValue = event.result
                        }
                    }
                }
            },
            simulate: function(type, elem, event, bubble) {
                var e = jQuery.extend(new jQuery.Event(), event, {
                    type: type,
                    isSimulated: !0,
                    originalEvent: {}
                });
                if (bubble) {
                    jQuery.event.trigger(e, null, elem)
                } else {
                    jQuery.event.dispatch.call(elem, e)
                }
                if (e.isDefaultPrevented()) {
                    event.preventDefault()
                }
            }
        };
        jQuery.removeEvent = function(elem, type, handle) {
            if (elem.removeEventListener) {
                elem.removeEventListener(type, handle, !1)
            }
        };
        jQuery.Event = function(src, props) {
            if (!(this instanceof jQuery.Event)) {
                return new jQuery.Event(src, props)
            }
            if (src && src.type) {
                this.originalEvent = src;
                this.type = src.type;
                this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && src.returnValue === !1 ? returnTrue : returnFalse
            } else {
                this.type = src
            }
            if (props) {
                jQuery.extend(this, props)
            }
            this.timeStamp = src && src.timeStamp || jQuery.now();
            this[jQuery.expando] = !0
        };
        jQuery.Event.prototype = {
            isDefaultPrevented: returnFalse,
            isPropagationStopped: returnFalse,
            isImmediatePropagationStopped: returnFalse,
            preventDefault: function() {
                var e = this.originalEvent;
                this.isDefaultPrevented = returnTrue;
                if (e && e.preventDefault) {
                    e.preventDefault()
                }
            },
            stopPropagation: function() {
                var e = this.originalEvent;
                this.isPropagationStopped = returnTrue;
                if (e && e.stopPropagation) {
                    e.stopPropagation()
                }
            },
            stopImmediatePropagation: function() {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = returnTrue;
                if (e && e.stopImmediatePropagation) {
                    e.stopImmediatePropagation()
                }
                this.stopPropagation()
            }
        };
        jQuery.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(orig, fix) {
            jQuery.event.special[orig] = {
                delegateType: fix,
                bindType: fix,
                handle: function(event) {
                    var ret,
                        target = this,
                        related = event.relatedTarget,
                        handleObj = event.handleObj;
                    if (!related || (related !== target && !jQuery.contains(target, related))) {
                        event.type = handleObj.origType;
                        ret = handleObj.handler.apply(this, arguments);
                        event.type = fix
                    }
                    return ret
                }
            }
        });
        if (!support.focusinBubbles) {
            jQuery.each({
                focus: "focusin",
                blur: "focusout"
            }, function(orig, fix) {
                var handler = function(event) {
                    jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), !0)
                };
                jQuery.event.special[fix] = {
                    setup: function() {
                        var doc = this.ownerDocument || this,
                            attaches = data_priv.access(doc, fix);
                        if (!attaches) {
                            doc.addEventListener(orig, handler, !0)
                        }
                        data_priv.access(doc, fix, (attaches || 0) + 1)
                    },
                    teardown: function() {
                        var doc = this.ownerDocument || this,
                            attaches = data_priv.access(doc, fix) - 1;
                        if (!attaches) {
                            doc.removeEventListener(orig, handler, !0);
                            data_priv.remove(doc, fix)
                        } else {
                            data_priv.access(doc, fix, attaches)
                        }
                    }
                }
            })
        }
        jQuery.fn.extend({
            on: function(types, selector, data, fn, one) {
                var origFn,
                    type;
                if (typeof types === "object") {
                    if (typeof selector !== "string") {
                        data = data || selector;
                        selector = undefined
                    }
                    for (type in types) {
                        this.on(type, selector, data, types[type], one)
                    }
                    return this
                }
                if (data == null && fn == null) {
                    fn = selector;
                    data = selector = undefined
                } else if (fn == null) {
                    if (typeof selector === "string") {
                        fn = data;
                        data = undefined
                    } else {
                        fn = data;
                        data = selector;
                        selector = undefined
                    }
                }
                if (fn === !1) {
                    fn = returnFalse
                } else if (!fn) {
                    return this
                }
                if (one === 1) {
                    origFn = fn;
                    fn = function(event) {
                        jQuery().off(event);
                        return origFn.apply(this, arguments)
                    };
                    fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)
                }
                return this.each(function() {
                    jQuery.event.add(this, types, fn, data, selector)
                })
            },
            one: function(types, selector, data, fn) {
                return this.on(types, selector, data, fn, 1)
            },
            off: function(types, selector, fn) {
                var handleObj,
                    type;
                if (types && types.preventDefault && types.handleObj) {
                    handleObj = types.handleObj;
                    jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
                    return this
                }
                if (typeof types === "object") {
                    for (type in types) {
                        this.off(type, selector, types[type])
                    }
                    return this
                }
                if (selector === !1 || typeof selector === "function") {
                    fn = selector;
                    selector = undefined
                }
                if (fn === !1) {
                    fn = returnFalse
                }
                return this.each(function() {
                    jQuery.event.remove(this, types, fn, selector)
                })
            },
            trigger: function(type, data) {
                return this.each(function() {
                    jQuery.event.trigger(type, data, this)
                })
            },
            triggerHandler: function(type, data) {
                var elem = this[0];
                if (elem) {
                    return jQuery.event.trigger(type, data, elem, !0)
                }
            }
        });
        var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            rtagName = /<([\w:]+)/,
            rhtml = /<|&#?\w+;/,
            rnoInnerhtml = /<(?:script|style|link)/i,
            rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
            rscriptType = /^$|\/(?:java|ecma)script/i,
            rscriptTypeMasked = /^true\/(.*)/,
            rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            wrapMap = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
        wrapMap.optgroup = wrapMap.option;
        wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
        wrapMap.th = wrapMap.td;
        function manipulationTarget(elem, content) {
            return jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem
        }
        function disableScript(elem) {
            elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
            return elem
        }
        function restoreScript(elem) {
            var match = rscriptTypeMasked.exec(elem.type);
            if (match) {
                elem.type = match[1]
            } else {
                elem.removeAttribute("type")
            }
            return elem
        }
        function setGlobalEval(elems, refElements) {
            var i = 0,
                l = elems.length;
            for (; i < l; i++) {
                data_priv.set(elems[i], "globalEval", !refElements || data_priv.get(refElements[i], "globalEval"))
            }
        }
        function cloneCopyEvent(src, dest) {
            var i,
                l,
                type,
                pdataOld,
                pdataCur,
                udataOld,
                udataCur,
                events;
            if (dest.nodeType !== 1) {
                return
            }
            if (data_priv.hasData(src)) {
                pdataOld = data_priv.access(src);
                pdataCur = data_priv.set(dest, pdataOld);
                events = pdataOld.events;
                if (events) {
                    delete pdataCur.handle;
                    pdataCur.events = {};
                    for (type in events) {
                        for (i = 0, l = events[type].length; i < l; i++) {
                            jQuery.event.add(dest, type, events[type][i])
                        }
                    }
                }
            }
            if (data_user.hasData(src)) {
                udataOld = data_user.access(src);
                udataCur = jQuery.extend({}, udataOld);
                data_user.set(dest, udataCur)
            }
        }
        function getAll(context, tag) {
            var ret = context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : context.querySelectorAll ? context.querySelectorAll(tag || "*") : [];
            return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret
        }
        function fixInput(src, dest) {
            var nodeName = dest.nodeName.toLowerCase();
            if (nodeName === "input" && rcheckableType.test(src.type)) {
                dest.checked = src.checked
            } else if (nodeName === "input" || nodeName === "textarea") {
                dest.defaultValue = src.defaultValue
            }
        }
        jQuery.extend({
            clone: function(elem, dataAndEvents, deepDataAndEvents) {
                var i,
                    l,
                    srcElements,
                    destElements,
                    clone = elem.cloneNode(!0),
                    inPage = jQuery.contains(elem.ownerDocument, elem);
                if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
                    destElements = getAll(clone);
                    srcElements = getAll(elem);
                    for (i = 0, l = srcElements.length; i < l; i++) {
                        fixInput(srcElements[i], destElements[i])
                    }
                }
                if (dataAndEvents) {
                    if (deepDataAndEvents) {
                        srcElements = srcElements || getAll(elem);
                        destElements = destElements || getAll(clone);
                        for (i = 0, l = srcElements.length; i < l; i++) {
                            cloneCopyEvent(srcElements[i], destElements[i])
                        }
                    } else {
                        cloneCopyEvent(elem, clone)
                    }
                }
                destElements = getAll(clone, "script");
                if (destElements.length > 0) {
                    setGlobalEval(destElements, !inPage && getAll(elem, "script"))
                }
                return clone
            },
            buildFragment: function(elems, context, scripts, selection) {
                var elem,
                    tmp,
                    tag,
                    wrap,
                    contains,
                    j,
                    fragment = context.createDocumentFragment(),
                    nodes = [],
                    i = 0,
                    l = elems.length;
                for (; i < l; i++) {
                    elem = elems[i];
                    if (elem || elem === 0) {
                        if (jQuery.type(elem) === "object") {
                            jQuery.merge(nodes, elem.nodeType ? [elem] : elem)
                        } else if (!rhtml.test(elem)) {
                            nodes.push(context.createTextNode(elem))
                        } else {
                            tmp = tmp || fragment.appendChild(context.createElement("div"));
                            tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
                            wrap = wrapMap[tag] || wrapMap._default;
                            tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];
                            j = wrap[0];
                            while (j--) {
                                tmp = tmp.lastChild
                            }
                            jQuery.merge(nodes, tmp.childNodes);
                            tmp = fragment.firstChild;
                            tmp.textContent = ""
                        }
                    }
                }
                fragment.textContent = "";
                i = 0;
                while ((elem = nodes[i++])) {
                    if (selection && jQuery.inArray(elem, selection) !== -1) {
                        continue
                    }
                    contains = jQuery.contains(elem.ownerDocument, elem);
                    tmp = getAll(fragment.appendChild(elem), "script");
                    if (contains) {
                        setGlobalEval(tmp)
                    }
                    if (scripts) {
                        j = 0;
                        while ((elem = tmp[j++])) {
                            if (rscriptType.test(elem.type || "")) {
                                scripts.push(elem)
                            }
                        }
                    }
                }
                return fragment
            },
            cleanData: function(elems) {
                var data,
                    elem,
                    type,
                    key,
                    special = jQuery.event.special,
                    i = 0;
                for (; (elem = elems[i]) !== undefined; i++) {
                    if (jQuery.acceptData(elem)) {
                        key = elem[data_priv.expando];
                        if (key && (data = data_priv.cache[key])) {
                            if (data.events) {
                                for (type in data.events) {
                                    if (special[type]) {
                                        jQuery.event.remove(elem, type)
                                    } else {
                                        jQuery.removeEvent(elem, type, data.handle)
                                    }
                                }
                            }
                            if (data_priv.cache[key]) {
                                delete data_priv.cache[key]
                            }
                        }
                    }
                    delete data_user.cache[elem[data_user.expando]]
                }
            }
        });
        jQuery.fn.extend({
            text: function(value) {
                return access(this, function(value) {
                    return value === undefined ? jQuery.text(this) : this.empty().each(function() {
                        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                            this.textContent = value
                        }
                    })
                }, null, value, arguments.length)
            },
            append: function() {
                return this.domManip(arguments, function(elem) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var target = manipulationTarget(this, elem);
                        target.appendChild(elem)
                    }
                })
            },
            prepend: function() {
                return this.domManip(arguments, function(elem) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var target = manipulationTarget(this, elem);
                        target.insertBefore(elem, target.firstChild)
                    }
                })
            },
            before: function() {
                return this.domManip(arguments, function(elem) {
                    if (this.parentNode) {
                        this.parentNode.insertBefore(elem, this)
                    }
                })
            },
            after: function() {
                return this.domManip(arguments, function(elem) {
                    if (this.parentNode) {
                        this.parentNode.insertBefore(elem, this.nextSibling)
                    }
                })
            },
            remove: function(selector, keepData) {
                var elem,
                    elems = selector ? jQuery.filter(selector, this) : this,
                    i = 0;
                for (; (elem = elems[i]) != null; i++) {
                    if (!keepData && elem.nodeType === 1) {
                        jQuery.cleanData(getAll(elem))
                    }
                    if (elem.parentNode) {
                        if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
                            setGlobalEval(getAll(elem, "script"))
                        }
                        elem.parentNode.removeChild(elem)
                    }
                }
                return this
            },
            empty: function() {
                var elem,
                    i = 0;
                for (; (elem = this[i]) != null; i++) {
                    if (elem.nodeType === 1) {
                        jQuery.cleanData(getAll(elem, !1));
                        elem.textContent = ""
                    }
                }
                return this
            },
            clone: function(dataAndEvents, deepDataAndEvents) {
                dataAndEvents = dataAndEvents == null ? !1 : dataAndEvents;
                deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
                return this.map(function() {
                    return jQuery.clone(this, dataAndEvents, deepDataAndEvents)
                })
            },
            html: function(value) {
                return access(this, function(value) {
                    var elem = this[0] || {},
                        i = 0,
                        l = this.length;
                    if (value === undefined && elem.nodeType === 1) {
                        return elem.innerHTML
                    }
                    if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                        value = value.replace(rxhtmlTag, "<$1></$2>");
                        try {
                            for (; i < l; i++) {
                                elem = this[i] || {};
                                if (elem.nodeType === 1) {
                                    jQuery.cleanData(getAll(elem, !1));
                                    elem.innerHTML = value
                                }
                            }
                            elem = 0
                        } catch (e) {}
                    }
                    if (elem) {
                        this.empty().append(value)
                    }
                }, null, value, arguments.length)
            },
            replaceWith: function() {
                var arg = arguments[0];
                this.domManip(arguments, function(elem) {
                    arg = this.parentNode;
                    jQuery.cleanData(getAll(this));
                    if (arg) {
                        arg.replaceChild(elem, this)
                    }
                });
                return arg && (arg.length || arg.nodeType) ? this : this.remove()
            },
            detach: function(selector) {
                return this.remove(selector, !0)
            },
            domManip: function(args, callback) {
                args = concat.apply([], args);
                var fragment,
                    first,
                    scripts,
                    hasScripts,
                    node,
                    doc,
                    i = 0,
                    l = this.length,
                    set = this,
                    iNoClone = l - 1,
                    value = args[0],
                    isFunction = jQuery.isFunction(value);
                if (isFunction || (l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value))) {
                    return this.each(function(index) {
                        var self = set.eq(index);
                        if (isFunction) {
                            args[0] = value.call(this, index, self.html())
                        }
                        self.domManip(args, callback)
                    })
                }
                if (l) {
                    fragment = jQuery.buildFragment(args, this[0].ownerDocument, !1, this);
                    first = fragment.firstChild;
                    if (fragment.childNodes.length === 1) {
                        fragment = first
                    }
                    if (first) {
                        scripts = jQuery.map(getAll(fragment, "script"), disableScript);
                        hasScripts = scripts.length;
                        for (; i < l; i++) {
                            node = fragment;
                            if (i !== iNoClone) {
                                node = jQuery.clone(node, !0, !0);
                                if (hasScripts) {
                                    jQuery.merge(scripts, getAll(node, "script"))
                                }
                            }
                            callback.call(this[i], node, i)
                        }
                        if (hasScripts) {
                            doc = scripts[scripts.length - 1].ownerDocument;
                            jQuery.map(scripts, restoreScript);
                            for (i = 0; i < hasScripts; i++) {
                                node = scripts[i];
                                if (rscriptType.test(node.type || "") && !data_priv.access(node, "globalEval") && jQuery.contains(doc, node)) {
                                    if (node.src) {
                                        if (jQuery._evalUrl) {
                                            jQuery._evalUrl(node.src)
                                        }
                                    } else {
                                        jQuery.globalEval(node.textContent.replace(rcleanScript, ""))
                                    }
                                }
                            }
                        }
                    }
                }
                return this
            }
        });
        jQuery.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(name, original) {
            jQuery.fn[name] = function(selector) {
                var elems,
                    ret = [],
                    insert = jQuery(selector),
                    last = insert.length - 1,
                    i = 0;
                for (; i <= last; i++) {
                    elems = i === last ? this : this.clone(!0);
                    jQuery(insert[i])[original](elems);
                    push.apply(ret, elems.get())
                }
                return this.pushStack(ret)
            }
        });
        var iframe,
            elemdisplay = {};
        function actualDisplay(name, doc) {
            var style,
                elem = jQuery(doc.createElement(name)).appendTo(doc.body),
                display = window.getDefaultComputedStyle && (style = window.getDefaultComputedStyle(elem[0])) ? style.display : jQuery.css(elem[0], "display");
            elem.detach();
            return display
        }
        function defaultDisplay(nodeName) {
            var doc = document,
                display = elemdisplay[nodeName];
            if (!display) {
                display = actualDisplay(nodeName, doc);
                if (display === "none" || !display) {
                    iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);
                    doc = iframe[0].contentDocument;
                    doc.write();
                    doc.close();
                    display = actualDisplay(nodeName, doc);
                    iframe.detach()
                }
                elemdisplay[nodeName] = display
            }
            return display
        }
        var rmargin = (/^margin/);
        var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
        var getStyles = function(elem) {
            if (elem.ownerDocument.defaultView.opener) {
                return elem.ownerDocument.defaultView.getComputedStyle(elem, null)
            }
            return window.getComputedStyle(elem, null)
        };
        function curCSS(elem, name, computed) {
            var width,
                minWidth,
                maxWidth,
                ret,
                style = elem.style;
            computed = computed || getStyles(elem);
            if (computed) {
                ret = computed.getPropertyValue(name) || computed[name]
            }
            if (computed) {
                if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
                    ret = jQuery.style(elem, name)
                }
                if (rnumnonpx.test(ret) && rmargin.test(name)) {
                    width = style.width;
                    minWidth = style.minWidth;
                    maxWidth = style.maxWidth;
                    style.minWidth = style.maxWidth = style.width = ret;
                    ret = computed.width;
                    style.width = width;
                    style.minWidth = minWidth;
                    style.maxWidth = maxWidth
                }
            }
            return ret !== undefined ? ret + "" : ret
        }
        function addGetHookIf(conditionFn, hookFn) {
            return {
                get: function() {
                    if (conditionFn()) {
                        delete this.get;
                        return
                    }
                    return (this.get = hookFn).apply(this, arguments)
                }
            }
        }
        (function() {
            var pixelPositionVal,
                boxSizingReliableVal,
                docElem = document.documentElement,
                container = document.createElement("div"),
                div = document.createElement("div");
            if (!div.style) {
                return
            }
            div.style.backgroundClip = "content-box";
            div.cloneNode(!0).style.backgroundClip = "";
            support.clearCloneStyle = div.style.backgroundClip === "content-box";
            container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" + "position:absolute";
            container.appendChild(div);
            function computePixelPositionAndBoxSizingReliable() {
                div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" + "box-sizing:border-box;display:block;margin-top:1%;top:1%;" + "border:1px;padding:1px;width:4px;position:absolute";
                div.innerHTML = "";
                docElem.appendChild(container);
                var divStyle = window.getComputedStyle(div, null);
                pixelPositionVal = divStyle.top !== "1%";
                boxSizingReliableVal = divStyle.width === "4px";
                docElem.removeChild(container)
            }
            if (window.getComputedStyle) {
                jQuery.extend(support, {
                    pixelPosition: function() {
                        computePixelPositionAndBoxSizingReliable();
                        return pixelPositionVal
                    },
                    boxSizingReliable: function() {
                        if (boxSizingReliableVal == null) {
                            computePixelPositionAndBoxSizingReliable()
                        }
                        return boxSizingReliableVal
                    },
                    reliableMarginRight: function() {
                        var ret,
                            marginDiv = div.appendChild(document.createElement("div"));
                        marginDiv.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" + "box-sizing:content-box;display:block;margin:0;border:0;padding:0";
                        marginDiv.style.marginRight = marginDiv.style.width = "0";
                        div.style.width = "1px";
                        docElem.appendChild(container);
                        ret = !parseFloat(window.getComputedStyle(marginDiv, null).marginRight);
                        docElem.removeChild(container);
                        div.removeChild(marginDiv);
                        return ret
                    }
                })
            }
        })();
        jQuery.swap = function(elem, options, callback, args) {
            var ret,
                name,
                old = {};
            for (name in options) {
                old[name] = elem.style[name];
                elem.style[name] = options[name]
            }
            ret = callback.apply(elem, args || []);
            for (name in options) {
                elem.style[name] = old[name]
            }
            return ret
        };
        var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
            rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"),
            rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"),
            cssShow = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            cssNormalTransform = {
                letterSpacing: "0",
                fontWeight: "400"
            },
            cssPrefixes = ["Webkit", "O", "Moz", "ms"];
        function vendorPropName(style, name) {
            if (name in style) {
                return name
            }
            var capName = name[0].toUpperCase() + name.slice(1),
                origName = name,
                i = cssPrefixes.length;
            while (i--) {
                name = cssPrefixes[i] + capName;
                if (name in style) {
                    return name
                }
            }
            return origName
        }
        function setPositiveNumber(elem, value, subtract) {
            var matches = rnumsplit.exec(value);
            return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value
        }
        function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
            var i = extra === (isBorderBox ? "border" : "content") ? 4 : name === "width" ? 1 : 0,
                val = 0;
            for (; i < 4; i += 2) {
                if (extra === "margin") {
                    val += jQuery.css(elem, extra + cssExpand[i], !0, styles)
                }
                if (isBorderBox) {
                    if (extra === "content") {
                        val -= jQuery.css(elem, "padding" + cssExpand[i], !0, styles)
                    }
                    if (extra !== "margin") {
                        val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles)
                    }
                } else {
                    val += jQuery.css(elem, "padding" + cssExpand[i], !0, styles);
                    if (extra !== "padding") {
                        val += jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles)
                    }
                }
            }
            return val
        }
        function getWidthOrHeight(elem, name, extra) {
            var valueIsBorderBox = !0,
                val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
                styles = getStyles(elem),
                isBorderBox = jQuery.css(elem, "boxSizing", !1, styles) === "border-box";
            if (val <= 0 || val == null) {
                val = curCSS(elem, name, styles);
                if (val < 0 || val == null) {
                    val = elem.style[name]
                }
                if (rnumnonpx.test(val)) {
                    return val
                }
                valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);
                val = parseFloat(val) || 0
            }
            return (val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles)) + "px"
        }
        function showHide(elements, show) {
            var display,
                elem,
                hidden,
                values = [],
                index = 0,
                length = elements.length;
            for (; index < length; index++) {
                elem = elements[index];
                if (!elem.style) {
                    continue
                }
                values[index] = data_priv.get(elem, "olddisplay");
                display = elem.style.display;
                if (show) {
                    if (!values[index] && display === "none") {
                        elem.style.display = ""
                    }
                    if (elem.style.display === "" && isHidden(elem)) {
                        values[index] = data_priv.access(elem, "olddisplay", defaultDisplay(elem.nodeName))
                    }
                } else {
                    hidden = isHidden(elem);
                    if (display !== "none" || !hidden) {
                        data_priv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"))
                    }
                }
            }
            for (index = 0; index < length; index++) {
                elem = elements[index];
                if (!elem.style) {
                    continue
                }
                if (!show || elem.style.display === "none" || elem.style.display === "") {
                    elem.style.display = show ? values[index] || "" : "none"
                }
            }
            return elements
        }
        jQuery.extend({
            cssHooks: {
                opacity: {
                    get: function(elem, computed) {
                        if (computed) {
                            var ret = curCSS(elem, "opacity");
                            return ret === "" ? "1" : ret
                        }
                    }
                }
            },
            cssNumber: {
                "columnCount": !0,
                "fillOpacity": !0,
                "flexGrow": !0,
                "flexShrink": !0,
                "fontWeight": !0,
                "lineHeight": !0,
                "opacity": !0,
                "order": !0,
                "orphans": !0,
                "widows": !0,
                "zIndex": !0,
                "zoom": !0
            },
            cssProps: {
                "float": "cssFloat"
            },
            style: function(elem, name, value, extra) {
                if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                    return
                }
                var ret,
                    type,
                    hooks,
                    origName = jQuery.camelCase(name),
                    style = elem.style;
                name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));
                hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
                if (value !== undefined) {
                    type = typeof value;
                    if (type === "string" && (ret = rrelNum.exec(value))) {
                        value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
                        type = "number"
                    }
                    if (value == null || value !== value) {
                        return
                    }
                    if (type === "number" && !jQuery.cssNumber[origName]) {
                        value += "px"
                    }
                    if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
                        style[name] = "inherit"
                    }
                    if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
                        style[name] = value
                    }
                } else {
                    if (hooks && "get" in hooks && (ret = hooks.get(elem, !1, extra)) !== undefined) {
                        return ret
                    }
                    return style[name]
                }
            },
            css: function(elem, name, extra, styles) {
                var val,
                    num,
                    hooks,
                    origName = jQuery.camelCase(name);
                name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));
                hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
                if (hooks && "get" in hooks) {
                    val = hooks.get(elem, !0, extra)
                }
                if (val === undefined) {
                    val = curCSS(elem, name, styles)
                }
                if (val === "normal" && name in cssNormalTransform) {
                    val = cssNormalTransform[name]
                }
                if (extra === "" || extra) {
                    num = parseFloat(val);
                    return extra === !0 || jQuery.isNumeric(num) ? num || 0 : val
                }
                return val
            }
        });
        jQuery.each(["height", "width"], function(i, name) {
            jQuery.cssHooks[name] = {
                get: function(elem, computed, extra) {
                    if (computed) {
                        return rdisplayswap.test(jQuery.css(elem, "display")) && elem.offsetWidth === 0 ? jQuery.swap(elem, cssShow, function() {
                            return getWidthOrHeight(elem, name, extra)
                        }) : getWidthOrHeight(elem, name, extra)
                    }
                },
                set: function(elem, value, extra) {
                    var styles = extra && getStyles(elem);
                    return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", !1, styles) === "border-box", styles) : 0)
                }
            }
        });
        jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
            if (computed) {
                return jQuery.swap(elem, {
                    "display": "inline-block"
                }, curCSS, [elem, "marginRight"])
            }
        });
        jQuery.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(prefix, suffix) {
            jQuery.cssHooks[prefix + suffix] = {
                expand: function(value) {
                    var i = 0,
                        expanded = {},
                        parts = typeof value === "string" ? value.split(" ") : [value];
                    for (; i < 4; i++) {
                        expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0]
                    }
                    return expanded
                }
            };
            if (!rmargin.test(prefix)) {
                jQuery.cssHooks[prefix + suffix].set = setPositiveNumber
            }
        });
        jQuery.fn.extend({
            css: function(name, value) {
                return access(this, function(elem, name, value) {
                    var styles,
                        len,
                        map = {},
                        i = 0;
                    if (jQuery.isArray(name)) {
                        styles = getStyles(elem);
                        len = name.length;
                        for (; i < len; i++) {
                            map[name[i]] = jQuery.css(elem, name[i], !1, styles)
                        }
                        return map
                    }
                    return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name)
                }, name, value, arguments.length > 1)
            },
            show: function() {
                return showHide(this, !0)
            },
            hide: function() {
                return showHide(this)
            },
            toggle: function(state) {
                if (typeof state === "boolean") {
                    return state ? this.show() : this.hide()
                }
                return this.each(function() {
                    if (isHidden(this)) {
                        jQuery(this).show()
                    } else {
                        jQuery(this).hide()
                    }
                })
            }
        });
        function Tween(elem, options, prop, end, easing) {
            return new Tween.prototype.init(elem, options, prop, end, easing)
        }
        jQuery.Tween = Tween;
        Tween.prototype = {
            constructor: Tween,
            init: function(elem, options, prop, end, easing, unit) {
                this.elem = elem;
                this.prop = prop;
                this.easing = easing || "swing";
                this.options = options;
                this.start = this.now = this.cur();
                this.end = end;
                this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px")
            },
            cur: function() {
                var hooks = Tween.propHooks[this.prop];
                return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this)
            },
            run: function(percent) {
                var eased,
                    hooks = Tween.propHooks[this.prop];
                if (this.options.duration) {
                    this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration)
                } else {
                    this.pos = eased = percent
                }
                this.now = (this.end - this.start) * eased + this.start;
                if (this.options.step) {
                    this.options.step.call(this.elem, this.now, this)
                }
                if (hooks && hooks.set) {
                    hooks.set(this)
                } else {
                    Tween.propHooks._default.set(this)
                }
                return this
            }
        };
        Tween.prototype.init.prototype = Tween.prototype;
        Tween.propHooks = {
            _default: {
                get: function(tween) {
                    var result;
                    if (tween.elem[tween.prop] != null && (!tween.elem.style || tween.elem.style[tween.prop] == null)) {
                        return tween.elem[tween.prop]
                    }
                    result = jQuery.css(tween.elem, tween.prop, "");
                    return !result || result === "auto" ? 0 : result
                },
                set: function(tween) {
                    if (jQuery.fx.step[tween.prop]) {
                        jQuery.fx.step[tween.prop](tween)
                    } else if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
                        jQuery.style(tween.elem, tween.prop, tween.now + tween.unit)
                    } else {
                        tween.elem[tween.prop] = tween.now
                    }
                }
            }
        };
        Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
            set: function(tween) {
                if (tween.elem.nodeType && tween.elem.parentNode) {
                    tween.elem[tween.prop] = tween.now
                }
            }
        };
        jQuery.easing = {
            linear: function(p) {
                return p
            },
            swing: function(p) {
                return 0.5 - Math.cos(p * Math.PI) / 2
            }
        };
        jQuery.fx = Tween.prototype.init;
        jQuery.fx.step = {};
        var fxNow,
            timerId,
            rfxtypes = /^(?:toggle|show|hide)$/,
            rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"),
            rrun = /queueHooks$/,
            animationPrefilters = [defaultPrefilter],
            tweeners = {
                "*": [function(prop, value) {
                    var tween = this.createTween(prop, value),
                        target = tween.cur(),
                        parts = rfxnum.exec(value),
                        unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
                        start = (jQuery.cssNumber[prop] || unit !== "px" && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)),
                        scale = 1,
                        maxIterations = 20;
                    if (start && start[3] !== unit) {
                        unit = unit || start[3];
                        parts = parts || [];
                        start = +target || 1;
                        do {
                            scale = scale || ".5";
                            start = start / scale;
                            jQuery.style(tween.elem, prop, start + unit)
                        } while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations);
                    }
                    if (parts) {
                        start = tween.start = +start || +target || 0;
                        tween.unit = unit;
                        tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2]
                    }
                    return tween
                }]
            };
        function createFxNow() {
            setTimeout(function() {
                fxNow = undefined
            });
            return ( fxNow = jQuery.now())
        }
        function genFx(type, includeWidth) {
            var which,
                i = 0,
                attrs = {
                    height: type
                };
            includeWidth = includeWidth ? 1 : 0;
            for (; i < 4; i += 2 - includeWidth) {
                which = cssExpand[i];
                attrs["margin" + which] = attrs["padding" + which] = type
            }
            if (includeWidth) {
                attrs.opacity = attrs.width = type
            }
            return attrs
        }
        function createTween(value, prop, animation) {
            var tween,
                collection = (tweeners[prop] || []).concat(tweeners["*"]),
                index = 0,
                length = collection.length;
            for (; index < length; index++) {
                if ((tween = collection[index].call(animation, prop, value))) {
                    return tween
                }
            }
        }
        function defaultPrefilter(elem, props, opts) {
            var prop,
                value,
                toggle,
                tween,
                hooks,
                oldfire,
                display,
                checkDisplay,
                anim = this,
                orig = {},
                style = elem.style,
                hidden = elem.nodeType && isHidden(elem),
                dataShow = data_priv.get(elem, "fxshow");
            if (!opts.queue) {
                hooks = jQuery._queueHooks(elem, "fx");
                if (hooks.unqueued == null) {
                    hooks.unqueued = 0;
                    oldfire = hooks.empty.fire;
                    hooks.empty.fire = function() {
                        if (!hooks.unqueued) {
                            oldfire()
                        }
                    }
                }
                hooks.unqueued++;
                anim.always(function() {
                    anim.always(function() {
                        hooks.unqueued--;
                        if (!jQuery.queue(elem, "fx").length) {
                            hooks.empty.fire()
                        }
                    })
                })
            }
            if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
                opts.overflow = [style.overflow, style.overflowX, style.overflowY];
                display = jQuery.css(elem, "display");
                checkDisplay = display === "none" ? data_priv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;
                if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {
                    style.display = "inline-block"
                }
            }
            if (opts.overflow) {
                style.overflow = "hidden";
                anim.always(function() {
                    style.overflow = opts.overflow[0];
                    style.overflowX = opts.overflow[1];
                    style.overflowY = opts.overflow[2]
                })
            }
            for (prop in props) {
                value = props[prop];
                if (rfxtypes.exec(value)) {
                    delete props[prop];
                    toggle = toggle || value === "toggle";
                    if (value === (hidden ? "hide" : "show")) {
                        if (value === "show" && dataShow && dataShow[prop] !== undefined) {
                            hidden = !0
                        } else {
                            continue
                        }
                    }
                    orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop)
                } else {
                    display = undefined
                }
            }
            if (!jQuery.isEmptyObject(orig)) {
                if (dataShow) {
                    if ("hidden" in dataShow) {
                        hidden = dataShow.hidden
                    }
                } else {
                    dataShow = data_priv.access(elem, "fxshow", {})
                }
                if (toggle) {
                    dataShow.hidden = !hidden
                }
                if (hidden) {
                    jQuery(elem).show()
                } else {
                    anim.done(function() {
                        jQuery(elem).hide()
                    })
                }
                anim.done(function() {
                    var prop;
                    data_priv.remove(elem, "fxshow");
                    for (prop in orig) {
                        jQuery.style(elem, prop, orig[prop])
                    }
                });
                for (prop in orig) {
                    tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
                    if (!(prop in dataShow)) {
                        dataShow[prop] = tween.start;
                        if (hidden) {
                            tween.end = tween.start;
                            tween.start = prop === "width" || prop === "height" ? 1 : 0
                        }
                    }
                }
            } else if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") {
                style.display = display
            }
        }
        function propFilter(props, specialEasing) {
            var index,
                name,
                easing,
                value,
                hooks;
            for (index in props) {
                name = jQuery.camelCase(index);
                easing = specialEasing[name];
                value = props[index];
                if (jQuery.isArray(value)) {
                    easing = value[1];
                    value = props[index] = value[0]
                }
                if (index !== name) {
                    props[name] = value;
                    delete props[index]
                }
                hooks = jQuery.cssHooks[name];
                if (hooks && "expand" in hooks) {
                    value = hooks.expand(value);
                    delete props[name];
                    for (index in value) {
                        if (!(index in props)) {
                            props[index] = value[index];
                            specialEasing[index] = easing
                        }
                    }
                } else {
                    specialEasing[name] = easing
                }
            }
        }
        function Animation(elem, properties, options) {
            var result,
                stopped,
                index = 0,
                length = animationPrefilters.length,
                deferred = jQuery.Deferred().always(function() {
                    delete tick.elem
                }),
                tick = function() {
                    if (stopped) {
                        return !1
                    }
                    var currentTime = fxNow || createFxNow(),
                        remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
                        temp = remaining / animation.duration || 0,
                        percent = 1 - temp,
                        index = 0,
                        length = animation.tweens.length;
                    for (; index < length; index++) {
                        animation.tweens[index].run(percent)
                    }
                    deferred.notifyWith(elem, [animation, percent, remaining]);
                    if (percent < 1 && length) {
                        return remaining
                    } else {
                        deferred.resolveWith(elem, [animation]);
                        return !1
                    }
                },
                animation = deferred.promise({
                    elem: elem,
                    props: jQuery.extend({}, properties),
                    opts: jQuery.extend(!0, {
                        specialEasing: {}
                    }, options),
                    originalProperties: properties,
                    originalOptions: options,
                    startTime: fxNow || createFxNow(),
                    duration: options.duration,
                    tweens: [],
                    createTween: function(prop, end) {
                        var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                        animation.tweens.push(tween);
                        return tween
                    },
                    stop: function(gotoEnd) {
                        var index = 0,
                            length = gotoEnd ? animation.tweens.length : 0;
                        if (stopped) {
                            return this
                        }
                        stopped = !0;
                        for (; index < length; index++) {
                            animation.tweens[index].run(1)
                        }
                        if (gotoEnd) {
                            deferred.resolveWith(elem, [animation, gotoEnd])
                        } else {
                            deferred.rejectWith(elem, [animation, gotoEnd])
                        }
                        return this
                    }
                }),
                props = animation.props;
            propFilter(props, animation.opts.specialEasing);
            for (; index < length; index++) {
                result = animationPrefilters[index].call(animation, elem, props, animation.opts);
                if (result) {
                    return result
                }
            }
            jQuery.map(props, createTween, animation);
            if (jQuery.isFunction(animation.opts.start)) {
                animation.opts.start.call(elem, animation)
            }
            jQuery.fx.timer(jQuery.extend(tick, {
                elem: elem,
                anim: animation,
                queue: animation.opts.queue
            }));
            return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always)
        }
        jQuery.Animation = jQuery.extend(Animation, {
            tweener: function(props, callback) {
                if (jQuery.isFunction(props)) {
                    callback = props;
                    props = ["*"]
                } else {
                    props = props.split(" ")
                }
                var prop,
                    index = 0,
                    length = props.length;
                for (; index < length; index++) {
                    prop = props[index];
                    tweeners[prop] = tweeners[prop] || [];
                    tweeners[prop].unshift(callback)
                }
            },
            prefilter: function(callback, prepend) {
                if (prepend) {
                    animationPrefilters.unshift(callback)
                } else {
                    animationPrefilters.push(callback)
                }
            }
        });
        jQuery.speed = function(speed, easing, fn) {
            var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
                complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
                duration: speed,
                easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
            };
            opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
            if (opt.queue == null || opt.queue === !0) {
                opt.queue = "fx"
            }
            opt.old = opt.complete;
            opt.complete = function() {
                if (jQuery.isFunction(opt.old)) {
                    opt.old.call(this)
                }
                if (opt.queue) {
                    jQuery.dequeue(this, opt.queue)
                }
            };
            return opt
        };
        jQuery.fn.extend({
            fadeTo: function(speed, to, easing, callback) {
                return this.filter(isHidden).css("opacity", 0).show().end().animate({
                    opacity: to
                }, speed, easing, callback)
            },
            animate: function(prop, speed, easing, callback) {
                var empty = jQuery.isEmptyObject(prop),
                    optall = jQuery.speed(speed, easing, callback),
                    doAnimation = function() {
                        var anim = Animation(this, jQuery.extend({}, prop), optall);
                        if (empty || data_priv.get(this, "finish")) {
                            anim.stop(!0)
                        }
                    };
                doAnimation.finish = doAnimation;
                return empty || optall.queue === !1 ? this.each(doAnimation) : this.queue(optall.queue, doAnimation)
            },
            stop: function(type, clearQueue, gotoEnd) {
                var stopQueue = function(hooks) {
                    var stop = hooks.stop;
                    delete hooks.stop;
                    stop(gotoEnd)
                };
                if (typeof type !== "string") {
                    gotoEnd = clearQueue;
                    clearQueue = type;
                    type = undefined
                }
                if (clearQueue && type !== !1) {
                    this.queue(type || "fx", [])
                }
                return this.each(function() {
                    var dequeue = !0,
                        index = type != null && type + "queueHooks",
                        timers = jQuery.timers,
                        data = data_priv.get(this);
                    if (index) {
                        if (data[index] && data[index].stop) {
                            stopQueue(data[index])
                        }
                    } else {
                        for (index in data) {
                            if (data[index] && data[index].stop && rrun.test(index)) {
                                stopQueue(data[index])
                            }
                        }
                    }
                    for (index = timers.length; index--;) {
                        if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                            timers[index].anim.stop(gotoEnd);
                            dequeue = !1;
                            timers.splice(index, 1)
                        }
                    }
                    if (dequeue || !gotoEnd) {
                        jQuery.dequeue(this, type)
                    }
                })
            },
            finish: function(type) {
                if (type !== !1) {
                    type = type || "fx"
                }
                return this.each(function() {
                    var index,
                        data = data_priv.get(this),
                        queue = data[type + "queue"],
                        hooks = data[type + "queueHooks"],
                        timers = jQuery.timers,
                        length = queue ? queue.length : 0;
                    data.finish = !0;
                    jQuery.queue(this, type, []);
                    if (hooks && hooks.stop) {
                        hooks.stop.call(this, !0)
                    }
                    for (index = timers.length; index--;) {
                        if (timers[index].elem === this && timers[index].queue === type) {
                            timers[index].anim.stop(!0);
                            timers.splice(index, 1)
                        }
                    }
                    for (index = 0; index < length; index++) {
                        if (queue[index] && queue[index].finish) {
                            queue[index].finish.call(this)
                        }
                    }
                    delete data.finish
                })
            }
        });
        jQuery.each(["toggle", "show", "hide"], function(i, name) {
            var cssFn = jQuery.fn[name];
            jQuery.fn[name] = function(speed, easing, callback) {
                return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback)
            }
        });
        jQuery.each({
            slideDown: genFx("show"),
            slideUp: genFx("hide"),
            slideToggle: genFx("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(name, props) {
            jQuery.fn[name] = function(speed, easing, callback) {
                return this.animate(props, speed, easing, callback)
            }
        });
        jQuery.timers = [];
        jQuery.fx.tick = function() {
            var timer,
                i = 0,
                timers = jQuery.timers;
            fxNow = jQuery.now();
            for (; i < timers.length; i++) {
                timer = timers[i];
                if (!timer() && timers[i] === timer) {
                    timers.splice(i--, 1)
                }
            }
            if (!timers.length) {
                jQuery.fx.stop()
            }
            fxNow = undefined
        };
        jQuery.fx.timer = function(timer) {
            jQuery.timers.push(timer);
            if (timer()) {
                jQuery.fx.start()
            } else {
                jQuery.timers.pop()
            }
        };
        jQuery.fx.interval = 13;
        jQuery.fx.start = function() {
            if (!timerId) {
                timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval)
            }
        };
        jQuery.fx.stop = function() {
            clearInterval(timerId);
            timerId = null
        };
        jQuery.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        };
        jQuery.fn.delay = function(time, type) {
            time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
            type = type || "fx";
            return this.queue(type, function(next, hooks) {
                var timeout = setTimeout(next, time);
                hooks.stop = function() {
                    clearTimeout(timeout)
                }
            })
        };
        (function() {
            var input = document.createElement("input"),
                select = document.createElement("select"),
                opt = select.appendChild(document.createElement("option"));
            input.type = "checkbox";
            support.checkOn = input.value !== "";
            support.optSelected = opt.selected;
            select.disabled = !0;
            support.optDisabled = !opt.disabled;
            input = document.createElement("input");
            input.value = "t";
            input.type = "radio";
            support.radioValue = input.value === "t"
        })();
        var nodeHook,
            boolHook,
            attrHandle = jQuery.expr.attrHandle;
        jQuery.fn.extend({
            attr: function(name, value) {
                return access(this, jQuery.attr, name, value, arguments.length > 1)
            },
            removeAttr: function(name) {
                return this.each(function() {
                    jQuery.removeAttr(this, name)
                })
            }
        });
        jQuery.extend({
            attr: function(elem, name, value) {
                var hooks,
                    ret,
                    nType = elem.nodeType;
                if (!elem || nType === 3 || nType === 8 || nType === 2) {
                    return
                }
                if (typeof elem.getAttribute === strundefined) {
                    return jQuery.prop(elem, name, value)
                }
                if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                    name = name.toLowerCase();
                    hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook)
                }
                if (value !== undefined) {
                    if (value === null) {
                        jQuery.removeAttr(elem, name)
                    } else if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                        return ret
                    } else {
                        elem.setAttribute(name, value + "");
                        return value
                    }
                } else if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                    return ret
                } else {
                    ret = jQuery.find.attr(elem, name);
                    return ret == null ? undefined : ret
                }
            },
            removeAttr: function(elem, value) {
                var name,
                    propName,
                    i = 0,
                    attrNames = value && value.match(rnotwhite);
                if (attrNames && elem.nodeType === 1) {
                    while ((name = attrNames[i++])) {
                        propName = jQuery.propFix[name] || name;
                        if (jQuery.expr.match.bool.test(name)) {
                            elem[propName] = !1
                        }
                        elem.removeAttribute(name)
                    }
                }
            },
            attrHooks: {
                type: {
                    set: function(elem, value) {
                        if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
                            var val = elem.value;
                            elem.setAttribute("type", value);
                            if (val) {
                                elem.value = val
                            }
                            return value
                        }
                    }
                }
            }
        });
        boolHook = {
            set: function(elem, value, name) {
                if (value === !1) {
                    jQuery.removeAttr(elem, name)
                } else {
                    elem.setAttribute(name, name)
                }
                return name
            }
        };
        jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
            var getter = attrHandle[name] || jQuery.find.attr;
            attrHandle[name] = function(elem, name, isXML) {
                var ret,
                    handle;
                if (!isXML) {
                    handle = attrHandle[name];
                    attrHandle[name] = ret;
                    ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
                    attrHandle[name] = handle
                }
                return ret
            }
        });
        var rfocusable = /^(?:input|select|textarea|button)$/i;
        jQuery.fn.extend({
            prop: function(name, value) {
                return access(this, jQuery.prop, name, value, arguments.length > 1)
            },
            removeProp: function(name) {
                return this.each(function() {
                    delete this[jQuery.propFix[name] || name]
                })
            }
        });
        jQuery.extend({
            propFix: {
                "for": "htmlFor",
                "class": "className"
            },
            prop: function(elem, name, value) {
                var ret,
                    hooks,
                    notxml,
                    nType = elem.nodeType;
                if (!elem || nType === 3 || nType === 8 || nType === 2) {
                    return
                }
                notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
                if (notxml) {
                    name = jQuery.propFix[name] || name;
                    hooks = jQuery.propHooks[name]
                }
                if (value !== undefined) {
                    return hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : (elem[name] = value)
                } else {
                    return hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null ? ret : elem[name]
                }
            },
            propHooks: {
                tabIndex: {
                    get: function(elem) {
                        return elem.hasAttribute("tabindex") || rfocusable.test(elem.nodeName) || elem.href ? elem.tabIndex : -1
                    }
                }
            }
        });
        if (!support.optSelected) {
            jQuery.propHooks.selected = {
                get: function(elem) {
                    var parent = elem.parentNode;
                    if (parent && parent.parentNode) {
                        parent.parentNode.selectedIndex
                    }
                    return null
                }
            }
        }
        jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            jQuery.propFix[this.toLowerCase()] = this
        });
        var rclass = /[\t\r\n\f]/g;
        jQuery.fn.extend({
            addClass: function(value) {
                var classes,
                    elem,
                    cur,
                    clazz,
                    j,
                    finalValue,
                    proceed = typeof value === "string" && value,
                    i = 0,
                    len = this.length;
                if (jQuery.isFunction(value)) {
                    return this.each(function(j) {
                        jQuery(this).addClass(value.call(this, j, this.className))
                    })
                }
                if (proceed) {
                    classes = (value || "").match(rnotwhite) || [];
                    for (; i < len; i++) {
                        elem = this[i];
                        cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ");
                        if (cur) {
                            j = 0;
                            while ((clazz = classes[j++])) {
                                if (cur.indexOf(" " + clazz + " ") < 0) {
                                    cur += clazz + " "
                                }
                            }
                            finalValue = jQuery.trim(cur);
                            if (elem.className !== finalValue) {
                                elem.className = finalValue
                            }
                        }
                    }
                }
                return this
            },
            removeClass: function(value) {
                var classes,
                    elem,
                    cur,
                    clazz,
                    j,
                    finalValue,
                    proceed = arguments.length === 0 || typeof value === "string" && value,
                    i = 0,
                    len = this.length;
                if (jQuery.isFunction(value)) {
                    return this.each(function(j) {
                        jQuery(this).removeClass(value.call(this, j, this.className))
                    })
                }
                if (proceed) {
                    classes = (value || "").match(rnotwhite) || [];
                    for (; i < len; i++) {
                        elem = this[i];
                        cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "");
                        if (cur) {
                            j = 0;
                            while ((clazz = classes[j++])) {
                                while (cur.indexOf(" " + clazz + " ") >= 0) {
                                    cur = cur.replace(" " + clazz + " ", " ")
                                }
                            }
                            finalValue = value ? jQuery.trim(cur) : "";
                            if (elem.className !== finalValue) {
                                elem.className = finalValue
                            }
                        }
                    }
                }
                return this
            },
            toggleClass: function(value, stateVal) {
                var type = typeof value;
                if (typeof stateVal === "boolean" && type === "string") {
                    return stateVal ? this.addClass(value) : this.removeClass(value)
                }
                if (jQuery.isFunction(value)) {
                    return this.each(function(i) {
                        jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal)
                    })
                }
                return this.each(function() {
                    if (type === "string") {
                        var className,
                            i = 0,
                            self = jQuery(this),
                            classNames = value.match(rnotwhite) || [];
                        while ((className = classNames[i++])) {
                            if (self.hasClass(className)) {
                                self.removeClass(className)
                            } else {
                                self.addClass(className)
                            }
                        }
                    } else if (type === strundefined || type === "boolean") {
                        if (this.className) {
                            data_priv.set(this, "__className__", this.className)
                        }
                        this.className = this.className || value === !1 ? "" : data_priv.get(this, "__className__") || ""
                    }
                })
            },
            hasClass: function(selector) {
                var className = " " + selector + " ",
                    i = 0,
                    l = this.length;
                for (; i < l; i++) {
                    if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) {
                        return !0
                    }
                }
                return !1
            }
        });
        var rreturn = /\r/g;
        jQuery.fn.extend({
            val: function(value) {
                var hooks,
                    ret,
                    isFunction,
                    elem = this[0];
                if (!arguments.length) {
                    if (elem) {
                        hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
                        if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
                            return ret
                        }
                        ret = elem.value;
                        return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret
                    }
                    return
                }
                isFunction = jQuery.isFunction(value);
                return this.each(function(i) {
                    var val;
                    if (this.nodeType !== 1) {
                        return
                    }
                    if (isFunction) {
                        val = value.call(this, i, jQuery(this).val())
                    } else {
                        val = value
                    }
                    if (val == null) {
                        val = ""
                    } else if (typeof val === "number") {
                        val += ""
                    } else if (jQuery.isArray(val)) {
                        val = jQuery.map(val, function(value) {
                            return value == null ? "" : value + ""
                        })
                    }
                    hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
                    if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
                        this.value = val
                    }
                })
            }
        });
        jQuery.extend({
            valHooks: {
                option: {
                    get: function(elem) {
                        var val = jQuery.find.attr(elem, "value");
                        return val != null ? val : jQuery.trim(jQuery.text(elem))
                    }
                },
                select: {
                    get: function(elem) {
                        var value,
                            option,
                            options = elem.options,
                            index = elem.selectedIndex,
                            one = elem.type === "select-one" || index < 0,
                            values = one ? null : [],
                            max = one ? index + 1 : options.length,
                            i = index < 0 ? max : one ? index : 0;
                        for (; i < max; i++) {
                            option = options[i];
                            if ((option.selected || i === index) && (support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                                value = jQuery(option).val();
                                if (one) {
                                    return value
                                }
                                values.push(value)
                            }
                        }
                        return values
                    },
                    set: function(elem, value) {
                        var optionSet,
                            option,
                            options = elem.options,
                            values = jQuery.makeArray(value),
                            i = options.length;
                        while (i--) {
                            option = options[i];
                            if ((option.selected = jQuery.inArray(option.value, values) >= 0)) {
                                optionSet = !0
                            }
                        }
                        if (!optionSet) {
                            elem.selectedIndex = -1
                        }
                        return values
                    }
                }
            }
        });
        jQuery.each(["radio", "checkbox"], function() {
            jQuery.valHooks[this] = {
                set: function(elem, value) {
                    if (jQuery.isArray(value)) {
                        return ( elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0)
                    }
                }
            };
            if (!support.checkOn) {
                jQuery.valHooks[this].get = function(elem) {
                    return elem.getAttribute("value") === null ? "on" : elem.value
                }
            }
        });
        jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
            jQuery.fn[name] = function(data, fn) {
                return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name)
            }
        });
        jQuery.fn.extend({
            hover: function(fnOver, fnOut) {
                return this.mouseenter(fnOver).mouseleave(fnOut || fnOver)
            },
            bind: function(types, data, fn) {
                return this.on(types, null, data, fn)
            },
            unbind: function(types, fn) {
                return this.off(types, null, fn)
            },
            delegate: function(selector, types, data, fn) {
                return this.on(types, selector, data, fn)
            },
            undelegate: function(selector, types, fn) {
                return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn)
            }
        });
        var nonce = jQuery.now();
        var rquery = (/\?/);
        jQuery.parseJSON = function(data) {
            return JSON.parse(data + "")
        };
        jQuery.parseXML = function(data) {
            var xml,
                tmp;
            if (!data || typeof data !== "string") {
                return null
            }
            try {
                tmp = new DOMParser();
                xml = tmp.parseFromString(data, "text/xml")
            } catch (e) {
                xml = undefined
            }
            if (!xml || xml.getElementsByTagName("parsererror").length) {
                jQuery.error("Invalid XML: " + data)
            }
            return xml
        };
        var rhash = /#.*$/,
            rts = /([?&])_=[^&]*/,
            rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
            rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            rnoContent = /^(?:GET|HEAD)$/,
            rprotocol = /^\/\//,
            rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
            prefilters = {},
            transports = {},
            allTypes = "*/".concat("*"),
            ajaxLocation = window.location.href,
            ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
        function addToPrefiltersOrTransports(structure) {
            return function(dataTypeExpression, func) {
                if (typeof dataTypeExpression !== "string") {
                    func = dataTypeExpression;
                    dataTypeExpression = "*"
                }
                var dataType,
                    i = 0,
                    dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
                if (jQuery.isFunction(func)) {
                    while ((dataType = dataTypes[i++])) {
                        if (dataType[0] === "+") {
                            dataType = dataType.slice(1) || "*";
                            (structure[dataType] = structure[dataType] || []).unshift(func)
                        } else {
                            (structure[dataType] = structure[dataType] || []).push(func)
                        }
                    }
                }
            }
        }
        function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
            var inspected = {},
                seekingTransport = (structure === transports);
            function inspect(dataType) {
                var selected;
                inspected[dataType] = !0;
                jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                    var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                    if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
                        options.dataTypes.unshift(dataTypeOrTransport);
                        inspect(dataTypeOrTransport);
                        return !1
                    } else if (seekingTransport) {
                        return !(selected = dataTypeOrTransport)
                    }
                });
                return selected
            }
            return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*")
        }
        function ajaxExtend(target, src) {
            var key,
                deep,
                flatOptions = jQuery.ajaxSettings.flatOptions || {};
            for (key in src) {
                if (src[key] !== undefined) {
                    (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key]
                }
            }
            if (deep) {
                jQuery.extend(!0, target, deep)
            }
            return target
        }
        function ajaxHandleResponses(s, jqXHR, responses) {
            var ct,
                type,
                finalDataType,
                firstDataType,
                contents = s.contents,
                dataTypes = s.dataTypes;
            while (dataTypes[0] === "*") {
                dataTypes.shift();
                if (ct === undefined) {
                    ct = s.mimeType || jqXHR.getResponseHeader("Content-Type")
                }
            }
            if (ct) {
                for (type in contents) {
                    if (contents[type] && contents[type].test(ct)) {
                        dataTypes.unshift(type);
                        break
                    }
                }
            }
            if (dataTypes[0] in responses) {
                finalDataType = dataTypes[0]
            } else {
                for (type in responses) {
                    if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                        finalDataType = type;
                        break
                    }
                    if (!firstDataType) {
                        firstDataType = type
                    }
                }
                finalDataType = finalDataType || firstDataType
            }
            if (finalDataType) {
                if (finalDataType !== dataTypes[0]) {
                    dataTypes.unshift(finalDataType)
                }
                return responses[finalDataType]
            }
        }
        function ajaxConvert(s, response, jqXHR, isSuccess) {
            var conv2,
                current,
                conv,
                tmp,
                prev,
                converters = {},
                dataTypes = s.dataTypes.slice();
            if (dataTypes[1]) {
                for (conv in s.converters) {
                    converters[conv.toLowerCase()] = s.converters[conv]
                }
            }
            current = dataTypes.shift();
            while (current) {
                if (s.responseFields[current]) {
                    jqXHR[s.responseFields[current]] = response
                }
                if (!prev && isSuccess && s.dataFilter) {
                    response = s.dataFilter(response, s.dataType)
                }
                prev = current;
                current = dataTypes.shift();
                if (current) {
                    if (current === "*") {
                        current = prev
                    } else if (prev !== "*" && prev !== current) {
                        conv = converters[prev + " " + current] || converters["* " + current];
                        if (!conv) {
                            for (conv2 in converters) {
                                tmp = conv2.split(" ");
                                if (tmp[1] === current) {
                                    conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                                    if (conv) {
                                        if (conv === !0) {
                                            conv = converters[conv2]
                                        } else if (converters[conv2] !== !0) {
                                            current = tmp[0];
                                            dataTypes.unshift(tmp[1])
                                        }
                                        break
                                    }
                                }
                            }
                        }
                        if (conv !== !0) {
                            if (conv && s["throws"]) {
                                response = conv(response)
                            } else {
                                try {
                                    response = conv(response)
                                } catch (e) {
                                    return {
                                        state: "parsererror",
                                        error: conv ? e : "No conversion from " + prev + " to " + current
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return {
                state: "success",
                data: response
            }
        }
        jQuery.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: ajaxLocation,
                type: "GET",
                isLocal: rlocalProtocol.test(ajaxLocParts[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": allTypes,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": jQuery.parseJSON,
                    "text xml": jQuery.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(target, settings) {
                return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target)
            },
            ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
            ajaxTransport: addToPrefiltersOrTransports(transports),
            ajax: function(url, options) {
                if (typeof url === "object") {
                    options = url;
                    url = undefined
                }
                options = options || {};
                var transport,
                    cacheURL,
                    responseHeadersString,
                    responseHeaders,
                    timeoutTimer,
                    parts,
                    fireGlobals,
                    i,
                    s = jQuery.ajaxSetup({}, options),
                    callbackContext = s.context || s,
                    globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
                    deferred = jQuery.Deferred(),
                    completeDeferred = jQuery.Callbacks("once memory"),
                    statusCode = s.statusCode || {},
                    requestHeaders = {},
                    requestHeadersNames = {},
                    state = 0,
                    strAbort = "canceled",
                    jqXHR = {
                        readyState: 0,
                        getResponseHeader: function(key) {
                            var match;
                            if (state === 2) {
                                if (!responseHeaders) {
                                    responseHeaders = {};
                                    while ((match = rheaders.exec(responseHeadersString))) {
                                        responseHeaders[match[1].toLowerCase()] = match[2]
                                    }
                                }
                                match = responseHeaders[key.toLowerCase()]
                            }
                            return match == null ? null : match
                        },
                        getAllResponseHeaders: function() {
                            return state === 2 ? responseHeadersString : null
                        },
                        setRequestHeader: function(name, value) {
                            var lname = name.toLowerCase();
                            if (!state) {
                                name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                                requestHeaders[name] = value
                            }
                            return this
                        },
                        overrideMimeType: function(type) {
                            if (!state) {
                                s.mimeType = type
                            }
                            return this
                        },
                        statusCode: function(map) {
                            var code;
                            if (map) {
                                if (state < 2) {
                                    for (code in map) {
                                        statusCode[code] = [statusCode[code], map[code]]
                                    }
                                } else {
                                    jqXHR.always(map[jqXHR.status])
                                }
                            }
                            return this
                        },
                        abort: function(statusText) {
                            var finalText = statusText || strAbort;
                            if (transport) {
                                transport.abort(finalText)
                            }
                            done(0, finalText);
                            return this
                        }
                    };
                deferred.promise(jqXHR).complete = completeDeferred.add;
                jqXHR.success = jqXHR.done;
                jqXHR.error = jqXHR.fail;
                s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");
                s.type = options.method || options.type || s.method || s.type;
                s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];
                if (s.crossDomain == null) {
                    parts = rurl.exec(s.url.toLowerCase());
                    s.crossDomain = !!(parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? "80" : "443")) !== (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443"))))
                }
                if (s.data && s.processData && typeof s.data !== "string") {
                    s.data = jQuery.param(s.data, s.traditional)
                }
                inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
                if (state === 2) {
                    return jqXHR
                }
                fireGlobals = jQuery.event && s.global;
                if (fireGlobals && jQuery.active++ === 0) {
                    jQuery.event.trigger("ajaxStart")
                }
                s.type = s.type.toUpperCase();
                s.hasContent = !rnoContent.test(s.type);
                cacheURL = s.url;
                if (!s.hasContent) {
                    if (s.data) {
                        cacheURL = (s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data);
                        delete s.data
                    }
                    if (s.cache === !1) {
                        s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++
                    }
                }
                if (s.ifModified) {
                    if (jQuery.lastModified[cacheURL]) {
                        jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL])
                    }
                    if (jQuery.etag[cacheURL]) {
                        jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])
                    }
                }
                if (s.data && s.hasContent && s.contentType !== !1 || options.contentType) {
                    jqXHR.setRequestHeader("Content-Type", s.contentType)
                }
                jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
                for (i in s.headers) {
                    jqXHR.setRequestHeader(i, s.headers[i])
                }
                if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === !1 || state === 2)) {
                    return jqXHR.abort()
                }
                strAbort = "abort";
                for (i in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) {
                    jqXHR[i](s[i])
                }
                transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
                if (!transport) {
                    done(-1, "No Transport")
                } else {
                    jqXHR.readyState = 1;
                    if (fireGlobals) {
                        globalEventContext.trigger("ajaxSend", [jqXHR, s])
                    }
                    if (s.async && s.timeout > 0) {
                        timeoutTimer = setTimeout(function() {
                            jqXHR.abort("timeout")
                        }, s.timeout)
                    }
                    try {
                        state = 1;
                        transport.send(requestHeaders, done)
                    } catch (e) {
                        if (state < 2) {
                            done(-1, e)
                        } else {
                            throw e
                        }
                    }
                }
                function done(status, nativeStatusText, responses, headers) {
                    var isSuccess,
                        success,
                        error,
                        response,
                        modified,
                        statusText = nativeStatusText;
                    if (state === 2) {
                        return
                    }
                    state = 2;
                    if (timeoutTimer) {
                        clearTimeout(timeoutTimer)
                    }
                    transport = undefined;
                    responseHeadersString = headers || "";
                    jqXHR.readyState = status > 0 ? 4 : 0;
                    isSuccess = status >= 200 && status < 300 || status === 304;
                    if (responses) {
                        response = ajaxHandleResponses(s, jqXHR, responses)
                    }
                    response = ajaxConvert(s, response, jqXHR, isSuccess);
                    if (isSuccess) {
                        if (s.ifModified) {
                            modified = jqXHR.getResponseHeader("Last-Modified");
                            if (modified) {
                                jQuery.lastModified[cacheURL] = modified
                            }
                            modified = jqXHR.getResponseHeader("etag");
                            if (modified) {
                                jQuery.etag[cacheURL] = modified
                            }
                        }
                        if (status === 204 || s.type === "HEAD") {
                            statusText = "nocontent"
                        } else if (status === 304) {
                            statusText = "notmodified"
                        } else {
                            statusText = response.state;
                            success = response.data;
                            error = response.error;
                            isSuccess = !error
                        }
                    } else {
                        error = statusText;
                        if (status || !statusText) {
                            statusText = "error";
                            if (status < 0) {
                                status = 0
                            }
                        }
                    }
                    jqXHR.status = status;
                    jqXHR.statusText = (nativeStatusText || statusText) + "";
                    if (isSuccess) {
                        deferred.resolveWith(callbackContext, [success, statusText, jqXHR])
                    } else {
                        deferred.rejectWith(callbackContext, [jqXHR, statusText, error])
                    }
                    jqXHR.statusCode(statusCode);
                    statusCode = undefined;
                    if (fireGlobals) {
                        globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error])
                    }
                    completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
                    if (fireGlobals) {
                        globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                        if (!(--jQuery.active)) {
                            jQuery.event.trigger("ajaxStop")
                        }
                    }
                }
                return jqXHR
            },
            getJSON: function(url, data, callback) {
                return jQuery.get(url, data, callback, "json")
            },
            getScript: function(url, callback) {
                return jQuery.get(url, undefined, callback, "script")
            }
        });
        jQuery.each(["get", "post"], function(i, method) {
            jQuery[method] = function(url, data, callback, type) {
                if (jQuery.isFunction(data)) {
                    type = type || callback;
                    callback = data;
                    data = undefined
                }
                return jQuery.ajax({
                    url: url,
                    type: method,
                    dataType: type,
                    data: data,
                    success: callback
                })
            }
        });
        jQuery._evalUrl = function(url) {
            return jQuery.ajax({
                url: url,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                "throws": !0
            })
        };
        jQuery.fn.extend({
            wrapAll: function(html) {
                var wrap;
                if (jQuery.isFunction(html)) {
                    return this.each(function(i) {
                        jQuery(this).wrapAll(html.call(this, i))
                    })
                }
                if (this[0]) {
                    wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0);
                    if (this[0].parentNode) {
                        wrap.insertBefore(this[0])
                    }
                    wrap.map(function() {
                        var elem = this;
                        while (elem.firstElementChild) {
                            elem = elem.firstElementChild
                        }
                        return elem
                    }).append(this)
                }
                return this
            },
            wrapInner: function(html) {
                if (jQuery.isFunction(html)) {
                    return this.each(function(i) {
                        jQuery(this).wrapInner(html.call(this, i))
                    })
                }
                return this.each(function() {
                    var self = jQuery(this),
                        contents = self.contents();
                    if (contents.length) {
                        contents.wrapAll(html)
                    } else {
                        self.append(html)
                    }
                })
            },
            wrap: function(html) {
                var isFunction = jQuery.isFunction(html);
                return this.each(function(i) {
                    jQuery(this).wrapAll(isFunction ? html.call(this, i) : html)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    if (!jQuery.nodeName(this, "body")) {
                        jQuery(this).replaceWith(this.childNodes)
                    }
                }).end()
            }
        });
        jQuery.expr.filters.hidden = function(elem) {
            return elem.offsetWidth <= 0 && elem.offsetHeight <= 0
        };
        jQuery.expr.filters.visible = function(elem) {
            return !jQuery.expr.filters.hidden(elem)
        };
        var r20 = /%20/g,
            rbracket = /\[\]$/,
            rCRLF = /\r?\n/g,
            rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
            rsubmittable = /^(?:input|select|textarea|keygen)/i;
        function buildParams(prefix, obj, traditional, add) {
            var name;
            if (jQuery.isArray(obj)) {
                jQuery.each(obj, function(i, v) {
                    if (traditional || rbracket.test(prefix)) {
                        add(prefix, v)
                    } else {
                        buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add)
                    }
                })
            } else if (!traditional && jQuery.type(obj) === "object") {
                for (name in obj) {
                    buildParams(prefix + "[" + name + "]", obj[name], traditional, add)
                }
            } else {
                add(prefix, obj)
            }
        }
        jQuery.param = function(a, traditional) {
            var prefix,
                s = [],
                add = function(key, value) {
                    value = jQuery.isFunction(value) ? value() : (value == null ? "" : value);
                    s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value)
                };
            if (traditional === undefined) {
                traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional
            }
            if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
                jQuery.each(a, function() {
                    add(this.name, this.value)
                })
            } else {
                for (prefix in a) {
                    buildParams(prefix, a[prefix], traditional, add)
                }
            }
            return s.join("&").replace(r20, "+")
        };
        jQuery.fn.extend({
            serialize: function() {
                return jQuery.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var elements = jQuery.prop(this, "elements");
                    return elements ? jQuery.makeArray(elements) : this
                }).filter(function() {
                    var type = this.type;
                    return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type))
                }).map(function(i, elem) {
                    var val = jQuery(this).val();
                    return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                        return {
                            name: elem.name,
                            value: val.replace(rCRLF, "\r\n")
                        }
                    }) : {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    }
                }).get()
            }
        });
        jQuery.ajaxSettings.xhr = function() {
            try {
                return new XMLHttpRequest()
            } catch (e) {}
        };
        var xhrId = 0,
            xhrCallbacks = {},
            xhrSuccessStatus = {
                0: 200,
                1223: 204
            },
            xhrSupported = jQuery.ajaxSettings.xhr();
        if (window.attachEvent) {
            window.attachEvent("onunload", function() {
                for (var key in xhrCallbacks) {
                    xhrCallbacks[key]()
                }
            })
        }
        support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
        support.ajax = xhrSupported = !!xhrSupported;
        jQuery.ajaxTransport(function(options) {
            var callback;
            if (support.cors || xhrSupported && !options.crossDomain) {
                return {
                    send: function(headers, complete) {
                        var i,
                            xhr = options.xhr(),
                            id = ++xhrId;
                        xhr.open(options.type, options.url, options.async, options.username, options.password);
                        if (options.xhrFields) {
                            for (i in options.xhrFields) {
                                xhr[i] = options.xhrFields[i]
                            }
                        }
                        if (options.mimeType && xhr.overrideMimeType) {
                            xhr.overrideMimeType(options.mimeType)
                        }
                        if (!options.crossDomain && !headers["X-Requested-With"]) {
                            headers["X-Requested-With"] = "XMLHttpRequest"
                        }
                        for (i in headers) {
                            xhr.setRequestHeader(i, headers[i])
                        }
                        callback = function(type) {
                            return function() {
                                if (callback) {
                                    delete xhrCallbacks[id];
                                    callback = xhr.onload = xhr.onerror = null;
                                    if (type === "abort") {
                                        xhr.abort()
                                    } else if (type === "error") {
                                        complete(xhr.status, xhr.statusText)
                                    } else {
                                        complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, typeof xhr.responseText === "string" ? {
                                            text: xhr.responseText
                                        } : undefined, xhr.getAllResponseHeaders())
                                    }
                                }
                            }
                        };
                        xhr.onload = callback();
                        xhr.onerror = callback("error");
                        callback = xhrCallbacks[id] = callback("abort");
                        try {
                            xhr.send(options.hasContent && options.data || null)
                        } catch (e) {
                            if (callback) {
                                throw e
                            }
                        }
                    },
                    abort: function() {
                        if (callback) {
                            callback()
                        }
                    }
                }
            }
        });
        jQuery.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /(?:java|ecma)script/
            },
            converters: {
                "text script": function(text) {
                    jQuery.globalEval(text);
                    return text
                }
            }
        });
        jQuery.ajaxPrefilter("script", function(s) {
            if (s.cache === undefined) {
                s.cache = !1
            }
            if (s.crossDomain) {
                s.type = "GET"
            }
        });
        jQuery.ajaxTransport("script", function(s) {
            if (s.crossDomain) {
                var script,
                    callback;
                return {
                    send: function(_, complete) {
                        script = jQuery("<script>").prop({
                            async: !0,
                            charset: s.scriptCharset,
                            src: s.url
                        }).on("load error", callback = function(evt) {
                            script.remove();
                            callback = null;
                            if (evt) {
                                complete(evt.type === "error" ? 404 : 200, evt.type)
                            }
                        });
                        document.head.appendChild(script[0])
                    },
                    abort: function() {
                        if (callback) {
                            callback()
                        }
                    }
                }
            }
        });
        var oldCallbacks = [],
            rjsonp = /(=)\?(?=&|$)|\?\?/;
        jQuery.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
                this[callback] = !0;
                return callback
            }
        });
        jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
            var callbackName,
                overwritten,
                responseContainer,
                jsonProp = s.jsonp !== !1 && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
            if (jsonProp || s.dataTypes[0] === "jsonp") {
                callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
                if (jsonProp) {
                    s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName)
                } else if (s.jsonp !== !1) {
                    s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName
                }
                s.converters["script json"] = function() {
                    if (!responseContainer) {
                        jQuery.error(callbackName + " was not called")
                    }
                    return responseContainer[0]
                };
                s.dataTypes[0] = "json";
                overwritten = window[callbackName];
                window[callbackName] = function() {
                    responseContainer = arguments
                };
                jqXHR.always(function() {
                    window[callbackName] = overwritten;
                    if (s[callbackName]) {
                        s.jsonpCallback = originalSettings.jsonpCallback;
                        oldCallbacks.push(callbackName)
                    }
                    if (responseContainer && jQuery.isFunction(overwritten)) {
                        overwritten(responseContainer[0])
                    }
                    responseContainer = overwritten = undefined
                });
                return "script"
            }
        });
        jQuery.parseHTML = function(data, context, keepScripts) {
            if (!data || typeof data !== "string") {
                return null
            }
            if (typeof context === "boolean") {
                keepScripts = context;
                context = !1
            }
            context = context || document;
            var parsed = rsingleTag.exec(data),
                scripts = !keepScripts && [];
            if (parsed) {
                return [context.createElement(parsed[1])]
            }
            parsed = jQuery.buildFragment([data], context, scripts);
            if (scripts && scripts.length) {
                jQuery(scripts).remove()
            }
            return jQuery.merge([], parsed.childNodes)
        };
        var _load = jQuery.fn.load;
        jQuery.fn.load = function(url, params, callback) {
            if (typeof url !== "string" && _load) {
                return _load.apply(this, arguments)
            }
            var selector,
                type,
                response,
                self = this,
                off = url.indexOf(" ");
            if (off >= 0) {
                selector = jQuery.trim(url.slice(off));
                url = url.slice(0, off)
            }
            if (jQuery.isFunction(params)) {
                callback = params;
                params = undefined
            } else if (params && typeof params === "object") {
                type = "POST"
            }
            if (self.length > 0) {
                jQuery.ajax({
                    url: url,
                    type: type,
                    dataType: "html",
                    data: params
                }).done(function(responseText) {
                    response = arguments;
                    self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText)
                }).complete(callback && function(jqXHR, status) {
                    self.each(callback, response || [jqXHR.responseText, status, jqXHR])
                })
            }
            return this
        };
        jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
            jQuery.fn[type] = function(fn) {
                return this.on(type, fn)
            }
        });
        jQuery.expr.filters.animated = function(elem) {
            return jQuery.grep(jQuery.timers, function(fn) {
                return elem === fn.elem
            }).length
        };
        var docElem = window.document.documentElement;
        function getWindow(elem) {
            return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView
        }
        jQuery.offset = {
            setOffset: function(elem, options, i) {
                var curPosition,
                    curLeft,
                    curCSSTop,
                    curTop,
                    curOffset,
                    curCSSLeft,
                    calculatePosition,
                    position = jQuery.css(elem, "position"),
                    curElem = jQuery(elem),
                    props = {};
                if (position === "static") {
                    elem.style.position = "relative"
                }
                curOffset = curElem.offset();
                curCSSTop = jQuery.css(elem, "top");
                curCSSLeft = jQuery.css(elem, "left");
                calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
                if (calculatePosition) {
                    curPosition = curElem.position();
                    curTop = curPosition.top;
                    curLeft = curPosition.left
                } else {
                    curTop = parseFloat(curCSSTop) || 0;
                    curLeft = parseFloat(curCSSLeft) || 0
                }
                if (jQuery.isFunction(options)) {
                    options = options.call(elem, i, curOffset)
                }
                if (options.top != null) {
                    props.top = (options.top - curOffset.top) + curTop
                }
                if (options.left != null) {
                    props.left = (options.left - curOffset.left) + curLeft
                }
                if ("using" in options) {
                    options.using.call(elem, props)
                } else {
                    curElem.css(props)
                }
            }
        };
        jQuery.fn.extend({
            offset: function(options) {
                if (arguments.length) {
                    return options === undefined ? this : this.each(function(i) {
                        jQuery.offset.setOffset(this, options, i)
                    })
                }
                var docElem,
                    win,
                    elem = this[0],
                    box = {
                        top: 0,
                        left: 0
                    },
                    doc = elem && elem.ownerDocument;
                if (!doc) {
                    return
                }
                docElem = doc.documentElement;
                if (!jQuery.contains(docElem, elem)) {
                    return box
                }
                if (typeof elem.getBoundingClientRect !== strundefined) {
                    box = elem.getBoundingClientRect()
                }
                win = getWindow(doc);
                return {
                    top: box.top + win.pageYOffset - docElem.clientTop,
                    left: box.left + win.pageXOffset - docElem.clientLeft
                }
            },
            position: function() {
                if (!this[0]) {
                    return
                }
                var offsetParent,
                    offset,
                    elem = this[0],
                    parentOffset = {
                        top: 0,
                        left: 0
                    };
                if (jQuery.css(elem, "position") === "fixed") {
                    offset = elem.getBoundingClientRect()
                } else {
                    offsetParent = this.offsetParent();
                    offset = this.offset();
                    if (!jQuery.nodeName(offsetParent[0], "html")) {
                        parentOffset = offsetParent.offset()
                    }
                    parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", !0);
                    parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", !0)
                }
                return {
                    top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", !0),
                    left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", !0)
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    var offsetParent = this.offsetParent || docElem;
                    while (offsetParent && (!jQuery.nodeName(offsetParent, "html") && jQuery.css(offsetParent, "position") === "static")) {
                        offsetParent = offsetParent.offsetParent
                    }
                    return offsetParent || docElem
                })
            }
        });
        jQuery.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(method, prop) {
            var top = "pageYOffset" === prop;
            jQuery.fn[method] = function(val) {
                return access(this, function(elem, method, val) {
                    var win = getWindow(elem);
                    if (val === undefined) {
                        return win ? win[prop] : elem[method]
                    }
                    if (win) {
                        win.scrollTo(!top ? val : window.pageXOffset, top ? val : window.pageYOffset)
                    } else {
                        elem[method] = val
                    }
                }, method, val, arguments.length, null)
            }
        });
        jQuery.each(["top", "left"], function(i, prop) {
            jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
                if (computed) {
                    computed = curCSS(elem, prop);
                    return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed
                }
            })
        });
        jQuery.each({
            Height: "height",
            Width: "width"
        }, function(name, type) {
            jQuery.each({
                padding: "inner" + name,
                content: type,
                "": "outer" + name
            }, function(defaultExtra, funcName) {
                jQuery.fn[funcName] = function(margin, value) {
                    var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
                        extra = defaultExtra || (margin === !0 || value === !0 ? "margin" : "border");
                    return access(this, function(elem, type, value) {
                        var doc;
                        if (jQuery.isWindow(elem)) {
                            return elem.document.documentElement["client" + name]
                        }
                        if (elem.nodeType === 9) {
                            doc = elem.documentElement;
                            return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])
                        }
                        return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra)
                    }, type, chainable ? margin : undefined, chainable, null)
                }
            })
        });
        jQuery.fn.size = function() {
            return this.length
        };
        jQuery.fn.andSelf = jQuery.fn.addBack;
        if (typeof define === "function" && define.amd) {
            define("jquery", [], function() {
                return jQuery
            })
        }
        var _jQuery = window.jQuery,
            _$ = window.$;
        jQuery.noConflict = function(deep) {
            if (window.$ === jQuery) {
                window.$ = _$
            }
            if (deep && window.jQuery === jQuery) {
                window.jQuery = _jQuery
            }
            return jQuery
        };
        if (typeof noGlobal === strundefined) {
            window.jQuery = window.$ = jQuery
        }
        return jQuery
    }));
    (function($) {
        var
            ns = (new Date).getTime(),
            special = $.event.special,
            dispatch = $.event.handle || $.event.dispatch,
            scroll = 'scroll',
            scrollStart = scroll + 'start',
            scrollEnd = scroll + 'end',
            nsScrollStart = scroll + '.' + scrollStart + ns,
            nsScrollEnd = scroll + '.' + scrollEnd + ns;
        special.scrollstart = {
            setup: function() {
                var pid,
                    handler = function(evt) {
                        if (pid == null) {
                            evt.type = scrollStart;
                            dispatch.apply(this, arguments)
                        }
                        else {
                            clearTimeout(pid)
                        }
                        pid = setTimeout(function() {
                            pid = null
                        }, special.scrollend.delay)
                    };
                $(this).bind(nsScrollStart, handler)
            },
            teardown: function() {
                $(this).unbind(nsScrollStart)
            }
        };
        special.scrollend = {
            delay: 300,
            setup: function() {
                var pid,
                    handler = function(evt) {
                        var _this = this,
                            args = arguments;
                        clearTimeout(pid);
                        pid = setTimeout(function() {
                            evt.type = scrollEnd;
                            dispatch.apply(_this, args)
                        }, special.scrollend.delay)
                    };
                $(this).bind(nsScrollEnd, handler)
            },
            teardown: function() {
                $(this).unbind(nsScrollEnd)
            }
        };
        $.isScrolled = !1;
        $(window).bind(scrollStart + ' ' + scrollEnd, function(evt) {
            $.isScrolled = (evt.type == scrollStart);
            $('body')[$.isScrolled ? 'addClass' : 'removeClass']('is-scrolled')
        })
    })(jQuery);
    !function(t, n) {
        "object" == typeof exports && "object" == typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define([], n) : "object" == typeof exports ? exports.Scrollbar = n() : t.Scrollbar = n()
    }(this, function() {
        return function(t) {
            function n(r) {
                if (e[r])
                    return e[r].exports;
                var o = e[r] = {
                    i: r,
                    l: !1,
                    exports: {}
                };
                return t[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
            }
            var e = {};
            return n.m = t, n.c = e, n.d = function(t, e, r) {
                n.o(t, e) || Object.defineProperty(t, e, {
                    configurable: !1,
                    enumerable: !0,
                    get: r
                })
            }, n.n = function(t) {
                var e = t && t.__esModule ? function() {
                    return t.default
                } : function() {
                    return t
                };
                return n.d(e, "a", e), e
            }, n.o = function(t, n) {
                return Object.prototype.hasOwnProperty.call(t, n)
            }, n.p = "", n(n.s = 56)
        }([function(t, n, e) {
            var r = e(39)("wks"),
                o = e(16),
                i = e(2).Symbol,
                u = "function" == typeof i;
            (t.exports = function(t) {
                return r[t] || (r[t] = u && i[t] || (u ? i : o)("Symbol." + t))
            }).store = r
        }, function(t, n) {
            t.exports = function(t) {
                return "object" == typeof t ? null !== t : "function" == typeof t
            }
        }, function(t, n) {
            var e = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
            "number" == typeof __g && (__g = e)
        }, function(t, n) {
            var e = {}.hasOwnProperty;
            t.exports = function(t, n) {
                return e.call(t, n)
            }
        }, function(t, n) {
            var e = t.exports = {
                version: "2.5.1"
            };
            "number" == typeof __e && (__e = e)
        }, function(t, n, e) {
            var r = e(2),
                o = e(4),
                i = e(11),
                u = e(6),
                c = e(10),
                s = function(t, n, e) {
                    var a,
                        f,
                        l,
                        p,
                        h = t & s.F,
                        d = t & s.G,
                        v = t & s.S,
                        y = t & s.P,
                        m = t & s.B,
                        g = d ? r : v ? r[n] || (r[n] = {}) : (r[n] || {}).prototype,
                        b = d ? o : o[n] || (o[n] = {}),
                        x = b.prototype || (b.prototype = {});
                    d && (e = n);
                    for (a in e)
                        f = !h && g && void 0 !== g[a], l = (f ? g : e)[a], p = m && f ? c(l, r) : y && "function" == typeof l ? c(Function.call, l) : l, g && u(g, a, l, t & s.U), b[a] != l && i(b, a, p), y && x[a] != l && (x[a] = l)
                };
            r.core = o, s.F = 1, s.G = 2, s.S = 4, s.P = 8, s.B = 16, s.W = 32, s.U = 64, s.R = 128, t.exports = s
        }, function(t, n, e) {
            var r = e(2),
                o = e(11),
                i = e(3),
                u = e(16)("src"),
                c = Function.toString,
                s = ("" + c).split("toString");
            e(4).inspectSource = function(t) {
                return c.call(t)
            }, (t.exports = function(t, n, e, c) {
                var a = "function" == typeof e;
                a && (i(e, "name") || o(e, "name", n)), t[n] !== e && (a && (i(e, u) || o(e, u, t[n] ? "" + t[n] : s.join(String(n)))), t === r ? t[n] = e : c ? t[n] ? t[n] = e : o(t, n, e) : (delete t[n], o(t, n, e)))
            })(Function.prototype, "toString", function() {
                return "function" == typeof this && this[u] || c.call(this)
            })
        }, function(t, n, e) {
            var r = e(8),
                o = e(40),
                i = e(42),
                u = Object.defineProperty;
            n.f = e(9) ? Object.defineProperty : function(t, n, e) {
                if (r(t), n = i(n, !0), r(e), o)
                    try {
                        return u(t, n, e)
                    } catch (t) {}
                if ("get" in e || "set" in e)
                    throw TypeError("Accessors not supported!");
                return "value" in e && (t[n] = e.value), t
            }
        }, function(t, n, e) {
            var r = e(1);
            t.exports = function(t) {
                if (!r(t))
                    throw TypeError(t + " is not an object!");
                return t
            }
        }, function(t, n, e) {
            t.exports = !e(12)(function() {
                return 7 != Object.defineProperty({}, "a", {
                    get: function() {
                        return 7
                    }
                }).a
            })
        }, function(t, n, e) {
            var r = e(43);
            t.exports = function(t, n, e) {
                if (r(t), void 0 === n)
                    return t;
                switch (e) {
                case 1:
                    return function(e) {
                        return t.call(n, e)
                    };
                case 2:
                    return function(e, r) {
                        return t.call(n, e, r)
                    };
                case 3:
                    return function(e, r, o) {
                        return t.call(n, e, r, o)
                    }
                }
                return function() {
                    return t.apply(n, arguments)
                }
            }
        }, function(t, n, e) {
            var r = e(7),
                o = e(17);
            t.exports = e(9) ? function(t, n, e) {
                return r.f(t, n, o(1, e))
            } : function(t, n, e) {
                return t[n] = e, t
            }
        }, function(t, n) {
            t.exports = function(t) {
                try {
                    return !!t()
                } catch (t) {
                    return !0
                }
            }
        }, function(t, n) {
            t.exports = {}
        }, function(t, n, e) {
            var r = e(10),
                o = e(48),
                i = e(49),
                u = e(8),
                c = e(19),
                s = e(50),
                a = {},
                f = {},
                n = t.exports = function(t, n, e, l, p) {
                    var h,
                        d,
                        v,
                        y,
                        m = p ? function() {
                            return t
                        } : s(t),
                        g = r(e, l, n ? 2 : 1),
                        b = 0;
                    if ("function" != typeof m)
                        throw TypeError(t + " is not iterable!");
                    if (i(m)) {
                        for (h = c(t.length); h > b; b++)
                            if ((y = n ? g(u(d = t[b])[0], d[1]) : g(t[b])) === a || y === f)
                                return y
                    } else
                        for (v = m.call(t); !(d = v.next()).done;)
                            if ((y = o(v, g, d.value, n)) === a || y === f)
                                return y
                };
            n.BREAK = a, n.RETURN = f
        }, function(t, n, e) {
            var r = e(1);
            t.exports = function(t, n) {
                if (!r(t) || t._t !== n)
                    throw TypeError("Incompatible receiver, " + n + " required!");
                return t
            }
        }, function(t, n) {
            var e = 0,
                r = Math.random();
            t.exports = function(t) {
                return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++e + r).toString(36))
            }
        }, function(t, n) {
            t.exports = function(t, n) {
                return {
                    enumerable: !(1 & t),
                    configurable: !(2 & t),
                    writable: !(4 & t),
                    value: n
                }
            }
        }, function(t, n, e) {
            var r = e(30),
                o = e(27);
            t.exports = function(t) {
                return r(o(t))
            }
        }, function(t, n, e) {
            var r = e(26),
                o = Math.min;
            t.exports = function(t) {
                return t > 0 ? o(r(t), 9007199254740991) : 0
            }
        }, function(t, n, e) {
            var r = e(27);
            t.exports = function(t) {
                return Object(r(t))
            }
        }, function(t, n, e) {
            var r = e(16)("meta"),
                o = e(1),
                i = e(3),
                u = e(7).f,
                c = 0,
                s = Object.isExtensible || function() {
                    return !0
                },
                a = !e(12)(function() {
                    return s(Object.preventExtensions({}))
                }),
                f = function(t) {
                    u(t, r, {
                        value: {
                            i: "O" + ++c,
                            w: {}
                        }
                    })
                },
                l = function(t, n) {
                    if (!o(t))
                        return "symbol" == typeof t ? t : ("string" == typeof t ? "S" : "P") + t;
                    if (!i(t, r)) {
                        if (!s(t))
                            return "F";
                        if (!n)
                            return "E";
                        f(t)
                    }
                    return t[r].i
                },
                p = function(t, n) {
                    if (!i(t, r)) {
                        if (!s(t))
                            return !0;
                        if (!n)
                            return !1;
                        f(t)
                    }
                    return t[r].w
                },
                h = function(t) {
                    return a && d.NEED && s(t) && !i(t, r) && f(t), t
                },
                d = t.exports = {
                    KEY: r,
                    NEED: !1,
                    fastKey: l,
                    getWeak: p,
                    onFreeze: h
                }
        }, function(t, n, e) {
            "use strict";
            var r = e(23),
                o = {};
            o[e(0)("toStringTag")] = "z", o + "" != "[object z]" && e(6)(Object.prototype, "toString", function() {
                return "[object " + r(this) + "]"
            }, !0)
        }, function(t, n, e) {
            var r = e(24),
                o = e(0)("toStringTag"),
                i = "Arguments" == r(function() {
                    return arguments
                }()),
                u = function(t, n) {
                    try {
                        return t[n]
                    } catch (t) {}
                };
            t.exports = function(t) {
                var n,
                    e,
                    c;
                return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (e = u(n = Object(t), o)) ? e : i ? r(n) : "Object" == (c = r(n)) && "function" == typeof n.callee ? "Arguments" : c
            }
        }, function(t, n) {
            var e = {}.toString;
            t.exports = function(t) {
                return e.call(t).slice(8, -1)
            }
        }, function(t, n, e) {
            "use strict";
            var r = e(59)(!0);
            e(28)(String, "String", function(t) {
                this._t = String(t), this._i = 0
            }, function() {
                var t,
                    n = this._t,
                    e = this._i;
                return e >= n.length ? {
                    value: void 0,
                    done: !0
                } : (t = r(n, e), this._i += t.length, {
                    value: t,
                    done: !1
                })
            })
        }, function(t, n) {
            var e = Math.ceil,
                r = Math.floor;
            t.exports = function(t) {
                return isNaN(t = +t) ? 0 : (t > 0 ? r : e)(t)
            }
        }, function(t, n) {
            t.exports = function(t) {
                if (void 0 == t)
                    throw TypeError("Can't call method on  " + t);
                return t
            }
        }, function(t, n, e) {
            "use strict";
            var r = e(60),
                o = e(5),
                i = e(6),
                u = e(11),
                c = e(3),
                s = e(13),
                a = e(61),
                f = e(32),
                l = e(67),
                p = e(0)("iterator"),
                h = !([].keys && "next" in [].keys()),
                d = function() {
                    return this
                };
            t.exports = function(t, n, e, v, y, m, g) {
                a(e, n, v);
                var b,
                    x,
                    _,
                    w = function(t) {
                        if (!h && t in T)
                            return T[t];
                        switch (t) {
                        case "keys":
                        case "values":
                            return function() {
                                return new e(this, t)
                            }
                        }
                        return function() {
                            return new e(this, t)
                        }
                    },
                    S = n + " Iterator",
                    E = "values" == y,
                    O = !1,
                    T = t.prototype,
                    M = T[p] || T["@@iterator"] || y && T[y],
                    A = M || w(y),
                    P = y ? E ? w("entries") : A : void 0,
                    j = "Array" == n ? T.entries || M : M;
                if (j && (_ = l(j.call(new t))) !== Object.prototype && _.next && (f(_, S, !0), r || c(_, p) || u(_, p, d)), E && M && "values" !== M.name && (O = !0, A = function() {
                    return M.call(this)
                }), r && !g || !h && !O && T[p] || u(T, p, A), s[n] = A, s[S] = d, y)
                    if (b = {
                        values: E ? A : w("values"),
                        keys: m ? A : w("keys"),
                        entries: P
                    }, g)
                        for (x in b)
                            x in T || i(T, x, b[x]);
                    else
                        o(o.P + o.F * (h || O), n, b);
                return b
            }
        }, function(t, n, e) {
            var r = e(63),
                o = e(45);
            t.exports = Object.keys || function(t) {
                return r(t, o)
            }
        }, function(t, n, e) {
            var r = e(24);
            t.exports = Object("z").propertyIsEnumerable(0) ? Object : function(t) {
                return "String" == r(t) ? t.split("") : Object(t)
            }
        }, function(t, n, e) {
            var r = e(39)("keys"),
                o = e(16);
            t.exports = function(t) {
                return r[t] || (r[t] = o(t))
            }
        }, function(t, n, e) {
            var r = e(7).f,
                o = e(3),
                i = e(0)("toStringTag");
            t.exports = function(t, n, e) {
                t && !o(t = e ? t : t.prototype, i) && r(t, i, {
                    configurable: !0,
                    value: n
                })
            }
        }, function(t, n, e) {
            for (var r = e(68), o = e(29), i = e(6), u = e(2), c = e(11), s = e(13), a = e(0), f = a("iterator"), l = a("toStringTag"), p = s.Array, h = {
                    CSSRuleList: !0,
                    CSSStyleDeclaration: !1,
                    CSSValueList: !1,
                    ClientRectList: !1,
                    DOMRectList: !1,
                    DOMStringList: !1,
                    DOMTokenList: !0,
                    DataTransferItemList: !1,
                    FileList: !1,
                    HTMLAllCollection: !1,
                    HTMLCollection: !1,
                    HTMLFormElement: !1,
                    HTMLSelectElement: !1,
                    MediaList: !0,
                    MimeTypeArray: !1,
                    NamedNodeMap: !1,
                    NodeList: !0,
                    PaintRequestList: !1,
                    Plugin: !1,
                    PluginArray: !1,
                    SVGLengthList: !1,
                    SVGNumberList: !1,
                    SVGPathSegList: !1,
                    SVGPointList: !1,
                    SVGStringList: !1,
                    SVGTransformList: !1,
                    SourceBufferList: !1,
                    StyleSheetList: !0,
                    TextTrackCueList: !1,
                    TextTrackList: !1,
                    TouchList: !1
                }, d = o(h), v = 0; v < d.length; v++) {
                var y,
                    m = d[v],
                    g = h[m],
                    b = u[m],
                    x = b && b.prototype;
                if (x && (x[f] || c(x, f, p), x[l] || c(x, l, m), s[m] = p, g))
                    for (y in r)
                        x[y] || i(x, y, r[y], !0)
            }
        }, function(t, n, e) {
            var r = e(6);
            t.exports = function(t, n, e) {
                for (var o in n)
                    r(t, o, n[o], e);
                return t
            }
        }, function(t, n) {
            t.exports = function(t, n, e, r) {
                if (!(t instanceof n) || void 0 !== r && r in t)
                    throw TypeError(e + ": incorrect invocation!");
                return t
            }
        }, function(t, n, e) {
            "use strict";
            var r = e(2),
                o = e(5),
                i = e(6),
                u = e(34),
                c = e(21),
                s = e(14),
                a = e(35),
                f = e(1),
                l = e(12),
                p = e(51),
                h = e(32),
                d = e(72);
            t.exports = function(t, n, e, v, y, m) {
                var g = r[t],
                    b = g,
                    x = y ? "set" : "add",
                    _ = b && b.prototype,
                    w = {},
                    S = function(t) {
                        var n = _[t];
                        i(_, t, "delete" == t ? function(t) {
                            return !(m && !f(t)) && n.call(this, 0 === t ? 0 : t)
                        } : "has" == t ? function(t) {
                            return !(m && !f(t)) && n.call(this, 0 === t ? 0 : t)
                        } : "get" == t ? function(t) {
                            return m && !f(t) ? void 0 : n.call(this, 0 === t ? 0 : t)
                        } : "add" == t ? function(t) {
                            return n.call(this, 0 === t ? 0 : t), this
                        } : function(t, e) {
                            return n.call(this, 0 === t ? 0 : t, e), this
                        })
                    };
                if ("function" == typeof b && (m || _.forEach && !l(function() {
                    (new b).entries().next()
                }))) {
                    var E = new b,
                        O = E[x](m ? {} : -0, 1) != E,
                        T = l(function() {
                            E.has(1)
                        }),
                        M = p(function(t) {
                            new b(t)
                        }),
                        A = !m && l(function() {
                            for (var t = new b, n = 5; n--;)
                                t[x](n, n);
                            return !t.has(-0)
                        });
                    M || (b = n(function(n, e) {
                        a(n, b, t);
                        var r = d(new g, n, b);
                        return void 0 != e && s(e, y, r[x], r), r
                    }), b.prototype = _, _.constructor = b), (T || A) && (S("delete"), S("has"), y && S("get")), (A || O) && S(x), m && _.clear && delete _.clear
                } else
                    b = v.getConstructor(n, t, y, x), u(b.prototype, e), c.NEED = !0;
                return h(b, t), w[t] = b, o(o.G + o.W + o.F * (b != g), w), m || v.setStrong(b, t, y), b
            }
        }, function(t, n, e) {
            "use strict";
            var r = e(5);
            t.exports = function(t) {
                r(r.S, t, {
                    of: function() {
                        for (var t = arguments.length, n = Array(t); t--;)
                            n[t] = arguments[t];
                        return new this(n)
                    }
                })
            }
        }, function(t, n, e) {
            "use strict";
            var r = e(5),
                o = e(43),
                i = e(10),
                u = e(14);
            t.exports = function(t) {
                r(r.S, t, {
                    from: function(t) {
                        var n,
                            e,
                            r,
                            c,
                            s = arguments[1];
                        return o(this), n = void 0 !== s, n && o(s), void 0 == t ? new this : (e = [], n ? (r = 0, c = i(s, arguments[2], 2), u(t, !1, function(t) {
                            e.push(c(t, r++))
                        })) : u(t, !1, e.push, e), new this(e))
                    }
                })
            }
        }, function(t, n, e) {
            var r = e(2),
                o = r["__core-js_shared__"] || (r["__core-js_shared__"] = {});
            t.exports = function(t) {
                return o[t] || (o[t] = {})
            }
        }, function(t, n, e) {
            t.exports = !e(9) && !e(12)(function() {
                return 7 != Object.defineProperty(e(41)("div"), "a", {
                    get: function() {
                        return 7
                    }
                }).a
            })
        }, function(t, n, e) {
            var r = e(1),
                o = e(2).document,
                i = r(o) && r(o.createElement);
            t.exports = function(t) {
                return i ? o.createElement(t) : {}
            }
        }, function(t, n, e) {
            var r = e(1);
            t.exports = function(t, n) {
                if (!r(t))
                    return t;
                var e,
                    o;
                if (n && "function" == typeof (e = t.toString) && !r(o = e.call(t)))
                    return o;
                if ("function" == typeof (e = t.valueOf) && !r(o = e.call(t)))
                    return o;
                if (!n && "function" == typeof (e = t.toString) && !r(o = e.call(t)))
                    return o;
                throw TypeError("Can't convert object to primitive value")
            }
        }, function(t, n) {
            t.exports = function(t) {
                if ("function" != typeof t)
                    throw TypeError(t + " is not a function!");
                return t
            }
        }, function(t, n, e) {
            var r = e(8),
                o = e(62),
                i = e(45),
                u = e(31)("IE_PROTO"),
                c = function() {},
                s = function() {
                    var t,
                        n = e(41)("iframe"),
                        r = i.length;
                    for (n.style.display = "none", e(66).appendChild(n), n.src = "javascript:", t = n.contentWindow.document, t.open(), t.write("<script>document.F=Object<\/script>"), t.close(), s = t.F; r--;)
                        delete s.prototype[i[r]];
                    return s()
                };
            t.exports = Object.create || function(t, n) {
                var e;
                return null !== t ? (c.prototype = r(t), e = new c, c.prototype = null, e[u] = t) : e = s(), void 0 === n ? e : o(e, n)
            }
        }, function(t, n) {
            t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
        }, function(t, n) {
            t.exports = function(t, n) {
                return {
                    value: n,
                    done: !!t
                }
            }
        }, function(t, n, e) {
            "use strict";
            var r = e(7).f,
                o = e(44),
                i = e(34),
                u = e(10),
                c = e(35),
                s = e(14),
                a = e(28),
                f = e(46),
                l = e(71),
                p = e(9),
                h = e(21).fastKey,
                d = e(15),
                v = p ? "_s" : "size",
                y = function(t, n) {
                    var e,
                        r = h(n);
                    if ("F" !== r)
                        return t._i[r];
                    for (e = t._f; e; e = e.n)
                        if (e.k == n)
                            return e
                };
            t.exports = {
                getConstructor: function(t, n, e, a) {
                    var f = t(function(t, r) {
                        c(t, f, n, "_i"), t._t = n, t._i = o(null), t._f = void 0, t._l = void 0, t[v] = 0, void 0 != r && s(r, e, t[a], t)
                    });
                    return i(f.prototype, {
                        clear: function() {
                            for (var t = d(this, n), e = t._i, r = t._f; r; r = r.n)
                                r.r = !0, r.p && (r.p = r.p.n = void 0), delete e[r.i];
                            t._f = t._l = void 0, t[v] = 0
                        },
                        delete: function(t) {
                            var e = d(this, n),
                                r = y(e, t);
                            if (r) {
                                var o = r.n,
                                    i = r.p;
                                delete e._i[r.i], r.r = !0, i && (i.n = o), o && (o.p = i), e._f == r && (e._f = o), e._l == r && (e._l = i), e[v]--
                            }
                            return !!r
                        },
                        forEach: function(t) {
                            d(this, n);
                            for (var e, r = u(t, arguments.length > 1 ? arguments[1] : void 0, 3); e = e ? e.n : this._f;)
                                for (r(e.v, e.k, this); e && e.r;)
                                    e = e.p
                        },
                        has: function(t) {
                            return !!y(d(this, n), t)
                        }
                    }), p && r(f.prototype, "size", {
                        get: function() {
                            return d(this, n)[v]
                        }
                    }), f
                },
                def: function(t, n, e) {
                    var r,
                        o,
                        i = y(t, n);
                    return i ? i.v = e : (t._l = i = {
                        i: o = h(n, !0),
                        k: n,
                        v: e,
                        p: r = t._l,
                        n: void 0,
                        r: !1
                    }, t._f || (t._f = i), r && (r.n = i), t[v]++, "F" !== o && (t._i[o] = i)), t
                },
                getEntry: y,
                setStrong: function(t, n, e) {
                    a(t, n, function(t, e) {
                        this._t = d(t, n), this._k = e, this._l = void 0
                    }, function() {
                        for (var t = this, n = t._k, e = t._l; e && e.r;)
                            e = e.p;
                        return t._t && (t._l = e = e ? e.n : t._t._f) ? "keys" == n ? f(0, e.k) : "values" == n ? f(0, e.v) : f(0, [e.k, e.v]) : (t._t = void 0, f(1))
                    }, e ? "entries" : "values", !e, !0), l(n)
                }
            }
        }, function(t, n, e) {
            var r = e(8);
            t.exports = function(t, n, e, o) {
                try {
                    return o ? n(r(e)[0], e[1]) : n(e)
                } catch (n) {
                    var i = t.return;
                    throw void 0 !== i && r(i.call(t)), n
                }
            }
        }, function(t, n, e) {
            var r = e(13),
                o = e(0)("iterator"),
                i = Array.prototype;
            t.exports = function(t) {
                return void 0 !== t && (r.Array === t || i[o] === t)
            }
        }, function(t, n, e) {
            var r = e(23),
                o = e(0)("iterator"),
                i = e(13);
            t.exports = e(4).getIteratorMethod = function(t) {
                if (void 0 != t)
                    return t[o] || t["@@iterator"] || i[r(t)]
            }
        }, function(t, n, e) {
            var r = e(0)("iterator"),
                o = !1;
            try {
                var i = [7][r]();
                i.return = function() {
                    o = !0
                }, Array.from(i, function() {
                    throw 2
                })
            } catch (t) {}
            t.exports = function(t, n) {
                if (!n && !o)
                    return !1;
                var e = !1;
                try {
                    var i = [7],
                        u = i[r]();
                    u.next = function() {
                        return {
                            done: e = !0
                        }
                    }, i[r] = function() {
                        return u
                    }, t(i)
                } catch (t) {}
                return e
            }
        }, function(t, n) {
            n.f = {}.propertyIsEnumerable
        }, function(t, n, e) {
            var r = e(23),
                o = e(76);
            t.exports = function(t) {
                return function() {
                    if (r(this) != t)
                        throw TypeError(t + "#toJSON isn't generic");
                    return o(this)
                }
            }
        }, function(t, n, e) {
            var r = e(10),
                o = e(30),
                i = e(20),
                u = e(19),
                c = e(86);
            t.exports = function(t, n) {
                var e = 1 == t,
                    s = 2 == t,
                    a = 3 == t,
                    f = 4 == t,
                    l = 6 == t,
                    p = 5 == t || l,
                    h = n || c;
                return function(n, c, d) {
                    for (var v, y, m = i(n), g = o(m), b = r(c, d, 3), x = u(g.length), _ = 0, w = e ? h(n, x) : s ? h(n, 0) : void 0; x > _; _++)
                        if ((p || _ in g) && (v = g[_], y = b(v, _, m), t))
                            if (e)
                                w[_] = y;
                            else if (y)
                                switch (t) {
                                case 3:
                                    return !0;
                                case 5:
                                    return v;
                                case 6:
                                    return _;
                                case 2:
                                    w.push(v)
                                }
                            else if (f)
                                return !1;
                    return l ? -1 : a || f ? f : w
                }
            }
        }, function(t, n, e) {
            "use strict";
            var r = e(29),
                o = e(89),
                i = e(52),
                u = e(20),
                c = e(30),
                s = Object.assign;
            t.exports = !s || e(12)(function() {
                var t = {},
                    n = {},
                    e = Symbol(),
                    r = "abcdefghijklmnopqrst";
                return t[e] = 7, r.split("").forEach(function(t) {
                    n[t] = t
                }), 7 != s({}, t)[e] || Object.keys(s({}, n)).join("") != r
            }) ? function(t, n) {
                for (var e = u(t), s = arguments.length, a = 1, f = o.f, l = i.f; s > a;)
                    for (var p, h = c(arguments[a++]), d = f ? r(h).concat(f(h)) : r(h), v = d.length, y = 0; v > y;)
                        l.call(h, p = d[y++]) && (e[p] = h[p]);
                return e
            } : s
        }, function(t, n, e) {
            t.exports = e(57)
        }, function(t, n, e) {
            "use strict";
            function r(t, n) {
                function e() {
                    this.constructor = t
                }
                Y(t, n), t.prototype = null === n ? Object.create(n) : (e.prototype = n.prototype, new e)
            }
            function o(t, n, e, r) {
                var o,
                    i = arguments.length,
                    u = i < 3 ? n : null === r ? r = Object.getOwnPropertyDescriptor(n, e) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                    u = Reflect.decorate(t, n, e, r);
                else
                    for (var c = t.length - 1; c >= 0; c--)
                        (o = t[c]) && (u = (i < 3 ? o(u) : i > 3 ? o(n, e, u) : o(n, e)) || u);
                return i > 3 && u && Object.defineProperty(n, e, u), u
            }
            function i(t, n, e) {
                return t === t && (void 0 !== e && (t = t <= e ? t : e), void 0 !== n && (t = t >= n ? t : n)), t
            }
            function u(t) {
                var n = typeof t;
                return null != t && ("object" == n || "function" == n)
            }
            function c(t) {
                var n = ot.call(t, ut),
                    e = t[ut];
                try {
                    t[ut] = void 0;
                    var r = !0
                } catch (t) {}
                var o = it.call(t);
                return r && (n ? t[ut] = e : delete t[ut]), o
            }
            function s(t) {
                return at.call(t)
            }
            function a(t) {
                return null == t ? void 0 === t ? pt : lt : ht && ht in Object(t) ? ct(t) : ft(t)
            }
            function f(t) {
                return null != t && "object" == typeof t
            }
            function l(t) {
                return "symbol" == typeof t || vt(t) && dt(t) == yt
            }
            function p(t) {
                if ("number" == typeof t)
                    return t;
                if (mt(t))
                    return gt;
                if ($(t)) {
                    var n = "function" == typeof t.valueOf ? t.valueOf() : t;
                    t = $(n) ? n + "" : n
                }
                if ("string" != typeof t)
                    return 0 === t ? t : +t;
                t = t.replace(bt, "");
                var e = _t.test(t);
                return e || wt.test(t) ? St(t.slice(2), e ? 2 : 8) : xt.test(t) ? gt : +t
            }
            function h(t, n, e) {
                return void 0 === e && (e = n, n = void 0), void 0 !== e && (e = Et(e), e = e === e ? e : 0), void 0 !== n && (n = Et(n), n = n === n ? n : 0), K(Et(t), n, e)
            }
            function d(t, n) {
                return void 0 === t && (t = -1 / 0), void 0 === n && (n = 1 / 0), function(e, r) {
                    var o = "_" + r;
                    Object.defineProperty(e, r, {
                        get: function() {
                            return this[o]
                        },
                        set: function(e) {
                            Object.defineProperty(this, o, {
                                value: Ot(e, t, n),
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            })
                        },
                        enumerable: !0,
                        configurable: !0
                    })
                }
            }
            function v(t, n) {
                var e = "_" + n;
                Object.defineProperty(t, n, {
                    get: function() {
                        return this[e]
                    },
                    set: function(t) {
                        Object.defineProperty(this, e, {
                            value: !!t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        })
                    },
                    enumerable: !0,
                    configurable: !0
                })
            }
            function y(t, n, e) {
                function r(n) {
                    var e = p,
                        r = h;
                    return p = h = void 0, g = n, v = t.apply(r, e)
                }
                function o(t) {
                    return g = t, y = setTimeout(c, n), b ? r(t) : v
                }
                function i(t) {
                    var e = t - m,
                        r = t - g,
                        o = n - e;
                    return x ? jt(o, d - r) : o
                }
                function u(t) {
                    var e = t - m,
                        r = t - g;
                    return void 0 === m || e >= n || e < 0 || x && r >= d
                }
                function c() {
                    var t = Mt();
                    if (u(t))
                        return s(t);
                    y = setTimeout(c, i(t))
                }
                function s(t) {
                    return y = void 0, _ && p ? r(t) : (p = h = void 0, v)
                }
                function a() {
                    void 0 !== y && clearTimeout(y), g = 0, p = m = h = y = void 0
                }
                function f() {
                    return void 0 === y ? v : s(Mt())
                }
                function l() {
                    var t = Mt(),
                        e = u(t);
                    if (p = arguments, h = this, m = t, e) {
                        if (void 0 === y)
                            return o(m);
                        if (x)
                            return y = setTimeout(c, n), r(m)
                    }
                    return void 0 === y && (y = setTimeout(c, n)), v
                }
                var p,
                    h,
                    d,
                    v,
                    y,
                    m,
                    g = 0,
                    b = !1,
                    x = !1,
                    _ = !0;
                if ("function" != typeof t)
                    throw new TypeError(At);
                return n = Et(n) || 0, $(e) && (b = !!e.leading, x = "maxWait" in e, d = x ? Pt(Et(e.maxWait) || 0, n) : d, _ = "trailing" in e ? !!e.trailing : _), l.cancel = a, l.flush = f, l
            }
            function m() {
                for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                return function(n, e, r) {
                    var o = r.value;
                    return {
                        get: function() {
                            return this.hasOwnProperty(e) || Object.defineProperty(this, e, {
                                value: kt.apply(void 0, [o].concat(t))
                            }), this[e]
                        }
                    }
                }
            }
            function g(t) {
                var n = Lt.get(t) || [];
                return Lt.set(t, n), function(t, e, r) {
                    function o(t) {
                        t.defaultPrevented || r(t)
                    }
                    e.split(/\s+/g).forEach(function(e) {
                        n.push({
                            elem: t,
                            eventName: e,
                            handler: o
                        }), t.addEventListener(e, o)
                    })
                }
            }
            function b(t) {
                var n = Lt.get(t);
                n && (n.forEach(function(t) {
                    var n = t.elem,
                        e = t.eventName,
                        r = t.handler;
                    n.removeEventListener(e, r)
                }), Lt.delete(t))
            }
            function x(t) {
                return t.touches ? t.touches[t.touches.length - 1] : t
            }
            function _(t) {
                var n = x(t);
                return {
                    x: n.clientX,
                    y: n.clientY
                }
            }
            function w(t, n) {
                return void 0 === n && (n = []), n.some(function(n) {
                    return t === n
                })
            }
            function S(t) {
                var n = {};
                return Object.keys(t).forEach(function(e) {
                    if (!zt.test(e))
                        return void (n[e] = t[e]);
                    var r = t[e];
                    e = e.replace(/^-/, ""), n[e] = r, Nt.forEach(function(t) {
                        n["-" + t + "-" + e] = r
                    })
                }), n
            }
            function E(t, n) {
                n = S(n), Object.keys(n).forEach(function(e) {
                    var r = e.replace(/^-/, "").replace(/-([a-z])/g, function(t, n) {
                        return n.toUpperCase()
                    });
                    t.style[r] = n[e]
                })
            }
            function O(t) {
                var n = t.containerEl,
                    e = t.contentEl;
                return {
                    container: {
                        width: n.clientWidth,
                        height: n.clientHeight
                    },
                    content: {
                        width: e.offsetWidth - e.clientWidth + e.scrollWidth,
                        height: e.offsetHeight - e.clientHeight + e.scrollHeight
                    }
                }
            }
            function T(t, n) {
                var e = t.bounding,
                    r = n.getBoundingClientRect(),
                    o = Math.max(e.top, r.top),
                    i = Math.max(e.left, r.left),
                    u = Math.min(e.right, r.right);
                return o < Math.min(e.bottom, r.bottom) && i < u
            }
            function M(t) {
                var n = t.getSize(),
                    e = {
                        x: Math.max(n.content.width - n.container.width, 0),
                        y: Math.max(n.content.height - n.container.height, 0)
                    },
                    r = t.containerEl.getBoundingClientRect(),
                    o = {
                        top: Math.max(r.top, 0),
                        right: Math.min(r.right, window.innerWidth),
                        bottom: Math.min(r.bottom, window.innerHeight),
                        left: Math.max(r.left, 0)
                    };
                t.size = n, t.limit = e, t.bounding = o, t.track.update(), t.setPosition()
            }
            function A(t, n, e) {
                var r = t.options,
                    o = t.offset,
                    i = t.limit,
                    u = t.track,
                    c = t.contentEl;
                return r.renderByPixels && (n = Math.round(n), e = Math.round(e)), n = Ot(n, 0, i.x), e = Ot(e, 0, i.y), n !== o.x && u.xAxis.show(), e !== o.y && u.yAxis.show(), r.alwaysShowTracks || u.autoHideOnIdle(), n === o.x && e === o.y ? null : (o.x = n, o.y = e, E(c, {
                    "-transform": "translate3d(" + -n + "px, " + -e + "px, 0)"
                }), u.update(), {
                    offset: q({}, o),
                    limit: q({}, i)
                })
            }
            function P(t, n, e, r, o) {
                function i() {
                    var n = Date.now() - g,
                        e = r ? s(Math.min(n / r, 1)) : 1;
                    t.setPosition(d + y * e, v + m * e), n >= r ? "function" == typeof f && f.call(t) : requestAnimationFrame(i)
                }
                void 0 === r && (r = 0);
                var u = void 0 === o ? {} : o,
                    c = u.easing,
                    s = void 0 === c ? j : c,
                    a = u.callback,
                    f = void 0 === a ? null : a,
                    l = t.options,
                    p = t.offset,
                    h = t.limit;
                l.renderByPixels && (n = Math.round(n), e = Math.round(e));
                var d = p.x,
                    v = p.y,
                    y = Ot(n, 0, h.x) - d,
                    m = Ot(e, 0, h.y) - v,
                    g = Date.now();
                i()
            }
            function j(t) {
                return Math.pow(t - 1, 3) + 1
            }
            function k(t, n, e) {
                var r = void 0 === e ? {} : e,
                    o = r.alignToTop,
                    i = void 0 === o || o,
                    u = r.onlyScrollIfNeeded,
                    c = void 0 !== u && u,
                    s = r.offsetTop,
                    a = void 0 === s ? 0 : s,
                    f = r.offsetLeft,
                    l = void 0 === f ? 0 : f,
                    p = r.offsetBottom,
                    h = void 0 === p ? 0 : p,
                    d = t.containerEl,
                    v = t.bounding,
                    y = t.offset,
                    m = t.limit;
                if (n && d.contains(n)) {
                    var g = n.getBoundingClientRect();
                    if (!c || !t.isVisible(n)) {
                        var b = i ? g.top - v.top - a : g.bottom - v.bottom - h;
                        t.setMomentum(g.left - v.left - l, Ot(b, -y.y, m.y - y.y))
                    }
                }
            }
            function D() {
                for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                t.forEach(function(t) {
                    var n = t.pluginName;
                    if (!n)
                        throw new TypeError("plugin name is required");
                    Gt.order.add(n), Gt.constructors[n] = t
                })
            }
            function L(t, n) {
                return Array.from(Gt.order).filter(function(t) {
                    return !1 !== n[t]
                }).map(function(e) {
                    var r = Gt.constructors[e],
                        o = new r(t, n[e]);
                    return n[e] = o.options, o
                })
            }
            function N(t) {
                var n = g(t),
                    e = t.containerEl;
                n(e, "keydown", function(n) {
                    if (document.activeElement === e) {
                        var r = z(t, n.keyCode || n.which);
                        if (r) {
                            var o = r[0],
                                i = r[1];
                            t.addTransformableMomentum(o, i, n, function(e) {
                                e ? n.preventDefault() : (t.containerEl.blur(), t.parent && t.parent.containerEl.focus())
                            })
                        }
                    }
                })
            }
            function z(t, n) {
                var e = t.size,
                    r = t.limit,
                    o = t.offset;
                switch (n) {
                case Ft.SPACE:
                    return [0, 200];
                case Ft.PAGE_UP:
                    return [0, 40 - e.container.height];
                case Ft.PAGE_DOWN:
                    return [0, e.container.height - 40];
                case Ft.END:
                    return [0, r.y - o.y];
                case Ft.HOME:
                    return [0, -o.y];
                case Ft.LEFT:
                    return [-40, 0];
                case Ft.UP:
                    return [0, -40];
                case Ft.RIGHT:
                    return [40, 0];
                case Ft.DOWN:
                    return [0, 40];
                default:
                    return null
                }
            }
            function C(t) {
                function n(n, e) {
                    var r = t.size;
                    if (n === Vt.X) {
                        return e / (r.container.width + (l.thumb.realSize - l.thumb.displaySize)) * r.content.width
                    }
                    if (n === Vt.Y) {
                        return e / (r.container.height + (p.thumb.realSize - p.thumb.displaySize)) * r.content.height
                    }
                    return 0
                }
                function e(t) {
                    return w(t, [l.element, l.thumb.element]) ? Vt.X : w(t, [p.element, p.thumb.element]) ? Vt.Y : void 0
                }
                var r,
                    o,
                    i,
                    u,
                    c,
                    s = g(t),
                    a = t.containerEl,
                    f = t.track,
                    l = f.xAxis,
                    p = f.yAxis;
                s(a, "click", function(r) {
                    if (!o && w(r.target, [l.element, p.element])) {
                        var i = r.target,
                            u = e(i),
                            c = i.getBoundingClientRect(),
                            s = _(r),
                            a = t.offset,
                            f = t.limit;
                        if (u === Vt.X) {
                            var h = s.x - c.left - l.thumb.displaySize / 2;
                            t.setMomentum(Ot(n(u, h) - a.x, -a.x, f.x - a.x), 0)
                        }
                        if (u === Vt.Y) {
                            var h = s.y - c.top - p.thumb.displaySize / 2;
                            t.setMomentum(0, Ot(n(u, h) - a.y, -a.y, f.y - a.y))
                        }
                    }
                }), s(a, "mousedown", function(n) {
                    if (w(n.target, [l.thumb.element, p.thumb.element])) {
                        r = !0;
                        var o = n.target,
                            s = _(n),
                            f = o.getBoundingClientRect();
                        u = e(o), i = {
                            x: s.x - f.left,
                            y: s.y - f.top
                        }, c = a.getBoundingClientRect(), E(t.containerEl, {
                            "-user-select": "none"
                        })
                    }
                }), s(window, "mousemove", function(e) {
                    if (r) {
                        o = !0;
                        var s = t.offset,
                            a = _(e);
                        if (u === Vt.X) {
                            var f = a.x - i.x - c.left;
                            t.setPosition(n(u, f), s.y)
                        }
                        if (u === Vt.Y) {
                            var f = a.y - i.y - c.top;
                            t.setPosition(s.x, n(u, f))
                        }
                    }
                }), s(window, "mouseup blur", function() {
                    r = o = !1, E(t.containerEl, {
                        "-user-select": ""
                    })
                })
            }
            function R(t) {
                g(t)(window, "resize", kt(t.update.bind(t), 300))
            }
            function F(t) {
                function n(r) {
                    var o = r.x,
                        i = r.y;
                    (o || i) && (t.setMomentum(Ot(u.x + o, 0, c.x) - u.x, Ot(u.y + i, 0, c.y) - u.y), e = requestAnimationFrame(function() {
                        n({
                            x: o,
                            y: i
                        })
                    }))
                }
                var e,
                    r = g(t),
                    o = t.containerEl,
                    i = t.contentEl,
                    u = t.offset,
                    c = t.limit,
                    s = !1;
                r(window, "mousemove", function(r) {
                    if (s) {
                        cancelAnimationFrame(e);
                        n(I(t, r))
                    }
                }), r(i, "selectstart", function(t) {
                    t.stopPropagation(), cancelAnimationFrame(e), s = !0
                }), r(window, "mouseup blur", function() {
                    cancelAnimationFrame(e), s = !1
                }), r(o, "scroll", function(t) {
                    t.preventDefault(), o.scrollTop = o.scrollLeft = 0
                })
            }
            function I(t, n) {
                var e = t.bounding,
                    r = e.top,
                    o = e.right,
                    i = e.bottom,
                    u = e.left,
                    c = _(n),
                    s = c.x,
                    a = c.y,
                    f = {
                        x: 0,
                        y: 0
                    };
                return 0 === s && 0 === a ? f : (s > o - 20 ? f.x = s - o + 20 : s < u + 20 && (f.x = s - u - 20), a > i - 20 ? f.y = a - i + 20 : a < r + 20 && (f.y = a - r - 20), f.x *= 2, f.y *= 2, f)
            }
            function H(t) {
                var n,
                    e = /Android/.test(navigator.userAgent) ? 3 : 2,
                    r = t.containerEl,
                    o = new Rt,
                    i = g(t),
                    u = 0;
                i(r, "touchstart", function(e) {
                    o.track(e), t.setMomentum(0, 0), 0 === u && (n = t.options.damping, t.options.damping = Math.max(n, .5)), u++
                }), i(r, "touchmove", function(n) {
                    if (!Ut || Ut === t) {
                        o.update(n);
                        var e = o.getDelta(),
                            r = e.x,
                            i = e.y;
                        t.addTransformableMomentum(r, i, n, function(e) {
                            e && (n.preventDefault(), Ut = t)
                        })
                    }
                }), i(r, "touchcancel touchend", function(r) {
                    var i = o.getVelocity(),
                        c = {
                            x: 0,
                            y: 0
                        };
                    Object.keys(i).forEach(function(t) {
                        var r = i[t] / n;
                        c[t] = Math.abs(r) < 50 ? 0 : r * e
                    }), t.addTransformableMomentum(c.x, c.y, r), u--, 0 === u && (t.options.damping = n), o.release(r), Ut = null
                })
            }
            function W(t) {
                g(t)(t.options.wheelEventTarget || t.containerEl, "onwheel" in window || document.implementation.hasFeature("Events.wheel", "3.0") ? "wheel" : "mousewheel", function(n) {
                    var e = B(n),
                        r = e.x,
                        o = e.y;
                    t.addTransformableMomentum(r, o, n, function(t) {
                        t && n.preventDefault()
                    })
                })
            }
            function B(t) {
                if ("deltaX" in t) {
                    var n = qt(t.deltaMode);
                    return {
                        x: t.deltaX / Xt.STANDARD * n,
                        y: t.deltaY / Xt.STANDARD * n
                    }
                }
                return "wheelDeltaX" in t ? {
                    x: t.wheelDeltaX / Xt.OTHERS,
                    y: t.wheelDeltaY / Xt.OTHERS
                } : {
                    x: 0,
                    y: t.wheelDelta / Xt.OTHERS
                }
            }
            function G() {
                if (!Zt && "undefined" != typeof window) {
                    var t = document.createElement("style");
                    t.id = Qt, t.textContent = Jt, document.head.appendChild(t), Zt = !0
                }
            }
            function V() {
                if (Zt && "undefined" != typeof window) {
                    var t = document.getElementById(Qt);
                    t && t.parentNode && (t.parentNode.removeChild(t), Zt = !1)
                }
            }
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var U = {};
            e.d(U, "keyboardHandler", function() {
                return N
            }), e.d(U, "mouseHandler", function() {
                return C
            }), e.d(U, "resizeHandler", function() {
                return R
            }), e.d(U, "selectHandler", function() {
                return F
            }), e.d(U, "touchHandler", function() {
                return H
            }), e.d(U, "wheelHandler", function() {
                return W
            });
            var X,
                Y = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(t, n) {
                    t.__proto__ = n
                } || function(t, n) {
                    for (var e in n)
                        n.hasOwnProperty(e) && (t[e] = n[e])
                },
                q = Object.assign || function(t) {
                    for (var n, e = 1, r = arguments.length; e < r; e++) {
                        n = arguments[e];
                        for (var o in n)
                            Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o])
                    }
                    return t
                },
                K = (e(58), e(79), e(84), e(93), e(96), i),
                $ = u,
                J = e(98),
                Q = "object" == typeof self && self && self.Object === Object && self,
                Z = J.a || Q || Function("return this")(),
                tt = Z,
                nt = tt.Symbol,
                et = nt,
                rt = Object.prototype,
                ot = rt.hasOwnProperty,
                it = rt.toString,
                ut = et ? et.toStringTag : void 0,
                ct = c,
                st = Object.prototype,
                at = st.toString,
                ft = s,
                lt = "[object Null]",
                pt = "[object Undefined]",
                ht = et ? et.toStringTag : void 0,
                dt = a,
                vt = f,
                yt = "[object Symbol]",
                mt = l,
                gt = NaN,
                bt = /^\s+|\s+$/g,
                xt = /^[-+]0x[0-9a-f]+$/i,
                _t = /^0b[01]+$/i,
                wt = /^0o[0-7]+$/i,
                St = parseInt,
                Et = p,
                Ot = h,
                Tt = function() {
                    return tt.Date.now()
                },
                Mt = Tt,
                At = "Expected a function",
                Pt = Math.max,
                jt = Math.min,
                kt = y,
                Dt = function() {
                    function t(t) {
                        void 0 === t && (t = {});
                        var n = this;
                        this.damping = .1, this.thumbMinSize = 20, this.renderByPixels = !0, this.alwaysShowTracks = !1, this.continuousScrolling = !0, this.wheelEventTarget = null, this.plugins = {}, Object.keys(t).forEach(function(e) {
                            n[e] = t[e]
                        })
                    }
                    return o([d(0, 1)], t.prototype, "damping", void 0), o([d(0, 1 / 0)], t.prototype, "thumbMinSize", void 0), o([v], t.prototype, "renderByPixels", void 0), o([v], t.prototype, "alwaysShowTracks", void 0), o([v], t.prototype, "continuousScrolling", void 0), t
                }(),
                Lt = new WeakMap,
                Nt = ["webkit", "moz", "ms", "o"],
                zt = new RegExp("^-(?!(?:" + Nt.join("|") + ")-)"),
                Ct = function() {
                    function t(t) {
                        this.updateTime = Date.now(), this.delta = {
                            x: 0,
                            y: 0
                        }, this.velocity = {
                            x: 0,
                            y: 0
                        }, this.lastPosition = {
                            x: 0,
                            y: 0
                        }, this.lastPosition = _(t)
                    }
                    return t.prototype.update = function(t) {
                        var n = this,
                            e = n.velocity,
                            r = n.updateTime,
                            o = n.lastPosition,
                            i = Date.now(),
                            u = _(t),
                            c = {
                                x: -(u.x - o.x),
                                y: -(u.y - o.y)
                            },
                            s = i - r || 16,
                            a = c.x / s * 16,
                            f = c.y / s * 16;
                        e.x = .9 * a + .1 * e.x, e.y = .9 * f + .1 * e.y, this.delta = c, this.updateTime = i, this.lastPosition = u
                    }, t
                }(),
                Rt = function() {
                    function t() {
                        this._touchList = {}
                    }
                    return Object.defineProperty(t.prototype, "_primitiveValue", {
                        get: function() {
                            return {
                                x: 0,
                                y: 0
                            }
                        },
                        enumerable: !0,
                        configurable: !0
                    }), t.prototype.isActive = function() {
                        return void 0 !== this._activeTouchID
                    }, t.prototype.getDelta = function() {
                        var t = this._getActiveTracker();
                        return t ? q({}, t.delta) : this._primitiveValue
                    }, t.prototype.getVelocity = function() {
                        var t = this._getActiveTracker();
                        return t ? q({}, t.velocity) : this._primitiveValue
                    }, t.prototype.track = function(t) {
                        var n = this,
                            e = t.targetTouches;
                        return Array.from(e).forEach(function(t) {
                            n._add(t)
                        }), this._touchList
                    }, t.prototype.update = function(t) {
                        var n = this,
                            e = t.touches,
                            r = t.changedTouches;
                        return Array.from(e).forEach(function(t) {
                            n._renew(t)
                        }), this._setActiveID(r), this._touchList
                    }, t.prototype.release = function(t) {
                        var n = this;
                        delete this._activeTouchID, Array.from(t.changedTouches).forEach(function(t) {
                            n._delete(t)
                        })
                    }, t.prototype._add = function(t) {
                        if (!this._has(t)) {
                            var n = new Ct(t);
                            this._touchList[t.identifier] = n
                        }
                    }, t.prototype._renew = function(t) {
                        if (this._has(t)) {
                            this._touchList[t.identifier].update(t)
                        }
                    }, t.prototype._delete = function(t) {
                        delete this._touchList[t.identifier]
                    }, t.prototype._has = function(t) {
                        return this._touchList.hasOwnProperty(t.identifier)
                    }, t.prototype._setActiveID = function(t) {
                        this._activeTouchID = t[t.length - 1].identifier, this._lastTouch = this._touchList[this._activeTouchID]
                    }, t.prototype._getActiveTracker = function() {
                        var t = this;
                        return t._touchList[t._activeTouchID]
                    }, t
                }();
            !function(t) {
                t.X = "x", t.Y = "y"
            }(X || (X = {}));
            var Ft,
                It = function() {
                    function t(t, n) {
                        void 0 === n && (n = 0), this._direction = t, this._minSize = n, this.element = document.createElement("div"), this.displaySize = 0, this.realSize = 0, this.offset = 0, this.element.className = "scrollbar-thumb scrollbar-thumb-" + t
                    }
                    return t.prototype.attachTo = function(t) {
                        t.appendChild(this.element)
                    }, t.prototype.update = function(t, n, e) {
                        this.realSize = Math.min(n / e, 1) * n, this.displaySize = Math.max(this.realSize, this._minSize), this.offset = t / e * (n + (this.realSize - this.displaySize)), E(this.element, this._getStyle())
                    }, t.prototype._getStyle = function() {
                        switch (this._direction) {
                        case X.X:
                            return {
                                width: this.displaySize + "px",
                                "-transform": "translate3d(" + this.offset + "px, 0, 0)"
                            };
                        case X.Y:
                            return {
                                height: this.displaySize + "px",
                                "-transform": "translate3d(0, " + this.offset + "px, 0)"
                            };
                        default:
                            return null
                        }
                    }, t
                }(),
                Ht = function() {
                    function t(t, n) {
                        void 0 === n && (n = 0), this.element = document.createElement("div"), this._isShown = !1, this.element.className = "scrollbar-track scrollbar-track-" + t, this.thumb = new It(t, n), this.thumb.attachTo(this.element)
                    }
                    return t.prototype.attachTo = function(t) {
                        t.appendChild(this.element)
                    }, t.prototype.show = function() {
                        this._isShown || (this._isShown = !0, this.element.classList.add("show"))
                    }, t.prototype.hide = function() {
                        this._isShown && (this._isShown = !1, this.element.classList.remove("show"))
                    }, t.prototype.update = function(t, n, e) {
                        E(this.element, {
                            display: e <= n ? "none" : "block"
                        }), this.thumb.update(t, n, e)
                    }, t
                }(),
                Wt = function() {
                    function t(t) {
                        this._scrollbar = t;
                        var n = t.options.thumbMinSize;
                        this.xAxis = new Ht(X.X, n), this.yAxis = new Ht(X.Y, n), this.xAxis.attachTo(t.containerEl), this.yAxis.attachTo(t.containerEl), t.options.alwaysShowTracks && (this.xAxis.show(), this.yAxis.show())
                    }
                    return t.prototype.update = function() {
                        var t = this._scrollbar,
                            n = t.size,
                            e = t.offset;
                        this.xAxis.update(e.x, n.container.width, n.content.width), this.yAxis.update(e.y, n.container.height, n.content.height)
                    }, t.prototype.autoHideOnIdle = function() {
                        this._scrollbar.options.alwaysShowTracks || (this.xAxis.hide(), this.yAxis.hide())
                    }, o([m(300)], t.prototype, "autoHideOnIdle", null), t
                }(),
                Bt = function() {
                    function t(t, n) {
                        var e = this.constructor;
                        this.scrollbar = t, this.name = e.pluginName, this.options = q({}, e.defaultOptions, n)
                    }
                    return t.prototype.onInit = function() {}, t.prototype.onDestory = function() {}, t.prototype.onUpdate = function() {}, t.prototype.onRender = function(t) {}, t.prototype.transformDelta = function(t, n) {
                        return q({}, t)
                    }, t.pluginName = "", t.defaultOptions = {}, t
                }(),
                Gt = {
                    order: new Set,
                    constructors: {}
                };
            !function(t) {
                t[t.SPACE = 32] = "SPACE", t[t.PAGE_UP = 33] = "PAGE_UP", t[t.PAGE_DOWN = 34] = "PAGE_DOWN", t[t.END = 35] = "END", t[t.HOME = 36] = "HOME", t[t.LEFT = 37] = "LEFT", t[t.UP = 38] = "UP", t[t.RIGHT = 39] = "RIGHT", t[t.DOWN = 40] = "DOWN"
            }(Ft || (Ft = {}));
            var Vt;
            !function(t) {
                t[t.X = 0] = "X", t[t.Y = 1] = "Y"
            }(Vt || (Vt = {}));
            var Ut,
                Xt = {
                    STANDARD: 1,
                    OTHERS: -3
                },
                Yt = [1, 28, 500],
                qt = function(t) {
                    return Yt[t] || Yt[0]
                },
                Kt = new Map,
                $t = function() {
                    function t(t, n) {
                        var e = this;
                        this.offset = {
                            x: 0,
                            y: 0
                        }, this.limit = {
                            x: 1 / 0,
                            y: 1 / 0
                        }, this.bounding = {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                        }, this._plugins = [], this._momentum = {
                            x: 0,
                            y: 0
                        }, this._standardProduct = new Set, this.containerEl = t;
                        var r = this.contentEl = document.createElement("div");
                        this.options = new Dt(n), t.setAttribute("data-scrollbar", "true"), t.setAttribute("tabindex", "1"), E(t, {
                            overflow: "hidden",
                            outline: "none"
                        }), window.navigator.msPointerEnabled && (t.style.msTouchAction = "none"), r.className = "scroll-content", Array.from(t.childNodes).forEach(function(t) {
                            r.appendChild(t)
                        }), t.appendChild(r), this.track = new Wt(this), this.size = this.getSize(), this._plugins = L(this, this.options.plugins);
                        var o = t.scrollLeft,
                            i = t.scrollTop;
                        t.scrollLeft = t.scrollTop = 0, this.setPosition(o, i, {
                            withoutCallbacks: !0
                        });
                        var u = window,
                            c = u.MutationObserver || u.WebKitMutationObserver || u.MozMutationObserver;
                        "function" == typeof c && (this._observer = new c(function() {
                            e.update()
                        }), this._observer.observe(r, {
                            subtree: !0,
                            childList: !0
                        })), Kt.set(t, this), requestAnimationFrame(function() {
                            e._init()
                        })
                    }
                    return Object.defineProperty(t.prototype, "parent", {
                        get: function() {
                            for (var t = this.containerEl.parentElement; t;) {
                                var n = Kt.get(t);
                                if (n)
                                    return n;
                                t = t.parentElement
                            }
                            return null
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "scrollTop", {
                        get: function() {
                            return this.offset.y
                        },
                        set: function(t) {
                            this.setPosition(this.scrollLeft, t)
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "scrollLeft", {
                        get: function() {
                            return this.offset.x
                        },
                        set: function(t) {
                            this.setPosition(t, this.scrollTop)
                        },
                        enumerable: !0,
                        configurable: !0
                    }), t.prototype.getSize = function() {
                        return O(this)
                    }, t.prototype.update = function() {
                        M(this), this._plugins.forEach(function(t) {
                            t.onUpdate()
                        })
                    }, t.prototype.isVisible = function(t) {
                        return T(this, t)
                    }, t.prototype.setPosition = function(t, n, e) {
                        var r = this;
                        void 0 === t && (t = this.offset.x), void 0 === n && (n = this.offset.y), void 0 === e && (e = {});
                        var o = A(this, t, n);
                        o && !e.withoutCallbacks && this._standardProduct.forEach(function(t) {
                            t.call(r, o)
                        })
                    }, t.prototype.scrollTo = function(t, n, e, r) {
                        void 0 === t && (t = this.offset.x), void 0 === n && (n = this.offset.y), void 0 === e && (e = 0), void 0 === r && (r = {}), P(this, t, n, e, r)
                    }, t.prototype.scrollIntoView = function(t, n) {
                        void 0 === n && (n = {}), k(this, t, n)
                    }, t.prototype.addListener = function(t) {
                        if ("function" != typeof t)
                            throw new TypeError("[smooth-scrollbar] scrolling listener should be a function");
                        this._standardProduct.add(t)
                    }, t.prototype.removeListener = function(t) {
                        this._standardProduct.delete(t)
                    }, t.prototype.addTransformableMomentum = function(t, n, e, r) {
                        this._updateDebounced();
                        var o = this._plugins.reduce(function(t, n) {
                                return n.transformDelta(t, e) || t
                            }, {
                                x: t,
                                y: n
                            }),
                            i = !this._shouldPropagateMomentum(o.x, o.y);
                        i && this.addMomentum(o.x, o.y), r && r.call(this, i)
                    }, t.prototype.addMomentum = function(t, n) {
                        this.setMomentum(this._momentum.x + t, this._momentum.y + n)
                    }, t.prototype.setMomentum = function(t, n) {
                        0 === this.limit.x && (t = 0), 0 === this.limit.y && (n = 0), this.options.renderByPixels && (t = Math.round(t), n = Math.round(n)), this._momentum.x = t, this._momentum.y = n
                    }, t.prototype.updatePluginOptions = function(t, n) {
                        this._plugins.forEach(function(e) {
                            e.name === t && Object.assign(e.options, n)
                        })
                    }, t.prototype.destroy = function() {
                        var t = this,
                            n = t.containerEl,
                            e = t.contentEl;
                        b(this), this._standardProduct.clear(), this.setMomentum(0, 0), cancelAnimationFrame(this._renderID), this._observer && this._observer.disconnect(), Kt.delete(this.containerEl);
                        for (var r = Array.from(e.childNodes); n.firstChild;)
                            n.removeChild(n.firstChild);
                        r.forEach(function(t) {
                            n.appendChild(t)
                        }), E(n, {
                            overflow: ""
                        }), n.scrollTop = this.scrollTop, n.scrollLeft = this.scrollLeft, this._plugins.forEach(function(t) {
                            t.onDestory()
                        }), this._plugins.length = 0
                    }, t.prototype._init = function() {
                        var t = this;
                        this.update(), Object.keys(U).forEach(function(n) {
                            U[n](t)
                        }), this._plugins.forEach(function(t) {
                            t.onInit()
                        }), this._render()
                    }, t.prototype._updateDebounced = function() {
                        this.update()
                    }, t.prototype._shouldPropagateMomentum = function(t, n) {
                        void 0 === t && (t = 0), void 0 === n && (n = 0);
                        var e = this,
                            r = e.options,
                            o = e.offset,
                            i = e.limit;
                        if (!r.continuousScrolling)
                            return !1;
                        0 === i.x && 0 === i.y && this._updateDebounced();
                        var u = Ot(t + o.x, 0, i.x),
                            c = Ot(n + o.y, 0, i.y),
                            s = !0;
                        return s = s && u === o.x, s = s && c === o.y, s = s && (o.x === i.x || 0 === o.x || o.y === i.y || 0 === o.y)
                    }, t.prototype._render = function() {
                        var t = this._momentum;
                        if (t.x || t.y) {
                            var n = this._nextTick("x"),
                                e = this._nextTick("y");
                            t.x = n.momentum, t.y = e.momentum, this.setPosition(n.position, e.position)
                        }
                        var r = q({}, this._momentum);
                        this._plugins.forEach(function(t) {
                            t.onRender(r)
                        }), this._renderID = requestAnimationFrame(this._render.bind(this))
                    }, t.prototype._nextTick = function(t) {
                        var n = this,
                            e = n.options,
                            r = n.offset,
                            o = n._momentum,
                            i = r[t],
                            u = o[t];
                        if (Math.abs(u) <= .1)
                            return {
                                momentum: 0,
                                position: i + u
                            };
                        var c = u * (1 - e.damping);
                        return e.renderByPixels && (c |= 0), {
                            momentum: c,
                            position: i + u - c
                        }
                    }, o([m(100, {
                        leading: !0
                    })], t.prototype, "_updateDebounced", null), t
                }(),
                Jt = "\n[data-scrollbar] {\n  display: block;\n  position: relative;\n}\n\n.scroll-content {\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n}\n\n.scrollbar-track {\n  position: absolute;\n  opacity: 0;\n  z-index: 1;\n  background: rgba(222, 222, 222, .75);\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-transition: opacity 0.5s 0.5s ease-out;\n          transition: opacity 0.5s 0.5s ease-out;\n}\n.scrollbar-track.show,\n.scrollbar-track:hover {\n  opacity: 1;\n  -webkit-transition-delay: 0s;\n          transition-delay: 0s;\n}\n\n.scrollbar-track-x {\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 8px;\n}\n.scrollbar-track-y {\n  top: 0;\n  right: 0;\n  width: 8px;\n  height: 100%;\n}\n.scrollbar-thumb {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 8px;\n  height: 8px;\n  background: rgba(0, 0, 0, .5);\n  border-radius: 4px;\n}\n",
                Qt = "smooth-scrollbar-style",
                Zt = !1;
            e.d(n, "ScrollbarPlugin", function() {
                return Bt
            });
            var tn = function(t) {
                function n() {
                    return null !== t && t.apply(this, arguments) || this
                }
                return r(n, t), n.init = function(t, n) {
                    if (!t || 1 !== t.nodeType)
                        throw new TypeError("expected element to be DOM Element, but got " + t);
                    return G(), Kt.has(t) ? Kt.get(t) : new $t(t, n)
                }, n.initAll = function(t) {
                    return Array.from(document.querySelectorAll("[data-scrollbar]"), function(e) {
                        return n.init(e, t)
                    })
                }, n.has = function(t) {
                    return Kt.has(t)
                }, n.get = function(t) {
                    return Kt.get(t)
                }, n.getAll = function() {
                    return Array.from(Kt.values())
                }, n.destroy = function(t) {
                    var n = Kt.get(t);
                    n && n.destroy()
                }, n.destroyAll = function() {
                    Kt.forEach(function(t) {
                        t.destroy()
                    })
                }, n.use = function() {
                    for (var t = [], n = 0; n < arguments.length; n++)
                        t[n] = arguments[n];
                    return D.apply(void 0, t)
                }, n.attachStyle = function() {
                    return G()
                }, n.detachStyle = function() {
                    return V()
                }, n.version = "8.2.7", n.ScrollbarPlugin = Bt, n
            }($t);
            n.default = tn
        }, function(t, n, e) {
            e(22), e(25), e(33), e(70), e(75), e(77), e(78), t.exports = e(4).Map
        }, function(t, n, e) {
            var r = e(26),
                o = e(27);
            t.exports = function(t) {
                return function(n, e) {
                    var i,
                        u,
                        c = String(o(n)),
                        s = r(e),
                        a = c.length;
                    return s < 0 || s >= a ? t ? "" : void 0 : (i = c.charCodeAt(s), i < 55296 || i > 56319 || s + 1 === a || (u = c.charCodeAt(s + 1)) < 56320 || u > 57343 ? t ? c.charAt(s) : i : t ? c.slice(s, s + 2) : u - 56320 + (i - 55296 << 10) + 65536)
                }
            }
        }, function(t, n) {
            t.exports = !1
        }, function(t, n, e) {
            "use strict";
            var r = e(44),
                o = e(17),
                i = e(32),
                u = {};
            e(11)(u, e(0)("iterator"), function() {
                return this
            }), t.exports = function(t, n, e) {
                t.prototype = r(u, {
                    next: o(1, e)
                }), i(t, n + " Iterator")
            }
        }, function(t, n, e) {
            var r = e(7),
                o = e(8),
                i = e(29);
            t.exports = e(9) ? Object.defineProperties : function(t, n) {
                o(t);
                for (var e, u = i(n), c = u.length, s = 0; c > s;)
                    r.f(t, e = u[s++], n[e]);
                return t
            }
        }, function(t, n, e) {
            var r = e(3),
                o = e(18),
                i = e(64)(!1),
                u = e(31)("IE_PROTO");
            t.exports = function(t, n) {
                var e,
                    c = o(t),
                    s = 0,
                    a = [];
                for (e in c)
                    e != u && r(c, e) && a.push(e);
                for (; n.length > s;)
                    r(c, e = n[s++]) && (~i(a, e) || a.push(e));
                return a
            }
        }, function(t, n, e) {
            var r = e(18),
                o = e(19),
                i = e(65);
            t.exports = function(t) {
                return function(n, e, u) {
                    var c,
                        s = r(n),
                        a = o(s.length),
                        f = i(u, a);
                    if (t && e != e) {
                        for (; a > f;)
                            if ((c = s[f++]) != c)
                                return !0
                    } else
                        for (; a > f; f++)
                            if ((t || f in s) && s[f] === e)
                                return t || f || 0;
                    return !t && -1
                }
            }
        }, function(t, n, e) {
            var r = e(26),
                o = Math.max,
                i = Math.min;
            t.exports = function(t, n) {
                return t = r(t), t < 0 ? o(t + n, 0) : i(t, n)
            }
        }, function(t, n, e) {
            var r = e(2).document;
            t.exports = r && r.documentElement
        }, function(t, n, e) {
            var r = e(3),
                o = e(20),
                i = e(31)("IE_PROTO"),
                u = Object.prototype;
            t.exports = Object.getPrototypeOf || function(t) {
                return t = o(t), r(t, i) ? t[i] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? u : null
            }
        }, function(t, n, e) {
            "use strict";
            var r = e(69),
                o = e(46),
                i = e(13),
                u = e(18);
            t.exports = e(28)(Array, "Array", function(t, n) {
                this._t = u(t), this._i = 0, this._k = n
            }, function() {
                var t = this._t,
                    n = this._k,
                    e = this._i++;
                return !t || e >= t.length ? (this._t = void 0, o(1)) : "keys" == n ? o(0, e) : "values" == n ? o(0, t[e]) : o(0, [e, t[e]])
            }, "values"), i.Arguments = i.Array, r("keys"), r("values"), r("entries")
        }, function(t, n, e) {
            var r = e(0)("unscopables"),
                o = Array.prototype;
            void 0 == o[r] && e(11)(o, r, {}), t.exports = function(t) {
                o[r][t] = !0
            }
        }, function(t, n, e) {
            "use strict";
            var r = e(47),
                o = e(15);
            t.exports = e(36)("Map", function(t) {
                return function() {
                    return t(this, arguments.length > 0 ? arguments[0] : void 0)
                }
            }, {
                get: function(t) {
                    var n = r.getEntry(o(this, "Map"), t);
                    return n && n.v
                },
                set: function(t, n) {
                    return r.def(o(this, "Map"), 0 === t ? 0 : t, n)
                }
            }, r, !0)
        }, function(t, n, e) {
            "use strict";
            var r = e(2),
                o = e(7),
                i = e(9),
                u = e(0)("species");
            t.exports = function(t) {
                var n = r[t];
                i && n && !n[u] && o.f(n, u, {
                    configurable: !0,
                    get: function() {
                        return this
                    }
                })
            }
        }, function(t, n, e) {
            var r = e(1),
                o = e(73).set;
            t.exports = function(t, n, e) {
                var i,
                    u = n.constructor;
                return u !== e && "function" == typeof u && (i = u.prototype) !== e.prototype && r(i) && o && o(t, i), t
            }
        }, function(t, n, e) {
            var r = e(1),
                o = e(8),
                i = function(t, n) {
                    if (o(t), !r(n) && null !== n)
                        throw TypeError(n + ": can't set as prototype!")
                };
            t.exports = {
                set: Object.setPrototypeOf || ("__proto__" in {} ? function(t, n, r) {
                    try {
                        r = e(10)(Function.call, e(74).f(Object.prototype, "__proto__").set, 2), r(t, []), n = !(t instanceof Array)
                    } catch (t) {
                        n = !0
                    }
                    return function(t, e) {
                        return i(t, e), n ? t.__proto__ = e : r(t, e), t
                    }
                }({}, !1) : void 0),
                check: i
            }
        }, function(t, n, e) {
            var r = e(52),
                o = e(17),
                i = e(18),
                u = e(42),
                c = e(3),
                s = e(40),
                a = Object.getOwnPropertyDescriptor;
            n.f = e(9) ? a : function(t, n) {
                if (t = i(t), n = u(n, !0), s)
                    try {
                        return a(t, n)
                    } catch (t) {}
                if (c(t, n))
                    return o(!r.f.call(t, n), t[n])
            }
        }, function(t, n, e) {
            var r = e(5);
            r(r.P + r.R, "Map", {
                toJSON: e(53)("Map")
            })
        }, function(t, n, e) {
            var r = e(14);
            t.exports = function(t, n) {
                var e = [];
                return r(t, !1, e.push, e, n), e
            }
        }, function(t, n, e) {
            e(37)("Map")
        }, function(t, n, e) {
            e(38)("Map")
        }, function(t, n, e) {
            e(22), e(25), e(33), e(80), e(81), e(82), e(83), t.exports = e(4).Set
        }, function(t, n, e) {
            "use strict";
            var r = e(47),
                o = e(15);
            t.exports = e(36)("Set", function(t) {
                return function() {
                    return t(this, arguments.length > 0 ? arguments[0] : void 0)
                }
            }, {
                add: function(t) {
                    return r.def(o(this, "Set"), t = 0 === t ? 0 : t, t)
                }
            }, r)
        }, function(t, n, e) {
            var r = e(5);
            r(r.P + r.R, "Set", {
                toJSON: e(53)("Set")
            })
        }, function(t, n, e) {
            e(37)("Set")
        }, function(t, n, e) {
            e(38)("Set")
        }, function(t, n, e) {
            e(22), e(33), e(85), e(91), e(92), t.exports = e(4).WeakMap
        }, function(t, n, e) {
            "use strict";
            var r,
                o = e(54)(0),
                i = e(6),
                u = e(21),
                c = e(55),
                s = e(90),
                a = e(1),
                f = e(12),
                l = e(15),
                p = u.getWeak,
                h = Object.isExtensible,
                d = s.ufstore,
                v = {},
                y = function(t) {
                    return function() {
                        return t(this, arguments.length > 0 ? arguments[0] : void 0)
                    }
                },
                m = {
                    get: function(t) {
                        if (a(t)) {
                            var n = p(t);
                            return !0 === n ? d(l(this, "WeakMap")).get(t) : n ? n[this._i] : void 0
                        }
                    },
                    set: function(t, n) {
                        return s.def(l(this, "WeakMap"), t, n)
                    }
                },
                g = t.exports = e(36)("WeakMap", y, m, s, !0, !0);
            f(function() {
                return 7 != (new g).set((Object.freeze || Object)(v), 7).get(v)
            }) && (r = s.getConstructor(y, "WeakMap"), c(r.prototype, m), u.NEED = !0, o(["delete", "has", "get", "set"], function(t) {
                var n = g.prototype,
                    e = n[t];
                i(n, t, function(n, o) {
                    if (a(n) && !h(n)) {
                        this._f || (this._f = new r);
                        var i = this._f[t](n, o);
                        return "set" == t ? this : i
                    }
                    return e.call(this, n, o)
                })
            }))
        }, function(t, n, e) {
            var r = e(87);
            t.exports = function(t, n) {
                return new (r(t))(n)
            }
        }, function(t, n, e) {
            var r = e(1),
                o = e(88),
                i = e(0)("species");
            t.exports = function(t) {
                var n;
                return o(t) && (n = t.constructor, "function" != typeof n || n !== Array && !o(n.prototype) || (n = void 0), r(n) && null === (n = n[i]) && (n = void 0)), void 0 === n ? Array : n
            }
        }, function(t, n, e) {
            var r = e(24);
            t.exports = Array.isArray || function(t) {
                return "Array" == r(t)
            }
        }, function(t, n) {
            n.f = Object.getOwnPropertySymbols
        }, function(t, n, e) {
            "use strict";
            var r = e(34),
                o = e(21).getWeak,
                i = e(8),
                u = e(1),
                c = e(35),
                s = e(14),
                a = e(54),
                f = e(3),
                l = e(15),
                p = a(5),
                h = a(6),
                d = 0,
                v = function(t) {
                    return t._l || (t._l = new y)
                },
                y = function() {
                    this.a = []
                },
                m = function(t, n) {
                    return p(t.a, function(t) {
                        return t[0] === n
                    })
                };
            y.prototype = {
                get: function(t) {
                    var n = m(this, t);
                    if (n)
                        return n[1]
                },
                has: function(t) {
                    return !!m(this, t)
                },
                set: function(t, n) {
                    var e = m(this, t);
                    e ? e[1] = n : this.a.push([t, n])
                },
                delete: function(t) {
                    var n = h(this.a, function(n) {
                        return n[0] === t
                    });
                    return ~n && this.a.splice(n, 1), !!~n
                }
            }, t.exports = {
                getConstructor: function(t, n, e, i) {
                    var a = t(function(t, r) {
                        c(t, a, n, "_i"), t._t = n, t._i = d++, t._l = void 0, void 0 != r && s(r, e, t[i], t)
                    });
                    return r(a.prototype, {
                        delete: function(t) {
                            if (!u(t))
                                return !1;
                            var e = o(t);
                            return !0 === e ? v(l(this, n)).delete(t) : e && f(e, this._i) && delete e[this._i]
                        },
                        has: function(t) {
                            if (!u(t))
                                return !1;
                            var e = o(t);
                            return !0 === e ? v(l(this, n)).has(t) : e && f(e, this._i)
                        }
                    }), a
                },
                def: function(t, n, e) {
                    var r = o(i(n), !0);
                    return !0 === r ? v(t).set(n, e) : r[t._i] = e, t
                },
                ufstore: v
            }
        }, function(t, n, e) {
            e(37)("WeakMap")
        }, function(t, n, e) {
            e(38)("WeakMap")
        }, function(t, n, e) {
            e(25), e(94), t.exports = e(4).Array.from
        }, function(t, n, e) {
            "use strict";
            var r = e(10),
                o = e(5),
                i = e(20),
                u = e(48),
                c = e(49),
                s = e(19),
                a = e(95),
                f = e(50);
            o(o.S + o.F * !e(51)(function(t) {
                Array.from(t)
            }), "Array", {
                from: function(t) {
                    var n,
                        e,
                        o,
                        l,
                        p = i(t),
                        h = "function" == typeof this ? this : Array,
                        d = arguments.length,
                        v = d > 1 ? arguments[1] : void 0,
                        y = void 0 !== v,
                        m = 0,
                        g = f(p);
                    if (y && (v = r(v, d > 2 ? arguments[2] : void 0, 2)), void 0 == g || h == Array && c(g))
                        for (n = s(p.length), e = new h(n); n > m; m++)
                            a(e, m, y ? v(p[m], m) : p[m]);
                    else
                        for (l = g.call(p), e = new h; !(o = l.next()).done; m++)
                            a(e, m, y ? u(l, v, [o.value, m], !0) : o.value);
                    return e.length = m, e
                }
            })
        }, function(t, n, e) {
            "use strict";
            var r = e(7),
                o = e(17);
            t.exports = function(t, n, e) {
                n in t ? r.f(t, n, o(0, e)) : t[n] = e
            }
        }, function(t, n, e) {
            e(97), t.exports = e(4).Object.assign
        }, function(t, n, e) {
            var r = e(5);
            r(r.S + r.F, "Object", {
                assign: e(55)
            })
        }, function(t, n, e) {
            "use strict";
            (function(t) {
                var e = "object" == typeof t && t && t.Object === Object && t;
                n.a = e
            }).call(n, e(99))
        }, function(t, n) {
            var e;
            e = function() {
                return this
            }();
            try {
                e = e || Function("return this")() || (0, eval)("this")
            } catch (t) {
                "object" == typeof window && (e = window)
            }
            t.exports = e
        }]).default
    });
    !function(t, e) {
        "object" == typeof exports && "object" == typeof module ? module.exports = e(require("smooth-scrollbar")) : "function" == typeof define && define.amd ? define(["smooth-scrollbar"], e) : "object" == typeof exports ? exports.OverscrollPlugin = e(require("smooth-scrollbar")) : t.OverscrollPlugin = e(t.Scrollbar)
    }(this, function(t) {
        return function(t) {
            function e(r) {
                if (o[r])
                    return o[r].exports;
                var n = o[r] = {
                    i: r,
                    l: !1,
                    exports: {}
                };
                return t[r].call(n.exports, n, n.exports, e), n.l = !0, n.exports
            }
            var o = {};
            return e.m = t, e.c = o, e.d = function(t, o, r) {
                e.o(t, o) || Object.defineProperty(t, o, {
                    configurable: !1,
                    enumerable: !0,
                    get: r
                })
            }, e.n = function(t) {
                var o = t && t.__esModule ? function() {
                    return t.default
                } : function() {
                    return t
                };
                return e.d(o, "a", o), o
            }, e.o = function(t, e) {
                return Object.prototype.hasOwnProperty.call(t, e)
            }, e.p = "", e(e.s = 0)
        }([function(t, e, o) {
            t.exports = o(1)
        }, function(t, e, o) {
            "use strict";
            function r(t, e) {
                function o() {
                    this.constructor = t
                }
                _(t, e), t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o)
            }
            function n(t, e, o) {
                return t === t && (void 0 !== o && (t = t <= o ? t : o), void 0 !== e && (t = t >= e ? t : e)), t
            }
            function i(t) {
                var e = typeof t;
                return null != t && ("object" == e || "function" == e)
            }
            function s(t) {
                var e = S.call(t, E),
                    o = t[E];
                try {
                    t[E] = void 0;
                    var r = !0
                } catch (t) {}
                var n = P.call(t);
                return r && (e ? t[E] = o : delete t[E]), n
            }
            function c(t) {
                return A.call(t)
            }
            function l(t) {
                return null == t ? void 0 === t ? B : N : z && z in Object(t) ? T(t) : C(t)
            }
            function a(t) {
                return null != t && "object" == typeof t
            }
            function u(t) {
                return "symbol" == typeof t || U(t) && L(t) == G
            }
            function h(t) {
                if ("number" == typeof t)
                    return t;
                if (X(t))
                    return Y;
                if (m(t)) {
                    var e = "function" == typeof t.valueOf ? t.valueOf() : t;
                    t = m(e) ? e + "" : e
                }
                if ("string" != typeof t)
                    return 0 === t ? t : +t;
                t = t.replace(q, "");
                var o = $.test(t);
                return o || I.test(t) ? D(t.slice(2), o ? 2 : 8) : R.test(t) ? Y : +t
            }
            function f(t, e, o) {
                return void 0 === o && (o = e, e = void 0), void 0 !== o && (o = F(o), o = o === o ? o : 0), void 0 !== e && (e = F(e), e = e === e ? e : 0), b(F(t), e, o)
            }
            function p(t, e, o) {
                function r(e) {
                    var o = f,
                        r = p;
                    return f = p = void 0, b = e, v = t.apply(r, o)
                }
                function n(t) {
                    return b = t, _ = setTimeout(c, e), x ? r(t) : v
                }
                function i(t) {
                    var o = t - y,
                        r = t - b,
                        n = e - o;
                    return g ? Z(n, d - r) : n
                }
                function s(t) {
                    var o = t - y,
                        r = t - b;
                    return void 0 === y || o >= e || o < 0 || g && r >= d
                }
                function c() {
                    var t = K();
                    if (s(t))
                        return l(t);
                    _ = setTimeout(c, i(t))
                }
                function l(t) {
                    return _ = void 0, O && f ? r(t) : (f = p = void 0, v)
                }
                function a() {
                    void 0 !== _ && clearTimeout(_), b = 0, f = y = p = _ = void 0
                }
                function u() {
                    return void 0 === _ ? v : l(K())
                }
                function h() {
                    var t = K(),
                        o = s(t);
                    if (f = arguments, p = this, y = t, o) {
                        if (void 0 === _)
                            return n(y);
                        if (g)
                            return _ = setTimeout(c, e), r(y)
                    }
                    return void 0 === _ && (_ = setTimeout(c, e)), v
                }
                var f,
                    p,
                    d,
                    v,
                    _,
                    y,
                    b = 0,
                    x = !1,
                    g = !1,
                    O = !0;
                if ("function" != typeof t)
                    throw new TypeError(Q);
                return e = F(e) || 0, m(o) && (x = !!o.leading, g = "maxWait" in o, d = g ? V(F(o.maxWait) || 0, e) : d, O = "trailing" in o ? !!o.trailing : O), h.cancel = a, h.flush = u, h
            }
            function d(t) {
                var e = {};
                return Object.keys(t).forEach(function(o) {
                    if (!rt.test(o))
                        return void (e[o] = t[o]);
                    var r = t[o];
                    o = o.replace(/^-/, ""), e[o] = r, ot.forEach(function(t) {
                        e["-" + t + "-" + o] = r
                    })
                }), e
            }
            function v(t, e) {
                e = d(e), Object.keys(e).forEach(function(o) {
                    var r = o.replace(/^-/, "").replace(/-([a-z])/g, function(t, e) {
                        return e.toUpperCase()
                    });
                    t.style[r] = e[o]
                })
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var _ = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(t, e) {
                    t.__proto__ = e
                } || function(t, e) {
                    for (var o in e)
                        e.hasOwnProperty(o) && (t[o] = e[o])
                },
                y = Object.assign || function(t) {
                    for (var e, o = 1, r = arguments.length; o < r; o++) {
                        e = arguments[o];
                        for (var n in e)
                            Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
                    }
                    return t
                },
                b = n,
                m = i,
                x = o(2),
                g = "object" == typeof self && self && self.Object === Object && self,
                O = x.a || g || Function("return this")(),
                w = O,
                j = w.Symbol,
                k = j,
                M = Object.prototype,
                S = M.hasOwnProperty,
                P = M.toString,
                E = k ? k.toStringTag : void 0,
                T = s,
                W = Object.prototype,
                A = W.toString,
                C = c,
                N = "[object Null]",
                B = "[object Undefined]",
                z = k ? k.toStringTag : void 0,
                L = l,
                U = a,
                G = "[object Symbol]",
                X = u,
                Y = NaN,
                q = /^\s+|\s+$/g,
                R = /^[-+]0x[0-9a-f]+$/i,
                $ = /^0b[01]+$/i,
                I = /^0o[0-7]+$/i,
                D = parseInt,
                F = h,
                H = f,
                J = function() {
                    return w.Date.now()
                },
                K = J,
                Q = "Expected a function",
                V = Math.max,
                Z = Math.min,
                tt = p,
                et = o(4),
                ot = ["webkit", "moz", "ms", "o"],
                rt = new RegExp("^-(?!(?:" + ot.join("|") + ")-)"),
                nt = function() {
                    function t(t) {
                        this._scrollbar = t
                    }
                    return t.prototype.render = function(t) {
                        var e = t.x,
                            o = void 0 === e ? 0 : e,
                            r = t.y,
                            n = void 0 === r ? 0 : r,
                            i = this._scrollbar,
                            s = i.size,
                            c = i.track,
                            l = i.offset;
                        if (v(i.contentEl, {
                            "-transform": "translate3d(" + -(l.x + o) + "px, " + -(l.y + n) + "px, 0)"
                        }), o) {
                            c.xAxis.show();
                            var a = s.container.width / (s.container.width + Math.abs(o));
                            v(c.xAxis.thumb.element, {
                                "-transform": "translate3d(" + c.xAxis.thumb.offset + "px, 0, 0) scale3d(" + a + ", 1, 1)",
                                "-transform-origin": o < 0 ? "left" : "right"
                            })
                        }
                        if (n) {
                            c.yAxis.show();
                            var a = s.container.height / (s.container.height + Math.abs(n));
                            v(c.yAxis.thumb.element, {
                                "-transform": "translate3d(0, " + c.yAxis.thumb.offset + "px, 0) scale3d(1, " + a + ", 1)",
                                "-transform-origin": n < 0 ? "top" : "bottom"
                            })
                        }
                        c.autoHideOnIdle()
                    }, t
                }(),
                it = function() {
                    function t(t) {
                        this._scrollbar = t, this._canvas = document.createElement("canvas"), this._ctx = this._canvas.getContext("2d"), v(this._canvas, {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            display: "none"
                        })
                    }
                    return t.prototype.mount = function() {
                        this._scrollbar.containerEl.appendChild(this._canvas)
                    }, t.prototype.unmount = function() {
                        this._canvas.parentNode && this._canvas.parentNode.removeChild(this._canvas)
                    }, t.prototype.adjust = function() {
                        var t = this._scrollbar.size,
                            e = window.devicePixelRatio || 1,
                            o = t.container.width * e,
                            r = t.container.height * e;
                        o === this._canvas.width && r === this._canvas.height || (this._canvas.width = o, this._canvas.height = r, this._ctx.scale(e, e))
                    }, t.prototype.recordTouch = function(t) {
                        var e = t.touches[t.touches.length - 1];
                        this._touchX = e.clientX, this._touchY = e.clientY
                    }, t.prototype.render = function(t, e) {
                        var o = t.x,
                            r = void 0 === o ? 0 : o,
                            n = t.y,
                            i = void 0 === n ? 0 : n;
                        if (!r && !i)
                            return void v(this._canvas, {
                                display: "none"
                            });
                        v(this._canvas, {
                            display: "block"
                        });
                        var s = this._scrollbar.size;
                        this._ctx.clearRect(0, 0, s.container.width, s.container.height), this._ctx.fillStyle = e, this._renderX(r), this._renderY(i)
                    }, t.prototype._getMaxOverscroll = function() {
                        var t = this._scrollbar.options.plugins.overscroll;
                        return t && t.maxOverscroll ? t.maxOverscroll : 150
                    }, t.prototype._renderX = function(t) {
                        var e = this._scrollbar.size,
                            o = this._getMaxOverscroll(),
                            r = e.container,
                            n = r.width,
                            i = r.height,
                            s = this._ctx;
                        s.save(), t > 0 && s.transform(-1, 0, 0, 1, n, 0);
                        var c = H(Math.abs(t) / o, 0, .75),
                            l = H(c, 0, .25) * n,
                            a = Math.abs(t),
                            u = this._touchY || i / 2;
                        s.globalAlpha = c, s.beginPath(), s.moveTo(0, -l), s.quadraticCurveTo(a, u, 0, i + l), s.fill(), s.closePath(), s.restore()
                    }, t.prototype._renderY = function(t) {
                        var e = this._scrollbar.size,
                            o = this._getMaxOverscroll(),
                            r = e.container,
                            n = r.width,
                            i = r.height,
                            s = this._ctx;
                        s.save(), t > 0 && s.transform(1, 0, 0, -1, 0, i);
                        var c = H(Math.abs(t) / o, 0, .75),
                            l = H(c, 0, .25) * n,
                            a = this._touchX || n / 2,
                            u = Math.abs(t);
                        s.globalAlpha = c, s.beginPath(), s.moveTo(-l, 0), s.quadraticCurveTo(a, u, n + l, 0), s.fill(), s.closePath(), s.restore()
                    }, t
                }();
            o.d(e, "OverscrollEffect", function() {
                return st
            });
            var st;
            !function(t) {
                t.BOUNCE = "bounce", t.GLOW = "glow"
            }(st || (st = {}));
            var ct = /wheel|touch/,
                lt = function(t) {
                    function e() {
                        var e = null !== t && t.apply(this, arguments) || this;
                        return e._glow = new it(e.scrollbar), e._bounce = new nt(e.scrollbar), e._wheelScrollBack = {
                            x: !1,
                            y: !1
                        }, e._lockWheel = {
                            x: !1,
                            y: !1
                        }, e._touching = !1, e._amplitude = {
                            x: 0,
                            y: 0
                        }, e._position = {
                            x: 0,
                            y: 0
                        }, e._releaseWheel = tt(function() {
                            e._lockWheel.x = !1, e._lockWheel.y = !1
                        }, 30), e
                    }
                    return r(e, t), Object.defineProperty(e.prototype, "_isWheelLocked", {
                        get: function() {
                            return this._lockWheel.x || this._lockWheel.y
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(e.prototype, "_enabled", {
                        get: function() {
                            return !!this.options.effect
                        },
                        enumerable: !0,
                        configurable: !0
                    }), e.prototype.onInit = function() {
                        var t = this,
                            e = t._glow,
                            o = t.options,
                            r = t.scrollbar,
                            n = o.effect;
                        Object.defineProperty(o, "effect", {
                            get: function() {
                                return n
                            },
                            set: function(t) {
                                if (!t)
                                    return void (n = void 0);
                                if (t !== st.BOUNCE && t !== st.GLOW)
                                    throw new TypeError("unknow overscroll effect: " + t);
                                n = t, r.options.continuousScrolling = !1, t === st.GLOW ? (e.mount(), e.adjust()) : e.unmount()
                            }
                        }), o.effect = n
                    }, e.prototype.onUpdate = function() {
                        this.options.effect === st.GLOW && this._glow.adjust()
                    }, e.prototype.onRender = function(t) {
                        if (this._enabled) {
                            this.scrollbar.options.continuousScrolling && (this.scrollbar.options.continuousScrolling = !1);
                            var e = t.x,
                                o = t.y;
                            !this._amplitude.x && this._willOverscroll("x", t.x) && (e = 0, this._absorbMomentum("x", t.x)), !this._amplitude.y && this._willOverscroll("y", t.y) && (o = 0, this._absorbMomentum("y", t.y)), this.scrollbar.setMomentum(e, o), this._render()
                        }
                    }, e.prototype.transformDelta = function(t, e) {
                        if (this._lastEventType = e.type, !this._enabled || !ct.test(e.type))
                            return t;
                        this._isWheelLocked && /wheel/.test(e.type) && (this._releaseWheel(), this._willOverscroll("x", t.x) && (t.x = 0), this._willOverscroll("y", t.y) && (t.y = 0));
                        var o = t.x,
                            r = t.y;
                        switch (this._willOverscroll("x", t.x) && (o = 0, this._addAmplitude("x", t.x)), this._willOverscroll("y", t.y) && (r = 0, this._addAmplitude("y", t.y)), e.type) {
                        case "touchstart":
                        case "touchmove":
                            this._touching = !0, this._glow.recordTouch(e);
                            break;
                        case "touchcancel":
                        case "touchend":
                            this._touching = !1
                        }
                        return {
                            x: o,
                            y: r
                        }
                    }, e.prototype._willOverscroll = function(t, e) {
                        if (!e)
                            return !1;
                        if (this._position[t])
                            return !0;
                        var o = this.scrollbar.offset[t],
                            r = this.scrollbar.limit[t];
                        return 0 !== r && (H(o + e, 0, r) === o && (0 === o || o === r))
                    }, e.prototype._absorbMomentum = function(t, e) {
                        var o = this,
                            r = o.options,
                            n = o._lastEventType,
                            i = o._amplitude;
                        ct.test(n) && (i[t] = H(e, -r.maxOverscroll, r.maxOverscroll))
                    }, e.prototype._addAmplitude = function(t, e) {
                        var o,
                            r = this,
                            n = r.options,
                            i = r.scrollbar,
                            s = r._amplitude,
                            c = r._position,
                            l = s[t],
                            a = e * l < 0;
                        o = a ? 0 : this._wheelScrollBack[t] ? 1 : Math.abs(l / n.maxOverscroll);
                        var u = l + e * (1 - o);
                        s[t] = 0 === i.offset[t] ? H(u, -n.maxOverscroll, 0) : H(u, 0, n.maxOverscroll), a && (c[t] = s[t])
                    }, e.prototype._render = function() {
                        var t = this,
                            e = t.options,
                            o = t._amplitude,
                            r = t._position;
                        if (this._enabled && (o.x || o.y || r.x || r.y)) {
                            var n = this._nextAmp("x"),
                                i = this._nextAmp("y");
                            switch (o.x = n.amplitude, r.x = n.position, o.y = i.amplitude, r.y = i.position, e.effect) {
                            case st.BOUNCE:
                                this._bounce.render(r);
                                break;
                            case st.GLOW:
                                this._glow.render(r, this.options.glowColor)
                            }
                            "function" == typeof e.onScroll && e.onScroll.call(this, y({}, r))
                        }
                    }, e.prototype._nextAmp = function(t) {
                        var e = this,
                            o = e.options,
                            r = e._amplitude,
                            n = e._position,
                            i = 1 - o.damping,
                            s = r[t],
                            c = n[t],
                            l = this._touching ? s : s * i | 0,
                            a = l - c,
                            u = c + a - (a * i | 0);
                        return !this._touching && Math.abs(u) < Math.abs(c) && (this._wheelScrollBack[t] = !0), this._wheelScrollBack[t] && Math.abs(u) <= 1 && (this._wheelScrollBack[t] = !1, this._lockWheel[t] = !0), {
                            amplitude: l,
                            position: u
                        }
                    }, e.pluginName = "overscroll", e.defaultOptions = {
                        effect: st.BOUNCE,
                        onScroll: void 0,
                        damping: .2,
                        maxOverscroll: 150,
                        glowColor: "#87ceeb"
                    }, e
                }(et.ScrollbarPlugin);
            e.default = lt
        }, function(t, e, o) {
            "use strict";
            (function(t) {
                var o = "object" == typeof t && t && t.Object === Object && t;
                e.a = o
            }).call(e, o(3))
        }, function(t, e) {
            var o;
            o = function() {
                return this
            }();
            try {
                o = o || Function("return this")() || (0, eval)("this")
            } catch (t) {
                "object" == typeof window && (o = window)
            }
            t.exports = o
        }, function(e, o) {
            e.exports = t
        }]).default
    });
    var _gsScope = (typeof (module) !== "undefined" && module.exports && typeof (global) !== "undefined") ? global : this || window;
    (_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(Animation, SimpleTimeline, TweenLite) {
            var _slice = function(a) {
                    var b = [],
                        l = a.length,
                        i;
                    for (i = 0; i !== l; b.push(a[i++]))
                        ;
                    return b
                },
                _applyCycle = function(vars, targets, i) {
                    var alt = vars.cycle,
                        p,
                        val;
                    for (p in alt) {
                        val = alt[p];
                        vars[p] = (typeof (val) === "function") ? val.call(targets[i], i) : val[i % val.length]
                    }
                    delete vars.cycle
                },
                TweenMax = function(target, duration, vars) {
                    TweenLite.call(this, target, duration, vars);
                    this._cycle = 0;
                    this._yoyo = (this.vars.yoyo === !0);
                    this._repeat = this.vars.repeat || 0;
                    this._repeatDelay = this.vars.repeatDelay || 0;
                    this._dirty = !0;
                    this.render = TweenMax.prototype.render
                },
                _tinyNum = 0.0000000001,
                TweenLiteInternals = TweenLite._internals,
                _isSelector = TweenLiteInternals.isSelector,
                _isArray = TweenLiteInternals.isArray,
                p = TweenMax.prototype = TweenLite.to({}, 0.1, {}),
                _blankArray = [];
            TweenMax.version = "1.18.5";
            p.constructor = TweenMax;
            p.kill()._gc = !1;
            TweenMax.killTweensOf = TweenMax.killDelayedCallsTo = TweenLite.killTweensOf;
            TweenMax.getTweensOf = TweenLite.getTweensOf;
            TweenMax.lagSmoothing = TweenLite.lagSmoothing;
            TweenMax.ticker = TweenLite.ticker;
            TweenMax.render = TweenLite.render;
            p.invalidate = function() {
                this._yoyo = (this.vars.yoyo === !0);
                this._repeat = this.vars.repeat || 0;
                this._repeatDelay = this.vars.repeatDelay || 0;
                this._uncache(!0);
                return TweenLite.prototype.invalidate.call(this)
            };
            p.updateTo = function(vars, resetDuration) {
                var curRatio = this.ratio,
                    immediate = this.vars.immediateRender || vars.immediateRender,
                    p;
                if (resetDuration && this._startTime < this._timeline._time) {
                    this._startTime = this._timeline._time;
                    this._uncache(!1);
                    if (this._gc) {
                        this._enabled(!0, !1)
                    } else {
                        this._timeline.insert(this, this._startTime - this._delay)
                    }
                }
                for (p in vars) {
                    this.vars[p] = vars[p]
                }
                if (this._initted || immediate) {
                    if (resetDuration) {
                        this._initted = !1;
                        if (immediate) {
                            this.render(0, !0, !0)
                        }
                    } else {
                        if (this._gc) {
                            this._enabled(!0, !1)
                        }
                        if (this._notifyPluginsOfEnabled && this._firstPT) {
                            TweenLite._onPluginEvent("_onDisable", this)
                        }
                        if (this._time / this._duration > 0.998) {
                            var prevTime = this._totalTime;
                            this.render(0, !0, !1);
                            this._initted = !1;
                            this.render(prevTime, !0, !1)
                        } else {
                            this._initted = !1;
                            this._init();
                            if (this._time > 0 || immediate) {
                                var inv = 1 / (1 - curRatio),
                                    pt = this._firstPT,
                                    endValue;
                                while (pt) {
                                    endValue = pt.s + pt.c;
                                    pt.c *= inv;
                                    pt.s = endValue - pt.c;
                                    pt = pt._next
                                }
                            }
                        }
                    }
                }
                return this
            };
            p.render = function(time, suppressEvents, force) {
                if (!this._initted)
                    if (this._duration === 0 && this.vars.repeat) {
                        this.invalidate()
                    }
                var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),
                    prevTime = this._time,
                    prevTotalTime = this._totalTime,
                    prevCycle = this._cycle,
                    duration = this._duration,
                    prevRawPrevTime = this._rawPrevTime,
                    isComplete,
                    callback,
                    pt,
                    cycleDuration,
                    r,
                    type,
                    pow,
                    rawPrevTime;
                if (time >= totalDur - 0.0000001) {
                    this._totalTime = totalDur;
                    this._cycle = this._repeat;
                    if (this._yoyo && (this._cycle & 1) !== 0) {
                        this._time = 0;
                        this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0
                    } else {
                        this._time = duration;
                        this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1
                    }
                    if (!this._reversed) {
                        isComplete = !0;
                        callback = "onComplete";
                        force = (force || this._timeline.autoRemoveChildren)
                    }
                    if (duration === 0)
                        if (this._initted || !this.vars.lazy || force) {
                            if (this._startTime === this._timeline._duration) {
                                time = 0
                            }
                            if (prevRawPrevTime < 0 || (time <= 0 && time >= -0.0000001) || (prevRawPrevTime === _tinyNum && this.data !== "isPause"))
                                if (prevRawPrevTime !== time) {
                                    force = !0;
                                    if (prevRawPrevTime > _tinyNum) {
                                        callback = "onReverseComplete"
                                    }
                                }
                            this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum
                        }
                } else if (time < 0.0000001) {
                    this._totalTime = this._time = this._cycle = 0;
                    this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
                    if (prevTotalTime !== 0 || (duration === 0 && prevRawPrevTime > 0)) {
                        callback = "onReverseComplete";
                        isComplete = this._reversed
                    }
                    if (time < 0) {
                        this._active = !1;
                        if (duration === 0)
                            if (this._initted || !this.vars.lazy || force) {
                                if (prevRawPrevTime >= 0) {
                                    force = !0
                                }
                                this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum
                            }
                    }
                    if (!this._initted) {
                        force = !0
                    }
                } else {
                    this._totalTime = this._time = time;
                    if (this._repeat !== 0) {
                        cycleDuration = duration + this._repeatDelay;
                        this._cycle = (this._totalTime / cycleDuration) >> 0;
                        if (this._cycle !== 0)
                            if (this._cycle === this._totalTime / cycleDuration && prevTotalTime <= time) {
                                this._cycle--
                            }
                        this._time = this._totalTime - (this._cycle * cycleDuration);
                        if (this._yoyo)
                            if ((this._cycle & 1) !== 0) {
                                this._time = duration - this._time
                            }
                        if (this._time > duration) {
                            this._time = duration
                        } else if (this._time < 0) {
                            this._time = 0
                        }
                    }
                    if (this._easeType) {
                        r = this._time / duration;
                        type = this._easeType;
                        pow = this._easePower;
                        if (type === 1 || (type === 3 && r >= 0.5)) {
                            r = 1 - r
                        }
                        if (type === 3) {
                            r *= 2
                        }
                        if (pow === 1) {
                            r *= r
                        } else if (pow === 2) {
                            r *= r * r
                        } else if (pow === 3) {
                            r *= r * r * r
                        } else if (pow === 4) {
                            r *= r * r * r * r
                        }
                        if (type === 1) {
                            this.ratio = 1 - r
                        } else if (type === 2) {
                            this.ratio = r
                        } else if (this._time / duration < 0.5) {
                            this.ratio = r / 2
                        } else {
                            this.ratio = 1 - (r / 2)
                        }
                    } else {
                        this.ratio = this._ease.getRatio(this._time / duration)
                    }
                }
                if (prevTime === this._time && !force && prevCycle === this._cycle) {
                    if (prevTotalTime !== this._totalTime)
                        if (this._onUpdate)
                            if (!suppressEvents) {
                                this._callback("onUpdate")
                            }
                    return
                } else if (!this._initted) {
                    this._init();
                    if (!this._initted || this._gc) {
                        return
                    } else if (!force && this._firstPT && ((this.vars.lazy !== !1 && this._duration) || (this.vars.lazy && !this._duration))) {
                        this._time = prevTime;
                        this._totalTime = prevTotalTime;
                        this._rawPrevTime = prevRawPrevTime;
                        this._cycle = prevCycle;
                        TweenLiteInternals.lazyTweens.push(this);
                        this._lazy = [time, suppressEvents];
                        return
                    }
                    if (this._time && !isComplete) {
                        this.ratio = this._ease.getRatio(this._time / duration)
                    } else if (isComplete && this._ease._calcEnd) {
                        this.ratio = this._ease.getRatio((this._time === 0) ? 0 : 1)
                    }
                }
                if (this._lazy !== !1) {
                    this._lazy = !1
                }
                if (!this._active)
                    if (!this._paused && this._time !== prevTime && time >= 0) {
                        this._active = !0
                    }
                if (prevTotalTime === 0) {
                    if (this._initted === 2 && time > 0) {
                        this._init()
                    }
                    if (this._startAt) {
                        if (time >= 0) {
                            this._startAt.render(time, suppressEvents, force)
                        } else if (!callback) {
                            callback = "_dummyGS"
                        }
                    }
                    if (this.vars.onStart)
                        if (this._totalTime !== 0 || duration === 0)
                            if (!suppressEvents) {
                                this._callback("onStart")
                            }
                }
                pt = this._firstPT;
                while (pt) {
                    if (pt.f) {
                        pt.t[pt.p](pt.c * this.ratio + pt.s)
                    } else {
                        pt.t[pt.p] = pt.c * this.ratio + pt.s
                    }
                    pt = pt._next
                }
                if (this._onUpdate) {
                    if (time < 0)
                        if (this._startAt && this._startTime) {
                            this._startAt.render(time, suppressEvents, force)
                        }
                    if (!suppressEvents)
                        if (this._totalTime !== prevTotalTime || callback) {
                            this._callback("onUpdate")
                        }
                }
                if (this._cycle !== prevCycle)
                    if (!suppressEvents)
                        if (!this._gc)
                            if (this.vars.onRepeat) {
                                this._callback("onRepeat")
                            }
                if (callback)
                    if (!this._gc || force) {
                        if (time < 0 && this._startAt && !this._onUpdate && this._startTime) {
                            this._startAt.render(time, suppressEvents, force)
                        }
                        if (isComplete) {
                            if (this._timeline.autoRemoveChildren) {
                                this._enabled(!1, !1)
                            }
                            this._active = !1
                        }
                        if (!suppressEvents && this.vars[callback]) {
                            this._callback(callback)
                        }
                        if (duration === 0 && this._rawPrevTime === _tinyNum && rawPrevTime !== _tinyNum) {
                            this._rawPrevTime = 0
                        }
                    }
            };
            TweenMax.to = function(target, duration, vars) {
                return new TweenMax(target, duration, vars)
            };
            TweenMax.from = function(target, duration, vars) {
                vars.runBackwards = !0;
                vars.immediateRender = (vars.immediateRender != !1);
                return new TweenMax(target, duration, vars)
            };
            TweenMax.fromTo = function(target, duration, fromVars, toVars) {
                toVars.startAt = fromVars;
                toVars.immediateRender = (toVars.immediateRender != !1 && fromVars.immediateRender != !1);
                return new TweenMax(target, duration, toVars)
            };
            TweenMax.staggerTo = TweenMax.allTo = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
                stagger = stagger || 0;
                var delay = 0,
                    a = [],
                    finalComplete = function() {
                        if (vars.onComplete) {
                            vars.onComplete.apply(vars.onCompleteScope || this, arguments)
                        }
                        onCompleteAll.apply(onCompleteAllScope || vars.callbackScope || this, onCompleteAllParams || _blankArray)
                    },
                    cycle = vars.cycle,
                    fromCycle = (vars.startAt && vars.startAt.cycle),
                    l,
                    copy,
                    i,
                    p;
                if (!_isArray(targets)) {
                    if (typeof (targets) === "string") {
                        targets = TweenLite.selector(targets) || targets
                    }
                    if (_isSelector(targets)) {
                        targets = _slice(targets)
                    }
                }
                targets = targets || [];
                if (stagger < 0) {
                    targets = _slice(targets);
                    targets.reverse();
                    stagger *= -1
                }
                l = targets.length - 1;
                for (i = 0; i <= l; i++) {
                    copy = {};
                    for (p in vars) {
                        copy[p] = vars[p]
                    }
                    if (cycle) {
                        _applyCycle(copy, targets, i);
                        if (copy.duration != null) {
                            duration = copy.duration;
                            delete copy.duration
                        }
                    }
                    if (fromCycle) {
                        fromCycle = copy.startAt = {};
                        for (p in vars.startAt) {
                            fromCycle[p] = vars.startAt[p]
                        }
                        _applyCycle(copy.startAt, targets, i)
                    }
                    copy.delay = delay + (copy.delay || 0);
                    if (i === l && onCompleteAll) {
                        copy.onComplete = finalComplete
                    }
                    a[i] = new TweenMax(targets[i], duration, copy);
                    delay += stagger
                }
                return a
            };
            TweenMax.staggerFrom = TweenMax.allFrom = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
                vars.runBackwards = !0;
                vars.immediateRender = (vars.immediateRender != !1);
                return TweenMax.staggerTo(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope)
            };
            TweenMax.staggerFromTo = TweenMax.allFromTo = function(targets, duration, fromVars, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
                toVars.startAt = fromVars;
                toVars.immediateRender = (toVars.immediateRender != !1 && fromVars.immediateRender != !1);
                return TweenMax.staggerTo(targets, duration, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope)
            };
            TweenMax.delayedCall = function(delay, callback, params, scope, useFrames) {
                return new TweenMax(callback, 0, {
                    delay: delay,
                    onComplete: callback,
                    onCompleteParams: params,
                    callbackScope: scope,
                    onReverseComplete: callback,
                    onReverseCompleteParams: params,
                    immediateRender: !1,
                    useFrames: useFrames,
                    overwrite: 0
                })
            };
            TweenMax.set = function(target, vars) {
                return new TweenMax(target, 0, vars)
            };
            TweenMax.isTweening = function(target) {
                return ( TweenLite.getTweensOf(target, !0).length > 0)
            };
            var _getChildrenOf = function(timeline, includeTimelines) {
                    var a = [],
                        cnt = 0,
                        tween = timeline._first;
                    while (tween) {
                        if (tween instanceof TweenLite) {
                            a[cnt++] = tween
                        } else {
                            if (includeTimelines) {
                                a[cnt++] = tween
                            }
                            a = a.concat(_getChildrenOf(tween, includeTimelines));
                            cnt = a.length
                        }
                        tween = tween._next
                    }
                    return a
                },
                getAllTweens = TweenMax.getAllTweens = function(includeTimelines) {
                    return _getChildrenOf(Animation._rootTimeline, includeTimelines).concat(_getChildrenOf(Animation._rootFramesTimeline, includeTimelines))
                };
            TweenMax.killAll = function(complete, tweens, delayedCalls, timelines) {
                if (tweens == null) {
                    tweens = !0
                }
                if (delayedCalls == null) {
                    delayedCalls = !0
                }
                var a = getAllTweens((timelines != !1)),
                    l = a.length,
                    allTrue = (tweens && delayedCalls && timelines),
                    isDC,
                    tween,
                    i;
                for (i = 0; i < l; i++) {
                    tween = a[i];
                    if (allTrue || (tween instanceof SimpleTimeline) || ((isDC = (tween.target === tween.vars.onComplete)) && delayedCalls) || (tweens && !isDC)) {
                        if (complete) {
                            tween.totalTime(tween._reversed ? 0 : tween.totalDuration())
                        } else {
                            tween._enabled(!1, !1)
                        }
                    }
                }
            };
            TweenMax.killChildTweensOf = function(parent, complete) {
                if (parent == null) {
                    return
                }
                var tl = TweenLiteInternals.tweenLookup,
                    a,
                    curParent,
                    p,
                    i,
                    l;
                if (typeof (parent) === "string") {
                    parent = TweenLite.selector(parent) || parent
                }
                if (_isSelector(parent)) {
                    parent = _slice(parent)
                }
                if (_isArray(parent)) {
                    i = parent.length;
                    while (--i > -1) {
                        TweenMax.killChildTweensOf(parent[i], complete)
                    }
                    return
                }
                a = [];
                for (p in tl) {
                    curParent = tl[p].target.parentNode;
                    while (curParent) {
                        if (curParent === parent) {
                            a = a.concat(tl[p].tweens)
                        }
                        curParent = curParent.parentNode
                    }
                }
                l = a.length;
                for (i = 0; i < l; i++) {
                    if (complete) {
                        a[i].totalTime(a[i].totalDuration())
                    }
                    a[i]._enabled(!1, !1)
                }
            };
            var _changePause = function(pause, tweens, delayedCalls, timelines) {
                tweens = (tweens !== !1);
                delayedCalls = (delayedCalls !== !1);
                timelines = (timelines !== !1);
                var a = getAllTweens(timelines),
                    allTrue = (tweens && delayedCalls && timelines),
                    i = a.length,
                    isDC,
                    tween;
                while (--i > -1) {
                    tween = a[i];
                    if (allTrue || (tween instanceof SimpleTimeline) || ((isDC = (tween.target === tween.vars.onComplete)) && delayedCalls) || (tweens && !isDC)) {
                        tween.paused(pause)
                    }
                }
            };
            TweenMax.pauseAll = function(tweens, delayedCalls, timelines) {
                _changePause(!0, tweens, delayedCalls, timelines)
            };
            TweenMax.resumeAll = function(tweens, delayedCalls, timelines) {
                _changePause(!1, tweens, delayedCalls, timelines)
            };
            TweenMax.globalTimeScale = function(value) {
                var tl = Animation._rootTimeline,
                    t = TweenLite.ticker.time;
                if (!arguments.length) {
                    return tl._timeScale
                }
                value = value || _tinyNum;
                tl._startTime = t - ((t - tl._startTime) * tl._timeScale / value);
                tl = Animation._rootFramesTimeline;
                t = TweenLite.ticker.frame;
                tl._startTime = t - ((t - tl._startTime) * tl._timeScale / value);
                tl._timeScale = Animation._rootTimeline._timeScale = value;
                return value
            };
            p.progress = function(value, suppressEvents) {
                return (!arguments.length) ? this._time / this.duration() : this.totalTime(this.duration() * ((this._yoyo && (this._cycle & 1) !== 0) ? 1 - value : value) + (this._cycle * (this._duration + this._repeatDelay)), suppressEvents)
            };
            p.totalProgress = function(value, suppressEvents) {
                return (!arguments.length) ? this._totalTime / this.totalDuration() : this.totalTime(this.totalDuration() * value, suppressEvents)
            };
            p.time = function(value, suppressEvents) {
                if (!arguments.length) {
                    return this._time
                }
                if (this._dirty) {
                    this.totalDuration()
                }
                if (value > this._duration) {
                    value = this._duration
                }
                if (this._yoyo && (this._cycle & 1) !== 0) {
                    value = (this._duration - value) + (this._cycle * (this._duration + this._repeatDelay))
                } else if (this._repeat !== 0) {
                    value += this._cycle * (this._duration + this._repeatDelay)
                }
                return this.totalTime(value, suppressEvents)
            };
            p.duration = function(value) {
                if (!arguments.length) {
                    return this._duration
                }
                return Animation.prototype.duration.call(this, value)
            };
            p.totalDuration = function(value) {
                if (!arguments.length) {
                    if (this._dirty) {
                        this._totalDuration = (this._repeat === -1) ? 999999999999 : this._duration * (this._repeat + 1) + (this._repeatDelay * this._repeat);
                        this._dirty = !1
                    }
                    return this._totalDuration
                }
                return (this._repeat === -1) ? this : this.duration((value - (this._repeat * this._repeatDelay)) / (this._repeat + 1))
            };
            p.repeat = function(value) {
                if (!arguments.length) {
                    return this._repeat
                }
                this._repeat = value;
                return this._uncache(!0)
            };
            p.repeatDelay = function(value) {
                if (!arguments.length) {
                    return this._repeatDelay
                }
                this._repeatDelay = value;
                return this._uncache(!0)
            };
            p.yoyo = function(value) {
                if (!arguments.length) {
                    return this._yoyo
                }
                this._yoyo = value;
                return this
            };
            return TweenMax
        }, !0);
        _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(Animation, SimpleTimeline, TweenLite) {
            var TimelineLite = function(vars) {
                    SimpleTimeline.call(this, vars);
                    this._labels = {};
                    this.autoRemoveChildren = (this.vars.autoRemoveChildren === !0);
                    this.smoothChildTiming = (this.vars.smoothChildTiming === !0);
                    this._sortChildren = !0;
                    this._onUpdate = this.vars.onUpdate;
                    var v = this.vars,
                        val,
                        p;
                    for (p in v) {
                        val = v[p];
                        if (_isArray(val))
                            if (val.join("").indexOf("{self}") !== -1) {
                                v[p] = this._swapSelfInParams(val)
                            }
                    }
                    if (_isArray(v.tweens)) {
                        this.add(v.tweens, 0, v.align, v.stagger)
                    }
                },
                _tinyNum = 0.0000000001,
                TweenLiteInternals = TweenLite._internals,
                _internals = TimelineLite._internals = {},
                _isSelector = TweenLiteInternals.isSelector,
                _isArray = TweenLiteInternals.isArray,
                _lazyTweens = TweenLiteInternals.lazyTweens,
                _lazyRender = TweenLiteInternals.lazyRender,
                _globals = _gsScope._gsDefine.globals,
                _copy = function(vars) {
                    var copy = {},
                        p;
                    for (p in vars) {
                        copy[p] = vars[p]
                    }
                    return copy
                },
                _applyCycle = function(vars, targets, i) {
                    var alt = vars.cycle,
                        p,
                        val;
                    for (p in alt) {
                        val = alt[p];
                        vars[p] = (typeof (val) === "function") ? val.call(targets[i], i) : val[i % val.length]
                    }
                    delete vars.cycle
                },
                _pauseCallback = _internals.pauseCallback = function() {},
                _slice = function(a) {
                    var b = [],
                        l = a.length,
                        i;
                    for (i = 0; i !== l; b.push(a[i++]))
                        ;
                    return b
                },
                p = TimelineLite.prototype = new SimpleTimeline();
            TimelineLite.version = "1.18.5";
            p.constructor = TimelineLite;
            p.kill()._gc = p._forcingPlayhead = p._hasPause = !1;
            p.to = function(target, duration, vars, position) {
                var Engine = (vars.repeat && _globals.TweenMax) || TweenLite;
                return duration ? this.add(new Engine(target, duration, vars), position) : this.set(target, vars, position)
            };
            p.from = function(target, duration, vars, position) {
                return this.add(((vars.repeat && _globals.TweenMax) || TweenLite).from(target, duration, vars), position)
            };
            p.fromTo = function(target, duration, fromVars, toVars, position) {
                var Engine = (toVars.repeat && _globals.TweenMax) || TweenLite;
                return duration ? this.add(Engine.fromTo(target, duration, fromVars, toVars), position) : this.set(target, toVars, position)
            };
            p.staggerTo = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
                var tl = new TimelineLite({
                        onComplete: onCompleteAll,
                        onCompleteParams: onCompleteAllParams,
                        callbackScope: onCompleteAllScope,
                        smoothChildTiming: this.smoothChildTiming
                    }),
                    cycle = vars.cycle,
                    copy,
                    i;
                if (typeof (targets) === "string") {
                    targets = TweenLite.selector(targets) || targets
                }
                targets = targets || [];
                if (_isSelector(targets)) {
                    targets = _slice(targets)
                }
                stagger = stagger || 0;
                if (stagger < 0) {
                    targets = _slice(targets);
                    targets.reverse();
                    stagger *= -1
                }
                for (i = 0; i < targets.length; i++) {
                    copy = _copy(vars);
                    if (copy.startAt) {
                        copy.startAt = _copy(copy.startAt);
                        if (copy.startAt.cycle) {
                            _applyCycle(copy.startAt, targets, i)
                        }
                    }
                    if (cycle) {
                        _applyCycle(copy, targets, i);
                        if (copy.duration != null) {
                            duration = copy.duration;
                            delete copy.duration
                        }
                    }
                    tl.to(targets[i], duration, copy, i * stagger)
                }
                return this.add(tl, position)
            };
            p.staggerFrom = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
                vars.immediateRender = (vars.immediateRender != !1);
                vars.runBackwards = !0;
                return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope)
            };
            p.staggerFromTo = function(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
                toVars.startAt = fromVars;
                toVars.immediateRender = (toVars.immediateRender != !1 && fromVars.immediateRender != !1);
                return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope)
            };
            p.call = function(callback, params, scope, position) {
                return this.add(TweenLite.delayedCall(0, callback, params, scope), position)
            };
            p.set = function(target, vars, position) {
                position = this._parseTimeOrLabel(position, 0, !0);
                if (vars.immediateRender == null) {
                    vars.immediateRender = (position === this._time && !this._paused)
                }
                return this.add(new TweenLite(target, 0, vars), position)
            };
            TimelineLite.exportRoot = function(vars, ignoreDelayedCalls) {
                vars = vars || {};
                if (vars.smoothChildTiming == null) {
                    vars.smoothChildTiming = !0
                }
                var tl = new TimelineLite(vars),
                    root = tl._timeline,
                    tween,
                    next;
                if (ignoreDelayedCalls == null) {
                    ignoreDelayedCalls = !0
                }
                root._remove(tl, !0);
                tl._startTime = 0;
                tl._rawPrevTime = tl._time = tl._totalTime = root._time;
                tween = root._first;
                while (tween) {
                    next = tween._next;
                    if (!ignoreDelayedCalls || !(tween instanceof TweenLite && tween.target === tween.vars.onComplete)) {
                        tl.add(tween, tween._startTime - tween._delay)
                    }
                    tween = next
                }
                root.add(tl, 0);
                return tl
            };
            p.add = function(value, position, align, stagger) {
                var curTime,
                    l,
                    i,
                    child,
                    tl,
                    beforeRawTime;
                if (typeof (position) !== "number") {
                    position = this._parseTimeOrLabel(position, 0, !0, value)
                }
                if (!(value instanceof Animation)) {
                    if ((value instanceof Array) || (value && value.push && _isArray(value))) {
                        align = align || "normal";
                        stagger = stagger || 0;
                        curTime = position;
                        l = value.length;
                        for (i = 0; i < l; i++) {
                            if (_isArray(child = value[i])) {
                                child = new TimelineLite({
                                    tweens: child
                                })
                            }
                            this.add(child, curTime);
                            if (typeof (child) !== "string" && typeof (child) !== "function") {
                                if (align === "sequence") {
                                    curTime = child._startTime + (child.totalDuration() / child._timeScale)
                                } else if (align === "start") {
                                    child._startTime -= child.delay()
                                }
                            }
                            curTime += stagger
                        }
                        return this._uncache(!0)
                    } else if (typeof (value) === "string") {
                        return this.addLabel(value, position)
                    } else if (typeof (value) === "function") {
                        value = TweenLite.delayedCall(0, value)
                    } else {
                        throw ("Cannot add " + value + " into the timeline; it is not a tween, timeline, function, or string.")
                    }
                }
                SimpleTimeline.prototype.add.call(this, value, position);
                if (this._gc || this._time === this._duration)
                    if (!this._paused)
                        if (this._duration < this.duration()) {
                            tl = this;
                            beforeRawTime = (tl.rawTime() > value._startTime);
                            while (tl._timeline) {
                                if (beforeRawTime && tl._timeline.smoothChildTiming) {
                                    tl.totalTime(tl._totalTime, !0)
                                } else if (tl._gc) {
                                    tl._enabled(!0, !1)
                                }
                                tl = tl._timeline
                            }
                        }
                return this
            };
            p.remove = function(value) {
                if (value instanceof Animation) {
                    this._remove(value, !1);
                    var tl = value._timeline = value.vars.useFrames ? Animation._rootFramesTimeline : Animation._rootTimeline;
                    value._startTime = (value._paused ? value._pauseTime : tl._time) - ((!value._reversed ? value._totalTime : value.totalDuration() - value._totalTime) / value._timeScale);
                    return this
                } else if (value instanceof Array || (value && value.push && _isArray(value))) {
                    var i = value.length;
                    while (--i > -1) {
                        this.remove(value[i])
                    }
                    return this
                } else if (typeof (value) === "string") {
                    return this.removeLabel(value)
                }
                return this.kill(null, value)
            };
            p._remove = function(tween, skipDisable) {
                SimpleTimeline.prototype._remove.call(this, tween, skipDisable);
                var last = this._last;
                if (!last) {
                    this._time = this._totalTime = this._duration = this._totalDuration = 0
                } else if (this._time > last._startTime + last._totalDuration / last._timeScale) {
                    this._time = this.duration();
                    this._totalTime = this._totalDuration
                }
                return this
            };
            p.append = function(value, offsetOrLabel) {
                return this.add(value, this._parseTimeOrLabel(null, offsetOrLabel, !0, value))
            };
            p.insert = p.insertMultiple = function(value, position, align, stagger) {
                return this.add(value, position || 0, align, stagger)
            };
            p.appendMultiple = function(tweens, offsetOrLabel, align, stagger) {
                return this.add(tweens, this._parseTimeOrLabel(null, offsetOrLabel, !0, tweens), align, stagger)
            };
            p.addLabel = function(label, position) {
                this._labels[label] = this._parseTimeOrLabel(position);
                return this
            };
            p.addPause = function(position, callback, params, scope) {
                var t = TweenLite.delayedCall(0, _pauseCallback, params, scope || this);
                t.vars.onComplete = t.vars.onReverseComplete = callback;
                t.data = "isPause";
                this._hasPause = !0;
                return this.add(t, position)
            };
            p.removeLabel = function(label) {
                delete this._labels[label];
                return this
            };
            p.getLabelTime = function(label) {
                return (this._labels[label] != null) ? this._labels[label] : -1
            };
            p._parseTimeOrLabel = function(timeOrLabel, offsetOrLabel, appendIfAbsent, ignore) {
                var i;
                if (ignore instanceof Animation && ignore.timeline === this) {
                    this.remove(ignore)
                } else if (ignore && ((ignore instanceof Array) || (ignore.push && _isArray(ignore)))) {
                    i = ignore.length;
                    while (--i > -1) {
                        if (ignore[i] instanceof Animation && ignore[i].timeline === this) {
                            this.remove(ignore[i])
                        }
                    }
                }
                if (typeof (offsetOrLabel) === "string") {
                    return this._parseTimeOrLabel(offsetOrLabel, (appendIfAbsent && typeof (timeOrLabel) === "number" && this._labels[offsetOrLabel] == null) ? timeOrLabel - this.duration() : 0, appendIfAbsent)
                }
                offsetOrLabel = offsetOrLabel || 0;
                if (typeof (timeOrLabel) === "string" && (isNaN(timeOrLabel) || this._labels[timeOrLabel] != null)) {
                    i = timeOrLabel.indexOf("=");
                    if (i === -1) {
                        if (this._labels[timeOrLabel] == null) {
                            return appendIfAbsent ? (this._labels[timeOrLabel] = this.duration() + offsetOrLabel) : offsetOrLabel
                        }
                        return this._labels[timeOrLabel] + offsetOrLabel
                    }
                    offsetOrLabel = parseInt(timeOrLabel.charAt(i - 1) + "1", 10) * Number(timeOrLabel.substr(i + 1));
                    timeOrLabel = (i > 1) ? this._parseTimeOrLabel(timeOrLabel.substr(0, i - 1), 0, appendIfAbsent) : this.duration()
                } else if (timeOrLabel == null) {
                    timeOrLabel = this.duration()
                }
                return Number(timeOrLabel) + offsetOrLabel
            };
            p.seek = function(position, suppressEvents) {
                return this.totalTime((typeof (position) === "number") ? position : this._parseTimeOrLabel(position), (suppressEvents !== !1))
            };
            p.stop = function() {
                return this.paused(!0)
            };
            p.gotoAndPlay = function(position, suppressEvents) {
                return this.play(position, suppressEvents)
            };
            p.gotoAndStop = function(position, suppressEvents) {
                return this.pause(position, suppressEvents)
            };
            p.render = function(time, suppressEvents, force) {
                if (this._gc) {
                    this._enabled(!0, !1)
                }
                var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),
                    prevTime = this._time,
                    prevStart = this._startTime,
                    prevTimeScale = this._timeScale,
                    prevPaused = this._paused,
                    tween,
                    isComplete,
                    next,
                    callback,
                    internalForce,
                    pauseTween,
                    curTime;
                if (time >= totalDur - 0.0000001) {
                    this._totalTime = this._time = totalDur;
                    if (!this._reversed)
                        if (!this._hasPausedChild()) {
                            isComplete = !0;
                            callback = "onComplete";
                            internalForce = !!this._timeline.autoRemoveChildren;
                            if (this._duration === 0)
                                if ((time <= 0 && time >= -0.0000001) || this._rawPrevTime < 0 || this._rawPrevTime === _tinyNum)
                                    if (this._rawPrevTime !== time && this._first) {
                                        internalForce = !0;
                                        if (this._rawPrevTime > _tinyNum) {
                                            callback = "onReverseComplete"
                                        }
                                    }
                        }
                    this._rawPrevTime = (this._duration || !suppressEvents || time || this._rawPrevTime === time) ? time : _tinyNum;
                    time = totalDur + 0.0001
                } else if (time < 0.0000001) {
                    this._totalTime = this._time = 0;
                    if (prevTime !== 0 || (this._duration === 0 && this._rawPrevTime !== _tinyNum && (this._rawPrevTime > 0 || (time < 0 && this._rawPrevTime >= 0)))) {
                        callback = "onReverseComplete";
                        isComplete = this._reversed
                    }
                    if (time < 0) {
                        this._active = !1;
                        if (this._timeline.autoRemoveChildren && this._reversed) {
                            internalForce = isComplete = !0;
                            callback = "onReverseComplete"
                        } else if (this._rawPrevTime >= 0 && this._first) {
                            internalForce = !0
                        }
                        this._rawPrevTime = time
                    } else {
                        this._rawPrevTime = (this._duration || !suppressEvents || time || this._rawPrevTime === time) ? time : _tinyNum;
                        if (time === 0 && isComplete) {
                            tween = this._first;
                            while (tween && tween._startTime === 0) {
                                if (!tween._duration) {
                                    isComplete = !1
                                }
                                tween = tween._next
                            }
                        }
                        time = 0;
                        if (!this._initted) {
                            internalForce = !0
                        }
                    }
                } else {
                    if (this._hasPause && !this._forcingPlayhead && !suppressEvents) {
                        if (time >= prevTime) {
                            tween = this._first;
                            while (tween && tween._startTime <= time && !pauseTween) {
                                if (!tween._duration)
                                    if (tween.data === "isPause" && !tween.ratio && !(tween._startTime === 0 && this._rawPrevTime === 0)) {
                                        pauseTween = tween
                                    }
                                tween = tween._next
                            }
                        } else {
                            tween = this._last;
                            while (tween && tween._startTime >= time && !pauseTween) {
                                if (!tween._duration)
                                    if (tween.data === "isPause" && tween._rawPrevTime > 0) {
                                        pauseTween = tween
                                    }
                                tween = tween._prev
                            }
                        }
                        if (pauseTween) {
                            this._time = time = pauseTween._startTime;
                            this._totalTime = time + (this._cycle * (this._totalDuration + this._repeatDelay))
                        }
                    }
                    this._totalTime = this._time = this._rawPrevTime = time
                }
                if ((this._time === prevTime || !this._first) && !force && !internalForce && !pauseTween) {
                    return
                } else if (!this._initted) {
                    this._initted = !0
                }
                if (!this._active)
                    if (!this._paused && this._time !== prevTime && time > 0) {
                        this._active = !0
                    }
                if (prevTime === 0)
                    if (this.vars.onStart)
                        if (this._time !== 0 || !this._duration)
                            if (!suppressEvents) {
                                this._callback("onStart")
                            }
                curTime = this._time;
                if (curTime >= prevTime) {
                    tween = this._first;
                    while (tween) {
                        next = tween._next;
                        if (curTime !== this._time || (this._paused && !prevPaused)) {
                            break
                        } else if (tween._active || (tween._startTime <= curTime && !tween._paused && !tween._gc)) {
                            if (pauseTween === tween) {
                                this.pause()
                            }
                            if (!tween._reversed) {
                                tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force)
                            } else {
                                tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force)
                            }
                        }
                        tween = next
                    }
                } else {
                    tween = this._last;
                    while (tween) {
                        next = tween._prev;
                        if (curTime !== this._time || (this._paused && !prevPaused)) {
                            break
                        } else if (tween._active || (tween._startTime <= prevTime && !tween._paused && !tween._gc)) {
                            if (pauseTween === tween) {
                                pauseTween = tween._prev;
                                while (pauseTween && pauseTween.endTime() > this._time) {
                                    pauseTween.render((pauseTween._reversed ? pauseTween.totalDuration() - ((time - pauseTween._startTime) * pauseTween._timeScale) : (time - pauseTween._startTime) * pauseTween._timeScale), suppressEvents, force);
                                    pauseTween = pauseTween._prev
                                }
                                pauseTween = null;
                                this.pause()
                            }
                            if (!tween._reversed) {
                                tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force)
                            } else {
                                tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force)
                            }
                        }
                        tween = next
                    }
                }
                if (this._onUpdate)
                    if (!suppressEvents) {
                        if (_lazyTweens.length) {
                            _lazyRender()
                        }
                        this._callback("onUpdate")
                    }
                if (callback)
                    if (!this._gc)
                        if (prevStart === this._startTime || prevTimeScale !== this._timeScale)
                            if (this._time === 0 || totalDur >= this.totalDuration()) {
                                if (isComplete) {
                                    if (_lazyTweens.length) {
                                        _lazyRender()
                                    }
                                    if (this._timeline.autoRemoveChildren) {
                                        this._enabled(!1, !1)
                                    }
                                    this._active = !1
                                }
                                if (!suppressEvents && this.vars[callback]) {
                                    this._callback(callback)
                                }
                            }
            };
            p._hasPausedChild = function() {
                var tween = this._first;
                while (tween) {
                    if (tween._paused || ((tween instanceof TimelineLite) && tween._hasPausedChild())) {
                        return !0
                    }
                    tween = tween._next
                }
                return !1
            };
            p.getChildren = function(nested, tweens, timelines, ignoreBeforeTime) {
                ignoreBeforeTime = ignoreBeforeTime || -9999999999;
                var a = [],
                    tween = this._first,
                    cnt = 0;
                while (tween) {
                    if (tween._startTime < ignoreBeforeTime) {} else if (tween instanceof TweenLite) {
                        if (tweens !== !1) {
                            a[cnt++] = tween
                        }
                    } else {
                        if (timelines !== !1) {
                            a[cnt++] = tween
                        }
                        if (nested !== !1) {
                            a = a.concat(tween.getChildren(!0, tweens, timelines));
                            cnt = a.length
                        }
                    }
                    tween = tween._next
                }
                return a
            };
            p.getTweensOf = function(target, nested) {
                var disabled = this._gc,
                    a = [],
                    cnt = 0,
                    tweens,
                    i;
                if (disabled) {
                    this._enabled(!0, !0)
                }
                tweens = TweenLite.getTweensOf(target);
                i = tweens.length;
                while (--i > -1) {
                    if (tweens[i].timeline === this || (nested && this._contains(tweens[i]))) {
                        a[cnt++] = tweens[i]
                    }
                }
                if (disabled) {
                    this._enabled(!1, !0)
                }
                return a
            };
            p.recent = function() {
                return this._recent
            };
            p._contains = function(tween) {
                var tl = tween.timeline;
                while (tl) {
                    if (tl === this) {
                        return !0
                    }
                    tl = tl.timeline
                }
                return !1
            };
            p.shiftChildren = function(amount, adjustLabels, ignoreBeforeTime) {
                ignoreBeforeTime = ignoreBeforeTime || 0;
                var tween = this._first,
                    labels = this._labels,
                    p;
                while (tween) {
                    if (tween._startTime >= ignoreBeforeTime) {
                        tween._startTime += amount
                    }
                    tween = tween._next
                }
                if (adjustLabels) {
                    for (p in labels) {
                        if (labels[p] >= ignoreBeforeTime) {
                            labels[p] += amount
                        }
                    }
                }
                return this._uncache(!0)
            };
            p._kill = function(vars, target) {
                if (!vars && !target) {
                    return this._enabled(!1, !1)
                }
                var tweens = (!target) ? this.getChildren(!0, !0, !1) : this.getTweensOf(target),
                    i = tweens.length,
                    changed = !1;
                while (--i > -1) {
                    if (tweens[i]._kill(vars, target)) {
                        changed = !0
                    }
                }
                return changed
            };
            p.clear = function(labels) {
                var tweens = this.getChildren(!1, !0, !0),
                    i = tweens.length;
                this._time = this._totalTime = 0;
                while (--i > -1) {
                    tweens[i]._enabled(!1, !1)
                }
                if (labels !== !1) {
                    this._labels = {}
                }
                return this._uncache(!0)
            };
            p.invalidate = function() {
                var tween = this._first;
                while (tween) {
                    tween.invalidate();
                    tween = tween._next
                }
                return Animation.prototype.invalidate.call(this)
            };
            p._enabled = function(enabled, ignoreTimeline) {
                if (enabled === this._gc) {
                    var tween = this._first;
                    while (tween) {
                        tween._enabled(enabled, !0);
                        tween = tween._next
                    }
                }
                return SimpleTimeline.prototype._enabled.call(this, enabled, ignoreTimeline)
            };
            p.totalTime = function(time, suppressEvents, uncapped) {
                this._forcingPlayhead = !0;
                var val = Animation.prototype.totalTime.apply(this, arguments);
                this._forcingPlayhead = !1;
                return val
            };
            p.duration = function(value) {
                if (!arguments.length) {
                    if (this._dirty) {
                        this.totalDuration()
                    }
                    return this._duration
                }
                if (this.duration() !== 0 && value !== 0) {
                    this.timeScale(this._duration / value)
                }
                return this
            };
            p.totalDuration = function(value) {
                if (!arguments.length) {
                    if (this._dirty) {
                        var max = 0,
                            tween = this._last,
                            prevStart = 999999999999,
                            prev,
                            end;
                        while (tween) {
                            prev = tween._prev;
                            if (tween._dirty) {
                                tween.totalDuration()
                            }
                            if (tween._startTime > prevStart && this._sortChildren && !tween._paused) {
                                this.add(tween, tween._startTime - tween._delay)
                            } else {
                                prevStart = tween._startTime
                            }
                            if (tween._startTime < 0 && !tween._paused) {
                                max -= tween._startTime;
                                if (this._timeline.smoothChildTiming) {
                                    this._startTime += tween._startTime / this._timeScale
                                }
                                this.shiftChildren(-tween._startTime, !1, -9999999999);
                                prevStart = 0
                            }
                            end = tween._startTime + (tween._totalDuration / tween._timeScale);
                            if (end > max) {
                                max = end
                            }
                            tween = prev
                        }
                        this._duration = this._totalDuration = max;
                        this._dirty = !1
                    }
                    return this._totalDuration
                }
                return (value && this.totalDuration()) ? this.timeScale(this._totalDuration / value) : this
            };
            p.paused = function(value) {
                if (!value) {
                    var tween = this._first,
                        time = this._time;
                    while (tween) {
                        if (tween._startTime === time && tween.data === "isPause") {
                            tween._rawPrevTime = 0
                        }
                        tween = tween._next
                    }
                }
                return Animation.prototype.paused.apply(this, arguments)
            };
            p.usesFrames = function() {
                var tl = this._timeline;
                while (tl._timeline) {
                    tl = tl._timeline
                }
                return ( tl === Animation._rootFramesTimeline)
            };
            p.rawTime = function() {
                return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
            };
            return TimelineLite
        }, !0);
        _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(TimelineLite, TweenLite, Ease) {
            var TimelineMax = function(vars) {
                    TimelineLite.call(this, vars);
                    this._repeat = this.vars.repeat || 0;
                    this._repeatDelay = this.vars.repeatDelay || 0;
                    this._cycle = 0;
                    this._yoyo = (this.vars.yoyo === !0);
                    this._dirty = !0
                },
                _tinyNum = 0.0000000001,
                TweenLiteInternals = TweenLite._internals,
                _lazyTweens = TweenLiteInternals.lazyTweens,
                _lazyRender = TweenLiteInternals.lazyRender,
                _easeNone = new Ease(null, null, 1, 0),
                p = TimelineMax.prototype = new TimelineLite();
            p.constructor = TimelineMax;
            p.kill()._gc = !1;
            TimelineMax.version = "1.18.5";
            p.invalidate = function() {
                this._yoyo = (this.vars.yoyo === !0);
                this._repeat = this.vars.repeat || 0;
                this._repeatDelay = this.vars.repeatDelay || 0;
                this._uncache(!0);
                return TimelineLite.prototype.invalidate.call(this)
            };
            p.addCallback = function(callback, position, params, scope) {
                return this.add(TweenLite.delayedCall(0, callback, params, scope), position)
            };
            p.removeCallback = function(callback, position) {
                if (callback) {
                    if (position == null) {
                        this._kill(null, callback)
                    } else {
                        var a = this.getTweensOf(callback, !1),
                            i = a.length,
                            time = this._parseTimeOrLabel(position);
                        while (--i > -1) {
                            if (a[i]._startTime === time) {
                                a[i]._enabled(!1, !1)
                            }
                        }
                    }
                }
                return this
            };
            p.removePause = function(position) {
                return this.removeCallback(TimelineLite._internals.pauseCallback, position)
            };
            p.tweenTo = function(position, vars) {
                vars = vars || {};
                var copy = {
                        ease: _easeNone,
                        useFrames: this.usesFrames(),
                        immediateRender: !1
                    },
                    duration,
                    p,
                    t;
                for (p in vars) {
                    copy[p] = vars[p]
                }
                copy.time = this._parseTimeOrLabel(position);
                duration = (Math.abs(Number(copy.time) - this._time) / this._timeScale) || 0.001;
                t = new TweenLite(this, duration, copy);
                copy.onStart = function() {
                    t.target.paused(!0);
                    if (t.vars.time !== t.target.time() && duration === t.duration()) {
                        t.duration(Math.abs(t.vars.time - t.target.time()) / t.target._timeScale)
                    }
                    if (vars.onStart) {
                        t._callback("onStart")
                    }
                };
                return t
            };
            p.tweenFromTo = function(fromPosition, toPosition, vars) {
                vars = vars || {};
                fromPosition = this._parseTimeOrLabel(fromPosition);
                vars.startAt = {
                    onComplete: this.seek,
                    onCompleteParams: [fromPosition],
                    callbackScope: this
                };
                vars.immediateRender = (vars.immediateRender !== !1);
                var t = this.tweenTo(toPosition, vars);
                return t.duration((Math.abs(t.vars.time - fromPosition) / this._timeScale) || 0.001)
            };
            p.render = function(time, suppressEvents, force) {
                if (this._gc) {
                    this._enabled(!0, !1)
                }
                var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),
                    dur = this._duration,
                    prevTime = this._time,
                    prevTotalTime = this._totalTime,
                    prevStart = this._startTime,
                    prevTimeScale = this._timeScale,
                    prevRawPrevTime = this._rawPrevTime,
                    prevPaused = this._paused,
                    prevCycle = this._cycle,
                    tween,
                    isComplete,
                    next,
                    callback,
                    internalForce,
                    cycleDuration,
                    pauseTween,
                    curTime;
                if (time >= totalDur - 0.0000001) {
                    if (!this._locked) {
                        this._totalTime = totalDur;
                        this._cycle = this._repeat
                    }
                    if (!this._reversed)
                        if (!this._hasPausedChild()) {
                            isComplete = !0;
                            callback = "onComplete";
                            internalForce = !!this._timeline.autoRemoveChildren;
                            if (this._duration === 0)
                                if ((time <= 0 && time >= -0.0000001) || prevRawPrevTime < 0 || prevRawPrevTime === _tinyNum)
                                    if (prevRawPrevTime !== time && this._first) {
                                        internalForce = !0;
                                        if (prevRawPrevTime > _tinyNum) {
                                            callback = "onReverseComplete"
                                        }
                                    }
                        }
                    this._rawPrevTime = (this._duration || !suppressEvents || time || this._rawPrevTime === time) ? time : _tinyNum;
                    if (this._yoyo && (this._cycle & 1) !== 0) {
                        this._time = time = 0
                    } else {
                        this._time = dur;
                        time = dur + 0.0001
                    }
                } else if (time < 0.0000001) {
                    if (!this._locked) {
                        this._totalTime = this._cycle = 0
                    }
                    this._time = 0;
                    if (prevTime !== 0 || (dur === 0 && prevRawPrevTime !== _tinyNum && (prevRawPrevTime > 0 || (time < 0 && prevRawPrevTime >= 0)) && !this._locked)) {
                        callback = "onReverseComplete";
                        isComplete = this._reversed
                    }
                    if (time < 0) {
                        this._active = !1;
                        if (this._timeline.autoRemoveChildren && this._reversed) {
                            internalForce = isComplete = !0;
                            callback = "onReverseComplete"
                        } else if (prevRawPrevTime >= 0 && this._first) {
                            internalForce = !0
                        }
                        this._rawPrevTime = time
                    } else {
                        this._rawPrevTime = (dur || !suppressEvents || time || this._rawPrevTime === time) ? time : _tinyNum;
                        if (time === 0 && isComplete) {
                            tween = this._first;
                            while (tween && tween._startTime === 0) {
                                if (!tween._duration) {
                                    isComplete = !1
                                }
                                tween = tween._next
                            }
                        }
                        time = 0;
                        if (!this._initted) {
                            internalForce = !0
                        }
                    }
                } else {
                    if (dur === 0 && prevRawPrevTime < 0) {
                        internalForce = !0
                    }
                    this._time = this._rawPrevTime = time;
                    if (!this._locked) {
                        this._totalTime = time;
                        if (this._repeat !== 0) {
                            cycleDuration = dur + this._repeatDelay;
                            this._cycle = (this._totalTime / cycleDuration) >> 0;
                            if (this._cycle !== 0)
                                if (this._cycle === this._totalTime / cycleDuration && prevTotalTime <= time) {
                                    this._cycle--
                                }
                            this._time = this._totalTime - (this._cycle * cycleDuration);
                            if (this._yoyo)
                                if ((this._cycle & 1) !== 0) {
                                    this._time = dur - this._time
                                }
                            if (this._time > dur) {
                                this._time = dur;
                                time = dur + 0.0001
                            } else if (this._time < 0) {
                                this._time = time = 0
                            } else {
                                time = this._time
                            }
                        }
                    }
                    if (this._hasPause && !this._forcingPlayhead && !suppressEvents) {
                        time = this._time;
                        if (time >= prevTime) {
                            tween = this._first;
                            while (tween && tween._startTime <= time && !pauseTween) {
                                if (!tween._duration)
                                    if (tween.data === "isPause" && !tween.ratio && !(tween._startTime === 0 && this._rawPrevTime === 0)) {
                                        pauseTween = tween
                                    }
                                tween = tween._next
                            }
                        } else {
                            tween = this._last;
                            while (tween && tween._startTime >= time && !pauseTween) {
                                if (!tween._duration)
                                    if (tween.data === "isPause" && tween._rawPrevTime > 0) {
                                        pauseTween = tween
                                    }
                                tween = tween._prev
                            }
                        }
                        if (pauseTween) {
                            this._time = time = pauseTween._startTime;
                            this._totalTime = time + (this._cycle * (this._totalDuration + this._repeatDelay))
                        }
                    }
                }
                if (this._cycle !== prevCycle)
                    if (!this._locked) {
                        var backwards = (this._yoyo && (prevCycle & 1) !== 0),
                            wrap = (backwards === (this._yoyo && (this._cycle & 1) !== 0)),
                            recTotalTime = this._totalTime,
                            recCycle = this._cycle,
                            recRawPrevTime = this._rawPrevTime,
                            recTime = this._time;
                        this._totalTime = prevCycle * dur;
                        if (this._cycle < prevCycle) {
                            backwards = !backwards
                        } else {
                            this._totalTime += dur
                        }
                        this._time = prevTime;
                        this._rawPrevTime = (dur === 0) ? prevRawPrevTime - 0.0001 : prevRawPrevTime;
                        this._cycle = prevCycle;
                        this._locked = !0;
                        prevTime = (backwards) ? 0 : dur;
                        this.render(prevTime, suppressEvents, (dur === 0));
                        if (!suppressEvents)
                            if (!this._gc) {
                                if (this.vars.onRepeat) {
                                    this._callback("onRepeat")
                                }
                            }
                        if (prevTime !== this._time) {
                            return
                        }
                        if (wrap) {
                            prevTime = (backwards) ? dur + 0.0001 : -0.0001;
                            this.render(prevTime, !0, !1)
                        }
                        this._locked = !1;
                        if (this._paused && !prevPaused) {
                            return
                        }
                        this._time = recTime;
                        this._totalTime = recTotalTime;
                        this._cycle = recCycle;
                        this._rawPrevTime = recRawPrevTime
                    }
                if ((this._time === prevTime || !this._first) && !force && !internalForce && !pauseTween) {
                    if (prevTotalTime !== this._totalTime)
                        if (this._onUpdate)
                            if (!suppressEvents) {
                                this._callback("onUpdate")
                            }
                    return
                } else if (!this._initted) {
                    this._initted = !0
                }
                if (!this._active)
                    if (!this._paused && this._totalTime !== prevTotalTime && time > 0) {
                        this._active = !0
                    }
                if (prevTotalTime === 0)
                    if (this.vars.onStart)
                        if (this._totalTime !== 0 || !this._totalDuration)
                            if (!suppressEvents) {
                                this._callback("onStart")
                            }
                curTime = this._time;
                if (curTime >= prevTime) {
                    tween = this._first;
                    while (tween) {
                        next = tween._next;
                        if (curTime !== this._time || (this._paused && !prevPaused)) {
                            break
                        } else if (tween._active || (tween._startTime <= this._time && !tween._paused && !tween._gc)) {
                            if (pauseTween === tween) {
                                this.pause()
                            }
                            if (!tween._reversed) {
                                tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force)
                            } else {
                                tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force)
                            }
                        }
                        tween = next
                    }
                } else {
                    tween = this._last;
                    while (tween) {
                        next = tween._prev;
                        if (curTime !== this._time || (this._paused && !prevPaused)) {
                            break
                        } else if (tween._active || (tween._startTime <= prevTime && !tween._paused && !tween._gc)) {
                            if (pauseTween === tween) {
                                pauseTween = tween._prev;
                                while (pauseTween && pauseTween.endTime() > this._time) {
                                    pauseTween.render((pauseTween._reversed ? pauseTween.totalDuration() - ((time - pauseTween._startTime) * pauseTween._timeScale) : (time - pauseTween._startTime) * pauseTween._timeScale), suppressEvents, force);
                                    pauseTween = pauseTween._prev
                                }
                                pauseTween = null;
                                this.pause()
                            }
                            if (!tween._reversed) {
                                tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force)
                            } else {
                                tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force)
                            }
                        }
                        tween = next
                    }
                }
                if (this._onUpdate)
                    if (!suppressEvents) {
                        if (_lazyTweens.length) {
                            _lazyRender()
                        }
                        this._callback("onUpdate")
                    }
                if (callback)
                    if (!this._locked)
                        if (!this._gc)
                            if (prevStart === this._startTime || prevTimeScale !== this._timeScale)
                                if (this._time === 0 || totalDur >= this.totalDuration()) {
                                    if (isComplete) {
                                        if (_lazyTweens.length) {
                                            _lazyRender()
                                        }
                                        if (this._timeline.autoRemoveChildren) {
                                            this._enabled(!1, !1)
                                        }
                                        this._active = !1
                                    }
                                    if (!suppressEvents && this.vars[callback]) {
                                        this._callback(callback)
                                    }
                                }
            };
            p.getActive = function(nested, tweens, timelines) {
                if (nested == null) {
                    nested = !0
                }
                if (tweens == null) {
                    tweens = !0
                }
                if (timelines == null) {
                    timelines = !1
                }
                var a = [],
                    all = this.getChildren(nested, tweens, timelines),
                    cnt = 0,
                    l = all.length,
                    i,
                    tween;
                for (i = 0; i < l; i++) {
                    tween = all[i];
                    if (tween.isActive()) {
                        a[cnt++] = tween
                    }
                }
                return a
            };
            p.getLabelAfter = function(time) {
                if (!time)
                    if (time !== 0) {
                        time = this._time
                    }
                var labels = this.getLabelsArray(),
                    l = labels.length,
                    i;
                for (i = 0; i < l; i++) {
                    if (labels[i].time > time) {
                        return labels[i].name
                    }
                }
                return null
            };
            p.getLabelBefore = function(time) {
                if (time == null) {
                    time = this._time
                }
                var labels = this.getLabelsArray(),
                    i = labels.length;
                while (--i > -1) {
                    if (labels[i].time < time) {
                        return labels[i].name
                    }
                }
                return null
            };
            p.getLabelsArray = function() {
                var a = [],
                    cnt = 0,
                    p;
                for (p in this._labels) {
                    a[cnt++] = {
                        time: this._labels[p],
                        name: p
                    }
                }
                a.sort(function(a, b) {
                    return a.time - b.time
                });
                return a
            };
            p.progress = function(value, suppressEvents) {
                return (!arguments.length) ? this._time / this.duration() : this.totalTime(this.duration() * ((this._yoyo && (this._cycle & 1) !== 0) ? 1 - value : value) + (this._cycle * (this._duration + this._repeatDelay)), suppressEvents)
            };
            p.totalProgress = function(value, suppressEvents) {
                return (!arguments.length) ? this._totalTime / this.totalDuration() : this.totalTime(this.totalDuration() * value, suppressEvents)
            };
            p.totalDuration = function(value) {
                if (!arguments.length) {
                    if (this._dirty) {
                        TimelineLite.prototype.totalDuration.call(this);
                        this._totalDuration = (this._repeat === -1) ? 999999999999 : this._duration * (this._repeat + 1) + (this._repeatDelay * this._repeat)
                    }
                    return this._totalDuration
                }
                return (this._repeat === -1 || !value) ? this : this.timeScale(this.totalDuration() / value)
            };
            p.time = function(value, suppressEvents) {
                if (!arguments.length) {
                    return this._time
                }
                if (this._dirty) {
                    this.totalDuration()
                }
                if (value > this._duration) {
                    value = this._duration
                }
                if (this._yoyo && (this._cycle & 1) !== 0) {
                    value = (this._duration - value) + (this._cycle * (this._duration + this._repeatDelay))
                } else if (this._repeat !== 0) {
                    value += this._cycle * (this._duration + this._repeatDelay)
                }
                return this.totalTime(value, suppressEvents)
            };
            p.repeat = function(value) {
                if (!arguments.length) {
                    return this._repeat
                }
                this._repeat = value;
                return this._uncache(!0)
            };
            p.repeatDelay = function(value) {
                if (!arguments.length) {
                    return this._repeatDelay
                }
                this._repeatDelay = value;
                return this._uncache(!0)
            };
            p.yoyo = function(value) {
                if (!arguments.length) {
                    return this._yoyo
                }
                this._yoyo = value;
                return this
            };
            p.currentLabel = function(value) {
                if (!arguments.length) {
                    return this.getLabelBefore(this._time + 0.00000001)
                }
                return this.seek(value, !0)
            };
            return TimelineMax
        }, !0);
        (function() {
            var _RAD2DEG = 180 / Math.PI,
                _r1 = [],
                _r2 = [],
                _r3 = [],
                _corProps = {},
                _globals = _gsScope._gsDefine.globals,
                Segment = function(a, b, c, d) {
                    if (c === d) {
                        c = d - (d - b) / 1000000
                    }
                    if (a === b) {
                        b = a + (c - a) / 1000000
                    }
                    this.a = a;
                    this.b = b;
                    this.c = c;
                    this.d = d;
                    this.da = d - a;
                    this.ca = c - a;
                    this.ba = b - a
                },
                _correlate = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
                cubicToQuadratic = function(a, b, c, d) {
                    var q1 = {
                            a: a
                        },
                        q2 = {},
                        q3 = {},
                        q4 = {
                            c: d
                        },
                        mab = (a + b) / 2,
                        mbc = (b + c) / 2,
                        mcd = (c + d) / 2,
                        mabc = (mab + mbc) / 2,
                        mbcd = (mbc + mcd) / 2,
                        m8 = (mbcd - mabc) / 8;
                    q1.b = mab + (a - mab) / 4;
                    q2.b = mabc + m8;
                    q1.c = q2.a = (q1.b + q2.b) / 2;
                    q2.c = q3.a = (mabc + mbcd) / 2;
                    q3.b = mbcd - m8;
                    q4.b = mcd + (d - mcd) / 4;
                    q3.c = q4.a = (q3.b + q4.b) / 2;
                    return [q1, q2, q3, q4]
                },
                _calculateControlPoints = function(a, curviness, quad, basic, correlate) {
                    var l = a.length - 1,
                        ii = 0,
                        cp1 = a[0].a,
                        i,
                        p1,
                        p2,
                        p3,
                        seg,
                        m1,
                        m2,
                        mm,
                        cp2,
                        qb,
                        r1,
                        r2,
                        tl;
                    for (i = 0; i < l; i++) {
                        seg = a[ii];
                        p1 = seg.a;
                        p2 = seg.d;
                        p3 = a[ii + 1].d;
                        if (correlate) {
                            r1 = _r1[i];
                            r2 = _r2[i];
                            tl = ((r2 + r1) * curviness * 0.25) / (basic ? 0.5 : _r3[i] || 0.5);
                            m1 = p2 - (p2 - p1) * (basic ? curviness * 0.5 : (r1 !== 0 ? tl / r1 : 0));
                            m2 = p2 + (p3 - p2) * (basic ? curviness * 0.5 : (r2 !== 0 ? tl / r2 : 0));
                            mm = p2 - (m1 + (((m2 - m1) * ((r1 * 3 / (r1 + r2)) + 0.5) / 4) || 0))
                        } else {
                            m1 = p2 - (p2 - p1) * curviness * 0.5;
                            m2 = p2 + (p3 - p2) * curviness * 0.5;
                            mm = p2 - (m1 + m2) / 2
                        }
                        m1 += mm;
                        m2 += mm;
                        seg.c = cp2 = m1;
                        if (i !== 0) {
                            seg.b = cp1
                        } else {
                            seg.b = cp1 = seg.a + (seg.c - seg.a) * 0.6
                        }
                        seg.da = p2 - p1;
                        seg.ca = cp2 - p1;
                        seg.ba = cp1 - p1;
                        if (quad) {
                            qb = cubicToQuadratic(p1, cp1, cp2, p2);
                            a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);
                            ii += 4
                        } else {
                            ii++
                        }
                        cp1 = m2
                    }
                    seg = a[ii];
                    seg.b = cp1;
                    seg.c = cp1 + (seg.d - cp1) * 0.4;
                    seg.da = seg.d - seg.a;
                    seg.ca = seg.c - seg.a;
                    seg.ba = cp1 - seg.a;
                    if (quad) {
                        qb = cubicToQuadratic(seg.a, cp1, seg.c, seg.d);
                        a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3])
                    }
                },
                _parseAnchors = function(values, p, correlate, prepend) {
                    var a = [],
                        l,
                        i,
                        p1,
                        p2,
                        p3,
                        tmp;
                    if (prepend) {
                        values = [prepend].concat(values);
                        i = values.length;
                        while (--i > -1) {
                            if (typeof ((tmp = values[i][p])) === "string")
                                if (tmp.charAt(1) === "=") {
                                    values[i][p] = prepend[p] + Number(tmp.charAt(0) + tmp.substr(2))
                                }
                        }
                    }
                    l = values.length - 2;
                    if (l < 0) {
                        a[0] = new Segment(values[0][p], 0, 0, values[(l < -1) ? 0 : 1][p]);
                        return a
                    }
                    for (i = 0; i < l; i++) {
                        p1 = values[i][p];
                        p2 = values[i + 1][p];
                        a[i] = new Segment(p1, 0, 0, p2);
                        if (correlate) {
                            p3 = values[i + 2][p];
                            _r1[i] = (_r1[i] || 0) + (p2 - p1) * (p2 - p1);
                            _r2[i] = (_r2[i] || 0) + (p3 - p2) * (p3 - p2)
                        }
                    }
                    a[i] = new Segment(values[i][p], 0, 0, values[i + 1][p]);
                    return a
                },
                bezierThrough = function(values, curviness, quadratic, basic, correlate, prepend) {
                    var obj = {},
                        props = [],
                        first = prepend || values[0],
                        i,
                        p,
                        a,
                        j,
                        r,
                        l,
                        seamless,
                        last;
                    correlate = (typeof (correlate) === "string") ? "," + correlate + "," : _correlate;
                    if (curviness == null) {
                        curviness = 1
                    }
                    for (p in values[0]) {
                        props.push(p)
                    }
                    if (values.length > 1) {
                        last = values[values.length - 1];
                        seamless = !0;
                        i = props.length;
                        while (--i > -1) {
                            p = props[i];
                            if (Math.abs(first[p] - last[p]) > 0.05) {
                                seamless = !1;
                                break
                            }
                        }
                        if (seamless) {
                            values = values.concat();
                            if (prepend) {
                                values.unshift(prepend)
                            }
                            values.push(values[1]);
                            prepend = values[values.length - 3]
                        }
                    }
                    _r1.length = _r2.length = _r3.length = 0;
                    i = props.length;
                    while (--i > -1) {
                        p = props[i];
                        _corProps[p] = (correlate.indexOf("," + p + ",") !== -1);
                        obj[p] = _parseAnchors(values, p, _corProps[p], prepend)
                    }
                    i = _r1.length;
                    while (--i > -1) {
                        _r1[i] = Math.sqrt(_r1[i]);
                        _r2[i] = Math.sqrt(_r2[i])
                    }
                    if (!basic) {
                        i = props.length;
                        while (--i > -1) {
                            if (_corProps[p]) {
                                a = obj[props[i]];
                                l = a.length - 1;
                                for (j = 0; j < l; j++) {
                                    r = (a[j + 1].da / _r2[j] + a[j].da / _r1[j]) || 0;
                                    _r3[j] = (_r3[j] || 0) + r * r
                                }
                            }
                        }
                        i = _r3.length;
                        while (--i > -1) {
                            _r3[i] = Math.sqrt(_r3[i])
                        }
                    }
                    i = props.length;
                    j = quadratic ? 4 : 1;
                    while (--i > -1) {
                        p = props[i];
                        a = obj[p];
                        _calculateControlPoints(a, curviness, quadratic, basic, _corProps[p]);
                        if (seamless) {
                            a.splice(0, j);
                            a.splice(a.length - j, j)
                        }
                    }
                    return obj
                },
                _parseBezierData = function(values, type, prepend) {
                    type = type || "soft";
                    var obj = {},
                        inc = (type === "cubic") ? 3 : 2,
                        soft = (type === "soft"),
                        props = [],
                        a,
                        b,
                        c,
                        d,
                        cur,
                        i,
                        j,
                        l,
                        p,
                        cnt,
                        tmp;
                    if (soft && prepend) {
                        values = [prepend].concat(values)
                    }
                    if (values == null || values.length < inc + 1) {
                        throw "invalid Bezier data"
                    }
                    for (p in values[0]) {
                        props.push(p)
                    }
                    i = props.length;
                    while (--i > -1) {
                        p = props[i];
                        obj[p] = cur = [];
                        cnt = 0;
                        l = values.length;
                        for (j = 0; j < l; j++) {
                            a = (prepend == null) ? values[j][p] : (typeof ((tmp = values[j][p])) === "string" && tmp.charAt(1) === "=") ? prepend[p] + Number(tmp.charAt(0) + tmp.substr(2)) : Number(tmp);
                            if (soft)
                                if (j > 1)
                                    if (j < l - 1) {
                                        cur[cnt++] = (a + cur[cnt - 2]) / 2
                                    }
                            cur[cnt++] = a
                        }
                        l = cnt - inc + 1;
                        cnt = 0;
                        for (j = 0; j < l; j += inc) {
                            a = cur[j];
                            b = cur[j + 1];
                            c = cur[j + 2];
                            d = (inc === 2) ? 0 : cur[j + 3];
                            cur[cnt++] = tmp = (inc === 3) ? new Segment(a, b, c, d) : new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c)
                        }
                        cur.length = cnt
                    }
                    return obj
                },
                _addCubicLengths = function(a, steps, resolution) {
                    var inc = 1 / resolution,
                        j = a.length,
                        d,
                        d1,
                        s,
                        da,
                        ca,
                        ba,
                        p,
                        i,
                        inv,
                        bez,
                        index;
                    while (--j > -1) {
                        bez = a[j];
                        s = bez.a;
                        da = bez.d - s;
                        ca = bez.c - s;
                        ba = bez.b - s;
                        d = d1 = 0;
                        for (i = 1; i <= resolution; i++) {
                            p = inc * i;
                            inv = 1 - p;
                            d = d1 - (d1 = (p * p * da + 3 * inv * (p * ca + inv * ba)) * p);
                            index = j * resolution + i - 1;
                            steps[index] = (steps[index] || 0) + d * d
                        }
                    }
                },
                _parseLengthData = function(obj, resolution) {
                    resolution = resolution >> 0 || 6;
                    var a = [],
                        lengths = [],
                        d = 0,
                        total = 0,
                        threshold = resolution - 1,
                        segments = [],
                        curLS = [],
                        p,
                        i,
                        l,
                        index;
                    for (p in obj) {
                        _addCubicLengths(obj[p], a, resolution)
                    }
                    l = a.length;
                    for (i = 0; i < l; i++) {
                        d += Math.sqrt(a[i]);
                        index = i % resolution;
                        curLS[index] = d;
                        if (index === threshold) {
                            total += d;
                            index = (i / resolution) >> 0;
                            segments[index] = curLS;
                            lengths[index] = total;
                            d = 0;
                            curLS = []
                        }
                    }
                    return {
                        length: total,
                        lengths: lengths,
                        segments: segments
                    }
                },
                BezierPlugin = _gsScope._gsDefine.plugin({
                    propName: "bezier",
                    priority: -1,
                    version: "1.3.6",
                    API: 2,
                    global: !0,
                    init: function(target, vars, tween) {
                        this._target = target;
                        if (vars instanceof Array) {
                            vars = {
                                values: vars
                            }
                        }
                        this._func = {};
                        this._round = {};
                        this._props = [];
                        this._timeRes = (vars.timeResolution == null) ? 6 : parseInt(vars.timeResolution, 10);
                        var values = vars.values || [],
                            first = {},
                            second = values[0],
                            autoRotate = vars.autoRotate || tween.vars.orientToBezier,
                            p,
                            isFunc,
                            i,
                            j,
                            prepend;
                        this._autoRotate = autoRotate ? (autoRotate instanceof Array) ? autoRotate : [["x", "y", "rotation", ((autoRotate === !0) ? 0 : Number(autoRotate) || 0)]] : null;
                        for (p in second) {
                            this._props.push(p)
                        }
                        i = this._props.length;
                        while (--i > -1) {
                            p = this._props[i];
                            this._overwriteProps.push(p);
                            isFunc = this._func[p] = (typeof (target[p]) === "function");
                            first[p] = (!isFunc) ? parseFloat(target[p]) : target[((p.indexOf("set") || typeof (target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3))]();
                            if (!prepend)
                                if (first[p] !== values[0][p]) {
                                    prepend = first
                                }
                        }
                        this._beziers = (vars.type !== "cubic" && vars.type !== "quadratic" && vars.type !== "soft") ? bezierThrough(values, isNaN(vars.curviness) ? 1 : vars.curviness, !1, (vars.type === "thruBasic"), vars.correlate, prepend) : _parseBezierData(values, vars.type, first);
                        this._segCount = this._beziers[p].length;
                        if (this._timeRes) {
                            var ld = _parseLengthData(this._beziers, this._timeRes);
                            this._length = ld.length;
                            this._lengths = ld.lengths;
                            this._segments = ld.segments;
                            this._l1 = this._li = this._s1 = this._si = 0;
                            this._l2 = this._lengths[0];
                            this._curSeg = this._segments[0];
                            this._s2 = this._curSeg[0];
                            this._prec = 1 / this._curSeg.length
                        }
                        if ((autoRotate = this._autoRotate)) {
                            this._initialRotations = [];
                            if (!(autoRotate[0] instanceof Array)) {
                                this._autoRotate = autoRotate = [autoRotate]
                            }
                            i = autoRotate.length;
                            while (--i > -1) {
                                for (j = 0; j < 3; j++) {
                                    p = autoRotate[i][j];
                                    this._func[p] = (typeof (target[p]) === "function") ? target[((p.indexOf("set") || typeof (target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3))] : !1
                                }
                                p = autoRotate[i][2];
                                this._initialRotations[i] = (this._func[p] ? this._func[p].call(this._target) : this._target[p]) || 0
                            }
                        }
                        this._startRatio = tween.vars.runBackwards ? 1 : 0;
                        return !0
                    },
                    set: function(v) {
                        var segments = this._segCount,
                            func = this._func,
                            target = this._target,
                            notStart = (v !== this._startRatio),
                            curIndex,
                            inv,
                            i,
                            p,
                            b,
                            t,
                            val,
                            l,
                            lengths,
                            curSeg;
                        if (!this._timeRes) {
                            curIndex = (v < 0) ? 0 : (v >= 1) ? segments - 1 : (segments * v) >> 0;
                            t = (v - (curIndex * (1 / segments))) * segments
                        } else {
                            lengths = this._lengths;
                            curSeg = this._curSeg;
                            v *= this._length;
                            i = this._li;
                            if (v > this._l2 && i < segments - 1) {
                                l = segments - 1;
                                while (i < l && (this._l2 = lengths[++i]) <= v) {}
                                this._l1 = lengths[i - 1];
                                this._li = i;
                                this._curSeg = curSeg = this._segments[i];
                                this._s2 = curSeg[(this._s1 = this._si = 0)]
                            } else if (v < this._l1 && i > 0) {
                                while (i > 0 && (this._l1 = lengths[--i]) >= v) {}
                                if (i === 0 && v < this._l1) {
                                    this._l1 = 0
                                } else {
                                    i++
                                }
                                this._l2 = lengths[i];
                                this._li = i;
                                this._curSeg = curSeg = this._segments[i];
                                this._s1 = curSeg[(this._si = curSeg.length - 1) - 1] || 0;
                                this._s2 = curSeg[this._si]
                            }
                            curIndex = i;
                            v -= this._l1;
                            i = this._si;
                            if (v > this._s2 && i < curSeg.length - 1) {
                                l = curSeg.length - 1;
                                while (i < l && (this._s2 = curSeg[++i]) <= v) {}
                                this._s1 = curSeg[i - 1];
                                this._si = i
                            } else if (v < this._s1 && i > 0) {
                                while (i > 0 && (this._s1 = curSeg[--i]) >= v) {}
                                if (i === 0 && v < this._s1) {
                                    this._s1 = 0
                                } else {
                                    i++
                                }
                                this._s2 = curSeg[i];
                                this._si = i
                            }
                            t = ((i + (v - this._s1) / (this._s2 - this._s1)) * this._prec) || 0
                        }
                        inv = 1 - t;
                        i = this._props.length;
                        while (--i > -1) {
                            p = this._props[i];
                            b = this._beziers[p][curIndex];
                            val = (t * t * b.da + 3 * inv * (t * b.ca + inv * b.ba)) * t + b.a;
                            if (this._round[p]) {
                                val = Math.round(val)
                            }
                            if (func[p]) {
                                target[p](val)
                            } else {
                                target[p] = val
                            }
                        }
                        if (this._autoRotate) {
                            var ar = this._autoRotate,
                                b2,
                                x1,
                                y1,
                                x2,
                                y2,
                                add,
                                conv;
                            i = ar.length;
                            while (--i > -1) {
                                p = ar[i][2];
                                add = ar[i][3] || 0;
                                conv = (ar[i][4] === !0) ? 1 : _RAD2DEG;
                                b = this._beziers[ar[i][0]];
                                b2 = this._beziers[ar[i][1]];
                                if (b && b2) {
                                    b = b[curIndex];
                                    b2 = b2[curIndex];
                                    x1 = b.a + (b.b - b.a) * t;
                                    x2 = b.b + (b.c - b.b) * t;
                                    x1 += (x2 - x1) * t;
                                    x2 += ((b.c + (b.d - b.c) * t) - x2) * t;
                                    y1 = b2.a + (b2.b - b2.a) * t;
                                    y2 = b2.b + (b2.c - b2.b) * t;
                                    y1 += (y2 - y1) * t;
                                    y2 += ((b2.c + (b2.d - b2.c) * t) - y2) * t;
                                    val = notStart ? Math.atan2(y2 - y1, x2 - x1) * conv + add : this._initialRotations[i];
                                    if (func[p]) {
                                        target[p](val)
                                    } else {
                                        target[p] = val
                                    }
                                }
                            }
                        }
                    }
                }),
                p = BezierPlugin.prototype;
            BezierPlugin.bezierThrough = bezierThrough;
            BezierPlugin.cubicToQuadratic = cubicToQuadratic;
            BezierPlugin._autoCSS = !0;
            BezierPlugin.quadraticToCubic = function(a, b, c) {
                return new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c)
            };
            BezierPlugin._cssRegister = function() {
                var CSSPlugin = _globals.CSSPlugin;
                if (!CSSPlugin) {
                    return
                }
                var _internals = CSSPlugin._internals,
                    _parseToProxy = _internals._parseToProxy,
                    _setPluginRatio = _internals._setPluginRatio,
                    CSSPropTween = _internals.CSSPropTween;
                _internals._registerComplexSpecialProp("bezier", {
                    parser: function(t, e, prop, cssp, pt, plugin) {
                        if (e instanceof Array) {
                            e = {
                                values: e
                            }
                        }
                        plugin = new BezierPlugin();
                        var values = e.values,
                            l = values.length - 1,
                            pluginValues = [],
                            v = {},
                            i,
                            p,
                            data;
                        if (l < 0) {
                            return pt
                        }
                        for (i = 0; i <= l; i++) {
                            data = _parseToProxy(t, values[i], cssp, pt, plugin, (l !== i));
                            pluginValues[i] = data.end
                        }
                        for (p in e) {
                            v[p] = e[p]
                        }
                        v.values = pluginValues;
                        pt = new CSSPropTween(t, "bezier", 0, 0, data.pt, 2);
                        pt.data = data;
                        pt.plugin = plugin;
                        pt.setRatio = _setPluginRatio;
                        if (v.autoRotate === 0) {
                            v.autoRotate = !0
                        }
                        if (v.autoRotate && !(v.autoRotate instanceof Array)) {
                            i = (v.autoRotate === !0) ? 0 : Number(v.autoRotate);
                            v.autoRotate = (data.end.left != null) ? [["left", "top", "rotation", i, !1]] : (data.end.x != null) ? [["x", "y", "rotation", i, !1]] : !1
                        }
                        if (v.autoRotate) {
                            if (!cssp._transform) {
                                cssp._enableTransforms(!1)
                            }
                            data.autoRotate = cssp._target._gsTransform;
                            data.proxy.rotation = data.autoRotate.rotation || 0
                        }
                        plugin._onInitTween(data.proxy, v, cssp._tween);
                        return pt
                    }
                })
            };
            p._roundProps = function(lookup, value) {
                var op = this._overwriteProps,
                    i = op.length;
                while (--i > -1) {
                    if (lookup[op[i]] || lookup.bezier || lookup.bezierThrough) {
                        this._round[op[i]] = value
                    }
                }
            };
            p._kill = function(lookup) {
                var a = this._props,
                    p,
                    i;
                for (p in this._beziers) {
                    if (p in lookup) {
                        delete this._beziers[p];
                        delete this._func[p];
                        i = a.length;
                        while (--i > -1) {
                            if (a[i] === p) {
                                a.splice(i, 1)
                            }
                        }
                    }
                }
                return this._super._kill.call(this, lookup)
            }
        }());
        _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(TweenPlugin, TweenLite) {
            var CSSPlugin = function() {
                    TweenPlugin.call(this, "css");
                    this._overwriteProps.length = 0;
                    this.setRatio = CSSPlugin.prototype.setRatio
                },
                _globals = _gsScope._gsDefine.globals,
                _hasPriority,
                _suffixMap,
                _cs,
                _overwriteProps,
                _specialProps = {},
                p = CSSPlugin.prototype = new TweenPlugin("css");
            p.constructor = CSSPlugin;
            CSSPlugin.version = "1.18.5";
            CSSPlugin.API = 2;
            CSSPlugin.defaultTransformPerspective = 0;
            CSSPlugin.defaultSkewType = "compensated";
            CSSPlugin.defaultSmoothOrigin = !0;
            p = "px";
            CSSPlugin.suffixMap = {
                top: p,
                right: p,
                bottom: p,
                left: p,
                width: p,
                height: p,
                fontSize: p,
                padding: p,
                margin: p,
                perspective: p,
                lineHeight: ""
            };
            var _numExp = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
                _relNumExp = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                _valuesExp = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                _NaNExp = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
                _suffixExp = /(?:\d|\-|\+|=|#|\.)*/g,
                _opacityExp = /opacity *= *([^)]*)/i,
                _opacityValExp = /opacity:([^;]*)/i,
                _alphaFilterExp = /alpha\(opacity *=.+?\)/i,
                _rgbhslExp = /^(rgb|hsl)/,
                _capsExp = /([A-Z])/g,
                _camelExp = /-([a-z])/gi,
                _urlExp = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                _camelFunc = function(s, g) {
                    return g.toUpperCase()
                },
                _horizExp = /(?:Left|Right|Width)/i,
                _ieGetMatrixExp = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                _ieSetMatrixExp = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                _commasOutsideParenExp = /,(?=[^\)]*(?:\(|$))/gi,
                _complexExp = /[\s,\(]/i,
                _DEG2RAD = Math.PI / 180,
                _RAD2DEG = 180 / Math.PI,
                _forcePT = {},
                _doc = document,
                _createElement = function(type) {
                    return _doc.createElementNS ? _doc.createElementNS("http://www.w3.org/1999/xhtml", type) : _doc.createElement(type)
                },
                _tempDiv = _createElement("div"),
                _tempImg = _createElement("img"),
                _internals = CSSPlugin._internals = {
                    _specialProps: _specialProps
                },
                _agent = navigator.userAgent,
                _autoRound,
                _reqSafariFix,
                _isSafari,
                _isFirefox,
                _isSafariLT6,
                _ieVers,
                _supportsOpacity = (function() {
                    var i = _agent.indexOf("Android"),
                        a = _createElement("a");
                    _isSafari = (_agent.indexOf("Safari") !== -1 && _agent.indexOf("Chrome") === -1 && (i === -1 || Number(_agent.substr(i + 8, 1)) > 3));
                    _isSafariLT6 = (_isSafari && (Number(_agent.substr(_agent.indexOf("Version/") + 8, 1)) < 6));
                    _isFirefox = (_agent.indexOf("Firefox") !== -1);
                    if ((/MSIE ([0-9]{1,}[\.0-9]{0,})/).exec(_agent) || (/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/).exec(_agent)) {
                        _ieVers = parseFloat(RegExp.$1)
                    }
                    if (!a) {
                        return !1
                    }
                    a.style.cssText = "top:1px;opacity:.55;";
                    return /^0.55/.test(a.style.opacity)
                }()),
                _getIEOpacity = function(v) {
                    return ( _opacityExp.test(((typeof (v) === "string") ? v : (v.currentStyle ? v.currentStyle.filter : v.style.filter) || "")) ? (parseFloat(RegExp.$1) / 100) : 1)
                },
                _log = function(s) {
                    if (window.console) {
                        console.log(s)
                    }
                },
                _prefixCSS = "",
                _prefix = "",
                _checkPropPrefix = function(p, e) {
                    e = e || _tempDiv;
                    var s = e.style,
                        a,
                        i;
                    if (s[p] !== undefined) {
                        return p
                    }
                    p = p.charAt(0).toUpperCase() + p.substr(1);
                    a = ["O", "Moz", "ms", "Ms", "Webkit"];
                    i = 5;
                    while (--i > -1 && s[a[i] + p] === undefined) {}
                    if (i >= 0) {
                        _prefix = (i === 3) ? "ms" : a[i];
                        _prefixCSS = "-" + _prefix.toLowerCase() + "-";
                        return _prefix + p
                    }
                    return null
                },
                _getComputedStyle = _doc.defaultView ? _doc.defaultView.getComputedStyle : function() {},
                _getStyle = CSSPlugin.getStyle = function(t, p, cs, calc, dflt) {
                    var rv;
                    if (!_supportsOpacity)
                        if (p === "opacity") {
                            return _getIEOpacity(t)
                        }
                    if (!calc && t.style[p]) {
                        rv = t.style[p]
                    } else if ((cs = cs || _getComputedStyle(t))) {
                        rv = cs[p] || cs.getPropertyValue(p) || cs.getPropertyValue(p.replace(_capsExp, "-$1").toLowerCase())
                    } else if (t.currentStyle) {
                        rv = t.currentStyle[p]
                    }
                    return (dflt != null && (!rv || rv === "none" || rv === "auto" || rv === "auto auto")) ? dflt : rv
                },
                _convertToPixels = _internals.convertToPixels = function(t, p, v, sfx, recurse) {
                    if (sfx === "px" || !sfx) {
                        return v
                    }
                    if (sfx === "auto" || !v) {
                        return 0
                    }
                    var horiz = _horizExp.test(p),
                        node = t,
                        style = _tempDiv.style,
                        neg = (v < 0),
                        precise = (v === 1),
                        pix,
                        cache,
                        time;
                    if (neg) {
                        v = -v
                    }
                    if (precise) {
                        v *= 100
                    }
                    if (sfx === "%" && p.indexOf("border") !== -1) {
                        pix = (v / 100) * (horiz ? t.clientWidth : t.clientHeight)
                    } else {
                        style.cssText = "border:0 solid red;position:" + _getStyle(t, "position") + ";line-height:0;";
                        if (sfx === "%" || !node.appendChild || sfx.charAt(0) === "v" || sfx === "rem") {
                            node = t.parentNode || _doc.body;
                            cache = node._gsCache;
                            time = TweenLite.ticker.frame;
                            if (cache && horiz && cache.time === time) {
                                return cache.width * v / 100
                            }
                            style[(horiz ? "width" : "height")] = v + sfx
                        } else {
                            style[(horiz ? "borderLeftWidth" : "borderTopWidth")] = v + sfx
                        }
                        node.appendChild(_tempDiv);
                        pix = parseFloat(_tempDiv[(horiz ? "offsetWidth" : "offsetHeight")]);
                        node.removeChild(_tempDiv);
                        if (horiz && sfx === "%" && CSSPlugin.cacheWidths !== !1) {
                            cache = node._gsCache = node._gsCache || {};
                            cache.time = time;
                            cache.width = pix / v * 100
                        }
                        if (pix === 0 && !recurse) {
                            pix = _convertToPixels(t, p, v, sfx, !0)
                        }
                    }
                    if (precise) {
                        pix /= 100
                    }
                    return neg ? -pix : pix
                },
                _calculateOffset = _internals.calculateOffset = function(t, p, cs) {
                    if (_getStyle(t, "position", cs) !== "absolute") {
                        return 0
                    }
                    var dim = ((p === "left") ? "Left" : "Top"),
                        v = _getStyle(t, "margin" + dim, cs);
                    return t["offset" + dim] - (_convertToPixels(t, p, parseFloat(v), v.replace(_suffixExp, "")) || 0)
                },
                _getAllStyles = function(t, cs) {
                    var s = {},
                        i,
                        tr,
                        p;
                    if ((cs = cs || _getComputedStyle(t, null))) {
                        if ((i = cs.length)) {
                            while (--i > -1) {
                                p = cs[i];
                                if (p.indexOf("-transform") === -1 || _transformPropCSS === p) {
                                    s[p.replace(_camelExp, _camelFunc)] = cs.getPropertyValue(p)
                                }
                            }
                        } else {
                            for (i in cs) {
                                if (i.indexOf("Transform") === -1 || _transformProp === i) {
                                    s[i] = cs[i]
                                }
                            }
                        }
                    } else if ((cs = t.currentStyle || t.style)) {
                        for (i in cs) {
                            if (typeof (i) === "string" && s[i] === undefined) {
                                s[i.replace(_camelExp, _camelFunc)] = cs[i]
                            }
                        }
                    }
                    if (!_supportsOpacity) {
                        s.opacity = _getIEOpacity(t)
                    }
                    tr = _getTransform(t, cs, !1);
                    s.rotation = tr.rotation;
                    s.skewX = tr.skewX;
                    s.scaleX = tr.scaleX;
                    s.scaleY = tr.scaleY;
                    s.x = tr.x;
                    s.y = tr.y;
                    if (_supports3D) {
                        s.z = tr.z;
                        s.rotationX = tr.rotationX;
                        s.rotationY = tr.rotationY;
                        s.scaleZ = tr.scaleZ
                    }
                    if (s.filters) {
                        delete s.filters
                    }
                    return s
                },
                _cssDif = function(t, s1, s2, vars, forceLookup) {
                    var difs = {},
                        style = t.style,
                        val,
                        p,
                        mpt;
                    for (p in s2) {
                        if (p !== "cssText")
                            if (p !== "length")
                                if (isNaN(p))
                                    if (s1[p] !== (val = s2[p]) || (forceLookup && forceLookup[p]))
                                        if (p.indexOf("Origin") === -1)
                                            if (typeof (val) === "number" || typeof (val) === "string") {
                                                difs[p] = (val === "auto" && (p === "left" || p === "top")) ? _calculateOffset(t, p) : ((val === "" || val === "auto" || val === "none") && typeof (s1[p]) === "string" && s1[p].replace(_NaNExp, "") !== "") ? 0 : val;
                                                if (style[p] !== undefined) {
                                                    mpt = new MiniPropTween(style, p, style[p], mpt)
                                                }
                                            }
                    }
                    if (vars) {
                        for (p in vars) {
                            if (p !== "className") {
                                difs[p] = vars[p]
                            }
                        }
                    }
                    return {
                        difs: difs,
                        firstMPT: mpt
                    }
                },
                _dimensions = {
                    width: ["Left", "Right"],
                    height: ["Top", "Bottom"]
                },
                _margins = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                _getDimension = function(t, p, cs) {
                    if ((t.nodeName + "").toLowerCase() === "svg") {
                        return (cs || _getComputedStyle(t))[p] || 0
                    } else if (t.getBBox && _isSVG(t)) {
                        return t.getBBox()[p] || 0
                    }
                    var v = parseFloat((p === "width") ? t.offsetWidth : t.offsetHeight),
                        a = _dimensions[p],
                        i = a.length;
                    cs = cs || _getComputedStyle(t, null);
                    while (--i > -1) {
                        v -= parseFloat(_getStyle(t, "padding" + a[i], cs, !0)) || 0;
                        v -= parseFloat(_getStyle(t, "border" + a[i] + "Width", cs, !0)) || 0
                    }
                    return v
                },
                _parsePosition = function(v, recObj) {
                    if (v === "contain" || v === "auto" || v === "auto auto") {
                        return v + " "
                    }
                    if (v == null || v === "") {
                        v = "0 0"
                    }
                    var a = v.split(" "),
                        x = (v.indexOf("left") !== -1) ? "0%" : (v.indexOf("right") !== -1) ? "100%" : a[0],
                        y = (v.indexOf("top") !== -1) ? "0%" : (v.indexOf("bottom") !== -1) ? "100%" : a[1],
                        i;
                    if (a.length > 3 && !recObj) {
                        a = v.split(", ").join(",").split(",");
                        v = [];
                        for (i = 0; i < a.length; i++) {
                            v.push(_parsePosition(a[i]))
                        }
                        return v.join(",")
                    }
                    if (y == null) {
                        y = (x === "center") ? "50%" : "0"
                    } else if (y === "center") {
                        y = "50%"
                    }
                    if (x === "center" || (isNaN(parseFloat(x)) && (x + "").indexOf("=") === -1)) {
                        x = "50%"
                    }
                    v = x + " " + y + ((a.length > 2) ? " " + a[2] : "");
                    if (recObj) {
                        recObj.oxp = (x.indexOf("%") !== -1);
                        recObj.oyp = (y.indexOf("%") !== -1);
                        recObj.oxr = (x.charAt(1) === "=");
                        recObj.oyr = (y.charAt(1) === "=");
                        recObj.ox = parseFloat(x.replace(_NaNExp, ""));
                        recObj.oy = parseFloat(y.replace(_NaNExp, ""));
                        recObj.v = v
                    }
                    return recObj || v
                },
                _parseChange = function(e, b) {
                    return (typeof (e) === "string" && e.charAt(1) === "=") ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : (parseFloat(e) - parseFloat(b)) || 0
                },
                _parseVal = function(v, d) {
                    return (v == null) ? d : (typeof (v) === "string" && v.charAt(1) === "=") ? parseInt(v.charAt(0) + "1", 10) * parseFloat(v.substr(2)) + d : parseFloat(v) || 0
                },
                _parseAngle = function(v, d, p, directionalEnd) {
                    var min = 0.000001,
                        cap,
                        split,
                        dif,
                        result,
                        isRelative;
                    if (v == null) {
                        result = d
                    } else if (typeof (v) === "number") {
                        result = v
                    } else {
                        cap = 360;
                        split = v.split("_");
                        isRelative = (v.charAt(1) === "=");
                        dif = (isRelative ? parseInt(v.charAt(0) + "1", 10) * parseFloat(split[0].substr(2)) : parseFloat(split[0])) * ((v.indexOf("rad") === -1) ? 1 : _RAD2DEG) - (isRelative ? 0 : d);
                        if (split.length) {
                            if (directionalEnd) {
                                directionalEnd[p] = d + dif
                            }
                            if (v.indexOf("short") !== -1) {
                                dif = dif % cap;
                                if (dif !== dif % (cap / 2)) {
                                    dif = (dif < 0) ? dif + cap : dif - cap
                                }
                            }
                            if (v.indexOf("_cw") !== -1 && dif < 0) {
                                dif = ((dif + cap * 9999999999) % cap) - ((dif / cap) | 0) * cap
                            } else if (v.indexOf("ccw") !== -1 && dif > 0) {
                                dif = ((dif - cap * 9999999999) % cap) - ((dif / cap) | 0) * cap
                            }
                        }
                        result = d + dif
                    }
                    if (result < min && result > -min) {
                        result = 0
                    }
                    return result
                },
                _colorLookup = {
                    aqua: [0, 255, 255],
                    lime: [0, 255, 0],
                    silver: [192, 192, 192],
                    black: [0, 0, 0],
                    maroon: [128, 0, 0],
                    teal: [0, 128, 128],
                    blue: [0, 0, 255],
                    navy: [0, 0, 128],
                    white: [255, 255, 255],
                    fuchsia: [255, 0, 255],
                    olive: [128, 128, 0],
                    yellow: [255, 255, 0],
                    orange: [255, 165, 0],
                    gray: [128, 128, 128],
                    purple: [128, 0, 128],
                    green: [0, 128, 0],
                    red: [255, 0, 0],
                    pink: [255, 192, 203],
                    cyan: [0, 255, 255],
                    transparent: [255, 255, 255, 0]
                },
                _hue = function(h, m1, m2) {
                    h = (h < 0) ? h + 1 : (h > 1) ? h - 1 : h;
                    return ((((h * 6 < 1) ? m1 + (m2 - m1) * h * 6 : (h < 0.5) ? m2 : (h * 3 < 2) ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * 255) + 0.5) | 0
                },
                _parseColor = CSSPlugin.parseColor = function(v, toHSL) {
                    var a,
                        r,
                        g,
                        b,
                        h,
                        s,
                        l,
                        max,
                        min,
                        d,
                        wasHSL;
                    if (!v) {
                        a = _colorLookup.black
                    } else if (typeof (v) === "number") {
                        a = [v >> 16, (v >> 8) & 255, v & 255]
                    } else {
                        if (v.charAt(v.length - 1) === ",") {
                            v = v.substr(0, v.length - 1)
                        }
                        if (_colorLookup[v]) {
                            a = _colorLookup[v]
                        } else if (v.charAt(0) === "#") {
                            if (v.length === 4) {
                                r = v.charAt(1);
                                g = v.charAt(2);
                                b = v.charAt(3);
                                v = "#" + r + r + g + g + b + b
                            }
                            v = parseInt(v.substr(1), 16);
                            a = [v >> 16, (v >> 8) & 255, v & 255]
                        } else if (v.substr(0, 3) === "hsl") {
                            a = wasHSL = v.match(_numExp);
                            if (!toHSL) {
                                h = (Number(a[0]) % 360) / 360;
                                s = Number(a[1]) / 100;
                                l = Number(a[2]) / 100;
                                g = (l <= 0.5) ? l * (s + 1) : l + s - l * s;
                                r = l * 2 - g;
                                if (a.length > 3) {
                                    a[3] = Number(v[3])
                                }
                                a[0] = _hue(h + 1 / 3, r, g);
                                a[1] = _hue(h, r, g);
                                a[2] = _hue(h - 1 / 3, r, g)
                            } else if (v.indexOf("=") !== -1) {
                                return v.match(_relNumExp)
                            }
                        } else {
                            a = v.match(_numExp) || _colorLookup.transparent
                        }
                        a[0] = Number(a[0]);
                        a[1] = Number(a[1]);
                        a[2] = Number(a[2]);
                        if (a.length > 3) {
                            a[3] = Number(a[3])
                        }
                    }
                    if (toHSL && !wasHSL) {
                        r = a[0] / 255;
                        g = a[1] / 255;
                        b = a[2] / 255;
                        max = Math.max(r, g, b);
                        min = Math.min(r, g, b);
                        l = (max + min) / 2;
                        if (max === min) {
                            h = s = 0
                        } else {
                            d = max - min;
                            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                            h = (max === r) ? (g - b) / d + (g < b ? 6 : 0) : (max === g) ? (b - r) / d + 2 : (r - g) / d + 4;
                            h *= 60
                        }
                        a[0] = (h + 0.5) | 0;
                        a[1] = (s * 100 + 0.5) | 0;
                        a[2] = (l * 100 + 0.5) | 0
                    }
                    return a
                },
                _formatColors = function(s, toHSL) {
                    var colors = s.match(_colorExp) || [],
                        charIndex = 0,
                        parsed = colors.length ? "" : s,
                        i,
                        color,
                        temp;
                    for (i = 0; i < colors.length; i++) {
                        color = colors[i];
                        temp = s.substr(charIndex, s.indexOf(color, charIndex) - charIndex);
                        charIndex += temp.length + color.length;
                        color = _parseColor(color, toHSL);
                        if (color.length === 3) {
                            color.push(1)
                        }
                        parsed += temp + (toHSL ? "hsla(" + color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : "rgba(" + color.join(",")) + ")"
                    }
                    return parsed + s.substr(charIndex)
                },
                _colorExp = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
            for (p in _colorLookup) {
                _colorExp += "|" + p + "\\b"
            }
            _colorExp = new RegExp(_colorExp + ")", "gi");
            CSSPlugin.colorStringFilter = function(a) {
                var combined = a[0] + a[1],
                    toHSL;
                if (_colorExp.test(combined)) {
                    toHSL = (combined.indexOf("hsl(") !== -1 || combined.indexOf("hsla(") !== -1);
                    a[0] = _formatColors(a[0], toHSL);
                    a[1] = _formatColors(a[1], toHSL)
                }
                _colorExp.lastIndex = 0
            };
            if (!TweenLite.defaultStringFilter) {
                TweenLite.defaultStringFilter = CSSPlugin.colorStringFilter
            }
            var _getFormatter = function(dflt, clr, collapsible, multi) {
                    if (dflt == null) {
                        return function(v) {
                            return v
                        }
                    }
                    var dColor = clr ? (dflt.match(_colorExp) || [""])[0] : "",
                        dVals = dflt.split(dColor).join("").match(_valuesExp) || [],
                        pfx = dflt.substr(0, dflt.indexOf(dVals[0])),
                        sfx = (dflt.charAt(dflt.length - 1) === ")") ? ")" : "",
                        delim = (dflt.indexOf(" ") !== -1) ? " " : ",",
                        numVals = dVals.length,
                        dSfx = (numVals > 0) ? dVals[0].replace(_numExp, "") : "",
                        formatter;
                    if (!numVals) {
                        return function(v) {
                            return v
                        }
                    }
                    if (clr) {
                        formatter = function(v) {
                            var color,
                                vals,
                                i,
                                a;
                            if (typeof (v) === "number") {
                                v += dSfx
                            } else if (multi && _commasOutsideParenExp.test(v)) {
                                a = v.replace(_commasOutsideParenExp, "|").split("|");
                                for (i = 0; i < a.length; i++) {
                                    a[i] = formatter(a[i])
                                }
                                return a.join(",")
                            }
                            color = (v.match(_colorExp) || [dColor])[0];
                            vals = v.split(color).join("").match(_valuesExp) || [];
                            i = vals.length;
                            if (numVals > i--) {
                                while (++i < numVals) {
                                    vals[i] = collapsible ? vals[(((i - 1) / 2) | 0)] : dVals[i]
                                }
                            }
                            return pfx + vals.join(delim) + delim + color + sfx + (v.indexOf("inset") !== -1 ? " inset" : "")
                        };
                        return formatter
                    }
                    formatter = function(v) {
                        var vals,
                            a,
                            i;
                        if (typeof (v) === "number") {
                            v += dSfx
                        } else if (multi && _commasOutsideParenExp.test(v)) {
                            a = v.replace(_commasOutsideParenExp, "|").split("|");
                            for (i = 0; i < a.length; i++) {
                                a[i] = formatter(a[i])
                            }
                            return a.join(",")
                        }
                        vals = v.match(_valuesExp) || [];
                        i = vals.length;
                        if (numVals > i--) {
                            while (++i < numVals) {
                                vals[i] = collapsible ? vals[(((i - 1) / 2) | 0)] : dVals[i]
                            }
                        }
                        return pfx + vals.join(delim) + sfx
                    };
                    return formatter
                },
                _getEdgeParser = function(props) {
                    props = props.split(",");
                    return function(t, e, p, cssp, pt, plugin, vars) {
                        var a = (e + "").split(" "),
                            i;
                        vars = {};
                        for (i = 0; i < 4; i++) {
                            vars[props[i]] = a[i] = a[i] || a[(((i - 1) / 2) >> 0)]
                        }
                        return cssp.parse(t, vars, pt, plugin)
                    }
                },
                _setPluginRatio = _internals._setPluginRatio = function(v) {
                    this.plugin.setRatio(v);
                    var d = this.data,
                        proxy = d.proxy,
                        mpt = d.firstMPT,
                        min = 0.000001,
                        val,
                        pt,
                        i,
                        str,
                        p;
                    while (mpt) {
                        val = proxy[mpt.v];
                        if (mpt.r) {
                            val = Math.round(val)
                        } else if (val < min && val > -min) {
                            val = 0
                        }
                        mpt.t[mpt.p] = val;
                        mpt = mpt._next
                    }
                    if (d.autoRotate) {
                        d.autoRotate.rotation = proxy.rotation
                    }
                    if (v === 1 || v === 0) {
                        mpt = d.firstMPT;
                        p = (v === 1) ? "e" : "b";
                        while (mpt) {
                            pt = mpt.t;
                            if (!pt.type) {
                                pt[p] = pt.s + pt.xs0
                            } else if (pt.type === 1) {
                                str = pt.xs0 + pt.s + pt.xs1;
                                for (i = 1; i < pt.l; i++) {
                                    str += pt["xn" + i] + pt["xs" + (i + 1)]
                                }
                                pt[p] = str
                            }
                            mpt = mpt._next
                        }
                    }
                },
                MiniPropTween = function(t, p, v, next, r) {
                    this.t = t;
                    this.p = p;
                    this.v = v;
                    this.r = r;
                    if (next) {
                        next._prev = this;
                        this._next = next
                    }
                },
                _parseToProxy = _internals._parseToProxy = function(t, vars, cssp, pt, plugin, shallow) {
                    var bpt = pt,
                        start = {},
                        end = {},
                        transform = cssp._transform,
                        oldForce = _forcePT,
                        i,
                        p,
                        xp,
                        mpt,
                        firstPT;
                    cssp._transform = null;
                    _forcePT = vars;
                    pt = firstPT = cssp.parse(t, vars, pt, plugin);
                    _forcePT = oldForce;
                    if (shallow) {
                        cssp._transform = transform;
                        if (bpt) {
                            bpt._prev = null;
                            if (bpt._prev) {
                                bpt._prev._next = null
                            }
                        }
                    }
                    while (pt && pt !== bpt) {
                        if (pt.type <= 1) {
                            p = pt.p;
                            end[p] = pt.s + pt.c;
                            start[p] = pt.s;
                            if (!shallow) {
                                mpt = new MiniPropTween(pt, "s", p, mpt, pt.r);
                                pt.c = 0
                            }
                            if (pt.type === 1) {
                                i = pt.l;
                                while (--i > 0) {
                                    xp = "xn" + i;
                                    p = pt.p + "_" + xp;
                                    end[p] = pt.data[xp];
                                    start[p] = pt[xp];
                                    if (!shallow) {
                                        mpt = new MiniPropTween(pt, xp, p, mpt, pt.rxp[xp])
                                    }
                                }
                            }
                        }
                        pt = pt._next
                    }
                    return {
                        proxy: start,
                        end: end,
                        firstMPT: mpt,
                        pt: firstPT
                    }
                },
                CSSPropTween = _internals.CSSPropTween = function(t, p, s, c, next, type, n, r, pr, b, e) {
                    this.t = t;
                    this.p = p;
                    this.s = s;
                    this.c = c;
                    this.n = n || p;
                    if (!(t instanceof CSSPropTween)) {
                        _overwriteProps.push(this.n)
                    }
                    this.r = r;
                    this.type = type || 0;
                    if (pr) {
                        this.pr = pr;
                        _hasPriority = !0
                    }
                    this.b = (b === undefined) ? s : b;
                    this.e = (e === undefined) ? s + c : e;
                    if (next) {
                        this._next = next;
                        next._prev = this
                    }
                },
                _addNonTweeningNumericPT = function(target, prop, start, end, next, overwriteProp) {
                    var pt = new CSSPropTween(target, prop, start, end - start, next, -1, overwriteProp);
                    pt.b = start;
                    pt.e = pt.xs0 = end;
                    return pt
                },
                _parseComplex = CSSPlugin.parseComplex = function(t, p, b, e, clrs, dflt, pt, pr, plugin, setRatio) {
                    b = b || dflt || "";
                    pt = new CSSPropTween(t, p, 0, 0, pt, (setRatio ? 2 : 1), null, !1, pr, b, e);
                    e += "";
                    if (clrs && _colorExp.test(e + b)) {
                        e = [b, e];
                        CSSPlugin.colorStringFilter(e);
                        b = e[0];
                        e = e[1]
                    }
                    var ba = b.split(", ").join(",").split(" "),
                        ea = e.split(", ").join(",").split(" "),
                        l = ba.length,
                        autoRound = (_autoRound !== !1),
                        i,
                        xi,
                        ni,
                        bv,
                        ev,
                        bnums,
                        enums,
                        bn,
                        hasAlpha,
                        temp,
                        cv,
                        str,
                        useHSL;
                    if (e.indexOf(",") !== -1 || b.indexOf(",") !== -1) {
                        ba = ba.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
                        ea = ea.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
                        l = ba.length
                    }
                    if (l !== ea.length) {
                        ba = (dflt || "").split(" ");
                        l = ba.length
                    }
                    pt.plugin = plugin;
                    pt.setRatio = setRatio;
                    _colorExp.lastIndex = 0;
                    for (i = 0; i < l; i++) {
                        bv = ba[i];
                        ev = ea[i];
                        bn = parseFloat(bv);
                        if (bn || bn === 0) {
                            pt.appendXtra("", bn, _parseChange(ev, bn), ev.replace(_relNumExp, ""), (autoRound && ev.indexOf("px") !== -1), !0)
                        } else if (clrs && _colorExp.test(bv)) {
                            str = ev.indexOf(")") + 1;
                            str = ")" + (str ? ev.substr(str) : "");
                            useHSL = (ev.indexOf("hsl") !== -1 && _supportsOpacity);
                            bv = _parseColor(bv, useHSL);
                            ev = _parseColor(ev, useHSL);
                            hasAlpha = (bv.length + ev.length > 6);
                            if (hasAlpha && !_supportsOpacity && ev[3] === 0) {
                                pt["xs" + pt.l] += pt.l ? " transparent" : "transparent";
                                pt.e = pt.e.split(ea[i]).join("transparent")
                            } else {
                                if (!_supportsOpacity) {
                                    hasAlpha = !1
                                }
                                if (useHSL) {
                                    pt.appendXtra((hasAlpha ? "hsla(" : "hsl("), bv[0], _parseChange(ev[0], bv[0]), ",", !1, !0).appendXtra("", bv[1], _parseChange(ev[1], bv[1]), "%,", !1).appendXtra("", bv[2], _parseChange(ev[2], bv[2]), (hasAlpha ? "%," : "%" + str), !1)
                                } else {
                                    pt.appendXtra((hasAlpha ? "rgba(" : "rgb("), bv[0], ev[0] - bv[0], ",", !0, !0).appendXtra("", bv[1], ev[1] - bv[1], ",", !0).appendXtra("", bv[2], ev[2] - bv[2], (hasAlpha ? "," : str), !0)
                                }
                                if (hasAlpha) {
                                    bv = (bv.length < 4) ? 1 : bv[3];
                                    pt.appendXtra("", bv, ((ev.length < 4) ? 1 : ev[3]) - bv, str, !1)
                                }
                            }
                            _colorExp.lastIndex = 0
                        } else {
                            bnums = bv.match(_numExp);
                            if (!bnums) {
                                pt["xs" + pt.l] += (pt.l || pt["xs" + pt.l]) ? " " + ev : ev
                            } else {
                                enums = ev.match(_relNumExp);
                                if (!enums || enums.length !== bnums.length) {
                                    return pt
                                }
                                ni = 0;
                                for (xi = 0; xi < bnums.length; xi++) {
                                    cv = bnums[xi];
                                    temp = bv.indexOf(cv, ni);
                                    pt.appendXtra(bv.substr(ni, temp - ni), Number(cv), _parseChange(enums[xi], cv), "", (autoRound && bv.substr(temp + cv.length, 2) === "px"), (xi === 0));
                                    ni = temp + cv.length
                                }
                                pt["xs" + pt.l] += bv.substr(ni)
                            }
                        }
                    }
                    if (e.indexOf("=") !== -1)
                        if (pt.data) {
                            str = pt.xs0 + pt.data.s;
                            for (i = 1; i < pt.l; i++) {
                                str += pt["xs" + i] + pt.data["xn" + i]
                            }
                            pt.e = str + pt["xs" + i]
                        }
                    if (!pt.l) {
                        pt.type = -1;
                        pt.xs0 = pt.e
                    }
                    return pt.xfirst || pt
                },
                i = 9;
            p = CSSPropTween.prototype;
            p.l = p.pr = 0;
            while (--i > 0) {
                p["xn" + i] = 0;
                p["xs" + i] = ""
            }
            p.xs0 = "";
            p._next = p._prev = p.xfirst = p.data = p.plugin = p.setRatio = p.rxp = null;
            p.appendXtra = function(pfx, s, c, sfx, r, pad) {
                var pt = this,
                    l = pt.l;
                pt["xs" + l] += (pad && (l || pt["xs" + l])) ? " " + pfx : pfx || "";
                if (!c)
                    if (l !== 0 && !pt.plugin) {
                        pt["xs" + l] += s + (sfx || "");
                        return pt
                    }
                pt.l++;
                pt.type = pt.setRatio ? 2 : 1;
                pt["xs" + pt.l] = sfx || "";
                if (l > 0) {
                    pt.data["xn" + l] = s + c;
                    pt.rxp["xn" + l] = r;
                    pt["xn" + l] = s;
                    if (!pt.plugin) {
                        pt.xfirst = new CSSPropTween(pt, "xn" + l, s, c, pt.xfirst || pt, 0, pt.n, r, pt.pr);
                        pt.xfirst.xs0 = 0
                    }
                    return pt
                }
                pt.data = {
                    s: s + c
                };
                pt.rxp = {};
                pt.s = s;
                pt.c = c;
                pt.r = r;
                return pt
            };
            var SpecialProp = function(p, options) {
                    options = options || {};
                    this.p = options.prefix ? _checkPropPrefix(p) || p : p;
                    _specialProps[p] = _specialProps[this.p] = this;
                    this.format = options.formatter || _getFormatter(options.defaultValue, options.color, options.collapsible, options.multi);
                    if (options.parser) {
                        this.parse = options.parser
                    }
                    this.clrs = options.color;
                    this.multi = options.multi;
                    this.keyword = options.keyword;
                    this.dflt = options.defaultValue;
                    this.pr = options.priority || 0
                },
                _registerComplexSpecialProp = _internals._registerComplexSpecialProp = function(p, options, defaults) {
                    if (typeof (options) !== "object") {
                        options = {
                            parser: defaults
                        }
                    }
                    var a = p.split(","),
                        d = options.defaultValue,
                        i,
                        temp;
                    defaults = defaults || [d];
                    for (i = 0; i < a.length; i++) {
                        options.prefix = (i === 0 && options.prefix);
                        options.defaultValue = defaults[i] || d;
                        temp = new SpecialProp(a[i], options)
                    }
                },
                _registerPluginProp = function(p) {
                    if (!_specialProps[p]) {
                        var pluginName = p.charAt(0).toUpperCase() + p.substr(1) + "Plugin";
                        _registerComplexSpecialProp(p, {
                            parser: function(t, e, p, cssp, pt, plugin, vars) {
                                var pluginClass = _globals.com.greensock.plugins[pluginName];
                                if (!pluginClass) {
                                    _log("Error: " + pluginName + " js file not loaded.");
                                    return pt
                                }
                                pluginClass._cssRegister();
                                return _specialProps[p].parse(t, e, p, cssp, pt, plugin, vars)
                            }
                        })
                    }
                };
            p = SpecialProp.prototype;
            p.parseComplex = function(t, b, e, pt, plugin, setRatio) {
                var kwd = this.keyword,
                    i,
                    ba,
                    ea,
                    l,
                    bi,
                    ei;
                if (this.multi)
                    if (_commasOutsideParenExp.test(e) || _commasOutsideParenExp.test(b)) {
                        ba = b.replace(_commasOutsideParenExp, "|").split("|");
                        ea = e.replace(_commasOutsideParenExp, "|").split("|")
                    } else if (kwd) {
                        ba = [b];
                        ea = [e]
                    }
                if (ea) {
                    l = (ea.length > ba.length) ? ea.length : ba.length;
                    for (i = 0; i < l; i++) {
                        b = ba[i] = ba[i] || this.dflt;
                        e = ea[i] = ea[i] || this.dflt;
                        if (kwd) {
                            bi = b.indexOf(kwd);
                            ei = e.indexOf(kwd);
                            if (bi !== ei) {
                                if (ei === -1) {
                                    ba[i] = ba[i].split(kwd).join("")
                                } else if (bi === -1) {
                                    ba[i] += " " + kwd
                                }
                            }
                        }
                    }
                    b = ba.join(", ");
                    e = ea.join(", ")
                }
                return _parseComplex(t, this.p, b, e, this.clrs, this.dflt, pt, this.pr, plugin, setRatio)
            };
            p.parse = function(t, e, p, cssp, pt, plugin, vars) {
                return this.parseComplex(t.style, this.format(_getStyle(t, this.p, _cs, !1, this.dflt)), this.format(e), pt, plugin)
            };
            CSSPlugin.registerSpecialProp = function(name, onInitTween, priority) {
                _registerComplexSpecialProp(name, {
                    parser: function(t, e, p, cssp, pt, plugin, vars) {
                        var rv = new CSSPropTween(t, p, 0, 0, pt, 2, p, !1, priority);
                        rv.plugin = plugin;
                        rv.setRatio = onInitTween(t, e, cssp._tween, p);
                        return rv
                    },
                    priority: priority
                })
            };
            CSSPlugin.useSVGTransformAttr = _isSafari || _isFirefox;
            var _transformProps = ("scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent").split(","),
                _transformProp = _checkPropPrefix("transform"),
                _transformPropCSS = _prefixCSS + "transform",
                _transformOriginProp = _checkPropPrefix("transformOrigin"),
                _supports3D = (_checkPropPrefix("perspective") !== null),
                Transform = _internals.Transform = function() {
                    this.perspective = parseFloat(CSSPlugin.defaultTransformPerspective) || 0;
                    this.force3D = (CSSPlugin.defaultForce3D === !1 || !_supports3D) ? !1 : CSSPlugin.defaultForce3D || "auto"
                },
                _SVGElement = window.SVGElement,
                _useSVGTransformAttr,
                _createSVG = function(type, container, attributes) {
                    var element = _doc.createElementNS("http://www.w3.org/2000/svg", type),
                        reg = /([a-z])([A-Z])/g,
                        p;
                    for (p in attributes) {
                        element.setAttributeNS(null, p.replace(reg, "$1-$2").toLowerCase(), attributes[p])
                    }
                    container.appendChild(element);
                    return element
                },
                _docElement = _doc.documentElement,
                _forceSVGTransformAttr = (function() {
                    var force = _ieVers || (/Android/i.test(_agent) && !window.chrome),
                        svg,
                        rect,
                        width;
                    if (_doc.createElementNS && !force) {
                        svg = _createSVG("svg", _docElement);
                        rect = _createSVG("rect", svg, {
                            width: 100,
                            height: 50,
                            x: 100
                        });
                        width = rect.getBoundingClientRect().width;
                        rect.style[_transformOriginProp] = "50% 50%";
                        rect.style[_transformProp] = "scaleX(0.5)";
                        force = (width === rect.getBoundingClientRect().width && !(_isFirefox && _supports3D));
                        _docElement.removeChild(svg)
                    }
                    return force
                })(),
                _parseSVGOrigin = function(e, local, decoratee, absolute, smoothOrigin, skipRecord) {
                    var tm = e._gsTransform,
                        m = _getMatrix(e, !0),
                        v,
                        x,
                        y,
                        xOrigin,
                        yOrigin,
                        a,
                        b,
                        c,
                        d,
                        tx,
                        ty,
                        determinant,
                        xOriginOld,
                        yOriginOld;
                    if (tm) {
                        xOriginOld = tm.xOrigin;
                        yOriginOld = tm.yOrigin
                    }
                    if (!absolute || (v = absolute.split(" ")).length < 2) {
                        b = e.getBBox();
                        local = _parsePosition(local).split(" ");
                        v = [(local[0].indexOf("%") !== -1 ? parseFloat(local[0]) / 100 * b.width : parseFloat(local[0])) + b.x, (local[1].indexOf("%") !== -1 ? parseFloat(local[1]) / 100 * b.height : parseFloat(local[1])) + b.y]
                    }
                    decoratee.xOrigin = xOrigin = parseFloat(v[0]);
                    decoratee.yOrigin = yOrigin = parseFloat(v[1]);
                    if (absolute && m !== _identity2DMatrix) {
                        a = m[0];
                        b = m[1];
                        c = m[2];
                        d = m[3];
                        tx = m[4];
                        ty = m[5];
                        determinant = (a * d - b * c);
                        x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + ((c * ty - d * tx) / determinant);
                        y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - ((a * ty - b * tx) / determinant);
                        xOrigin = decoratee.xOrigin = v[0] = x;
                        yOrigin = decoratee.yOrigin = v[1] = y
                    }
                    if (tm) {
                        if (skipRecord) {
                            decoratee.xOffset = tm.xOffset;
                            decoratee.yOffset = tm.yOffset;
                            tm = decoratee
                        }
                        if (smoothOrigin || (smoothOrigin !== !1 && CSSPlugin.defaultSmoothOrigin !== !1)) {
                            x = xOrigin - xOriginOld;
                            y = yOrigin - yOriginOld;
                            tm.xOffset += (x * m[0] + y * m[2]) - x;
                            tm.yOffset += (x * m[1] + y * m[3]) - y
                        } else {
                            tm.xOffset = tm.yOffset = 0
                        }
                    }
                    if (!skipRecord) {
                        e.setAttribute("data-svg-origin", v.join(" "))
                    }
                },
                _canGetBBox = function(e) {
                    try {
                        return e.getBBox()
                    } catch (e) {}
                },
                _isSVG = function(e) {
                    return !!(_SVGElement && e.getBBox && e.getCTM && _canGetBBox(e) && (!e.parentNode || (e.parentNode.getBBox && e.parentNode.getCTM)))
                },
                _identity2DMatrix = [1, 0, 0, 1, 0, 0],
                _getMatrix = function(e, force2D) {
                    var tm = e._gsTransform || new Transform(),
                        rnd = 100000,
                        style = e.style,
                        isDefault,
                        s,
                        m,
                        n,
                        dec,
                        none;
                    if (_transformProp) {
                        s = _getStyle(e, _transformPropCSS, null, !0)
                    } else if (e.currentStyle) {
                        s = e.currentStyle.filter.match(_ieGetMatrixExp);
                        s = (s && s.length === 4) ? [s[0].substr(4), Number(s[2].substr(4)), Number(s[1].substr(4)), s[3].substr(4), (tm.x || 0), (tm.y || 0)].join(",") : ""
                    }
                    isDefault = (!s || s === "none" || s === "matrix(1, 0, 0, 1, 0, 0)");
                    if (isDefault && _transformProp && ((none = (_getComputedStyle(e).display === "none")) || !e.parentNode)) {
                        if (none) {
                            n = style.display;
                            style.display = "block"
                        }
                        if (!e.parentNode) {
                            dec = 1;
                            _docElement.appendChild(e)
                        }
                        s = _getStyle(e, _transformPropCSS, null, !0);
                        isDefault = (!s || s === "none" || s === "matrix(1, 0, 0, 1, 0, 0)");
                        if (n) {
                            style.display = n
                        } else if (none) {
                            _removeProp(style, "display")
                        }
                        if (dec) {
                            _docElement.removeChild(e)
                        }
                    }
                    if (tm.svg || (e.getBBox && _isSVG(e))) {
                        if (isDefault && (style[_transformProp] + "").indexOf("matrix") !== -1) {
                            s = style[_transformProp];
                            isDefault = 0
                        }
                        m = e.getAttribute("transform");
                        if (isDefault && m) {
                            if (m.indexOf("matrix") !== -1) {
                                s = m;
                                isDefault = 0
                            } else if (m.indexOf("translate") !== -1) {
                                s = "matrix(1,0,0,1," + m.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")";
                                isDefault = 0
                            }
                        }
                    }
                    if (isDefault) {
                        return _identity2DMatrix
                    }
                    m = (s || "").match(_numExp) || [];
                    i = m.length;
                    while (--i > -1) {
                        n = Number(m[i]);
                        m[i] = (dec = n - (n |= 0)) ? ((dec * rnd + (dec < 0 ? -0.5 : 0.5)) | 0) / rnd + n : n
                    }
                    return (force2D && m.length > 6) ? [m[0], m[1], m[4], m[5], m[12], m[13]] : m
                },
                _getTransform = _internals.getTransform = function(t, cs, rec, parse) {
                    if (t._gsTransform && rec && !parse) {
                        return t._gsTransform
                    }
                    var tm = rec ? t._gsTransform || new Transform() : new Transform(),
                        invX = (tm.scaleX < 0),
                        min = 0.00002,
                        rnd = 100000,
                        zOrigin = _supports3D ? parseFloat(_getStyle(t, _transformOriginProp, cs, !1, "0 0 0").split(" ")[2]) || tm.zOrigin || 0 : 0,
                        defaultTransformPerspective = parseFloat(CSSPlugin.defaultTransformPerspective) || 0,
                        m,
                        i,
                        scaleX,
                        scaleY,
                        rotation,
                        skewX;
                    tm.svg = !!(t.getBBox && _isSVG(t));
                    if (tm.svg) {
                        _parseSVGOrigin(t, _getStyle(t, _transformOriginProp, cs, !1, "50% 50%") + "", tm, t.getAttribute("data-svg-origin"));
                        _useSVGTransformAttr = CSSPlugin.useSVGTransformAttr || _forceSVGTransformAttr
                    }
                    m = _getMatrix(t);
                    if (m !== _identity2DMatrix) {
                        if (m.length === 16) {
                            var a11 = m[0],
                                a21 = m[1],
                                a31 = m[2],
                                a41 = m[3],
                                a12 = m[4],
                                a22 = m[5],
                                a32 = m[6],
                                a42 = m[7],
                                a13 = m[8],
                                a23 = m[9],
                                a33 = m[10],
                                a14 = m[12],
                                a24 = m[13],
                                a34 = m[14],
                                a43 = m[11],
                                angle = Math.atan2(a32, a33),
                                t1,
                                t2,
                                t3,
                                t4,
                                cos,
                                sin;
                            if (tm.zOrigin) {
                                a34 = -tm.zOrigin;
                                a14 = a13 * a34 - m[12];
                                a24 = a23 * a34 - m[13];
                                a34 = a33 * a34 + tm.zOrigin - m[14]
                            }
                            tm.rotationX = angle * _RAD2DEG;
                            if (angle) {
                                cos = Math.cos(-angle);
                                sin = Math.sin(-angle);
                                t1 = a12 * cos + a13 * sin;
                                t2 = a22 * cos + a23 * sin;
                                t3 = a32 * cos + a33 * sin;
                                a13 = a12 * -sin + a13 * cos;
                                a23 = a22 * -sin + a23 * cos;
                                a33 = a32 * -sin + a33 * cos;
                                a43 = a42 * -sin + a43 * cos;
                                a12 = t1;
                                a22 = t2;
                                a32 = t3
                            }
                            angle = Math.atan2(-a31, a33);
                            tm.rotationY = angle * _RAD2DEG;
                            if (angle) {
                                cos = Math.cos(-angle);
                                sin = Math.sin(-angle);
                                t1 = a11 * cos - a13 * sin;
                                t2 = a21 * cos - a23 * sin;
                                t3 = a31 * cos - a33 * sin;
                                a23 = a21 * sin + a23 * cos;
                                a33 = a31 * sin + a33 * cos;
                                a43 = a41 * sin + a43 * cos;
                                a11 = t1;
                                a21 = t2;
                                a31 = t3
                            }
                            angle = Math.atan2(a21, a11);
                            tm.rotation = angle * _RAD2DEG;
                            if (angle) {
                                cos = Math.cos(-angle);
                                sin = Math.sin(-angle);
                                a11 = a11 * cos + a12 * sin;
                                t2 = a21 * cos + a22 * sin;
                                a22 = a21 * -sin + a22 * cos;
                                a32 = a31 * -sin + a32 * cos;
                                a21 = t2
                            }
                            if (tm.rotationX && Math.abs(tm.rotationX) + Math.abs(tm.rotation) > 359.9) {
                                tm.rotationX = tm.rotation = 0;
                                tm.rotationY = 180 - tm.rotationY
                            }
                            tm.scaleX = ((Math.sqrt(a11 * a11 + a21 * a21) * rnd + 0.5) | 0) / rnd;
                            tm.scaleY = ((Math.sqrt(a22 * a22 + a23 * a23) * rnd + 0.5) | 0) / rnd;
                            tm.scaleZ = ((Math.sqrt(a32 * a32 + a33 * a33) * rnd + 0.5) | 0) / rnd;
                            if (tm.rotationX || tm.rotationY) {
                                tm.skewX = 0
                            } else {
                                tm.skewX = (a12 || a22) ? Math.atan2(a12, a22) * _RAD2DEG + tm.rotation : tm.skewX || 0;
                                if (Math.abs(tm.skewX) > 90 && Math.abs(tm.skewX) < 270) {
                                    if (invX) {
                                        tm.scaleX *= -1;
                                        tm.skewX += (tm.rotation <= 0) ? 180 : -180;
                                        tm.rotation += (tm.rotation <= 0) ? 180 : -180
                                    } else {
                                        tm.scaleY *= -1;
                                        tm.skewX += (tm.skewX <= 0) ? 180 : -180
                                    }
                                }
                            }
                            tm.perspective = a43 ? 1 / ((a43 < 0) ? -a43 : a43) : 0;
                            tm.x = a14;
                            tm.y = a24;
                            tm.z = a34;
                            if (tm.svg) {
                                tm.x -= tm.xOrigin - (tm.xOrigin * a11 - tm.yOrigin * a12);
                                tm.y -= tm.yOrigin - (tm.yOrigin * a21 - tm.xOrigin * a22)
                            }
                        } else if ((!_supports3D || parse || !m.length || tm.x !== m[4] || tm.y !== m[5] || (!tm.rotationX && !tm.rotationY))) {
                            var k = (m.length >= 6),
                                a = k ? m[0] : 1,
                                b = m[1] || 0,
                                c = m[2] || 0,
                                d = k ? m[3] : 1;
                            tm.x = m[4] || 0;
                            tm.y = m[5] || 0;
                            scaleX = Math.sqrt(a * a + b * b);
                            scaleY = Math.sqrt(d * d + c * c);
                            rotation = (a || b) ? Math.atan2(b, a) * _RAD2DEG : tm.rotation || 0;
                            skewX = (c || d) ? Math.atan2(c, d) * _RAD2DEG + rotation : tm.skewX || 0;
                            if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
                                if (invX) {
                                    scaleX *= -1;
                                    skewX += (rotation <= 0) ? 180 : -180;
                                    rotation += (rotation <= 0) ? 180 : -180
                                } else {
                                    scaleY *= -1;
                                    skewX += (skewX <= 0) ? 180 : -180
                                }
                            }
                            tm.scaleX = scaleX;
                            tm.scaleY = scaleY;
                            tm.rotation = rotation;
                            tm.skewX = skewX;
                            if (_supports3D) {
                                tm.rotationX = tm.rotationY = tm.z = 0;
                                tm.perspective = defaultTransformPerspective;
                                tm.scaleZ = 1
                            }
                            if (tm.svg) {
                                tm.x -= tm.xOrigin - (tm.xOrigin * a + tm.yOrigin * c);
                                tm.y -= tm.yOrigin - (tm.xOrigin * b + tm.yOrigin * d)
                            }
                        }
                        tm.zOrigin = zOrigin;
                        for (i in tm) {
                            if (tm[i] < min)
                                if (tm[i] > -min) {
                                    tm[i] = 0
                                }
                        }
                    }
                    if (rec) {
                        t._gsTransform = tm;
                        if (tm.svg) {
                            if (_useSVGTransformAttr && t.style[_transformProp]) {
                                TweenLite.delayedCall(0.001, function() {
                                    _removeProp(t.style, _transformProp)
                                })
                            } else if (!_useSVGTransformAttr && t.getAttribute("transform")) {
                                TweenLite.delayedCall(0.001, function() {
                                    t.removeAttribute("transform")
                                })
                            }
                        }
                    }
                    return tm
                },
                _setIETransformRatio = function(v) {
                    var t = this.data,
                        ang = -t.rotation * _DEG2RAD,
                        skew = ang + t.skewX * _DEG2RAD,
                        rnd = 100000,
                        a = ((Math.cos(ang) * t.scaleX * rnd) | 0) / rnd,
                        b = ((Math.sin(ang) * t.scaleX * rnd) | 0) / rnd,
                        c = ((Math.sin(skew) * -t.scaleY * rnd) | 0) / rnd,
                        d = ((Math.cos(skew) * t.scaleY * rnd) | 0) / rnd,
                        style = this.t.style,
                        cs = this.t.currentStyle,
                        filters,
                        val;
                    if (!cs) {
                        return
                    }
                    val = b;
                    b = -c;
                    c = -val;
                    filters = cs.filter;
                    style.filter = "";
                    var w = this.t.offsetWidth,
                        h = this.t.offsetHeight,
                        clip = (cs.position !== "absolute"),
                        m = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + b + ", M21=" + c + ", M22=" + d,
                        ox = t.x + (w * t.xPercent / 100),
                        oy = t.y + (h * t.yPercent / 100),
                        dx,
                        dy;
                    if (t.ox != null) {
                        dx = ((t.oxp) ? w * t.ox * 0.01 : t.ox) - w / 2;
                        dy = ((t.oyp) ? h * t.oy * 0.01 : t.oy) - h / 2;
                        ox += dx - (dx * a + dy * b);
                        oy += dy - (dx * c + dy * d)
                    }
                    if (!clip) {
                        m += ", sizingMethod='auto expand')"
                    } else {
                        dx = (w / 2);
                        dy = (h / 2);
                        m += ", Dx=" + (dx - (dx * a + dy * b) + ox) + ", Dy=" + (dy - (dx * c + dy * d) + oy) + ")"
                    }
                    if (filters.indexOf("DXImageTransform.Microsoft.Matrix(") !== -1) {
                        style.filter = filters.replace(_ieSetMatrixExp, m)
                    } else {
                        style.filter = m + " " + filters
                    }
                    if (v === 0 || v === 1)
                        if (a === 1)
                            if (b === 0)
                                if (c === 0)
                                    if (d === 1)
                                        if (!clip || m.indexOf("Dx=0, Dy=0") !== -1)
                                            if (!_opacityExp.test(filters) || parseFloat(RegExp.$1) === 100)
                                                if (filters.indexOf("gradient(" && filters.indexOf("Alpha")) === -1) {
                                                    style.removeAttribute("filter")
                                                }
                    if (!clip) {
                        var mult = (_ieVers < 8) ? 1 : -1,
                            marg,
                            prop,
                            dif;
                        dx = t.ieOffsetX || 0;
                        dy = t.ieOffsetY || 0;
                        t.ieOffsetX = Math.round((w - ((a < 0 ? -a : a) * w + (b < 0 ? -b : b) * h)) / 2 + ox);
                        t.ieOffsetY = Math.round((h - ((d < 0 ? -d : d) * h + (c < 0 ? -c : c) * w)) / 2 + oy);
                        for (i = 0; i < 4; i++) {
                            prop = _margins[i];
                            marg = cs[prop];
                            val = (marg.indexOf("px") !== -1) ? parseFloat(marg) : _convertToPixels(this.t, prop, parseFloat(marg), marg.replace(_suffixExp, "")) || 0;
                            if (val !== t[prop]) {
                                dif = (i < 2) ? -t.ieOffsetX : -t.ieOffsetY
                            } else {
                                dif = (i < 2) ? dx - t.ieOffsetX : dy - t.ieOffsetY
                            }
                            style[prop] = (t[prop] = Math.round(val - dif * ((i === 0 || i === 2) ? 1 : mult))) + "px"
                        }
                    }
                },
                _setTransformRatio = _internals.set3DTransformRatio = _internals.setTransformRatio = function(v) {
                    var t = this.data,
                        style = this.t.style,
                        angle = t.rotation,
                        rotationX = t.rotationX,
                        rotationY = t.rotationY,
                        sx = t.scaleX,
                        sy = t.scaleY,
                        sz = t.scaleZ,
                        x = t.x,
                        y = t.y,
                        z = t.z,
                        isSVG = t.svg,
                        perspective = t.perspective,
                        force3D = t.force3D,
                        a11,
                        a12,
                        a13,
                        a21,
                        a22,
                        a23,
                        a31,
                        a32,
                        a33,
                        a41,
                        a42,
                        a43,
                        zOrigin,
                        min,
                        cos,
                        sin,
                        t1,
                        t2,
                        transform,
                        comma,
                        zero,
                        skew,
                        rnd;
                    if (((((v === 1 || v === 0) && force3D === "auto" && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime)) || !force3D) && !z && !perspective && !rotationY && !rotationX && sz === 1) || (_useSVGTransformAttr && isSVG) || !_supports3D) {
                        if (angle || t.skewX || isSVG) {
                            angle *= _DEG2RAD;
                            skew = t.skewX * _DEG2RAD;
                            rnd = 100000;
                            a11 = Math.cos(angle) * sx;
                            a21 = Math.sin(angle) * sx;
                            a12 = Math.sin(angle - skew) * -sy;
                            a22 = Math.cos(angle - skew) * sy;
                            if (skew && t.skewType === "simple") {
                                t1 = Math.tan(skew);
                                t1 = Math.sqrt(1 + t1 * t1);
                                a12 *= t1;
                                a22 *= t1;
                                if (t.skewY) {
                                    a11 *= t1;
                                    a21 *= t1
                                }
                            }
                            if (isSVG) {
                                x += t.xOrigin - (t.xOrigin * a11 + t.yOrigin * a12) + t.xOffset;
                                y += t.yOrigin - (t.xOrigin * a21 + t.yOrigin * a22) + t.yOffset;
                                if (_useSVGTransformAttr && (t.xPercent || t.yPercent)) {
                                    min = this.t.getBBox();
                                    x += t.xPercent * 0.01 * min.width;
                                    y += t.yPercent * 0.01 * min.height
                                }
                                min = 0.000001;
                                if (x < min)
                                    if (x > -min) {
                                        x = 0
                                    }
                                if (y < min)
                                    if (y > -min) {
                                        y = 0
                                    }
                            }
                            transform = (((a11 * rnd) | 0) / rnd) + "," + (((a21 * rnd) | 0) / rnd) + "," + (((a12 * rnd) | 0) / rnd) + "," + (((a22 * rnd) | 0) / rnd) + "," + x + "," + y + ")";
                            if (isSVG && _useSVGTransformAttr) {
                                this.t.setAttribute("transform", "matrix(" + transform)
                            } else {
                                style[_transformProp] = ((t.xPercent || t.yPercent) ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix(" : "matrix(") + transform
                            }
                        } else {
                            style[_transformProp] = ((t.xPercent || t.yPercent) ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix(" : "matrix(") + sx + ",0,0," + sy + "," + x + "," + y + ")"
                        }
                        return
                    }
                    if (_isFirefox) {
                        min = 0.0001;
                        if (sx < min && sx > -min) {
                            sx = sz = 0.00002
                        }
                        if (sy < min && sy > -min) {
                            sy = sz = 0.00002
                        }
                        if (perspective && !t.z && !t.rotationX && !t.rotationY) {
                            perspective = 0
                        }
                    }
                    if (angle || t.skewX) {
                        angle *= _DEG2RAD;
                        cos = a11 = Math.cos(angle);
                        sin = a21 = Math.sin(angle);
                        if (t.skewX) {
                            angle -= t.skewX * _DEG2RAD;
                            cos = Math.cos(angle);
                            sin = Math.sin(angle);
                            if (t.skewType === "simple") {
                                t1 = Math.tan(t.skewX * _DEG2RAD);
                                t1 = Math.sqrt(1 + t1 * t1);
                                cos *= t1;
                                sin *= t1;
                                if (t.skewY) {
                                    a11 *= t1;
                                    a21 *= t1
                                }
                            }
                        }
                        a12 = -sin;
                        a22 = cos
                    } else if (!rotationY && !rotationX && sz === 1 && !perspective && !isSVG) {
                        style[_transformProp] = ((t.xPercent || t.yPercent) ? "translate(" + t.xPercent + "%," + t.yPercent + "%) translate3d(" : "translate3d(") + x + "px," + y + "px," + z + "px)" + ((sx !== 1 || sy !== 1) ? " scale(" + sx + "," + sy + ")" : "");
                        return
                    } else {
                        a11 = a22 = 1;
                        a12 = a21 = 0
                    }
                    a33 = 1;
                    a13 = a23 = a31 = a32 = a41 = a42 = 0;
                    a43 = (perspective) ? -1 / perspective : 0;
                    zOrigin = t.zOrigin;
                    min = 0.000001;
                    comma = ",";
                    zero = "0";
                    angle = rotationY * _DEG2RAD;
                    if (angle) {
                        cos = Math.cos(angle);
                        sin = Math.sin(angle);
                        a31 = -sin;
                        a41 = a43 * -sin;
                        a13 = a11 * sin;
                        a23 = a21 * sin;
                        a33 = cos;
                        a43 *= cos;
                        a11 *= cos;
                        a21 *= cos
                    }
                    angle = rotationX * _DEG2RAD;
                    if (angle) {
                        cos = Math.cos(angle);
                        sin = Math.sin(angle);
                        t1 = a12 * cos + a13 * sin;
                        t2 = a22 * cos + a23 * sin;
                        a32 = a33 * sin;
                        a42 = a43 * sin;
                        a13 = a12 * -sin + a13 * cos;
                        a23 = a22 * -sin + a23 * cos;
                        a33 = a33 * cos;
                        a43 = a43 * cos;
                        a12 = t1;
                        a22 = t2
                    }
                    if (sz !== 1) {
                        a13 *= sz;
                        a23 *= sz;
                        a33 *= sz;
                        a43 *= sz
                    }
                    if (sy !== 1) {
                        a12 *= sy;
                        a22 *= sy;
                        a32 *= sy;
                        a42 *= sy
                    }
                    if (sx !== 1) {
                        a11 *= sx;
                        a21 *= sx;
                        a31 *= sx;
                        a41 *= sx
                    }
                    if (zOrigin || isSVG) {
                        if (zOrigin) {
                            x += a13 * -zOrigin;
                            y += a23 * -zOrigin;
                            z += a33 * -zOrigin + zOrigin
                        }
                        if (isSVG) {
                            x += t.xOrigin - (t.xOrigin * a11 + t.yOrigin * a12) + t.xOffset;
                            y += t.yOrigin - (t.xOrigin * a21 + t.yOrigin * a22) + t.yOffset
                        }
                        if (x < min && x > -min) {
                            x = zero
                        }
                        if (y < min && y > -min) {
                            y = zero
                        }
                        if (z < min && z > -min) {
                            z = 0
                        }
                    }
                    transform = ((t.xPercent || t.yPercent) ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix3d(" : "matrix3d(");
                    transform += ((a11 < min && a11 > -min) ? zero : a11) + comma + ((a21 < min && a21 > -min) ? zero : a21) + comma + ((a31 < min && a31 > -min) ? zero : a31);
                    transform += comma + ((a41 < min && a41 > -min) ? zero : a41) + comma + ((a12 < min && a12 > -min) ? zero : a12) + comma + ((a22 < min && a22 > -min) ? zero : a22);
                    if (rotationX || rotationY || sz !== 1) {
                        transform += comma + ((a32 < min && a32 > -min) ? zero : a32) + comma + ((a42 < min && a42 > -min) ? zero : a42) + comma + ((a13 < min && a13 > -min) ? zero : a13);
                        transform += comma + ((a23 < min && a23 > -min) ? zero : a23) + comma + ((a33 < min && a33 > -min) ? zero : a33) + comma + ((a43 < min && a43 > -min) ? zero : a43) + comma
                    } else {
                        transform += ",0,0,0,0,1,0,"
                    }
                    transform += x + comma + y + comma + z + comma + (perspective ? (1 + (-z / perspective)) : 1) + ")";
                    style[_transformProp] = transform
                };
            p = Transform.prototype;
            p.x = p.y = p.z = p.skewX = p.skewY = p.rotation = p.rotationX = p.rotationY = p.zOrigin = p.xPercent = p.yPercent = p.xOffset = p.yOffset = 0;
            p.scaleX = p.scaleY = p.scaleZ = 1;
            _registerComplexSpecialProp("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
                parser: function(t, e, p, cssp, pt, plugin, vars) {
                    if (cssp._lastParsedTransform === vars) {
                        return pt
                    }
                    cssp._lastParsedTransform = vars;
                    var originalGSTransform = t._gsTransform,
                        style = t.style,
                        min = 0.000001,
                        i = _transformProps.length,
                        v = vars,
                        endRotations = {},
                        transformOriginString = "transformOrigin",
                        m1 = _getTransform(t, _cs, !0, vars.parseTransform),
                        m2,
                        copy,
                        orig,
                        has3D,
                        hasChange,
                        dr,
                        x,
                        y,
                        matrix;
                    cssp._transform = m1;
                    if (typeof (v.transform) === "string" && _transformProp) {
                        copy = _tempDiv.style;
                        copy[_transformProp] = v.transform;
                        copy.display = "block";
                        copy.position = "absolute";
                        _doc.body.appendChild(_tempDiv);
                        m2 = _getTransform(_tempDiv, null, !1);
                        if (m1.svg) {
                            x = m1.xOrigin;
                            y = m1.yOrigin;
                            m2.x -= m1.xOffset;
                            m2.y -= m1.yOffset;
                            if (v.transformOrigin || v.svgOrigin) {
                                orig = {};
                                _parseSVGOrigin(t, _parsePosition(v.transformOrigin), orig, v.svgOrigin, v.smoothOrigin, !0);
                                x = orig.xOrigin;
                                y = orig.yOrigin;
                                m2.x -= orig.xOffset - m1.xOffset;
                                m2.y -= orig.yOffset - m1.yOffset
                            }
                            if (x || y) {
                                matrix = _getMatrix(_tempDiv, !0);
                                m2.x -= x - (x * matrix[0] + y * matrix[2]);
                                m2.y -= y - (x * matrix[1] + y * matrix[3])
                            }
                        }
                        _doc.body.removeChild(_tempDiv);
                        if (!m2.perspective) {
                            m2.perspective = m1.perspective
                        }
                        if (v.xPercent != null) {
                            m2.xPercent = _parseVal(v.xPercent, m1.xPercent)
                        }
                        if (v.yPercent != null) {
                            m2.yPercent = _parseVal(v.yPercent, m1.yPercent)
                        }
                    } else if (typeof (v) === "object") {
                        m2 = {
                            scaleX: _parseVal((v.scaleX != null) ? v.scaleX : v.scale, m1.scaleX),
                            scaleY: _parseVal((v.scaleY != null) ? v.scaleY : v.scale, m1.scaleY),
                            scaleZ: _parseVal(v.scaleZ, m1.scaleZ),
                            x: _parseVal(v.x, m1.x),
                            y: _parseVal(v.y, m1.y),
                            z: _parseVal(v.z, m1.z),
                            xPercent: _parseVal(v.xPercent, m1.xPercent),
                            yPercent: _parseVal(v.yPercent, m1.yPercent),
                            perspective: _parseVal(v.transformPerspective, m1.perspective)
                        };
                        dr = v.directionalRotation;
                        if (dr != null) {
                            if (typeof (dr) === "object") {
                                for (copy in dr) {
                                    v[copy] = dr[copy]
                                }
                            } else {
                                v.rotation = dr
                            }
                        }
                        if (typeof (v.x) === "string" && v.x.indexOf("%") !== -1) {
                            m2.x = 0;
                            m2.xPercent = _parseVal(v.x, m1.xPercent)
                        }
                        if (typeof (v.y) === "string" && v.y.indexOf("%") !== -1) {
                            m2.y = 0;
                            m2.yPercent = _parseVal(v.y, m1.yPercent)
                        }
                        m2.rotation = _parseAngle(("rotation" in v) ? v.rotation : ("shortRotation" in v) ? v.shortRotation + "_short" : ("rotationZ" in v) ? v.rotationZ : m1.rotation - m1.skewY, m1.rotation - m1.skewY, "rotation", endRotations);
                        if (_supports3D) {
                            m2.rotationX = _parseAngle(("rotationX" in v) ? v.rotationX : ("shortRotationX" in v) ? v.shortRotationX + "_short" : m1.rotationX || 0, m1.rotationX, "rotationX", endRotations);
                            m2.rotationY = _parseAngle(("rotationY" in v) ? v.rotationY : ("shortRotationY" in v) ? v.shortRotationY + "_short" : m1.rotationY || 0, m1.rotationY, "rotationY", endRotations)
                        }
                        m2.skewX = _parseAngle(v.skewX, m1.skewX - m1.skewY);
                        if ((m2.skewY = _parseAngle(v.skewY, m1.skewY))) {
                            m2.skewX += m2.skewY;
                            m2.rotation += m2.skewY
                        }
                    }
                    if (_supports3D && v.force3D != null) {
                        m1.force3D = v.force3D;
                        hasChange = !0
                    }
                    m1.skewType = v.skewType || m1.skewType || CSSPlugin.defaultSkewType;
                    has3D = (m1.force3D || m1.z || m1.rotationX || m1.rotationY || m2.z || m2.rotationX || m2.rotationY || m2.perspective);
                    if (!has3D && v.scale != null) {
                        m2.scaleZ = 1
                    }
                    while (--i > -1) {
                        p = _transformProps[i];
                        orig = m2[p] - m1[p];
                        if (orig > min || orig < -min || v[p] != null || _forcePT[p] != null) {
                            hasChange = !0;
                            pt = new CSSPropTween(m1, p, m1[p], orig, pt);
                            if (p in endRotations) {
                                pt.e = endRotations[p]
                            }
                            pt.xs0 = 0;
                            pt.plugin = plugin;
                            cssp._overwriteProps.push(pt.n)
                        }
                    }
                    orig = v.transformOrigin;
                    if (m1.svg && (orig || v.svgOrigin)) {
                        x = m1.xOffset;
                        y = m1.yOffset;
                        _parseSVGOrigin(t, _parsePosition(orig), m2, v.svgOrigin, v.smoothOrigin);
                        pt = _addNonTweeningNumericPT(m1, "xOrigin", (originalGSTransform ? m1 : m2).xOrigin, m2.xOrigin, pt, transformOriginString);
                        pt = _addNonTweeningNumericPT(m1, "yOrigin", (originalGSTransform ? m1 : m2).yOrigin, m2.yOrigin, pt, transformOriginString);
                        if (x !== m1.xOffset || y !== m1.yOffset) {
                            pt = _addNonTweeningNumericPT(m1, "xOffset", (originalGSTransform ? x : m1.xOffset), m1.xOffset, pt, transformOriginString);
                            pt = _addNonTweeningNumericPT(m1, "yOffset", (originalGSTransform ? y : m1.yOffset), m1.yOffset, pt, transformOriginString)
                        }
                        orig = _useSVGTransformAttr ? null : "0px 0px"
                    }
                    if (orig || (_supports3D && has3D && m1.zOrigin)) {
                        if (_transformProp) {
                            hasChange = !0;
                            p = _transformOriginProp;
                            orig = (orig || _getStyle(t, p, _cs, !1, "50% 50%")) + "";
                            pt = new CSSPropTween(style, p, 0, 0, pt, -1, transformOriginString);
                            pt.b = style[p];
                            pt.plugin = plugin;
                            if (_supports3D) {
                                copy = m1.zOrigin;
                                orig = orig.split(" ");
                                m1.zOrigin = ((orig.length > 2 && !(copy !== 0 && orig[2] === "0px")) ? parseFloat(orig[2]) : copy) || 0;
                                pt.xs0 = pt.e = orig[0] + " " + (orig[1] || "50%") + " 0px";
                                pt = new CSSPropTween(m1, "zOrigin", 0, 0, pt, -1, pt.n);
                                pt.b = copy;
                                pt.xs0 = pt.e = m1.zOrigin
                            } else {
                                pt.xs0 = pt.e = orig
                            }
                        } else {
                            _parsePosition(orig + "", m1)
                        }
                    }
                    if (hasChange) {
                        cssp._transformType = (!(m1.svg && _useSVGTransformAttr) && (has3D || this._transformType === 3)) ? 3 : 2
                    }
                    return pt
                },
                prefix: !0
            });
            _registerComplexSpecialProp("boxShadow", {
                defaultValue: "0px 0px 0px 0px #999",
                prefix: !0,
                color: !0,
                multi: !0,
                keyword: "inset"
            });
            _registerComplexSpecialProp("borderRadius", {
                defaultValue: "0px",
                parser: function(t, e, p, cssp, pt, plugin) {
                    e = this.format(e);
                    var props = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                        style = t.style,
                        ea1,
                        i,
                        es2,
                        bs2,
                        bs,
                        es,
                        bn,
                        en,
                        w,
                        h,
                        esfx,
                        bsfx,
                        rel,
                        hn,
                        vn,
                        em;
                    w = parseFloat(t.offsetWidth);
                    h = parseFloat(t.offsetHeight);
                    ea1 = e.split(" ");
                    for (i = 0; i < props.length; i++) {
                        if (this.p.indexOf("border")) {
                            props[i] = _checkPropPrefix(props[i])
                        }
                        bs = bs2 = _getStyle(t, props[i], _cs, !1, "0px");
                        if (bs.indexOf(" ") !== -1) {
                            bs2 = bs.split(" ");
                            bs = bs2[0];
                            bs2 = bs2[1]
                        }
                        es = es2 = ea1[i];
                        bn = parseFloat(bs);
                        bsfx = bs.substr((bn + "").length);
                        rel = (es.charAt(1) === "=");
                        if (rel) {
                            en = parseInt(es.charAt(0) + "1", 10);
                            es = es.substr(2);
                            en *= parseFloat(es);
                            esfx = es.substr((en + "").length - (en < 0 ? 1 : 0)) || ""
                        } else {
                            en = parseFloat(es);
                            esfx = es.substr((en + "").length)
                        }
                        if (esfx === "") {
                            esfx = _suffixMap[p] || bsfx
                        }
                        if (esfx !== bsfx) {
                            hn = _convertToPixels(t, "borderLeft", bn, bsfx);
                            vn = _convertToPixels(t, "borderTop", bn, bsfx);
                            if (esfx === "%") {
                                bs = (hn / w * 100) + "%";
                                bs2 = (vn / h * 100) + "%"
                            } else if (esfx === "em") {
                                em = _convertToPixels(t, "borderLeft", 1, "em");
                                bs = (hn / em) + "em";
                                bs2 = (vn / em) + "em"
                            } else {
                                bs = hn + "px";
                                bs2 = vn + "px"
                            }
                            if (rel) {
                                es = (parseFloat(bs) + en) + esfx;
                                es2 = (parseFloat(bs2) + en) + esfx
                            }
                        }
                        pt = _parseComplex(style, props[i], bs + " " + bs2, es + " " + es2, !1, "0px", pt)
                    }
                    return pt
                },
                prefix: !0,
                formatter: _getFormatter("0px 0px 0px 0px", !1, !0)
            });
            _registerComplexSpecialProp("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
                defaultValue: "0px",
                parser: function(t, e, p, cssp, pt, plugin) {
                    return _parseComplex(t.style, p, this.format(_getStyle(t, p, _cs, !1, "0px 0px")), this.format(e), !1, "0px", pt)
                },
                prefix: !0,
                formatter: _getFormatter("0px 0px", !1, !0)
            });
            _registerComplexSpecialProp("backgroundPosition", {
                defaultValue: "0 0",
                parser: function(t, e, p, cssp, pt, plugin) {
                    var bp = "background-position",
                        cs = (_cs || _getComputedStyle(t, null)),
                        bs = this.format(((cs) ? _ieVers ? cs.getPropertyValue(bp + "-x") + " " + cs.getPropertyValue(bp + "-y") : cs.getPropertyValue(bp) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
                        es = this.format(e),
                        ba,
                        ea,
                        i,
                        pct,
                        overlap,
                        src;
                    if ((bs.indexOf("%") !== -1) !== (es.indexOf("%") !== -1) && es.split(",").length < 2) {
                        src = _getStyle(t, "backgroundImage").replace(_urlExp, "");
                        if (src && src !== "none") {
                            ba = bs.split(" ");
                            ea = es.split(" ");
                            _tempImg.setAttribute("src", src);
                            i = 2;
                            while (--i > -1) {
                                bs = ba[i];
                                pct = (bs.indexOf("%") !== -1);
                                if (pct !== (ea[i].indexOf("%") !== -1)) {
                                    overlap = (i === 0) ? t.offsetWidth - _tempImg.width : t.offsetHeight - _tempImg.height;
                                    ba[i] = pct ? (parseFloat(bs) / 100 * overlap) + "px" : (parseFloat(bs) / overlap * 100) + "%"
                                }
                            }
                            bs = ba.join(" ")
                        }
                    }
                    return this.parseComplex(t.style, bs, es, pt, plugin)
                },
                formatter: _parsePosition
            });
            _registerComplexSpecialProp("backgroundSize", {
                defaultValue: "0 0",
                formatter: _parsePosition
            });
            _registerComplexSpecialProp("perspective", {
                defaultValue: "0px",
                prefix: !0
            });
            _registerComplexSpecialProp("perspectiveOrigin", {
                defaultValue: "50% 50%",
                prefix: !0
            });
            _registerComplexSpecialProp("transformStyle", {
                prefix: !0
            });
            _registerComplexSpecialProp("backfaceVisibility", {
                prefix: !0
            });
            _registerComplexSpecialProp("userSelect", {
                prefix: !0
            });
            _registerComplexSpecialProp("margin", {
                parser: _getEdgeParser("marginTop,marginRight,marginBottom,marginLeft")
            });
            _registerComplexSpecialProp("padding", {
                parser: _getEdgeParser("paddingTop,paddingRight,paddingBottom,paddingLeft")
            });
            _registerComplexSpecialProp("clip", {
                defaultValue: "rect(0px,0px,0px,0px)",
                parser: function(t, e, p, cssp, pt, plugin) {
                    var b,
                        cs,
                        delim;
                    if (_ieVers < 9) {
                        cs = t.currentStyle;
                        delim = _ieVers < 8 ? " " : ",";
                        b = "rect(" + cs.clipTop + delim + cs.clipRight + delim + cs.clipBottom + delim + cs.clipLeft + ")";
                        e = this.format(e).split(",").join(delim)
                    } else {
                        b = this.format(_getStyle(t, this.p, _cs, !1, this.dflt));
                        e = this.format(e)
                    }
                    return this.parseComplex(t.style, b, e, pt, plugin)
                }
            });
            _registerComplexSpecialProp("textShadow", {
                defaultValue: "0px 0px 0px #999",
                color: !0,
                multi: !0
            });
            _registerComplexSpecialProp("autoRound,strictUnits", {
                parser: function(t, e, p, cssp, pt) {
                    return pt
                }
            });
            _registerComplexSpecialProp("border", {
                defaultValue: "0px solid #000",
                parser: function(t, e, p, cssp, pt, plugin) {
                    var bw = _getStyle(t, "borderTopWidth", _cs, !1, "0px"),
                        end = this.format(e).split(" "),
                        esfx = end[0].replace(_suffixExp, "");
                    if (esfx !== "px") {
                        bw = (parseFloat(bw) / _convertToPixels(t, "borderTopWidth", 1, esfx)) + esfx
                    }
                    return this.parseComplex(t.style, this.format(bw + " " + _getStyle(t, "borderTopStyle", _cs, !1, "solid") + " " + _getStyle(t, "borderTopColor", _cs, !1, "#000")), end.join(" "), pt, plugin)
                },
                color: !0,
                formatter: function(v) {
                    var a = v.split(" ");
                    return a[0] + " " + (a[1] || "solid") + " " + (v.match(_colorExp) || ["#000"])[0]
                }
            });
            _registerComplexSpecialProp("borderWidth", {
                parser: _getEdgeParser("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
            });
            _registerComplexSpecialProp("float,cssFloat,styleFloat", {
                parser: function(t, e, p, cssp, pt, plugin) {
                    var s = t.style,
                        prop = ("cssFloat" in s) ? "cssFloat" : "styleFloat";
                    return new CSSPropTween(s, prop, 0, 0, pt, -1, p, !1, 0, s[prop], e)
                }
            });
            var _setIEOpacityRatio = function(v) {
                var t = this.t,
                    filters = t.filter || _getStyle(this.data, "filter") || "",
                    val = (this.s + this.c * v) | 0,
                    skip;
                if (val === 100) {
                    if (filters.indexOf("atrix(") === -1 && filters.indexOf("radient(") === -1 && filters.indexOf("oader(") === -1) {
                        t.removeAttribute("filter");
                        skip = (!_getStyle(this.data, "filter"))
                    } else {
                        t.filter = filters.replace(_alphaFilterExp, "");
                        skip = !0
                    }
                }
                if (!skip) {
                    if (this.xn1) {
                        t.filter = filters = filters || ("alpha(opacity=" + val + ")")
                    }
                    if (filters.indexOf("pacity") === -1) {
                        if (val !== 0 || !this.xn1) {
                            t.filter = filters + " alpha(opacity=" + val + ")"
                        }
                    } else {
                        t.filter = filters.replace(_opacityExp, "opacity=" + val)
                    }
                }
            };
            _registerComplexSpecialProp("opacity,alpha,autoAlpha", {
                defaultValue: "1",
                parser: function(t, e, p, cssp, pt, plugin) {
                    var b = parseFloat(_getStyle(t, "opacity", _cs, !1, "1")),
                        style = t.style,
                        isAutoAlpha = (p === "autoAlpha");
                    if (typeof (e) === "string" && e.charAt(1) === "=") {
                        e = ((e.charAt(0) === "-") ? -1 : 1) * parseFloat(e.substr(2)) + b
                    }
                    if (isAutoAlpha && b === 1 && _getStyle(t, "visibility", _cs) === "hidden" && e !== 0) {
                        b = 0
                    }
                    if (_supportsOpacity) {
                        pt = new CSSPropTween(style, "opacity", b, e - b, pt)
                    } else {
                        pt = new CSSPropTween(style, "opacity", b * 100, (e - b) * 100, pt);
                        pt.xn1 = isAutoAlpha ? 1 : 0;
                        style.zoom = 1;
                        pt.type = 2;
                        pt.b = "alpha(opacity=" + pt.s + ")";
                        pt.e = "alpha(opacity=" + (pt.s + pt.c) + ")";
                        pt.data = t;
                        pt.plugin = plugin;
                        pt.setRatio = _setIEOpacityRatio
                    }
                    if (isAutoAlpha) {
                        pt = new CSSPropTween(style, "visibility", 0, 0, pt, -1, null, !1, 0, ((b !== 0) ? "inherit" : "hidden"), ((e === 0) ? "hidden" : "inherit"));
                        pt.xs0 = "inherit";
                        cssp._overwriteProps.push(pt.n);
                        cssp._overwriteProps.push(p)
                    }
                    return pt
                }
            });
            var _removeProp = function(s, p) {
                    if (p) {
                        if (s.removeProperty) {
                            if (p.substr(0, 2) === "ms" || p.substr(0, 6) === "webkit") {
                                p = "-" + p
                            }
                            s.removeProperty(p.replace(_capsExp, "-$1").toLowerCase())
                        } else {
                            s.removeAttribute(p)
                        }
                    }
                },
                _setClassNameRatio = function(v) {
                    this.t._gsClassPT = this;
                    if (v === 1 || v === 0) {
                        this.t.setAttribute("class", (v === 0) ? this.b : this.e);
                        var mpt = this.data,
                            s = this.t.style;
                        while (mpt) {
                            if (!mpt.v) {
                                _removeProp(s, mpt.p)
                            } else {
                                s[mpt.p] = mpt.v
                            }
                            mpt = mpt._next
                        }
                        if (v === 1 && this.t._gsClassPT === this) {
                            this.t._gsClassPT = null
                        }
                    } else if (this.t.getAttribute("class") !== this.e) {
                        this.t.setAttribute("class", this.e)
                    }
                };
            _registerComplexSpecialProp("className", {
                parser: function(t, e, p, cssp, pt, plugin, vars) {
                    var b = t.getAttribute("class") || "",
                        cssText = t.style.cssText,
                        difData,
                        bs,
                        cnpt,
                        cnptLookup,
                        mpt;
                    pt = cssp._classNamePT = new CSSPropTween(t, p, 0, 0, pt, 2);
                    pt.setRatio = _setClassNameRatio;
                    pt.pr = -11;
                    _hasPriority = !0;
                    pt.b = b;
                    bs = _getAllStyles(t, _cs);
                    cnpt = t._gsClassPT;
                    if (cnpt) {
                        cnptLookup = {};
                        mpt = cnpt.data;
                        while (mpt) {
                            cnptLookup[mpt.p] = 1;
                            mpt = mpt._next
                        }
                        cnpt.setRatio(1)
                    }
                    t._gsClassPT = pt;
                    pt.e = (e.charAt(1) !== "=") ? e : b.replace(new RegExp("(?:\\s|^)" + e.substr(2) + "(?![\\w-])"), "") + ((e.charAt(0) === "+") ? " " + e.substr(2) : "");
                    t.setAttribute("class", pt.e);
                    difData = _cssDif(t, bs, _getAllStyles(t), vars, cnptLookup);
                    t.setAttribute("class", b);
                    pt.data = difData.firstMPT;
                    t.style.cssText = cssText;
                    pt = pt.xfirst = cssp.parse(t, difData.difs, pt, plugin);
                    return pt
                }
            });
            var _setClearPropsRatio = function(v) {
                if (v === 1 || v === 0)
                    if (this.data._totalTime === this.data._totalDuration && this.data.data !== "isFromStart") {
                        var s = this.t.style,
                            transformParse = _specialProps.transform.parse,
                            a,
                            p,
                            i,
                            clearTransform,
                            transform;
                        if (this.e === "all") {
                            s.cssText = "";
                            clearTransform = !0
                        } else {
                            a = this.e.split(" ").join("").split(",");
                            i = a.length;
                            while (--i > -1) {
                                p = a[i];
                                if (_specialProps[p]) {
                                    if (_specialProps[p].parse === transformParse) {
                                        clearTransform = !0
                                    } else {
                                        p = (p === "transformOrigin") ? _transformOriginProp : _specialProps[p].p
                                    }
                                }
                                _removeProp(s, p)
                            }
                        }
                        if (clearTransform) {
                            _removeProp(s, _transformProp);
                            transform = this.t._gsTransform;
                            if (transform) {
                                if (transform.svg) {
                                    this.t.removeAttribute("data-svg-origin");
                                    this.t.removeAttribute("transform")
                                }
                                delete this.t._gsTransform
                            }
                        }
                    }
            };
            _registerComplexSpecialProp("clearProps", {
                parser: function(t, e, p, cssp, pt) {
                    pt = new CSSPropTween(t, p, 0, 0, pt, 2);
                    pt.setRatio = _setClearPropsRatio;
                    pt.e = e;
                    pt.pr = -10;
                    pt.data = cssp._tween;
                    _hasPriority = !0;
                    return pt
                }
            });
            p = "bezier,throwProps,physicsProps,physics2D".split(",");
            i = p.length;
            while (i--) {
                _registerPluginProp(p[i])
            }
            p = CSSPlugin.prototype;
            p._firstPT = p._lastParsedTransform = p._transform = null;
            p._onInitTween = function(target, vars, tween) {
                if (!target.nodeType) {
                    return !1
                }
                this._target = target;
                this._tween = tween;
                this._vars = vars;
                _autoRound = vars.autoRound;
                _hasPriority = !1;
                _suffixMap = vars.suffixMap || CSSPlugin.suffixMap;
                _cs = _getComputedStyle(target, "");
                _overwriteProps = this._overwriteProps;
                var style = target.style,
                    v,
                    pt,
                    pt2,
                    first,
                    last,
                    next,
                    zIndex,
                    tpt,
                    threeD;
                if (_reqSafariFix)
                    if (style.zIndex === "") {
                        v = _getStyle(target, "zIndex", _cs);
                        if (v === "auto" || v === "") {
                            this._addLazySet(style, "zIndex", 0)
                        }
                    }
                if (typeof (vars) === "string") {
                    first = style.cssText;
                    v = _getAllStyles(target, _cs);
                    style.cssText = first + ";" + vars;
                    v = _cssDif(target, v, _getAllStyles(target)).difs;
                    if (!_supportsOpacity && _opacityValExp.test(vars)) {
                        v.opacity = parseFloat(RegExp.$1)
                    }
                    vars = v;
                    style.cssText = first
                }
                if (vars.className) {
                    this._firstPT = pt = _specialProps.className.parse(target, vars.className, "className", this, null, null, vars)
                } else {
                    this._firstPT = pt = this.parse(target, vars, null)
                }
                if (this._transformType) {
                    threeD = (this._transformType === 3);
                    if (!_transformProp) {
                        style.zoom = 1
                    } else if (_isSafari) {
                        _reqSafariFix = !0;
                        if (style.zIndex === "") {
                            zIndex = _getStyle(target, "zIndex", _cs);
                            if (zIndex === "auto" || zIndex === "") {
                                this._addLazySet(style, "zIndex", 0)
                            }
                        }
                        if (_isSafariLT6) {
                            this._addLazySet(style, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (threeD ? "visible" : "hidden"))
                        }
                    }
                    pt2 = pt;
                    while (pt2 && pt2._next) {
                        pt2 = pt2._next
                    }
                    tpt = new CSSPropTween(target, "transform", 0, 0, null, 2);
                    this._linkCSSP(tpt, null, pt2);
                    tpt.setRatio = _transformProp ? _setTransformRatio : _setIETransformRatio;
                    tpt.data = this._transform || _getTransform(target, _cs, !0);
                    tpt.tween = tween;
                    tpt.pr = -1;
                    _overwriteProps.pop()
                }
                if (_hasPriority) {
                    while (pt) {
                        next = pt._next;
                        pt2 = first;
                        while (pt2 && pt2.pr > pt.pr) {
                            pt2 = pt2._next
                        }
                        if ((pt._prev = pt2 ? pt2._prev : last)) {
                            pt._prev._next = pt
                        } else {
                            first = pt
                        }
                        if ((pt._next = pt2)) {
                            pt2._prev = pt
                        } else {
                            last = pt
                        }
                        pt = next
                    }
                    this._firstPT = first
                }
                return !0
            };
            p.parse = function(target, vars, pt, plugin) {
                var style = target.style,
                    p,
                    sp,
                    bn,
                    en,
                    bs,
                    es,
                    bsfx,
                    esfx,
                    isStr,
                    rel;
                for (p in vars) {
                    es = vars[p];
                    sp = _specialProps[p];
                    if (sp) {
                        pt = sp.parse(target, es, p, this, pt, plugin, vars)
                    } else {
                        bs = _getStyle(target, p, _cs) + "";
                        isStr = (typeof (es) === "string");
                        if (p === "color" || p === "fill" || p === "stroke" || p.indexOf("Color") !== -1 || (isStr && _rgbhslExp.test(es))) {
                            if (!isStr) {
                                es = _parseColor(es);
                                es = ((es.length > 3) ? "rgba(" : "rgb(") + es.join(",") + ")"
                            }
                            pt = _parseComplex(style, p, bs, es, !0, "transparent", pt, 0, plugin)
                        } else if (isStr && _complexExp.test(es)) {
                            pt = _parseComplex(style, p, bs, es, !0, null, pt, 0, plugin)
                        } else {
                            bn = parseFloat(bs);
                            bsfx = (bn || bn === 0) ? bs.substr((bn + "").length) : "";
                            if (bs === "" || bs === "auto") {
                                if (p === "width" || p === "height") {
                                    bn = _getDimension(target, p, _cs);
                                    bsfx = "px"
                                } else if (p === "left" || p === "top") {
                                    bn = _calculateOffset(target, p, _cs);
                                    bsfx = "px"
                                } else {
                                    bn = (p !== "opacity") ? 0 : 1;
                                    bsfx = ""
                                }
                            }
                            rel = (isStr && es.charAt(1) === "=");
                            if (rel) {
                                en = parseInt(es.charAt(0) + "1", 10);
                                es = es.substr(2);
                                en *= parseFloat(es);
                                esfx = es.replace(_suffixExp, "")
                            } else {
                                en = parseFloat(es);
                                esfx = isStr ? es.replace(_suffixExp, "") : ""
                            }
                            if (esfx === "") {
                                esfx = (p in _suffixMap) ? _suffixMap[p] : bsfx
                            }
                            es = (en || en === 0) ? (rel ? en + bn : en) + esfx : vars[p];
                            if (bsfx !== esfx)
                                if (esfx !== "")
                                    if (en || en === 0)
                                        if (bn) {
                                            bn = _convertToPixels(target, p, bn, bsfx);
                                            if (esfx === "%") {
                                                bn /= _convertToPixels(target, p, 100, "%") / 100;
                                                if (vars.strictUnits !== !0) {
                                                    bs = bn + "%"
                                                }
                                            } else if (esfx === "em" || esfx === "rem" || esfx === "vw" || esfx === "vh") {
                                                bn /= _convertToPixels(target, p, 1, esfx)
                                            } else if (esfx !== "px") {
                                                en = _convertToPixels(target, p, en, esfx);
                                                esfx = "px"
                                            }
                                            if (rel)
                                                if (en || en === 0) {
                                                    es = (en + bn) + esfx
                                                }
                                        }
                            if (rel) {
                                en += bn
                            }
                            if ((bn || bn === 0) && (en || en === 0)) {
                                pt = new CSSPropTween(style, p, bn, en - bn, pt, 0, p, (_autoRound !== !1 && (esfx === "px" || p === "zIndex")), 0, bs, es);
                                pt.xs0 = esfx
                            } else if (style[p] === undefined || !es && (es + "" === "NaN" || es == null)) {
                                _log("invalid " + p + " tween value: " + vars[p])
                            } else {
                                pt = new CSSPropTween(style, p, en || bn || 0, 0, pt, -1, p, !1, 0, bs, es);
                                pt.xs0 = (es === "none" && (p === "display" || p.indexOf("Style") !== -1)) ? bs : es
                            }
                        }
                    }
                    if (plugin)
                        if (pt && !pt.plugin) {
                            pt.plugin = plugin
                        }
                }
                return pt
            };
            p.setRatio = function(v) {
                var pt = this._firstPT,
                    min = 0.000001,
                    val,
                    str,
                    i;
                if (v === 1 && (this._tween._time === this._tween._duration || this._tween._time === 0)) {
                    while (pt) {
                        if (pt.type !== 2) {
                            if (pt.r && pt.type !== -1) {
                                val = Math.round(pt.s + pt.c);
                                if (!pt.type) {
                                    pt.t[pt.p] = val + pt.xs0
                                } else if (pt.type === 1) {
                                    i = pt.l;
                                    str = pt.xs0 + val + pt.xs1;
                                    for (i = 1; i < pt.l; i++) {
                                        str += pt["xn" + i] + pt["xs" + (i + 1)]
                                    }
                                    pt.t[pt.p] = str
                                }
                            } else {
                                pt.t[pt.p] = pt.e
                            }
                        } else {
                            pt.setRatio(v)
                        }
                        pt = pt._next
                    }
                } else if (v || !(this._tween._time === this._tween._duration || this._tween._time === 0) || this._tween._rawPrevTime === -0.000001) {
                    while (pt) {
                        val = pt.c * v + pt.s;
                        if (pt.r) {
                            val = Math.round(val)
                        } else if (val < min)
                            if (val > -min) {
                                val = 0
                            }
                        if (!pt.type) {
                            pt.t[pt.p] = val + pt.xs0
                        } else if (pt.type === 1) {
                            i = pt.l;
                            if (i === 2) {
                                pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2
                            } else if (i === 3) {
                                pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3
                            } else if (i === 4) {
                                pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4
                            } else if (i === 5) {
                                pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4 + pt.xn4 + pt.xs5
                            } else {
                                str = pt.xs0 + val + pt.xs1;
                                for (i = 1; i < pt.l; i++) {
                                    str += pt["xn" + i] + pt["xs" + (i + 1)]
                                }
                                pt.t[pt.p] = str
                            }
                        } else if (pt.type === -1) {
                            pt.t[pt.p] = pt.xs0
                        } else if (pt.setRatio) {
                            pt.setRatio(v)
                        }
                        pt = pt._next
                    }
                } else {
                    while (pt) {
                        if (pt.type !== 2) {
                            pt.t[pt.p] = pt.b
                        } else {
                            pt.setRatio(v)
                        }
                        pt = pt._next
                    }
                }
            };
            p._enableTransforms = function(threeD) {
                this._transform = this._transform || _getTransform(this._target, _cs, !0);
                this._transformType = (!(this._transform.svg && _useSVGTransformAttr) && (threeD || this._transformType === 3)) ? 3 : 2
            };
            var lazySet = function(v) {
                this.t[this.p] = this.e;
                this.data._linkCSSP(this, this._next, null, !0)
            };
            p._addLazySet = function(t, p, v) {
                var pt = this._firstPT = new CSSPropTween(t, p, 0, 0, this._firstPT, 2);
                pt.e = v;
                pt.setRatio = lazySet;
                pt.data = this
            };
            p._linkCSSP = function(pt, next, prev, remove) {
                if (pt) {
                    if (next) {
                        next._prev = pt
                    }
                    if (pt._next) {
                        pt._next._prev = pt._prev
                    }
                    if (pt._prev) {
                        pt._prev._next = pt._next
                    } else if (this._firstPT === pt) {
                        this._firstPT = pt._next;
                        remove = !0
                    }
                    if (prev) {
                        prev._next = pt
                    } else if (!remove && this._firstPT === null) {
                        this._firstPT = pt
                    }
                    pt._next = next;
                    pt._prev = prev
                }
                return pt
            };
            p._kill = function(lookup) {
                var copy = lookup,
                    pt,
                    p,
                    xfirst;
                if (lookup.autoAlpha || lookup.alpha) {
                    copy = {};
                    for (p in lookup) {
                        copy[p] = lookup[p]
                    }
                    copy.opacity = 1;
                    if (copy.autoAlpha) {
                        copy.visibility = 1
                    }
                }
                if (lookup.className && (pt = this._classNamePT)) {
                    xfirst = pt.xfirst;
                    if (xfirst && xfirst._prev) {
                        this._linkCSSP(xfirst._prev, pt._next, xfirst._prev._prev)
                    } else if (xfirst === this._firstPT) {
                        this._firstPT = pt._next
                    }
                    if (pt._next) {
                        this._linkCSSP(pt._next, pt._next._next, xfirst._prev)
                    }
                    this._classNamePT = null
                }
                return TweenPlugin.prototype._kill.call(this, copy)
            };
            var _getChildStyles = function(e, props, targets) {
                var children,
                    i,
                    child,
                    type;
                if (e.slice) {
                    i = e.length;
                    while (--i > -1) {
                        _getChildStyles(e[i], props, targets)
                    }
                    return
                }
                children = e.childNodes;
                i = children.length;
                while (--i > -1) {
                    child = children[i];
                    type = child.type;
                    if (child.style) {
                        props.push(_getAllStyles(child));
                        if (targets) {
                            targets.push(child)
                        }
                    }
                    if ((type === 1 || type === 9 || type === 11) && child.childNodes.length) {
                        _getChildStyles(child, props, targets)
                    }
                }
            };
            CSSPlugin.cascadeTo = function(target, duration, vars) {
                var tween = TweenLite.to(target, duration, vars),
                    results = [tween],
                    b = [],
                    e = [],
                    targets = [],
                    _reservedProps = TweenLite._internals.reservedProps,
                    i,
                    difs,
                    p,
                    from;
                target = tween._targets || tween.target;
                _getChildStyles(target, b, targets);
                tween.render(duration, !0, !0);
                _getChildStyles(target, e);
                tween.render(0, !0, !0);
                tween._enabled(!0);
                i = targets.length;
                while (--i > -1) {
                    difs = _cssDif(targets[i], b[i], e[i]);
                    if (difs.firstMPT) {
                        difs = difs.difs;
                        for (p in vars) {
                            if (_reservedProps[p]) {
                                difs[p] = vars[p]
                            }
                        }
                        from = {};
                        for (p in difs) {
                            from[p] = b[i][p]
                        }
                        results.push(TweenLite.fromTo(targets[i], duration, from, difs))
                    }
                }
                return results
            };
            TweenPlugin.activate([CSSPlugin]);
            return CSSPlugin
        }, !0);
        (function() {
            var RoundPropsPlugin = _gsScope._gsDefine.plugin({
                    propName: "roundProps",
                    version: "1.5",
                    priority: -1,
                    API: 2,
                    init: function(target, value, tween) {
                        this._tween = tween;
                        return !0
                    }
                }),
                _roundLinkedList = function(node) {
                    while (node) {
                        if (!node.f && !node.blob) {
                            node.r = 1
                        }
                        node = node._next
                    }
                },
                p = RoundPropsPlugin.prototype;
            p._onInitAllProps = function() {
                var tween = this._tween,
                    rp = (tween.vars.roundProps.join) ? tween.vars.roundProps : tween.vars.roundProps.split(","),
                    i = rp.length,
                    lookup = {},
                    rpt = tween._propLookup.roundProps,
                    prop,
                    pt,
                    next;
                while (--i > -1) {
                    lookup[rp[i]] = 1
                }
                i = rp.length;
                while (--i > -1) {
                    prop = rp[i];
                    pt = tween._firstPT;
                    while (pt) {
                        next = pt._next;
                        if (pt.pg) {
                            pt.t._roundProps(lookup, !0)
                        } else if (pt.n === prop) {
                            if (pt.f === 2 && pt.t) {
                                _roundLinkedList(pt.t._firstPT)
                            } else {
                                this._add(pt.t, prop, pt.s, pt.c);
                                if (next) {
                                    next._prev = pt._prev
                                }
                                if (pt._prev) {
                                    pt._prev._next = next
                                } else if (tween._firstPT === pt) {
                                    tween._firstPT = next
                                }
                                pt._next = pt._prev = null;
                                tween._propLookup[prop] = rpt
                            }
                        }
                        pt = next
                    }
                }
                return !1
            };
            p._add = function(target, p, s, c) {
                this._addTween(target, p, s, s + c, p, !0);
                this._overwriteProps.push(p)
            }
        }());
        (function() {
            _gsScope._gsDefine.plugin({
                propName: "attr",
                API: 2,
                version: "0.5.0",
                init: function(target, value, tween) {
                    var p;
                    if (typeof (target.setAttribute) !== "function") {
                        return !1
                    }
                    for (p in value) {
                        this._addTween(target, "setAttribute", target.getAttribute(p) + "", value[p] + "", p, !1, p);
                        this._overwriteProps.push(p)
                    }
                    return !0
                }
            })
        }());
        _gsScope._gsDefine.plugin({
            propName: "directionalRotation",
            version: "0.2.1",
            API: 2,
            init: function(target, value, tween) {
                if (typeof (value) !== "object") {
                    value = {
                        rotation: value
                    }
                }
                this.finals = {};
                var cap = (value.useRadians === !0) ? Math.PI * 2 : 360,
                    min = 0.000001,
                    p,
                    v,
                    start,
                    end,
                    dif,
                    split;
                for (p in value) {
                    if (p !== "useRadians") {
                        split = (value[p] + "").split("_");
                        v = split[0];
                        start = parseFloat((typeof (target[p]) !== "function") ? target[p] : target[((p.indexOf("set") || typeof (target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3))]());
                        end = this.finals[p] = (typeof (v) === "string" && v.charAt(1) === "=") ? start + parseInt(v.charAt(0) + "1", 10) * Number(v.substr(2)) : Number(v) || 0;
                        dif = end - start;
                        if (split.length) {
                            v = split.join("_");
                            if (v.indexOf("short") !== -1) {
                                dif = dif % cap;
                                if (dif !== dif % (cap / 2)) {
                                    dif = (dif < 0) ? dif + cap : dif - cap
                                }
                            }
                            if (v.indexOf("_cw") !== -1 && dif < 0) {
                                dif = ((dif + cap * 9999999999) % cap) - ((dif / cap) | 0) * cap
                            } else if (v.indexOf("ccw") !== -1 && dif > 0) {
                                dif = ((dif - cap * 9999999999) % cap) - ((dif / cap) | 0) * cap
                            }
                        }
                        if (dif > min || dif < -min) {
                            this._addTween(target, p, start, start + dif, p);
                            this._overwriteProps.push(p)
                        }
                    }
                }
                return !0
            },
            set: function(ratio) {
                var pt;
                if (ratio !== 1) {
                    this._super.setRatio.call(this, ratio)
                } else {
                    pt = this._firstPT;
                    while (pt) {
                        if (pt.f) {
                            pt.t[pt.p](this.finals[pt.p])
                        } else {
                            pt.t[pt.p] = this.finals[pt.p]
                        }
                        pt = pt._next
                    }
                }
            }
        })._autoCSS = !0;
        _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(Ease) {
            var w = (_gsScope.GreenSockGlobals || _gsScope),
                gs = w.com.greensock,
                _2PI = Math.PI * 2,
                _HALF_PI = Math.PI / 2,
                _class = gs._class,
                _create = function(n, f) {
                    var C = _class("easing." + n, function() {}, !0),
                        p = C.prototype = new Ease();
                    p.constructor = C;
                    p.getRatio = f;
                    return C
                },
                _easeReg = Ease.register || function() {},
                _wrap = function(name, EaseOut, EaseIn, EaseInOut, aliases) {
                    var C = _class("easing." + name, {
                        easeOut: new EaseOut(),
                        easeIn: new EaseIn(),
                        easeInOut: new EaseInOut()
                    }, !0);
                    _easeReg(C, name);
                    return C
                },
                EasePoint = function(time, value, next) {
                    this.t = time;
                    this.v = value;
                    if (next) {
                        this.next = next;
                        next.prev = this;
                        this.c = next.v - value;
                        this.gap = next.t - time
                    }
                },
                _createBack = function(n, f) {
                    var C = _class("easing." + n, function(overshoot) {
                            this._p1 = (overshoot || overshoot === 0) ? overshoot : 1.70158;
                            this._p2 = this._p1 * 1.525
                        }, !0),
                        p = C.prototype = new Ease();
                    p.constructor = C;
                    p.getRatio = f;
                    p.config = function(overshoot) {
                        return new C(overshoot)
                    };
                    return C
                },
                Back = _wrap("Back", _createBack("BackOut", function(p) {
                    return ( (p = p - 1) * p * ((this._p1 + 1) * p + this._p1) + 1)
                }), _createBack("BackIn", function(p) {
                    return p * p * ((this._p1 + 1) * p - this._p1)
                }), _createBack("BackInOut", function(p) {
                    return ((p *= 2) < 1) ? 0.5 * p * p * ((this._p2 + 1) * p - this._p2) : 0.5 * ((p -= 2) * p * ((this._p2 + 1) * p + this._p2) + 2)
                })),
                SlowMo = _class("easing.SlowMo", function(linearRatio, power, yoyoMode) {
                    power = (power || power === 0) ? power : 0.7;
                    if (linearRatio == null) {
                        linearRatio = 0.7
                    } else if (linearRatio > 1) {
                        linearRatio = 1
                    }
                    this._p = (linearRatio !== 1) ? power : 0;
                    this._p1 = (1 - linearRatio) / 2;
                    this._p2 = linearRatio;
                    this._p3 = this._p1 + this._p2;
                    this._calcEnd = (yoyoMode === !0)
                }, !0),
                p = SlowMo.prototype = new Ease(),
                SteppedEase,
                RoughEase,
                _createElastic;
            p.constructor = SlowMo;
            p.getRatio = function(p) {
                var r = p + (0.5 - p) * this._p;
                if (p < this._p1) {
                    return this._calcEnd ? 1 - ((p = 1 - (p / this._p1)) * p) : r - ((p = 1 - (p / this._p1)) * p * p * p * r)
                } else if (p > this._p3) {
                    return this._calcEnd ? 1 - (p = (p - this._p3) / this._p1) * p : r + ((p - r) * (p = (p - this._p3) / this._p1) * p * p * p)
                }
                return this._calcEnd ? 1 : r
            };
            SlowMo.ease = new SlowMo(0.7, 0.7);
            p.config = SlowMo.config = function(linearRatio, power, yoyoMode) {
                return new SlowMo(linearRatio, power, yoyoMode)
            };
            SteppedEase = _class("easing.SteppedEase", function(steps) {
                steps = steps || 1;
                this._p1 = 1 / steps;
                this._p2 = steps + 1
            }, !0);
            p = SteppedEase.prototype = new Ease();
            p.constructor = SteppedEase;
            p.getRatio = function(p) {
                if (p < 0) {
                    p = 0
                } else if (p >= 1) {
                    p = 0.999999999
                }
                return ((this._p2 * p) >> 0) * this._p1
            };
            p.config = SteppedEase.config = function(steps) {
                return new SteppedEase(steps)
            };
            RoughEase = _class("easing.RoughEase", function(vars) {
                vars = vars || {};
                var taper = vars.taper || "none",
                    a = [],
                    cnt = 0,
                    points = (vars.points || 20) | 0,
                    i = points,
                    randomise = (vars.randomise !== !1),
                    clamp = (vars.clamp === !0),
                    template = (vars.template instanceof Ease) ? vars.template : null,
                    strength = (typeof (vars.strength) === "number") ? vars.strength * 0.4 : 0.4,
                    x,
                    y,
                    bump,
                    invX,
                    obj,
                    pnt;
                while (--i > -1) {
                    x = randomise ? Math.random() : (1 / points) * i;
                    y = template ? template.getRatio(x) : x;
                    if (taper === "none") {
                        bump = strength
                    } else if (taper === "out") {
                        invX = 1 - x;
                        bump = invX * invX * strength
                    } else if (taper === "in") {
                        bump = x * x * strength
                    } else if (x < 0.5) {
                        invX = x * 2;
                        bump = invX * invX * 0.5 * strength
                    } else {
                        invX = (1 - x) * 2;
                        bump = invX * invX * 0.5 * strength
                    }
                    if (randomise) {
                        y += (Math.random() * bump) - (bump * 0.5)
                    } else if (i % 2) {
                        y += bump * 0.5
                    } else {
                        y -= bump * 0.5
                    }
                    if (clamp) {
                        if (y > 1) {
                            y = 1
                        } else if (y < 0) {
                            y = 0
                        }
                    }
                    a[cnt++] = {
                        x: x,
                        y: y
                    }
                }
                a.sort(function(a, b) {
                    return a.x - b.x
                });
                pnt = new EasePoint(1, 1, null);
                i = points;
                while (--i > -1) {
                    obj = a[i];
                    pnt = new EasePoint(obj.x, obj.y, pnt)
                }
                this._prev = new EasePoint(0, 0, (pnt.t !== 0) ? pnt : pnt.next)
            }, !0);
            p = RoughEase.prototype = new Ease();
            p.constructor = RoughEase;
            p.getRatio = function(p) {
                var pnt = this._prev;
                if (p > pnt.t) {
                    while (pnt.next && p >= pnt.t) {
                        pnt = pnt.next
                    }
                    pnt = pnt.prev
                } else {
                    while (pnt.prev && p <= pnt.t) {
                        pnt = pnt.prev
                    }
                }
                this._prev = pnt;
                return ( pnt.v + ((p - pnt.t) / pnt.gap) * pnt.c)
            };
            p.config = function(vars) {
                return new RoughEase(vars)
            };
            RoughEase.ease = new RoughEase();
            _wrap("Bounce", _create("BounceOut", function(p) {
                if (p < 1 / 2.75) {
                    return 7.5625 * p * p
                } else if (p < 2 / 2.75) {
                    return 7.5625 * (p -= 1.5 / 2.75) * p + 0.75
                } else if (p < 2.5 / 2.75) {
                    return 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375
                }
                return 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375
            }), _create("BounceIn", function(p) {
                if ((p = 1 - p) < 1 / 2.75) {
                    return 1 - (7.5625 * p * p)
                } else if (p < 2 / 2.75) {
                    return 1 - (7.5625 * (p -= 1.5 / 2.75) * p + 0.75)
                } else if (p < 2.5 / 2.75) {
                    return 1 - (7.5625 * (p -= 2.25 / 2.75) * p + 0.9375)
                }
                return 1 - (7.5625 * (p -= 2.625 / 2.75) * p + 0.984375)
            }), _create("BounceInOut", function(p) {
                var invert = (p < 0.5);
                if (invert) {
                    p = 1 - (p * 2)
                } else {
                    p = (p * 2) - 1
                }
                if (p < 1 / 2.75) {
                    p = 7.5625 * p * p
                } else if (p < 2 / 2.75) {
                    p = 7.5625 * (p -= 1.5 / 2.75) * p + 0.75
                } else if (p < 2.5 / 2.75) {
                    p = 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375
                } else {
                    p = 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375
                }
                return invert ? (1 - p) * 0.5 : p * 0.5 + 0.5
            }));
            _wrap("Circ", _create("CircOut", function(p) {
                return Math.sqrt(1 - (p = p - 1) * p)
            }), _create("CircIn", function(p) {
                return -(Math.sqrt(1 - (p * p)) - 1)
            }), _create("CircInOut", function(p) {
                return ((p *= 2) < 1) ? -0.5 * (Math.sqrt(1 - p * p) - 1) : 0.5 * (Math.sqrt(1 - (p -= 2) * p) + 1)
            }));
            _createElastic = function(n, f, def) {
                var C = _class("easing." + n, function(amplitude, period) {
                        this._p1 = (amplitude >= 1) ? amplitude : 1;
                        this._p2 = (period || def) / (amplitude < 1 ? amplitude : 1);
                        this._p3 = this._p2 / _2PI * (Math.asin(1 / this._p1) || 0);
                        this._p2 = _2PI / this._p2
                    }, !0),
                    p = C.prototype = new Ease();
                p.constructor = C;
                p.getRatio = f;
                p.config = function(amplitude, period) {
                    return new C(amplitude, period)
                };
                return C
            };
            _wrap("Elastic", _createElastic("ElasticOut", function(p) {
                return this._p1 * Math.pow(2, -10 * p) * Math.sin((p - this._p3) * this._p2) + 1
            }, 0.3), _createElastic("ElasticIn", function(p) {
                return -(this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin((p - this._p3) * this._p2))
            }, 0.3), _createElastic("ElasticInOut", function(p) {
                return ((p *= 2) < 1) ? -0.5 * (this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin((p - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (p -= 1)) * Math.sin((p - this._p3) * this._p2) * 0.5 + 1
            }, 0.45));
            _wrap("Expo", _create("ExpoOut", function(p) {
                return 1 - Math.pow(2, -10 * p)
            }), _create("ExpoIn", function(p) {
                return Math.pow(2, 10 * (p - 1)) - 0.001
            }), _create("ExpoInOut", function(p) {
                return ((p *= 2) < 1) ? 0.5 * Math.pow(2, 10 * (p - 1)) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)))
            }));
            _wrap("Sine", _create("SineOut", function(p) {
                return Math.sin(p * _HALF_PI)
            }), _create("SineIn", function(p) {
                return -Math.cos(p * _HALF_PI) + 1
            }), _create("SineInOut", function(p) {
                return -0.5 * (Math.cos(Math.PI * p) - 1)
            }));
            _class("easing.EaseLookup", {
                find: function(s) {
                    return Ease.map[s]
                }
            }, !0);
            _easeReg(w.SlowMo, "SlowMo", "ease,");
            _easeReg(RoughEase, "RoughEase", "ease,");
            _easeReg(SteppedEase, "SteppedEase", "ease,");
            return Back
        }, !0)
    });
    if (_gsScope._gsDefine) {
        _gsScope._gsQueue.pop()()
    }
    (function(window, moduleName) {
        "use strict";
        var _exports = {},
            _globals = window.GreenSockGlobals = window.GreenSockGlobals || window;
        if (_globals.TweenLite) {
            return
        }
        var _namespace = function(ns) {
                var a = ns.split("."),
                    p = _globals,
                    i;
                for (i = 0; i < a.length; i++) {
                    p[a[i]] = p = p[a[i]] || {}
                }
                return p
            },
            gs = _namespace("com.greensock"),
            _tinyNum = 0.0000000001,
            _slice = function(a) {
                var b = [],
                    l = a.length,
                    i;
                for (i = 0; i !== l; b.push(a[i++])) {}
                return b
            },
            _emptyFunc = function() {},
            _isArray = (function() {
                var toString = Object.prototype.toString,
                    array = toString.call([]);
                return function(obj) {
                    return obj != null && (obj instanceof Array || (typeof (obj) === "object" && !!obj.push && toString.call(obj) === array))
                }
            }()),
            a,
            i,
            p,
            _ticker,
            _tickerActive,
            _defLookup = {},
            Definition = function(ns, dependencies, func, global) {
                this.sc = (_defLookup[ns]) ? _defLookup[ns].sc : [];
                _defLookup[ns] = this;
                this.gsClass = null;
                this.func = func;
                var _classes = [];
                this.check = function(init) {
                    var i = dependencies.length,
                        missing = i,
                        cur,
                        a,
                        n,
                        cl,
                        hasModule;
                    while (--i > -1) {
                        if ((cur = _defLookup[dependencies[i]] || new Definition(dependencies[i], [])).gsClass) {
                            _classes[i] = cur.gsClass;
                            missing--
                        } else if (init) {
                            cur.sc.push(this)
                        }
                    }
                    if (missing === 0 && func) {
                        a = ("com.greensock." + ns).split(".");
                        n = a.pop();
                        cl = _namespace(a.join("."))[n] = this.gsClass = func.apply(func, _classes);
                        if (global) {
                            _globals[n] = cl;
                            hasModule = (typeof (module) !== "undefined" && module.exports);
                            if (!hasModule && typeof (define) === "function" && define.amd) {
                                define((window.GreenSockAMDPath ? window.GreenSockAMDPath + "/" : "") + ns.split(".").pop(), [], function() {
                                    return cl
                                })
                            } else if (hasModule) {
                                if (ns === moduleName) {
                                    module.exports = _exports[moduleName] = cl;
                                    for (i in _exports) {
                                        cl[i] = _exports[i]
                                    }
                                } else if (_exports[moduleName]) {
                                    _exports[moduleName][n] = cl
                                }
                            }
                        }
                        for (i = 0; i < this.sc.length; i++) {
                            this.sc[i].check()
                        }
                    }
                };
                this.check(!0)
            },
            _gsDefine = window._gsDefine = function(ns, dependencies, func, global) {
                return new Definition(ns, dependencies, func, global)
            },
            _class = gs._class = function(ns, func, global) {
                func = func || function() {};
                _gsDefine(ns, [], function() {
                    return func
                }, global);
                return func
            };
        _gsDefine.globals = _globals;
        var _baseParams = [0, 0, 1, 1],
            _blankArray = [],
            Ease = _class("easing.Ease", function(func, extraParams, type, power) {
                this._func = func;
                this._type = type || 0;
                this._power = power || 0;
                this._params = extraParams ? _baseParams.concat(extraParams) : _baseParams
            }, !0),
            _easeMap = Ease.map = {},
            _easeReg = Ease.register = function(ease, names, types, create) {
                var na = names.split(","),
                    i = na.length,
                    ta = (types || "easeIn,easeOut,easeInOut").split(","),
                    e,
                    name,
                    j,
                    type;
                while (--i > -1) {
                    name = na[i];
                    e = create ? _class("easing." + name, null, !0) : gs.easing[name] || {};
                    j = ta.length;
                    while (--j > -1) {
                        type = ta[j];
                        _easeMap[name + "." + type] = _easeMap[type + name] = e[type] = ease.getRatio ? ease : ease[type] || new ease()
                    }
                }
            };
        p = Ease.prototype;
        p._calcEnd = !1;
        p.getRatio = function(p) {
            if (this._func) {
                this._params[0] = p;
                return this._func.apply(null, this._params)
            }
            var t = this._type,
                pw = this._power,
                r = (t === 1) ? 1 - p : (t === 2) ? p : (p < 0.5) ? p * 2 : (1 - p) * 2;
            if (pw === 1) {
                r *= r
            } else if (pw === 2) {
                r *= r * r
            } else if (pw === 3) {
                r *= r * r * r
            } else if (pw === 4) {
                r *= r * r * r * r
            }
            return (t === 1) ? 1 - r : (t === 2) ? r : (p < 0.5) ? r / 2 : 1 - (r / 2)
        };
        a = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"];
        i = a.length;
        while (--i > -1) {
            p = a[i] + ",Power" + i;
            _easeReg(new Ease(null, null, 1, i), p, "easeOut", !0);
            _easeReg(new Ease(null, null, 2, i), p, "easeIn" + ((i === 0) ? ",easeNone" : ""));
            _easeReg(new Ease(null, null, 3, i), p, "easeInOut")
        }
        _easeMap.linear = gs.easing.Linear.easeIn;
        _easeMap.swing = gs.easing.Quad.easeInOut;
        var EventDispatcher = _class("events.EventDispatcher", function(target) {
            this._standardProduct = {};
            this._eventTarget = target || this
        });
        p = EventDispatcher.prototype;
        p.addEventListener = function(type, callback, scope, useParam, priority) {
            priority = priority || 0;
            var list = this._standardProduct[type],
                index = 0,
                listener,
                i;
            if (this === _ticker && !_tickerActive) {
                _ticker.wake()
            }
            if (list == null) {
                this._standardProduct[type] = list = []
            }
            i = list.length;
            while (--i > -1) {
                listener = list[i];
                if (listener.c === callback && listener.s === scope) {
                    list.splice(i, 1)
                } else if (index === 0 && listener.pr < priority) {
                    index = i + 1
                }
            }
            list.splice(index, 0, {
                c: callback,
                s: scope,
                up: useParam,
                pr: priority
            })
        };
        p.removeEventListener = function(type, callback) {
            var list = this._standardProduct[type],
                i;
            if (list) {
                i = list.length;
                while (--i > -1) {
                    if (list[i].c === callback) {
                        list.splice(i, 1);
                        return
                    }
                }
            }
        };
        p.dispatchEvent = function(type) {
            var list = this._standardProduct[type],
                i,
                t,
                listener;
            if (list) {
                i = list.length;
                t = this._eventTarget;
                while (--i > -1) {
                    listener = list[i];
                    if (listener) {
                        if (listener.up) {
                            listener.c.call(listener.s || t, {
                                type: type,
                                target: t
                            })
                        } else {
                            listener.c.call(listener.s || t)
                        }
                    }
                }
            }
        };
        var _reqAnimFrame = window.requestAnimationFrame,
            _cancelAnimFrame = window.cancelAnimationFrame,
            _getTime = Date.now || function() {
                return new Date().getTime()
            },
            _lastUpdate = _getTime();
        a = ["ms", "moz", "webkit", "o"];
        i = a.length;
        while (--i > -1 && !_reqAnimFrame) {
            _reqAnimFrame = window[a[i] + "RequestAnimationFrame"];
            _cancelAnimFrame = window[a[i] + "CancelAnimationFrame"] || window[a[i] + "CancelRequestAnimationFrame"]
        }
        _class("Ticker", function(fps, useRAF) {
            var _self = this,
                _startTime = _getTime(),
                _useRAF = (useRAF !== !1 && _reqAnimFrame) ? "auto" : !1,
                _lagThreshold = 500,
                _adjustedLag = 33,
                _tickWord = "tick",
                _fps,
                _req,
                _id,
                _gap,
                _nextTime,
                _tick = function(manual) {
                    var elapsed = _getTime() - _lastUpdate,
                        overlap,
                        dispatch;
                    if (elapsed > _lagThreshold) {
                        _startTime += elapsed - _adjustedLag
                    }
                    _lastUpdate += elapsed;
                    _self.time = (_lastUpdate - _startTime) / 1000;
                    overlap = _self.time - _nextTime;
                    if (!_fps || overlap > 0 || manual === !0) {
                        _self.frame++;
                        _nextTime += overlap + (overlap >= _gap ? 0.004 : _gap - overlap);
                        dispatch = !0
                    }
                    if (manual !== !0) {
                        _id = _req(_tick)
                    }
                    if (dispatch) {
                        _self.dispatchEvent(_tickWord)
                    }
                };
            EventDispatcher.call(_self);
            _self.time = _self.frame = 0;
            _self.tick = function() {
                _tick(!0)
            };
            _self.lagSmoothing = function(threshold, adjustedLag) {
                _lagThreshold = threshold || (1 / _tinyNum);
                _adjustedLag = Math.min(adjustedLag, _lagThreshold, 0)
            };
            _self.sleep = function() {
                if (_id == null) {
                    return
                }
                if (!_useRAF || !_cancelAnimFrame) {
                    clearTimeout(_id)
                } else {
                    _cancelAnimFrame(_id)
                }
                _req = _emptyFunc;
                _id = null;
                if (_self === _ticker) {
                    _tickerActive = !1
                }
            };
            _self.wake = function(seamless) {
                if (_id !== null) {
                    _self.sleep()
                } else if (seamless) {
                    _startTime += -_lastUpdate + (_lastUpdate = _getTime())
                } else if (_self.frame > 10) {
                    _lastUpdate = _getTime() - _lagThreshold + 5
                }
                _req = (_fps === 0) ? _emptyFunc : (!_useRAF || !_reqAnimFrame) ? function(f) {
                    return setTimeout(f, ((_nextTime - _self.time) * 1000 + 1) | 0)
                } : _reqAnimFrame;
                if (_self === _ticker) {
                    _tickerActive = !0
                }
                _tick(2)
            };
            _self.fps = function(value) {
                if (!arguments.length) {
                    return _fps
                }
                _fps = value;
                _gap = 1 / (_fps || 60);
                _nextTime = this.time + _gap;
                _self.wake()
            };
            _self.useRAF = function(value) {
                if (!arguments.length) {
                    return _useRAF
                }
                _self.sleep();
                _useRAF = value;
                _self.fps(_fps)
            };
            _self.fps(fps);
            setTimeout(function() {
                if (_useRAF === "auto" && _self.frame < 5 && document.visibilityState !== "hidden") {
                    _self.useRAF(!1)
                }
            }, 1500)
        });
        p = gs.Ticker.prototype = new gs.events.EventDispatcher();
        p.constructor = gs.Ticker;
        var Animation = _class("core.Animation", function(duration, vars) {
            this.vars = vars = vars || {};
            this._duration = this._totalDuration = duration || 0;
            this._delay = Number(vars.delay) || 0;
            this._timeScale = 1;
            this._active = (vars.immediateRender === !0);
            this.data = vars.data;
            this._reversed = (vars.reversed === !0);
            if (!_rootTimeline) {
                return
            }
            if (!_tickerActive) {
                _ticker.wake()
            }
            var tl = this.vars.useFrames ? _rootFramesTimeline : _rootTimeline;
            tl.add(this, tl._time);
            if (this.vars.paused) {
                this.paused(!0)
            }
        });
        _ticker = Animation.ticker = new gs.Ticker();
        p = Animation.prototype;
        p._dirty = p._gc = p._initted = p._paused = !1;
        p._totalTime = p._time = 0;
        p._rawPrevTime = -1;
        p._next = p._last = p._onUpdate = p._timeline = p.timeline = null;
        p._paused = !1;
        var _checkTimeout = function() {
            if (_tickerActive && _getTime() - _lastUpdate > 2000) {
                _ticker.wake()
            }
            setTimeout(_checkTimeout, 2000)
        };
        _checkTimeout();
        p.play = function(from, suppressEvents) {
            if (from != null) {
                this.seek(from, suppressEvents)
            }
            return this.reversed(!1).paused(!1)
        };
        p.pause = function(atTime, suppressEvents) {
            if (atTime != null) {
                this.seek(atTime, suppressEvents)
            }
            return this.paused(!0)
        };
        p.resume = function(from, suppressEvents) {
            if (from != null) {
                this.seek(from, suppressEvents)
            }
            return this.paused(!1)
        };
        p.seek = function(time, suppressEvents) {
            return this.totalTime(Number(time), suppressEvents !== !1)
        };
        p.restart = function(includeDelay, suppressEvents) {
            return this.reversed(!1).paused(!1).totalTime(includeDelay ? -this._delay : 0, (suppressEvents !== !1), !0)
        };
        p.reverse = function(from, suppressEvents) {
            if (from != null) {
                this.seek((from || this.totalDuration()), suppressEvents)
            }
            return this.reversed(!0).paused(!1)
        };
        p.render = function(time, suppressEvents, force) {};
        p.invalidate = function() {
            this._time = this._totalTime = 0;
            this._initted = this._gc = !1;
            this._rawPrevTime = -1;
            if (this._gc || !this.timeline) {
                this._enabled(!0)
            }
            return this
        };
        p.isActive = function() {
            var tl = this._timeline,
                startTime = this._startTime,
                rawTime;
            return ( !tl || (!this._gc && !this._paused && tl.isActive() && (rawTime = tl.rawTime()) >= startTime && rawTime < startTime + this.totalDuration() / this._timeScale))
        };
        p._enabled = function(enabled, ignoreTimeline) {
            if (!_tickerActive) {
                _ticker.wake()
            }
            this._gc = !enabled;
            this._active = this.isActive();
            if (ignoreTimeline !== !0) {
                if (enabled && !this.timeline) {
                    this._timeline.add(this, this._startTime - this._delay)
                } else if (!enabled && this.timeline) {
                    this._timeline._remove(this, !0)
                }
            }
            return !1
        };
        p._kill = function(vars, target) {
            return this._enabled(!1, !1)
        };
        p.kill = function(vars, target) {
            this._kill(vars, target);
            return this
        };
        p._uncache = function(includeSelf) {
            var tween = includeSelf ? this : this.timeline;
            while (tween) {
                tween._dirty = !0;
                tween = tween.timeline
            }
            return this
        };
        p._swapSelfInParams = function(params) {
            var i = params.length,
                copy = params.concat();
            while (--i > -1) {
                if (params[i] === "{self}") {
                    copy[i] = this
                }
            }
            return copy
        };
        p._callback = function(type) {
            var v = this.vars;
            v[type].apply(v[type + "Scope"] || v.callbackScope || this, v[type + "Params"] || _blankArray)
        };
        p.eventCallback = function(type, callback, params, scope) {
            if ((type || "").substr(0, 2) === "on") {
                var v = this.vars;
                if (arguments.length === 1) {
                    return v[type]
                }
                if (callback == null) {
                    delete v[type]
                } else {
                    v[type] = callback;
                    v[type + "Params"] = (_isArray(params) && params.join("").indexOf("{self}") !== -1) ? this._swapSelfInParams(params) : params;
                    v[type + "Scope"] = scope
                }
                if (type === "onUpdate") {
                    this._onUpdate = callback
                }
            }
            return this
        };
        p.delay = function(value) {
            if (!arguments.length) {
                return this._delay
            }
            if (this._timeline.smoothChildTiming) {
                this.startTime(this._startTime + value - this._delay)
            }
            this._delay = value;
            return this
        };
        p.duration = function(value) {
            if (!arguments.length) {
                this._dirty = !1;
                return this._duration
            }
            this._duration = this._totalDuration = value;
            this._uncache(!0);
            if (this._timeline.smoothChildTiming)
                if (this._time > 0)
                    if (this._time < this._duration)
                        if (value !== 0) {
                            this.totalTime(this._totalTime * (value / this._duration), !0)
                        }
            return this
        };
        p.totalDuration = function(value) {
            this._dirty = !1;
            return (!arguments.length) ? this._totalDuration : this.duration(value)
        };
        p.time = function(value, suppressEvents) {
            if (!arguments.length) {
                return this._time
            }
            if (this._dirty) {
                this.totalDuration()
            }
            return this.totalTime((value > this._duration) ? this._duration : value, suppressEvents)
        };
        p.totalTime = function(time, suppressEvents, uncapped) {
            if (!_tickerActive) {
                _ticker.wake()
            }
            if (!arguments.length) {
                return this._totalTime
            }
            if (this._timeline) {
                if (time < 0 && !uncapped) {
                    time += this.totalDuration()
                }
                if (this._timeline.smoothChildTiming) {
                    if (this._dirty) {
                        this.totalDuration()
                    }
                    var totalDuration = this._totalDuration,
                        tl = this._timeline;
                    if (time > totalDuration && !uncapped) {
                        time = totalDuration
                    }
                    this._startTime = (this._paused ? this._pauseTime : tl._time) - ((!this._reversed ? time : totalDuration - time) / this._timeScale);
                    if (!tl._dirty) {
                        this._uncache(!1)
                    }
                    if (tl._timeline) {
                        while (tl._timeline) {
                            if (tl._timeline._time !== (tl._startTime + tl._totalTime) / tl._timeScale) {
                                tl.totalTime(tl._totalTime, !0)
                            }
                            tl = tl._timeline
                        }
                    }
                }
                if (this._gc) {
                    this._enabled(!0, !1)
                }
                if (this._totalTime !== time || this._duration === 0) {
                    if (_lazyTweens.length) {
                        _lazyRender()
                    }
                    this.render(time, suppressEvents, !1);
                    if (_lazyTweens.length) {
                        _lazyRender()
                    }
                }
            }
            return this
        };
        p.progress = p.totalProgress = function(value, suppressEvents) {
            var duration = this.duration();
            return (!arguments.length) ? (duration ? this._time / duration : this.ratio) : this.totalTime(duration * value, suppressEvents)
        };
        p.startTime = function(value) {
            if (!arguments.length) {
                return this._startTime
            }
            if (value !== this._startTime) {
                this._startTime = value;
                if (this.timeline)
                    if (this.timeline._sortChildren) {
                        this.timeline.add(this, value - this._delay)
                    }
            }
            return this
        };
        p.endTime = function(includeRepeats) {
            return this._startTime + ((includeRepeats != !1) ? this.totalDuration() : this.duration()) / this._timeScale
        };
        p.timeScale = function(value) {
            if (!arguments.length) {
                return this._timeScale
            }
            value = value || _tinyNum;
            if (this._timeline && this._timeline.smoothChildTiming) {
                var pauseTime = this._pauseTime,
                    t = (pauseTime || pauseTime === 0) ? pauseTime : this._timeline.totalTime();
                this._startTime = t - ((t - this._startTime) * this._timeScale / value)
            }
            this._timeScale = value;
            return this._uncache(!1)
        };
        p.reversed = function(value) {
            if (!arguments.length) {
                return this._reversed
            }
            if (value != this._reversed) {
                this._reversed = value;
                this.totalTime(((this._timeline && !this._timeline.smoothChildTiming) ? this.totalDuration() - this._totalTime : this._totalTime), !0)
            }
            return this
        };
        p.paused = function(value) {
            if (!arguments.length) {
                return this._paused
            }
            var tl = this._timeline,
                raw,
                elapsed;
            if (value != this._paused)
                if (tl) {
                    if (!_tickerActive && !value) {
                        _ticker.wake()
                    }
                    raw = tl.rawTime();
                    elapsed = raw - this._pauseTime;
                    if (!value && tl.smoothChildTiming) {
                        this._startTime += elapsed;
                        this._uncache(!1)
                    }
                    this._pauseTime = value ? raw : null;
                    this._paused = value;
                    this._active = this.isActive();
                    if (!value && elapsed !== 0 && this._initted && this.duration()) {
                        raw = tl.smoothChildTiming ? this._totalTime : (raw - this._startTime) / this._timeScale;
                        this.render(raw, (raw === this._totalTime), !0)
                    }
                }
            if (this._gc && !value) {
                this._enabled(!0, !1)
            }
            return this
        };
        var SimpleTimeline = _class("core.SimpleTimeline", function(vars) {
            Animation.call(this, 0, vars);
            this.autoRemoveChildren = this.smoothChildTiming = !0
        });
        p = SimpleTimeline.prototype = new Animation();
        p.constructor = SimpleTimeline;
        p.kill()._gc = !1;
        p._first = p._last = p._recent = null;
        p._sortChildren = !1;
        p.add = p.insert = function(child, position, align, stagger) {
            var prevTween,
                st;
            child._startTime = Number(position || 0) + child._delay;
            if (child._paused)
                if (this !== child._timeline) {
                    child._pauseTime = child._startTime + ((this.rawTime() - child._startTime) / child._timeScale)
                }
            if (child.timeline) {
                child.timeline._remove(child, !0)
            }
            child.timeline = child._timeline = this;
            if (child._gc) {
                child._enabled(!0, !0)
            }
            prevTween = this._last;
            if (this._sortChildren) {
                st = child._startTime;
                while (prevTween && prevTween._startTime > st) {
                    prevTween = prevTween._prev
                }
            }
            if (prevTween) {
                child._next = prevTween._next;
                prevTween._next = child
            } else {
                child._next = this._first;
                this._first = child
            }
            if (child._next) {
                child._next._prev = child
            } else {
                this._last = child
            }
            child._prev = prevTween;
            this._recent = child;
            if (this._timeline) {
                this._uncache(!0)
            }
            return this
        };
        p._remove = function(tween, skipDisable) {
            if (tween.timeline === this) {
                if (!skipDisable) {
                    tween._enabled(!1, !0)
                }
                if (tween._prev) {
                    tween._prev._next = tween._next
                } else if (this._first === tween) {
                    this._first = tween._next
                }
                if (tween._next) {
                    tween._next._prev = tween._prev
                } else if (this._last === tween) {
                    this._last = tween._prev
                }
                tween._next = tween._prev = tween.timeline = null;
                if (tween === this._recent) {
                    this._recent = this._last
                }
                if (this._timeline) {
                    this._uncache(!0)
                }
            }
            return this
        };
        p.render = function(time, suppressEvents, force) {
            var tween = this._first,
                next;
            this._totalTime = this._time = this._rawPrevTime = time;
            while (tween) {
                next = tween._next;
                if (tween._active || (time >= tween._startTime && !tween._paused)) {
                    if (!tween._reversed) {
                        tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force)
                    } else {
                        tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force)
                    }
                }
                tween = next
            }
        };
        p.rawTime = function() {
            if (!_tickerActive) {
                _ticker.wake()
            }
            return this._totalTime
        };
        var TweenLite = _class("TweenLite", function(target, duration, vars) {
                Animation.call(this, duration, vars);
                this.render = TweenLite.prototype.render;
                if (target == null) {
                    throw "Cannot tween a null target."
                }
                this.target = target = (typeof (target) !== "string") ? target : TweenLite.selector(target) || target;
                var isSelector = (target.jquery || (target.length && target !== window && target[0] && (target[0] === window || (target[0].nodeType && target[0].style && !target.nodeType)))),
                    overwrite = this.vars.overwrite,
                    i,
                    targ,
                    targets;
                this._overwrite = overwrite = (overwrite == null) ? _overwriteLookup[TweenLite.defaultOverwrite] : (typeof (overwrite) === "number") ? overwrite >> 0 : _overwriteLookup[overwrite];
                if ((isSelector || target instanceof Array || (target.push && _isArray(target))) && typeof (target[0]) !== "number") {
                    this._targets = targets = _slice(target);
                    this._propLookup = [];
                    this._siblings = [];
                    for (i = 0; i < targets.length; i++) {
                        targ = targets[i];
                        if (!targ) {
                            targets.splice(i--, 1);
                            continue
                        } else if (typeof (targ) === "string") {
                            targ = targets[i--] = TweenLite.selector(targ);
                            if (typeof (targ) === "string") {
                                targets.splice(i + 1, 1)
                            }
                            continue
                        } else if (targ.length && targ !== window && targ[0] && (targ[0] === window || (targ[0].nodeType && targ[0].style && !targ.nodeType))) {
                            targets.splice(i--, 1);
                            this._targets = targets = targets.concat(_slice(targ));
                            continue
                        }
                        this._siblings[i] = _register(targ, this, !1);
                        if (overwrite === 1)
                            if (this._siblings[i].length > 1) {
                                _applyOverwrite(targ, this, null, 1, this._siblings[i])
                            }
                    }
                } else {
                    this._propLookup = {};
                    this._siblings = _register(target, this, !1);
                    if (overwrite === 1)
                        if (this._siblings.length > 1) {
                            _applyOverwrite(target, this, null, 1, this._siblings)
                        }
                }
                if (this.vars.immediateRender || (duration === 0 && this._delay === 0 && this.vars.immediateRender !== !1)) {
                    this._time = -_tinyNum;
                    this.render(Math.min(0, -this._delay))
                }
            }, !0),
            _isSelector = function(v) {
                return ( v && v.length && v !== window && v[0] && (v[0] === window || (v[0].nodeType && v[0].style && !v.nodeType)))
            },
            _autoCSS = function(vars, target) {
                var css = {},
                    p;
                for (p in vars) {
                    if (!_reservedProps[p] && (!(p in target) || p === "transform" || p === "x" || p === "y" || p === "width" || p === "height" || p === "className" || p === "border") && (!_plugins[p] || (_plugins[p] && _plugins[p]._autoCSS))) {
                        css[p] = vars[p];
                        delete vars[p]
                    }
                }
                vars.css = css
            };
        p = TweenLite.prototype = new Animation();
        p.constructor = TweenLite;
        p.kill()._gc = !1;
        p.ratio = 0;
        p._firstPT = p._targets = p._overwrittenProps = p._startAt = null;
        p._notifyPluginsOfEnabled = p._lazy = !1;
        TweenLite.version = "1.18.5";
        TweenLite.defaultEase = p._ease = new Ease(null, null, 1, 1);
        TweenLite.defaultOverwrite = "auto";
        TweenLite.ticker = _ticker;
        TweenLite.autoSleep = 120;
        TweenLite.lagSmoothing = function(threshold, adjustedLag) {
            _ticker.lagSmoothing(threshold, adjustedLag)
        };
        TweenLite.selector = window.$ || window.jQuery || function(e) {
            var selector = window.$ || window.jQuery;
            if (selector) {
                TweenLite.selector = selector;
                return selector(e)
            }
            return (typeof (document) === "undefined") ? e : (document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById((e.charAt(0) === "#") ? e.substr(1) : e))
        };
        var _lazyTweens = [],
            _lazyLookup = {},
            _numbersExp = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
            _setRatio = function(v) {
                var pt = this._firstPT,
                    min = 0.000001,
                    val;
                while (pt) {
                    val = !pt.blob ? pt.c * v + pt.s : v ? this.join("") : this.start;
                    if (pt.r) {
                        val = Math.round(val)
                    } else if (val < min)
                        if (val > -min) {
                            val = 0
                        }
                    if (!pt.f) {
                        pt.t[pt.p] = val
                    } else if (pt.fp) {
                        pt.t[pt.p](pt.fp, val)
                    } else {
                        pt.t[pt.p](val)
                    }
                    pt = pt._next
                }
            },
            _blobDif = function(start, end, filter, pt) {
                var a = [start, end],
                    charIndex = 0,
                    s = "",
                    color = 0,
                    startNums,
                    endNums,
                    num,
                    i,
                    l,
                    nonNumbers,
                    currentNum;
                a.start = start;
                if (filter) {
                    filter(a);
                    start = a[0];
                    end = a[1]
                }
                a.length = 0;
                startNums = start.match(_numbersExp) || [];
                endNums = end.match(_numbersExp) || [];
                if (pt) {
                    pt._next = null;
                    pt.blob = 1;
                    a._firstPT = pt
                }
                l = endNums.length;
                for (i = 0; i < l; i++) {
                    currentNum = endNums[i];
                    nonNumbers = end.substr(charIndex, end.indexOf(currentNum, charIndex) - charIndex);
                    s += (nonNumbers || !i) ? nonNumbers : ",";
                    charIndex += nonNumbers.length;
                    if (color) {
                        color = (color + 1) % 5
                    } else if (nonNumbers.substr(-5) === "rgba(") {
                        color = 1
                    }
                    if (currentNum === startNums[i] || startNums.length <= i) {
                        s += currentNum
                    } else {
                        if (s) {
                            a.push(s);
                            s = ""
                        }
                        num = parseFloat(startNums[i]);
                        a.push(num);
                        a._firstPT = {
                            _next: a._firstPT,
                            t: a,
                            p: a.length - 1,
                            s: num,
                            c: ((currentNum.charAt(1) === "=") ? parseInt(currentNum.charAt(0) + "1", 10) * parseFloat(currentNum.substr(2)) : (parseFloat(currentNum) - num)) || 0,
                            f: 0,
                            r: (color && color < 4)
                        }
                    }
                    charIndex += currentNum.length
                }
                s += end.substr(charIndex);
                if (s) {
                    a.push(s)
                }
                a.setRatio = _setRatio;
                return a
            },
            _addPropTween = function(target, prop, start, end, overwriteProp, round, funcParam, stringFilter) {
                var s = (start === "get") ? target[prop] : start,
                    type = typeof (target[prop]),
                    isRelative = (typeof (end) === "string" && end.charAt(1) === "="),
                    pt = {
                        t: target,
                        p: prop,
                        s: s,
                        f: (type === "function"),
                        pg: 0,
                        n: overwriteProp || prop,
                        r: round,
                        pr: 0,
                        c: isRelative ? parseInt(end.charAt(0) + "1", 10) * parseFloat(end.substr(2)) : (parseFloat(end) - s) || 0
                    },
                    blob,
                    getterName;
                if (type !== "number") {
                    if (type === "function" && start === "get") {
                        getterName = ((prop.indexOf("set") || typeof (target["get" + prop.substr(3)]) !== "function") ? prop : "get" + prop.substr(3));
                        pt.s = s = funcParam ? target[getterName](funcParam) : target[getterName]()
                    }
                    if (typeof (s) === "string" && (funcParam || isNaN(s))) {
                        pt.fp = funcParam;
                        blob = _blobDif(s, end, stringFilter || TweenLite.defaultStringFilter, pt);
                        pt = {
                            t: blob,
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: 2,
                            pg: 0,
                            n: overwriteProp || prop,
                            pr: 0
                        }
                    } else if (!isRelative) {
                        pt.s = parseFloat(s);
                        pt.c = (parseFloat(end) - pt.s) || 0
                    }
                }
                if (pt.c) {
                    if ((pt._next = this._firstPT)) {
                        pt._next._prev = pt
                    }
                    this._firstPT = pt;
                    return pt
                }
            },
            _internals = TweenLite._internals = {
                isArray: _isArray,
                isSelector: _isSelector,
                lazyTweens: _lazyTweens,
                blobDif: _blobDif
            },
            _plugins = TweenLite._plugins = {},
            _tweenLookup = _internals.tweenLookup = {},
            _tweenLookupNum = 0,
            _reservedProps = _internals.reservedProps = {
                ease: 1,
                delay: 1,
                overwrite: 1,
                onComplete: 1,
                onCompleteParams: 1,
                onCompleteScope: 1,
                useFrames: 1,
                runBackwards: 1,
                startAt: 1,
                onUpdate: 1,
                onUpdateParams: 1,
                onUpdateScope: 1,
                onStart: 1,
                onStartParams: 1,
                onStartScope: 1,
                onReverseComplete: 1,
                onReverseCompleteParams: 1,
                onReverseCompleteScope: 1,
                onRepeat: 1,
                onRepeatParams: 1,
                onRepeatScope: 1,
                easeParams: 1,
                yoyo: 1,
                immediateRender: 1,
                repeat: 1,
                repeatDelay: 1,
                data: 1,
                paused: 1,
                reversed: 1,
                autoCSS: 1,
                lazy: 1,
                onOverwrite: 1,
                callbackScope: 1,
                stringFilter: 1,
                id: 1
            },
            _overwriteLookup = {
                none: 0,
                all: 1,
                auto: 2,
                concurrent: 3,
                allOnStart: 4,
                preexisting: 5,
                "true": 1,
                "false": 0
            },
            _rootFramesTimeline = Animation._rootFramesTimeline = new SimpleTimeline(),
            _rootTimeline = Animation._rootTimeline = new SimpleTimeline(),
            _nextGCFrame = 30,
            _lazyRender = _internals.lazyRender = function() {
                var i = _lazyTweens.length,
                    tween;
                _lazyLookup = {};
                while (--i > -1) {
                    tween = _lazyTweens[i];
                    if (tween && tween._lazy !== !1) {
                        tween.render(tween._lazy[0], tween._lazy[1], !0);
                        tween._lazy = !1
                    }
                }
                _lazyTweens.length = 0
            };
        _rootTimeline._startTime = _ticker.time;
        _rootFramesTimeline._startTime = _ticker.frame;
        _rootTimeline._active = _rootFramesTimeline._active = !0;
        setTimeout(_lazyRender, 1);
        Animation._updateRoot = TweenLite.render = function() {
            var i,
                a,
                p;
            if (_lazyTweens.length) {
                _lazyRender()
            }
            _rootTimeline.render((_ticker.time - _rootTimeline._startTime) * _rootTimeline._timeScale, !1, !1);
            _rootFramesTimeline.render((_ticker.frame - _rootFramesTimeline._startTime) * _rootFramesTimeline._timeScale, !1, !1);
            if (_lazyTweens.length) {
                _lazyRender()
            }
            if (_ticker.frame >= _nextGCFrame) {
                _nextGCFrame = _ticker.frame + (parseInt(TweenLite.autoSleep, 10) || 120);
                for (p in _tweenLookup) {
                    a = _tweenLookup[p].tweens;
                    i = a.length;
                    while (--i > -1) {
                        if (a[i]._gc) {
                            a.splice(i, 1)
                        }
                    }
                    if (a.length === 0) {
                        delete _tweenLookup[p]
                    }
                }
                p = _rootTimeline._first;
                if (!p || p._paused)
                    if (TweenLite.autoSleep && !_rootFramesTimeline._first && _ticker._standardProduct.tick.length === 1) {
                        while (p && p._paused) {
                            p = p._next
                        }
                        if (!p) {
                            _ticker.sleep()
                        }
                    }
            }
        };
        _ticker.addEventListener("tick", Animation._updateRoot);
        var _register = function(target, tween, scrub) {
                var id = target._gsTweenID,
                    a,
                    i;
                if (!_tweenLookup[id || (target._gsTweenID = id = "t" + (_tweenLookupNum++))]) {
                    _tweenLookup[id] = {
                        target: target,
                        tweens: []
                    }
                }
                if (tween) {
                    a = _tweenLookup[id].tweens;
                    a[(i = a.length)] = tween;
                    if (scrub) {
                        while (--i > -1) {
                            if (a[i] === tween) {
                                a.splice(i, 1)
                            }
                        }
                    }
                }
                return _tweenLookup[id].tweens
            },
            _onOverwrite = function(overwrittenTween, overwritingTween, target, killedProps) {
                var func = overwrittenTween.vars.onOverwrite,
                    r1,
                    r2;
                if (func) {
                    r1 = func(overwrittenTween, overwritingTween, target, killedProps)
                }
                func = TweenLite.onOverwrite;
                if (func) {
                    r2 = func(overwrittenTween, overwritingTween, target, killedProps)
                }
                return ( r1 !== !1 && r2 !== !1)
            },
            _applyOverwrite = function(target, tween, props, mode, siblings) {
                var i,
                    changed,
                    curTween,
                    l;
                if (mode === 1 || mode >= 4) {
                    l = siblings.length;
                    for (i = 0; i < l; i++) {
                        if ((curTween = siblings[i]) !== tween) {
                            if (!curTween._gc) {
                                if (curTween._kill(null, target, tween)) {
                                    changed = !0
                                }
                            }
                        } else if (mode === 5) {
                            break
                        }
                    }
                    return changed
                }
                var startTime = tween._startTime + _tinyNum,
                    overlaps = [],
                    oCount = 0,
                    zeroDur = (tween._duration === 0),
                    globalStart;
                i = siblings.length;
                while (--i > -1) {
                    if ((curTween = siblings[i]) === tween || curTween._gc || curTween._paused) {} else if (curTween._timeline !== tween._timeline) {
                        globalStart = globalStart || _checkOverlap(tween, 0, zeroDur);
                        if (_checkOverlap(curTween, globalStart, zeroDur) === 0) {
                            overlaps[oCount++] = curTween
                        }
                    } else if (curTween._startTime <= startTime)
                        if (curTween._startTime + curTween.totalDuration() / curTween._timeScale > startTime)
                            if (!((zeroDur || !curTween._initted) && startTime - curTween._startTime <= 0.0000000002)) {
                                overlaps[oCount++] = curTween
                            }
                }
                i = oCount;
                while (--i > -1) {
                    curTween = overlaps[i];
                    if (mode === 2)
                        if (curTween._kill(props, target, tween)) {
                            changed = !0
                        }
                    if (mode !== 2 || (!curTween._firstPT && curTween._initted)) {
                        if (mode !== 2 && !_onOverwrite(curTween, tween)) {
                            continue
                        }
                        if (curTween._enabled(!1, !1)) {
                            changed = !0
                        }
                    }
                }
                return changed
            },
            _checkOverlap = function(tween, reference, zeroDur) {
                var tl = tween._timeline,
                    ts = tl._timeScale,
                    t = tween._startTime;
                while (tl._timeline) {
                    t += tl._startTime;
                    ts *= tl._timeScale;
                    if (tl._paused) {
                        return -100
                    }
                    tl = tl._timeline
                }
                t /= ts;
                return (t > reference) ? t - reference : ((zeroDur && t === reference) || (!tween._initted && t - reference < 2 * _tinyNum)) ? _tinyNum : ((t += tween.totalDuration() / tween._timeScale / ts) > reference + _tinyNum) ? 0 : t - reference - _tinyNum
            };
        p._init = function() {
            var v = this.vars,
                op = this._overwrittenProps,
                dur = this._duration,
                immediate = !!v.immediateRender,
                ease = v.ease,
                i,
                initPlugins,
                pt,
                p,
                startVars;
            if (v.startAt) {
                if (this._startAt) {
                    this._startAt.render(-1, !0);
                    this._startAt.kill()
                }
                startVars = {};
                for (p in v.startAt) {
                    startVars[p] = v.startAt[p]
                }
                startVars.overwrite = !1;
                startVars.immediateRender = !0;
                startVars.lazy = (immediate && v.lazy !== !1);
                startVars.startAt = startVars.delay = null;
                this._startAt = TweenLite.to(this.target, 0, startVars);
                if (immediate) {
                    if (this._time > 0) {
                        this._startAt = null
                    } else if (dur !== 0) {
                        return
                    }
                }
            } else if (v.runBackwards && dur !== 0) {
                if (this._startAt) {
                    this._startAt.render(-1, !0);
                    this._startAt.kill();
                    this._startAt = null
                } else {
                    if (this._time !== 0) {
                        immediate = !1
                    }
                    pt = {};
                    for (p in v) {
                        if (!_reservedProps[p] || p === "autoCSS") {
                            pt[p] = v[p]
                        }
                    }
                    pt.overwrite = 0;
                    pt.data = "isFromStart";
                    pt.lazy = (immediate && v.lazy !== !1);
                    pt.immediateRender = immediate;
                    this._startAt = TweenLite.to(this.target, 0, pt);
                    if (!immediate) {
                        this._startAt._init();
                        this._startAt._enabled(!1);
                        if (this.vars.immediateRender) {
                            this._startAt = null
                        }
                    } else if (this._time === 0) {
                        return
                    }
                }
            }
            this._ease = ease = (!ease) ? TweenLite.defaultEase : (ease instanceof Ease) ? ease : (typeof (ease) === "function") ? new Ease(ease, v.easeParams) : _easeMap[ease] || TweenLite.defaultEase;
            if (v.easeParams instanceof Array && ease.config) {
                this._ease = ease.config.apply(ease, v.easeParams)
            }
            this._easeType = this._ease._type;
            this._easePower = this._ease._power;
            this._firstPT = null;
            if (this._targets) {
                i = this._targets.length;
                while (--i > -1) {
                    if (this._initProps(this._targets[i], (this._propLookup[i] = {}), this._siblings[i], (op ? op[i] : null))) {
                        initPlugins = !0
                    }
                }
            } else {
                initPlugins = this._initProps(this.target, this._propLookup, this._siblings, op)
            }
            if (initPlugins) {
                TweenLite._onPluginEvent("_onInitAllProps", this)
            }
            if (op)
                if (!this._firstPT)
                    if (typeof (this.target) !== "function") {
                        this._enabled(!1, !1)
                    }
            if (v.runBackwards) {
                pt = this._firstPT;
                while (pt) {
                    pt.s += pt.c;
                    pt.c = -pt.c;
                    pt = pt._next
                }
            }
            this._onUpdate = v.onUpdate;
            this._initted = !0
        };
        p._initProps = function(target, propLookup, siblings, overwrittenProps) {
            var p,
                i,
                initPlugins,
                plugin,
                pt,
                v;
            if (target == null) {
                return !1
            }
            if (_lazyLookup[target._gsTweenID]) {
                _lazyRender()
            }
            if (!this.vars.css)
                if (target.style)
                    if (target !== window && target.nodeType)
                        if (_plugins.css)
                            if (this.vars.autoCSS !== !1) {
                                _autoCSS(this.vars, target)
                            }
            for (p in this.vars) {
                v = this.vars[p];
                if (_reservedProps[p]) {
                    if (v)
                        if ((v instanceof Array) || (v.push && _isArray(v)))
                            if (v.join("").indexOf("{self}") !== -1) {
                                this.vars[p] = v = this._swapSelfInParams(v, this)
                            }
                } else if (_plugins[p] && (plugin = new _plugins[p]())._onInitTween(target, this.vars[p], this)) {
                    this._firstPT = pt = {
                        _next: this._firstPT,
                        t: plugin,
                        p: "setRatio",
                        s: 0,
                        c: 1,
                        f: 1,
                        n: p,
                        pg: 1,
                        pr: plugin._priority
                    };
                    i = plugin._overwriteProps.length;
                    while (--i > -1) {
                        propLookup[plugin._overwriteProps[i]] = this._firstPT
                    }
                    if (plugin._priority || plugin._onInitAllProps) {
                        initPlugins = !0
                    }
                    if (plugin._onDisable || plugin._onEnable) {
                        this._notifyPluginsOfEnabled = !0
                    }
                    if (pt._next) {
                        pt._next._prev = pt
                    }
                } else {
                    propLookup[p] = _addPropTween.call(this, target, p, "get", v, p, 0, null, this.vars.stringFilter)
                }
            }
            if (overwrittenProps)
                if (this._kill(overwrittenProps, target)) {
                    return this._initProps(target, propLookup, siblings, overwrittenProps)
                }
            if (this._overwrite > 1)
                if (this._firstPT)
                    if (siblings.length > 1)
                        if (_applyOverwrite(target, this, propLookup, this._overwrite, siblings)) {
                            this._kill(propLookup, target);
                            return this._initProps(target, propLookup, siblings, overwrittenProps)
                        }
            if (this._firstPT)
                if ((this.vars.lazy !== !1 && this._duration) || (this.vars.lazy && !this._duration)) {
                    _lazyLookup[target._gsTweenID] = !0
                }
            return initPlugins
        };
        p.render = function(time, suppressEvents, force) {
            var prevTime = this._time,
                duration = this._duration,
                prevRawPrevTime = this._rawPrevTime,
                isComplete,
                callback,
                pt,
                rawPrevTime;
            if (time >= duration - 0.0000001) {
                this._totalTime = this._time = duration;
                this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
                if (!this._reversed) {
                    isComplete = !0;
                    callback = "onComplete";
                    force = (force || this._timeline.autoRemoveChildren)
                }
                if (duration === 0)
                    if (this._initted || !this.vars.lazy || force) {
                        if (this._startTime === this._timeline._duration) {
                            time = 0
                        }
                        if (prevRawPrevTime < 0 || (time <= 0 && time >= -0.0000001) || (prevRawPrevTime === _tinyNum && this.data !== "isPause"))
                            if (prevRawPrevTime !== time) {
                                force = !0;
                                if (prevRawPrevTime > _tinyNum) {
                                    callback = "onReverseComplete"
                                }
                            }
                        this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum
                    }
            } else if (time < 0.0000001) {
                this._totalTime = this._time = 0;
                this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
                if (prevTime !== 0 || (duration === 0 && prevRawPrevTime > 0)) {
                    callback = "onReverseComplete";
                    isComplete = this._reversed
                }
                if (time < 0) {
                    this._active = !1;
                    if (duration === 0)
                        if (this._initted || !this.vars.lazy || force) {
                            if (prevRawPrevTime >= 0 && !(prevRawPrevTime === _tinyNum && this.data === "isPause")) {
                                force = !0
                            }
                            this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum
                        }
                }
                if (!this._initted) {
                    force = !0
                }
            } else {
                this._totalTime = this._time = time;
                if (this._easeType) {
                    var r = time / duration,
                        type = this._easeType,
                        pow = this._easePower;
                    if (type === 1 || (type === 3 && r >= 0.5)) {
                        r = 1 - r
                    }
                    if (type === 3) {
                        r *= 2
                    }
                    if (pow === 1) {
                        r *= r
                    } else if (pow === 2) {
                        r *= r * r
                    } else if (pow === 3) {
                        r *= r * r * r
                    } else if (pow === 4) {
                        r *= r * r * r * r
                    }
                    if (type === 1) {
                        this.ratio = 1 - r
                    } else if (type === 2) {
                        this.ratio = r
                    } else if (time / duration < 0.5) {
                        this.ratio = r / 2
                    } else {
                        this.ratio = 1 - (r / 2)
                    }
                } else {
                    this.ratio = this._ease.getRatio(time / duration)
                }
            }
            if (this._time === prevTime && !force) {
                return
            } else if (!this._initted) {
                this._init();
                if (!this._initted || this._gc) {
                    return
                } else if (!force && this._firstPT && ((this.vars.lazy !== !1 && this._duration) || (this.vars.lazy && !this._duration))) {
                    this._time = this._totalTime = prevTime;
                    this._rawPrevTime = prevRawPrevTime;
                    _lazyTweens.push(this);
                    this._lazy = [time, suppressEvents];
                    return
                }
                if (this._time && !isComplete) {
                    this.ratio = this._ease.getRatio(this._time / duration)
                } else if (isComplete && this._ease._calcEnd) {
                    this.ratio = this._ease.getRatio((this._time === 0) ? 0 : 1)
                }
            }
            if (this._lazy !== !1) {
                this._lazy = !1
            }
            if (!this._active)
                if (!this._paused && this._time !== prevTime && time >= 0) {
                    this._active = !0
                }
            if (prevTime === 0) {
                if (this._startAt) {
                    if (time >= 0) {
                        this._startAt.render(time, suppressEvents, force)
                    } else if (!callback) {
                        callback = "_dummyGS"
                    }
                }
                if (this.vars.onStart)
                    if (this._time !== 0 || duration === 0)
                        if (!suppressEvents) {
                            this._callback("onStart")
                        }
            }
            pt = this._firstPT;
            while (pt) {
                if (pt.f) {
                    pt.t[pt.p](pt.c * this.ratio + pt.s)
                } else {
                    pt.t[pt.p] = pt.c * this.ratio + pt.s
                }
                pt = pt._next
            }
            if (this._onUpdate) {
                if (time < 0)
                    if (this._startAt && time !== -0.0001) {
                        this._startAt.render(time, suppressEvents, force)
                    }
                if (!suppressEvents)
                    if (this._time !== prevTime || isComplete || force) {
                        this._callback("onUpdate")
                    }
            }
            if (callback)
                if (!this._gc || force) {
                    if (time < 0 && this._startAt && !this._onUpdate && time !== -0.0001) {
                        this._startAt.render(time, suppressEvents, force)
                    }
                    if (isComplete) {
                        if (this._timeline.autoRemoveChildren) {
                            this._enabled(!1, !1)
                        }
                        this._active = !1
                    }
                    if (!suppressEvents && this.vars[callback]) {
                        this._callback(callback)
                    }
                    if (duration === 0 && this._rawPrevTime === _tinyNum && rawPrevTime !== _tinyNum) {
                        this._rawPrevTime = 0
                    }
                }
        };
        p._kill = function(vars, target, overwritingTween) {
            if (vars === "all") {
                vars = null
            }
            if (vars == null)
                if (target == null || target === this.target) {
                    this._lazy = !1;
                    return this._enabled(!1, !1)
                }
            target = (typeof (target) !== "string") ? (target || this._targets || this.target) : TweenLite.selector(target) || target;
            var simultaneousOverwrite = (overwritingTween && this._time && overwritingTween._startTime === this._startTime && this._timeline === overwritingTween._timeline),
                i,
                overwrittenProps,
                p,
                pt,
                propLookup,
                changed,
                killProps,
                record,
                killed;
            if ((_isArray(target) || _isSelector(target)) && typeof (target[0]) !== "number") {
                i = target.length;
                while (--i > -1) {
                    if (this._kill(vars, target[i], overwritingTween)) {
                        changed = !0
                    }
                }
            } else {
                if (this._targets) {
                    i = this._targets.length;
                    while (--i > -1) {
                        if (target === this._targets[i]) {
                            propLookup = this._propLookup[i] || {};
                            this._overwrittenProps = this._overwrittenProps || [];
                            overwrittenProps = this._overwrittenProps[i] = vars ? this._overwrittenProps[i] || {} : "all";
                            break
                        }
                    }
                } else if (target !== this.target) {
                    return !1
                } else {
                    propLookup = this._propLookup;
                    overwrittenProps = this._overwrittenProps = vars ? this._overwrittenProps || {} : "all"
                }
                if (propLookup) {
                    killProps = vars || propLookup;
                    record = (vars !== overwrittenProps && overwrittenProps !== "all" && vars !== propLookup && (typeof (vars) !== "object" || !vars._tempKill));
                    if (overwritingTween && (TweenLite.onOverwrite || this.vars.onOverwrite)) {
                        for (p in killProps) {
                            if (propLookup[p]) {
                                if (!killed) {
                                    killed = []
                                }
                                killed.push(p)
                            }
                        }
                        if ((killed || !vars) && !_onOverwrite(this, overwritingTween, target, killed)) {
                            return !1
                        }
                    }
                    for (p in killProps) {
                        if ((pt = propLookup[p])) {
                            if (simultaneousOverwrite) {
                                if (pt.f) {
                                    pt.t[pt.p](pt.s)
                                } else {
                                    pt.t[pt.p] = pt.s
                                }
                                changed = !0
                            }
                            if (pt.pg && pt.t._kill(killProps)) {
                                changed = !0
                            }
                            if (!pt.pg || pt.t._overwriteProps.length === 0) {
                                if (pt._prev) {
                                    pt._prev._next = pt._next
                                } else if (pt === this._firstPT) {
                                    this._firstPT = pt._next
                                }
                                if (pt._next) {
                                    pt._next._prev = pt._prev
                                }
                                pt._next = pt._prev = null
                            }
                            delete propLookup[p]
                        }
                        if (record) {
                            overwrittenProps[p] = 1
                        }
                    }
                    if (!this._firstPT && this._initted) {
                        this._enabled(!1, !1)
                    }
                }
            }
            return changed
        };
        p.invalidate = function() {
            if (this._notifyPluginsOfEnabled) {
                TweenLite._onPluginEvent("_onDisable", this)
            }
            this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null;
            this._notifyPluginsOfEnabled = this._active = this._lazy = !1;
            this._propLookup = (this._targets) ? {} : [];
            Animation.prototype.invalidate.call(this);
            if (this.vars.immediateRender) {
                this._time = -_tinyNum;
                this.render(Math.min(0, -this._delay))
            }
            return this
        };
        p._enabled = function(enabled, ignoreTimeline) {
            if (!_tickerActive) {
                _ticker.wake()
            }
            if (enabled && this._gc) {
                var targets = this._targets,
                    i;
                if (targets) {
                    i = targets.length;
                    while (--i > -1) {
                        this._siblings[i] = _register(targets[i], this, !0)
                    }
                } else {
                    this._siblings = _register(this.target, this, !0)
                }
            }
            Animation.prototype._enabled.call(this, enabled, ignoreTimeline);
            if (this._notifyPluginsOfEnabled)
                if (this._firstPT) {
                    return TweenLite._onPluginEvent((enabled ? "_onEnable" : "_onDisable"), this)
                }
            return !1
        };
        TweenLite.to = function(target, duration, vars) {
            return new TweenLite(target, duration, vars)
        };
        TweenLite.from = function(target, duration, vars) {
            vars.runBackwards = !0;
            vars.immediateRender = (vars.immediateRender != !1);
            return new TweenLite(target, duration, vars)
        };
        TweenLite.fromTo = function(target, duration, fromVars, toVars) {
            toVars.startAt = fromVars;
            toVars.immediateRender = (toVars.immediateRender != !1 && fromVars.immediateRender != !1);
            return new TweenLite(target, duration, toVars)
        };
        TweenLite.delayedCall = function(delay, callback, params, scope, useFrames) {
            return new TweenLite(callback, 0, {
                delay: delay,
                onComplete: callback,
                onCompleteParams: params,
                callbackScope: scope,
                onReverseComplete: callback,
                onReverseCompleteParams: params,
                immediateRender: !1,
                lazy: !1,
                useFrames: useFrames,
                overwrite: 0
            })
        };
        TweenLite.set = function(target, vars) {
            return new TweenLite(target, 0, vars)
        };
        TweenLite.getTweensOf = function(target, onlyActive) {
            if (target == null) {
                return []
            }
            target = (typeof (target) !== "string") ? target : TweenLite.selector(target) || target;
            var i,
                a,
                j,
                t;
            if ((_isArray(target) || _isSelector(target)) && typeof (target[0]) !== "number") {
                i = target.length;
                a = [];
                while (--i > -1) {
                    a = a.concat(TweenLite.getTweensOf(target[i], onlyActive))
                }
                i = a.length;
                while (--i > -1) {
                    t = a[i];
                    j = i;
                    while (--j > -1) {
                        if (t === a[j]) {
                            a.splice(i, 1)
                        }
                    }
                }
            } else {
                a = _register(target).concat();
                i = a.length;
                while (--i > -1) {
                    if (a[i]._gc || (onlyActive && !a[i].isActive())) {
                        a.splice(i, 1)
                    }
                }
            }
            return a
        };
        TweenLite.killTweensOf = TweenLite.killDelayedCallsTo = function(target, onlyActive, vars) {
            if (typeof (onlyActive) === "object") {
                vars = onlyActive;
                onlyActive = !1
            }
            var a = TweenLite.getTweensOf(target, onlyActive),
                i = a.length;
            while (--i > -1) {
                a[i]._kill(vars, target)
            }
        };
        var TweenPlugin = _class("plugins.TweenPlugin", function(props, priority) {
            this._overwriteProps = (props || "").split(",");
            this._propName = this._overwriteProps[0];
            this._priority = priority || 0;
            this._super = TweenPlugin.prototype
        }, !0);
        p = TweenPlugin.prototype;
        TweenPlugin.version = "1.18.0";
        TweenPlugin.API = 2;
        p._firstPT = null;
        p._addTween = _addPropTween;
        p.setRatio = _setRatio;
        p._kill = function(lookup) {
            var a = this._overwriteProps,
                pt = this._firstPT,
                i;
            if (lookup[this._propName] != null) {
                this._overwriteProps = []
            } else {
                i = a.length;
                while (--i > -1) {
                    if (lookup[a[i]] != null) {
                        a.splice(i, 1)
                    }
                }
            }
            while (pt) {
                if (lookup[pt.n] != null) {
                    if (pt._next) {
                        pt._next._prev = pt._prev
                    }
                    if (pt._prev) {
                        pt._prev._next = pt._next;
                        pt._prev = null
                    } else if (this._firstPT === pt) {
                        this._firstPT = pt._next
                    }
                }
                pt = pt._next
            }
            return !1
        };
        p._roundProps = function(lookup, value) {
            var pt = this._firstPT;
            while (pt) {
                if (lookup[this._propName] || (pt.n != null && lookup[pt.n.split(this._propName + "_").join("")])) {
                    pt.r = value
                }
                pt = pt._next
            }
        };
        TweenLite._onPluginEvent = function(type, tween) {
            var pt = tween._firstPT,
                changed,
                pt2,
                first,
                last,
                next;
            if (type === "_onInitAllProps") {
                while (pt) {
                    next = pt._next;
                    pt2 = first;
                    while (pt2 && pt2.pr > pt.pr) {
                        pt2 = pt2._next
                    }
                    if ((pt._prev = pt2 ? pt2._prev : last)) {
                        pt._prev._next = pt
                    } else {
                        first = pt
                    }
                    if ((pt._next = pt2)) {
                        pt2._prev = pt
                    } else {
                        last = pt
                    }
                    pt = next
                }
                pt = tween._firstPT = first
            }
            while (pt) {
                if (pt.pg)
                    if (typeof (pt.t[type]) === "function")
                        if (pt.t[type]()) {
                            changed = !0
                        }
                pt = pt._next
            }
            return changed
        };
        TweenPlugin.activate = function(plugins) {
            var i = plugins.length;
            while (--i > -1) {
                if (plugins[i].API === TweenPlugin.API) {
                    _plugins[(new plugins[i]())._propName] = plugins[i]
                }
            }
            return !0
        };
        _gsDefine.plugin = function(config) {
            if (!config || !config.propName || !config.init || !config.API) {
                throw "illegal plugin definition."
            }
            var propName = config.propName,
                priority = config.priority || 0,
                overwriteProps = config.overwriteProps,
                map = {
                    init: "_onInitTween",
                    set: "setRatio",
                    kill: "_kill",
                    round: "_roundProps",
                    initAll: "_onInitAllProps"
                },
                Plugin = _class("plugins." + propName.charAt(0).toUpperCase() + propName.substr(1) + "Plugin", function() {
                    TweenPlugin.call(this, propName, priority);
                    this._overwriteProps = overwriteProps || []
                }, (config.global === !0)),
                p = Plugin.prototype = new TweenPlugin(propName),
                prop;
            p.constructor = Plugin;
            Plugin.API = config.API;
            for (prop in map) {
                if (typeof (config[prop]) === "function") {
                    p[map[prop]] = config[prop]
                }
            }
            Plugin.version = config.version;
            TweenPlugin.activate([Plugin]);
            return Plugin
        };
        a = window._gsQueue;
        if (a) {
            for (i = 0; i < a.length; i++) {
                a[i]()
            }
            for (p in _defLookup) {
                if (!_defLookup[p].func) {
                    window.console.log("GSAP encountered missing dependency: com.greensock." + p)
                }
            }
        }
        _tickerActive = !1
    })((typeof (module) !== "undefined" && module.exports && typeof (global) !== "undefined") ? global : this || window, "TweenMax");
    (function() {
        'use strict';
        function FastClick(layer, options) {
            var oldOnClick;
            options = options || {};
            this.trackingClick = !1;
            this.trackingClickStart = 0;
            this.targetElement = null;
            this.touchStartX = 0;
            this.touchStartY = 0;
            this.lastTouchIdentifier = 0;
            this.touchBoundary = options.touchBoundary || 10;
            this.layer = layer;
            this.tapDelay = options.tapDelay || 200;
            this.tapTimeout = options.tapTimeout || 700;
            if (FastClick.notNeeded(layer)) {
                return
            }
            function bind(method, context) {
                return function() {
                    return method.apply(context, arguments)
                }
            }
            var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
            var context = this;
            for (var i = 0, l = methods.length; i < l; i++) {
                context[methods[i]] = bind(context[methods[i]], context)
            }
            if (deviceIsAndroid) {
                layer.addEventListener('mouseover', this.onMouse, !0);
                layer.addEventListener('mousedown', this.onMouse, !0);
                layer.addEventListener('mouseup', this.onMouse, !0)
            }
            layer.addEventListener('click', this.onClick, !0);
            layer.addEventListener('touchstart', this.onTouchStart, !1);
            layer.addEventListener('touchmove', this.onTouchMove, !1);
            layer.addEventListener('touchend', this.onTouchEnd, !1);
            layer.addEventListener('touchcancel', this.onTouchCancel, !1);
            if (!Event.prototype.stopImmediatePropagation) {
                layer.removeEventListener = function(type, callback, capture) {
                    var rmv = Node.prototype.removeEventListener;
                    if (type === 'click') {
                        rmv.call(layer, type, callback.hijacked || callback, capture)
                    } else {
                        rmv.call(layer, type, callback, capture)
                    }
                };
                layer.addEventListener = function(type, callback, capture) {
                    var adv = Node.prototype.addEventListener;
                    if (type === 'click') {
                        adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
                            if (!event.propagationStopped) {
                                callback(event)
                            }
                        }), capture)
                    } else {
                        adv.call(layer, type, callback, capture)
                    }
                }
            }
            if (typeof layer.onclick === 'function') {
                oldOnClick = layer.onclick;
                layer.addEventListener('click', function(event) {
                    oldOnClick(event)
                }, !1);
                layer.onclick = null
            }
        }
        var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;
        var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;
        var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;
        var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);
        var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);
        var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;
        FastClick.prototype.needsClick = function(target) {
            switch (target.nodeName.toLowerCase()) {
            case 'button':
            case 'select':
            case 'textarea':
                if (target.disabled) {
                    return !0
                }
                break;
            case 'input':
                if ((deviceIsIOS && target.type === 'file') || target.disabled) {
                    return !0
                }
                break;
            case 'label':
            case 'iframe':
            case 'video':
                return !0
            }
            return (/\bneedsclick\b/).test(target.className)
        };
        FastClick.prototype.needsFocus = function(target) {
            switch (target.nodeName.toLowerCase()) {
            case 'textarea':
                return !0;
            case 'select':
                return !deviceIsAndroid;
            case 'input':
                switch (target.type) {
                case 'button':
                case 'checkbox':
                case 'file':
                case 'image':
                case 'radio':
                case 'submit':
                    return !1
                }
                return !target.disabled && !target.readOnly;
            default:
                return (/\bneedsfocus\b/).test(target.className)
            }
        };
        FastClick.prototype.sendClick = function(targetElement, event) {
            var clickEvent,
                touch;
            if (document.activeElement && document.activeElement !== targetElement) {
                document.activeElement.blur()
            }
            touch = event.changedTouches[0];
            clickEvent = document.createEvent('MouseEvents');
            clickEvent.initMouseEvent(this.determineEventType(targetElement), !0, !0, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, !1, !1, !1, !1, 0, null);
            clickEvent.forwardedTouchEvent = !0;
            targetElement.dispatchEvent(clickEvent)
        };
        FastClick.prototype.determineEventType = function(targetElement) {
            if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
                return 'mousedown'
            }
            return 'click'
        };
        FastClick.prototype.focus = function(targetElement) {
            var length;
            if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
                length = targetElement.value.length;
                targetElement.setSelectionRange(length, length)
            } else {
                targetElement.focus()
            }
        };
        FastClick.prototype.updateScrollParent = function(targetElement) {
            var scrollParent,
                parentElement;
            scrollParent = targetElement.fastClickScrollParent;
            if (!scrollParent || !scrollParent.contains(targetElement)) {
                parentElement = targetElement;
                do {
                    if (parentElement.scrollHeight > parentElement.offsetHeight) {
                        scrollParent = parentElement;
                        targetElement.fastClickScrollParent = parentElement;
                        break
                    }
                    parentElement = parentElement.parentElement
                } while (parentElement);
            }
            if (scrollParent) {
                scrollParent.fastClickLastScrollTop = scrollParent.scrollTop
            }
        };
        FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
            if (eventTarget.nodeType === Node.TEXT_NODE) {
                return eventTarget.parentNode
            }
            return eventTarget
        };
        FastClick.prototype.onTouchStart = function(event) {
            var targetElement,
                touch,
                selection;
            if (event.targetTouches.length > 1) {
                return !0
            }
            targetElement = this.getTargetElementFromEventTarget(event.target);
            touch = event.targetTouches[0];
            if (deviceIsIOS) {
                selection = window.getSelection();
                if (selection.rangeCount && !selection.isCollapsed) {
                    return !0
                }
                if (!deviceIsIOS4) {
                    if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
                        event.preventDefault();
                        return !1
                    }
                    this.lastTouchIdentifier = touch.identifier;
                    this.updateScrollParent(targetElement)
                }
            }
            this.trackingClick = !0;
            this.trackingClickStart = event.timeStamp;
            this.targetElement = targetElement;
            this.touchStartX = touch.pageX;
            this.touchStartY = touch.pageY;
            if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
                event.preventDefault()
            }
            return !0
        };
        FastClick.prototype.touchHasMoved = function(event) {
            var touch = event.changedTouches[0],
                boundary = this.touchBoundary;
            if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
                return !0
            }
            return !1
        };
        FastClick.prototype.onTouchMove = function(event) {
            if (!this.trackingClick) {
                return !0
            }
            if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
                this.trackingClick = !1;
                this.targetElement = null
            }
            return !0
        };
        FastClick.prototype.findControl = function(labelElement) {
            if (labelElement.control !== undefined) {
                return labelElement.control
            }
            if (labelElement.htmlFor) {
                return document.getElementById(labelElement.htmlFor)
            }
            return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea')
        };
        FastClick.prototype.onTouchEnd = function(event) {
            var forElement,
                trackingClickStart,
                targetTagName,
                scrollParent,
                touch,
                targetElement = this.targetElement;
            if (!this.trackingClick) {
                return !0
            }
            if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
                this.cancelNextClick = !0;
                return !0
            }
            if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
                return !0
            }
            this.cancelNextClick = !1;
            this.lastClickTime = event.timeStamp;
            trackingClickStart = this.trackingClickStart;
            this.trackingClick = !1;
            this.trackingClickStart = 0;
            if (deviceIsIOSWithBadTarget) {
                touch = event.changedTouches[0];
                targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
                targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent
            }
            targetTagName = targetElement.tagName.toLowerCase();
            if (targetTagName === 'label') {
                forElement = this.findControl(targetElement);
                if (forElement) {
                    this.focus(targetElement);
                    if (deviceIsAndroid) {
                        return !1
                    }
                    targetElement = forElement
                }
            } else if (this.needsFocus(targetElement)) {
                if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
                    this.targetElement = null;
                    return !1
                }
                this.focus(targetElement);
                this.sendClick(targetElement, event);
                if (!deviceIsIOS || targetTagName !== 'select') {
                    this.targetElement = null;
                    event.preventDefault()
                }
                return !1
            }
            if (deviceIsIOS && !deviceIsIOS4) {
                scrollParent = targetElement.fastClickScrollParent;
                if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
                    return !0
                }
            }
            if (!this.needsClick(targetElement)) {
                event.preventDefault();
                this.sendClick(targetElement, event)
            }
            return !1
        };
        FastClick.prototype.onTouchCancel = function() {
            this.trackingClick = !1;
            this.targetElement = null
        };
        FastClick.prototype.onMouse = function(event) {
            if (!this.targetElement) {
                return !0
            }
            if (event.forwardedTouchEvent) {
                return !0
            }
            if (!event.cancelable) {
                return !0
            }
            if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
                if (event.stopImmediatePropagation) {
                    event.stopImmediatePropagation()
                } else {
                    event.propagationStopped = !0
                }
                event.stopPropagation();
                event.preventDefault();
                return !1
            }
            return !0
        };
        FastClick.prototype.onClick = function(event) {
            var permitted;
            if (this.trackingClick) {
                this.targetElement = null;
                this.trackingClick = !1;
                return !0
            }
            if (event.target.type === 'submit' && event.detail === 0) {
                return !0
            }
            permitted = this.onMouse(event);
            if (!permitted) {
                this.targetElement = null
            }
            return permitted
        };
        FastClick.prototype.destroy = function() {
            var layer = this.layer;
            if (deviceIsAndroid) {
                layer.removeEventListener('mouseover', this.onMouse, !0);
                layer.removeEventListener('mousedown', this.onMouse, !0);
                layer.removeEventListener('mouseup', this.onMouse, !0)
            }
            layer.removeEventListener('click', this.onClick, !0);
            layer.removeEventListener('touchstart', this.onTouchStart, !1);
            layer.removeEventListener('touchmove', this.onTouchMove, !1);
            layer.removeEventListener('touchend', this.onTouchEnd, !1);
            layer.removeEventListener('touchcancel', this.onTouchCancel, !1)
        };
        FastClick.notNeeded = function(layer) {
            var metaViewport;
            var chromeVersion;
            var blackberryVersion;
            var firefoxVersion;
            if (typeof window.ontouchstart === 'undefined') {
                return !0
            }
            chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];
            if (chromeVersion) {
                if (deviceIsAndroid) {
                    metaViewport = document.querySelector('meta[name=viewport]');
                    if (metaViewport) {
                        if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
                            return !0
                        }
                        if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
                            return !0
                        }
                    }
                } else {
                    return !0
                }
            }
            if (deviceIsBlackBerry10) {
                blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);
                if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
                    metaViewport = document.querySelector('meta[name=viewport]');
                    if (metaViewport) {
                        if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
                            return !0
                        }
                        if (document.documentElement.scrollWidth <= window.outerWidth) {
                            return !0
                        }
                    }
                }
            }
            if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
                return !0
            }
            firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];
            if (firefoxVersion >= 27) {
                metaViewport = document.querySelector('meta[name=viewport]');
                if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
                    return !0
                }
            }
            if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
                return !0
            }
            return !1
        };
        FastClick.attach = function(layer, options) {
            return new FastClick(layer, options)
        };
        if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
            define(function() {
                return FastClick
            })
        } else if (typeof module !== 'undefined' && module.exports) {
            module.exports = FastClick.attach;
            module.exports.FastClick = FastClick
        } else {
            window.FastClick = FastClick
        }
    }());
    (function(e, t) {
        "use strict";
        var n = e.History = e.History || {},
            r = e.jQuery;
        if (typeof n.Adapter != "undefined")
            throw new Error("History.js Adapter has already been loaded...");
        n.Adapter = {
            bind: function(e, t, n) {
                r(e).bind(t, n)
            },
            trigger: function(e, t, n) {
                r(e).trigger(t, n)
            },
            extractEventData: function(e, n, r) {
                var i = n && n.originalEvent && n.originalEvent[e] || r && r[e] || t;
                return i
            },
            onDomLoad: function(e) {
                r(e)
            }
        }, typeof n.init != "undefined" && n.init()
    })(window), function(e, t) {
        "use strict";
        var n = e.console || t,
            r = e.document,
            i = e.navigator,
            s = !1,
            o = e.setTimeout,
            u = e.clearTimeout,
            a = e.setInterval,
            f = e.clearInterval,
            l = e.JSON,
            c = e.alert,
            h = e.History = e.History || {},
            p = e.history;
        try {
            s = e.sessionStorage, s.setItem("TEST", "1"), s.removeItem("TEST")
        } catch (d) {
            s = !1
        }
        l.stringify = l.stringify || l.encode, l.parse = l.parse || l.decode;
        if (typeof h.init != "undefined")
            throw new Error("History.js Core has already been loaded...");
        h.init = function(e) {
            return typeof h.Adapter == "undefined" ? !1 : (typeof h.initCore != "undefined" && h.initCore(), typeof h.initHtml4 != "undefined" && h.initHtml4(), !0)
        }, h.initCore = function(d) {
            if (typeof h.initCore.initialized != "undefined")
                return !1;
            h.initCore.initialized = !0, h.options = h.options || {}, h.options.hashChangeInterval = h.options.hashChangeInterval || 100, h.options.safariPollInterval = h.options.safariPollInterval || 500, h.options.doubleCheckInterval = h.options.doubleCheckInterval || 500, h.options.disableSuid = h.options.disableSuid || !1, h.options.storeInterval = h.options.storeInterval || 1e3, h.options.busyDelay = h.options.busyDelay || 250, h.options.debug = h.options.debug || !1, h.options.initialTitle = h.options.initialTitle || r.title, h.options.html4Mode = h.options.html4Mode || !1, h.options.delayInit = h.options.delayInit || !1, h.intervalList = [], h.clearAllIntervals = function() {
                var e,
                    t = h.intervalList;
                if (typeof t != "undefined" && t !== null) {
                    for (e = 0; e < t.length; e++)
                        f(t[e]);
                    h.intervalList = null
                }
            }, h.debug = function() {
                (h.options.debug || !1) && h.log.apply(h, arguments)
            }, h.log = function() {
                var e = typeof n != "undefined" && typeof n.log != "undefined" && typeof n.log.apply != "undefined",
                    t = r.getElementById("log"),
                    i,
                    s,
                    o,
                    u,
                    a;
                e ? (u = Array.prototype.slice.call(arguments), i = u.shift(), typeof n.debug != "undefined" ? n.debug.apply(n, [i, u]) : n.log.apply(n, [i, u])) : i = "\n" + arguments[0] + "\n";
                for (s = 1, o = arguments.length; s < o; ++s) {
                    a = arguments[s];
                    if (typeof a == "object" && typeof l != "undefined")
                        try {
                            a = l.stringify(a)
                        } catch (f) {}
                    i += "\n" + a + "\n"
                }
                return t ? (t.value += i + "\n-----\n", t.scrollTop = t.scrollHeight - t.clientHeight) : e || c(i), !0
            }, h.getInternetcuratedProductrMajorVersion = function() {
                var e = h.getInternetcuratedProductrMajorVersion.cached = typeof h.getInternetcuratedProductrMajorVersion.cached != "undefined" ? h.getInternetcuratedProductrMajorVersion.cached : function() {
                    var e = 3,
                        t = r.createElement("div"),
                        n = t.getElementsByTagName("i");
                    while ((t.innerHTML = "<!--[if gt IE " + ++e + "]><i></i><![endif]-->") && n[0])
                        ;
                    return e > 4 ? e : !1
                }();
                return e
            }, h.isInternetcuratedProductr = function() {
                var e = h.isInternetcuratedProductr.cached = typeof h.isInternetcuratedProductr.cached != "undefined" ? h.isInternetcuratedProductr.cached : Boolean(h.getInternetcuratedProductrMajorVersion());
                return e
            }, h.options.html4Mode ? h.emulated = {
                pushState: !0,
                hashChange: !0
            } : h.emulated = {
                pushState: !Boolean(e.history && e.history.pushState && e.history.replaceState && !/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(i.userAgent) && !/AppleWebKit\/5([0-2]|3[0-2])/i.test(i.userAgent)),
                hashChange: Boolean(!("onhashchange" in e || "onhashchange" in r) || h.isInternetcuratedProductr() && h.getInternetcuratedProductrMajorVersion() < 8)
            }, h.enabled = !h.emulated.pushState, h.bugs = {
                setHash: Boolean(!h.emulated.pushState && i.vendor === "Apple Computer, Inc." && /AppleWebKit\/5([0-2]|3[0-3])/.test(i.userAgent)),
                safariPoll: Boolean(!h.emulated.pushState && i.vendor === "Apple Computer, Inc." && /AppleWebKit\/5([0-2]|3[0-3])/.test(i.userAgent)),
                ieDoubleCheck: Boolean(h.isInternetcuratedProductr() && h.getInternetcuratedProductrMajorVersion() < 8),
                hashEscape: Boolean(h.isInternetcuratedProductr() && h.getInternetcuratedProductrMajorVersion() < 7)
            }, h.isEmptyObject = function(e) {
                for (var t in e)
                    if (e.hasOwnProperty(t))
                        return !1;
                return !0
            }, h.cloneObject = function(e) {
                var t,
                    n;
                return e ? (t = l.stringify(e), n = l.parse(t)) : n = {}, n
            }, h.getRootUrl = function() {
                var e = r.location.protocol + "//" + (r.location.hostname || r.location.host);
                if (r.location.port || !1)
                    e += ":" + r.location.port;
                return e += "/", e
            }, h.getBaseHref = function() {
                var e = r.getElementsByTagName("base"),
                    t = null,
                    n = "";
                return e.length === 1 && (t = e[0], n = t.href.replace(/[^\/]+$/, "")), n = n.replace(/\/+$/, ""), n && (n += "/"), n
            }, h.getBaseUrl = function() {
                var e = h.getBaseHref() || h.getBasePageUrl() || h.getRootUrl();
                return e
            }, h.getPageUrl = function() {
                var e = h.getState(!1, !1),
                    t = (e || {}).url || h.getLocationHref(),
                    n;
                return n = t.replace(/\/+$/, "").replace(/[^\/]+$/, function(e, t, n) {
                    return /\./.test(e) ? e : e + "/"
                }), n
            }, h.getBasePageUrl = function() {
                var e = h.getLocationHref().replace(/[#\?].*/, "").replace(/[^\/]+$/, function(e, t, n) {
                    return /[^\/]$/.test(e) ? "" : e
                }).replace(/\/+$/, "") + "/";
                return e
            }, h.getFullUrl = function(e, t) {
                var n = e,
                    r = e.substring(0, 1);
                return t = typeof t == "undefined" ? !0 : t, /[a-z]+\:\/\//.test(e) || (r === "/" ? n = h.getRootUrl() + e.replace(/^\/+/, "") : r === "#" ? n = h.getPageUrl().replace(/#.*/, "") + e : r === "?" ? n = h.getPageUrl().replace(/[\?#].*/, "") + e : t ? n = h.getBaseUrl() + e.replace(/^(\.\/)+/, "") : n = h.getBasePageUrl() + e.replace(/^(\.\/)+/, "")), n.replace(/\#$/, "")
            }, h.getShortUrl = function(e) {
                var t = e,
                    n = h.getBaseUrl(),
                    r = h.getRootUrl();
                return h.emulated.pushState && (t = t.replace(n, "")), t = t.replace(r, "/"), h.isTraditionalAnchor(t) && (t = "./" + t), t = t.replace(/^(\.\/)+/g, "./").replace(/\#$/, ""), t
            }, h.getLocationHref = function(e) {
                return e = e || r, e.URL === e.location.href ? e.location.href : e.location.href === decodeURIComponent(e.URL) ? e.URL : e.location.hash && decodeURIComponent(e.location.href.replace(/^[^#]+/, "")) === e.location.hash ? e.location.href : e.URL.indexOf("#") == -1 && e.location.href.indexOf("#") != -1 ? e.location.href : e.URL || e.location.href
            }, h.store = {}, h.idToState = h.idToState || {}, h.stateToId = h.stateToId || {}, h.urlToId = h.urlToId || {}, h.storedStates = h.storedStates || [], h.savedStates = h.savedStates || [], h.normalizeStore = function() {
                h.store.idToState = h.store.idToState || {}, h.store.urlToId = h.store.urlToId || {}, h.store.stateToId = h.store.stateToId || {}
            }, h.getState = function(e, t) {
                typeof e == "undefined" && (e = !0), typeof t == "undefined" && (t = !0);
                var n = h.getLastSavedState();
                return !n && t && (n = h.createStateObject()), e && (n = h.cloneObject(n), n.url = n.cleanUrl || n.url), n
            }, h.getIdByState = function(e) {
                var t = h.extractId(e.url),
                    n;
                if (!t) {
                    n = h.getStateString(e);
                    if (typeof h.stateToId[n] != "undefined")
                        t = h.stateToId[n];
                    else if (typeof h.store.stateToId[n] != "undefined")
                        t = h.store.stateToId[n];
                    else {
                        for (;;) {
                            t = (new Date).getTime() + String(Math.random()).replace(/\D/g, "");
                            if (typeof h.idToState[t] == "undefined" && typeof h.store.idToState[t] == "undefined")
                                break
                        }
                        h.stateToId[n] = t, h.idToState[t] = e
                    }
                }
                return t
            }, h.normalizeState = function(e) {
                var t,
                    n;
                if (!e || typeof e != "object")
                    e = {};
                if (typeof e.normalized != "undefined")
                    return e;
                if (!e.data || typeof e.data != "object")
                    e.data = {};
                return t = {}, t.normalized = !0, t.title = e.title || "", t.url = h.getFullUrl(e.url ? e.url : h.getLocationHref()), t.hash = h.getShortUrl(t.url), t.data = h.cloneObject(e.data), t.id = h.getIdByState(t), t.cleanUrl = t.url.replace(/\??\&_suid.*/, ""), t.url = t.cleanUrl, n = !h.isEmptyObject(t.data), (t.title || n) && h.options.disableSuid !== !0 && (t.hash = h.getShortUrl(t.url).replace(/\??\&_suid.*/, ""), /\?/.test(t.hash) || (t.hash += "?"), t.hash += "&_suid=" + t.id), t.hashedUrl = h.getFullUrl(t.hash), (h.emulated.pushState || h.bugs.safariPoll) && h.hasUrlDuplicate(t) && (t.url = t.hashedUrl), t
            }, h.createStateObject = function(e, t, n) {
                var r = {
                    data: e,
                    title: t,
                    url: n
                };
                return r = h.normalizeState(r), r
            }, h.getStateById = function(e) {
                e = String(e);
                var n = h.idToState[e] || h.store.idToState[e] || t;
                return n
            }, h.getStateString = function(e) {
                var t,
                    n,
                    r;
                return t = h.normalizeState(e), n = {
                    data: t.data,
                    title: e.title,
                    url: e.url
                }, r = l.stringify(n), r
            }, h.getStateId = function(e) {
                var t,
                    n;
                return t = h.normalizeState(e), n = t.id, n
            }, h.getHashByState = function(e) {
                var t,
                    n;
                return t = h.normalizeState(e), n = t.hash, n
            }, h.extractId = function(e) {
                var t,
                    n,
                    r,
                    i;
                return e.indexOf("#") != -1 ? i = e.split("#")[0] : i = e, n = /(.*)\&_suid=([0-9]+)$/.exec(i), r = n ? n[1] || e : e, t = n ? String(n[2] || "") : "", t || !1
            }, h.isTraditionalAnchor = function(e) {
                var t = !/[\/\?\.]/.test(e);
                return t
            }, h.extractState = function(e, t) {
                var n = null,
                    r,
                    i;
                return t = t || !1, r = h.extractId(e), r && (n = h.getStateById(r)), n || (i = h.getFullUrl(e), r = h.getIdByUrl(i) || !1, r && (n = h.getStateById(r)), !n && t && !h.isTraditionalAnchor(e) && (n = h.createStateObject(null, null, i))), n
            }, h.getIdByUrl = function(e) {
                var n = h.urlToId[e] || h.store.urlToId[e] || t;
                return n
            }, h.getLastSavedState = function() {
                return h.savedStates[h.savedStates.length - 1] || t
            }, h.getLastStoredState = function() {
                return h.storedStates[h.storedStates.length - 1] || t
            }, h.hasUrlDuplicate = function(e) {
                var t = !1,
                    n;
                return n = h.extractState(e.url), t = n && n.id !== e.id, t
            }, h.storeState = function(e) {
                return h.urlToId[e.url] = e.id, h.storedStates.push(h.cloneObject(e)), e
            }, h.isLastSavedState = function(e) {
                var t = !1,
                    n,
                    r,
                    i;
                return h.savedStates.length && (n = e.id, r = h.getLastSavedState(), i = r.id, t = n === i), t
            }, h.saveState = function(e) {
                return h.isLastSavedState(e) ? !1 : (h.savedStates.push(h.cloneObject(e)), !0)
            }, h.getStateByIndex = function(e) {
                var t = null;
                return typeof e == "undefined" ? t = h.savedStates[h.savedStates.length - 1] : e < 0 ? t = h.savedStates[h.savedStates.length + e] : t = h.savedStates[e], t
            }, h.getCurrentIndex = function() {
                var e = null;
                return h.savedStates.length < 1 ? e = 0 : e = h.savedStates.length - 1, e
            }, h.getHash = function(e) {
                var t = h.getLocationHref(e),
                    n;
                return n = h.getHashByUrl(t), n
            }, h.unescapeHash = function(e) {
                var t = h.normalizeHash(e);
                return t = decodeURIComponent(t), t
            }, h.normalizeHash = function(e) {
                var t = e.replace(/[^#]*#/, "").replace(/#.*/, "");
                return t
            }, h.setHash = function(e, t) {
                var n,
                    i;
                return t !== !1 && h.busy() ? (h.pushQueue({
                    scope: h,
                    callback: h.setHash,
                    args: arguments,
                    queue: t
                }), !1) : (h.busy(!0), n = h.extractState(e, !0), n && !h.emulated.pushState ? h.pushState(n.data, n.title, n.url, !1) : h.getHash() !== e && (h.bugs.setHash ? (i = h.getPageUrl(), h.pushState(null, null, i + "#" + e, !1)) : r.location.hash = e), h)
            }, h.escapeHash = function(t) {
                var n = h.normalizeHash(t);
                return n = e.encodeURIComponent(n), h.bugs.hashEscape || (n = n.replace(/\%21/g, "!").replace(/\%26/g, "&").replace(/\%3D/g, "=").replace(/\%3F/g, "?")), n
            }, h.getHashByUrl = function(e) {
                var t = String(e).replace(/([^#]*)#?([^#]*)#?(.*)/, "$2");
                return t = h.unescapeHash(t), t
            }, h.setTitle = function(e) {
                var t = e.title,
                    n;
                t || (n = h.getStateByIndex(0), n && n.url === e.url && (t = n.title || h.options.initialTitle));
                try {
                    r.getElementsByTagName("title")[0].innerHTML = t.replace("<", "&lt;").replace(">", "&gt;").replace(" & ", " &amp; ")
                } catch (i) {}
                return r.title = t, h
            }, h.queues = [], h.busy = function(e) {
                typeof e != "undefined" ? h.busy.flag = e : typeof h.busy.flag == "undefined" && (h.busy.flag = !1);
                if (!h.busy.flag) {
                    u(h.busy.timeout);
                    var t = function() {
                        var e,
                            n,
                            r;
                        if (h.busy.flag)
                            return;
                        for (e = h.queues.length - 1; e >= 0; --e) {
                            n = h.queues[e];
                            if (n.length === 0)
                                continue;
                            r = n.shift(), h.fireQueueItem(r), h.busy.timeout = o(t, h.options.busyDelay)
                        }
                    };
                    h.busy.timeout = o(t, h.options.busyDelay)
                }
                return h.busy.flag
            }, h.busy.flag = !1, h.fireQueueItem = function(e) {
                return e.callback.apply(e.scope || h, e.args || [])
            }, h.pushQueue = function(e) {
                return h.queues[e.queue || 0] = h.queues[e.queue || 0] || [], h.queues[e.queue || 0].push(e), h
            }, h.queue = function(e, t) {
                return typeof e == "function" && (e = {
                    callback: e
                }), typeof t != "undefined" && (e.queue = t), h.busy() ? h.pushQueue(e) : h.fireQueueItem(e), h
            }, h.clearQueue = function() {
                return h.busy.flag = !1, h.queues = [], h
            }, h.stateChanged = !1, h.doubleChecker = !1, h.doubleCheckComplete = function() {
                return h.stateChanged = !0, h.doubleCheckClear(), h
            }, h.doubleCheckClear = function() {
                return h.doubleChecker && (u(h.doubleChecker), h.doubleChecker = !1), h
            }, h.doubleCheck = function(e) {
                return h.stateChanged = !1, h.doubleCheckClear(), h.bugs.ieDoubleCheck && (h.doubleChecker = o(function() {
                    return h.doubleCheckClear(), h.stateChanged || e(), !0
                }, h.options.doubleCheckInterval)), h
            }, h.safariStatePoll = function() {
                var t = h.extractState(h.getLocationHref()),
                    n;
                if (!h.isLastSavedState(t))
                    return n = t, n || (n = h.createStateObject()), h.Adapter.trigger(e, "popstate"), h;
                return
            }, h.back = function(e) {
                return e !== !1 && h.busy() ? (h.pushQueue({
                    scope: h,
                    callback: h.back,
                    args: arguments,
                    queue: e
                }), !1) : (h.busy(!0), h.doubleCheck(function() {
                    h.back(!1)
                }), p.go(-1), !0)
            }, h.forward = function(e) {
                return e !== !1 && h.busy() ? (h.pushQueue({
                    scope: h,
                    callback: h.forward,
                    args: arguments,
                    queue: e
                }), !1) : (h.busy(!0), h.doubleCheck(function() {
                    h.forward(!1)
                }), p.go(1), !0)
            }, h.go = function(e, t) {
                var n;
                if (e > 0)
                    for (n = 1; n <= e; ++n)
                        h.forward(t);
                else {
                    if (!(e < 0))
                        throw new Error("History.go: History.go requires a positive or negative integer passed.");
                    for (n = -1; n >= e; --n)
                        h.back(t)
                }
                return h
            };
            if (h.emulated.pushState) {
                var v = function() {};
                h.pushState = h.pushState || v, h.replaceState = h.replaceState || v
            } else
                h.onPopState = function(t, n) {
                    var r = !1,
                        i = !1,
                        s,
                        o;
                    return h.doubleCheckComplete(), s = h.getHash(), s ? (o = h.extractState(s || h.getLocationHref(), !0), o ? h.replaceState(o.data, o.title, o.url, !1) : (h.Adapter.trigger(e, "anchorchange"), h.busy(!1)), h.expectedStateId = !1, !1) : (r = h.Adapter.extractEventData("state", t, n) || !1, r ? i = h.getStateById(r) : h.expectedStateId ? i = h.getStateById(h.expectedStateId) : i = h.extractState(h.getLocationHref()), i || (i = h.createStateObject(null, null, h.getLocationHref())), h.expectedStateId = !1, h.isLastSavedState(i) ? (h.busy(!1), !1) : (h.storeState(i), h.saveState(i), h.setTitle(i), h.Adapter.trigger(e, "statechange"), h.busy(!1), !0))
                }, h.Adapter.bind(e, "popstate", h.onPopState), h.pushState = function(t, n, r, i) {
                    if (h.getHashByUrl(r) && h.emulated.pushState)
                        throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                    if (i !== !1 && h.busy())
                        return h.pushQueue({
                            scope: h,
                            callback: h.pushState,
                            args: arguments,
                            queue: i
                        }), !1;
                    h.busy(!0);
                    var s = h.createStateObject(t, n, r);
                    return h.isLastSavedState(s) ? h.busy(!1) : (h.storeState(s), h.expectedStateId = s.id, p.pushState(s.id, s.title, s.url), h.Adapter.trigger(e, "popstate")), !0
                }, h.replaceState = function(t, n, r, i) {
                    if (h.getHashByUrl(r) && h.emulated.pushState)
                        throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                    if (i !== !1 && h.busy())
                        return h.pushQueue({
                            scope: h,
                            callback: h.replaceState,
                            args: arguments,
                            queue: i
                        }), !1;
                    h.busy(!0);
                    var s = h.createStateObject(t, n, r);
                    return h.isLastSavedState(s) ? h.busy(!1) : (h.storeState(s), h.expectedStateId = s.id, p.replaceState(s.id, s.title, s.url), h.Adapter.trigger(e, "popstate")), !0
                };
            if (s) {
                try {
                    h.store = l.parse(s.getItem("History.store")) || {}
                } catch (m) {
                    h.store = {}
                }
                h.normalizeStore()
            } else
                h.store = {}, h.normalizeStore();
            h.Adapter.bind(e, "unload", h.clearAllIntervals), h.saveState(h.storeState(h.extractState(h.getLocationHref(), !0))), s && (h.onUnload = function() {
                var e,
                    t,
                    n;
                try {
                    e = l.parse(s.getItem("History.store")) || {}
                } catch (r) {
                    e = {}
                }
                e.idToState = e.idToState || {}, e.urlToId = e.urlToId || {}, e.stateToId = e.stateToId || {};
                for (t in h.idToState) {
                    if (!h.idToState.hasOwnProperty(t))
                        continue;
                    e.idToState[t] = h.idToState[t]
                }
                for (t in h.urlToId) {
                    if (!h.urlToId.hasOwnProperty(t))
                        continue;
                    e.urlToId[t] = h.urlToId[t]
                }
                for (t in h.stateToId) {
                    if (!h.stateToId.hasOwnProperty(t))
                        continue;
                    e.stateToId[t] = h.stateToId[t]
                }
                h.store = e, h.normalizeStore(), n = l.stringify(e);
                try {
                    s.setItem("History.store", n)
                } catch (i) {
                    if (i.code !== DOMException.QUOTA_EXCEEDED_ERR)
                        throw i;
                    s.length && (s.removeItem("History.store"), s.setItem("History.store", n))
                }
            }, h.intervalList.push(a(h.onUnload, h.options.storeInterval)), h.Adapter.bind(e, "beforeunload", h.onUnload), h.Adapter.bind(e, "unload", h.onUnload));
            if (!h.emulated.pushState) {
                h.bugs.safariPoll && h.intervalList.push(a(h.safariStatePoll, h.options.safariPollInterval));
                if (i.vendor === "Apple Computer, Inc." || (i.appCodeName || "") === "Mozilla")
                    h.Adapter.bind(e, "hashchange", function() {
                        h.Adapter.trigger(e, "popstate")
                    }), h.getHash() && h.Adapter.onDomLoad(function() {
                        h.Adapter.trigger(e, "hashchange")
                    })
            }
        }, (!h.options || !h.options.delayInit) && h.init()
    }(window);
    var AboutViewController,
        AppUtils,
        CoverAnimate,
        curatedProductViewController,
        DATA,
        DETECT,
        DOM,
        DimmLayer,
        GnbController,
        GnbIcon,
        IndexViewController,
        InvertDeltaPlugin,
        Loading,
        basket,
        basketViewController,
        Popup,
        RootViewController,
        STAGE,
        SVG,
        SharedEvent,
        SnackBar,
        Sorry,
        StateController,
        TextAnimate,
        Utils,
        Wave,
        _visibilityPrefix,
        canvas,
        clone,
        color,
        cubicBezier,
        dom,
        removeClass,
        support,
        thisAsThat,
        transitionEndNames,
        ui,
        vh,
        vw;
    window.requestAnimationFrame = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(f) {
                return window.setTimeout(f, 1e3 / 60)
            }
    })();
    dom = document.createElement('div');
    canvas = document.createElement('canvas');
    Utils = {
        getHashValue: function(hash, name) {
            var regex,
                regexS,
                results;
            name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            regexS = '[\\?&]' + name + '=([^&#]*)';
            regex = new RegExp(regexS);
            results = regex.exec(hash);
            if (results === null) {
                return ''
            } else {
                return results[1]
            }
        },
        shuffle: function(array) {
            var current,
                tmp,
                top;
            tmp = void 0;
            current = void 0;
            top = array.length;
            if (top) {
                while (--top) {
                    current = Math.floor(Math.random() * (top + 1));
                    tmp = array[current];
                    array[current] = array[top];
                    array[top] = tmp
                }
            }
            return array
        },
        checkHighDensity: function() {
            return window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches) || window.devicePixelRatio && window.devicePixelRatio > 1.3
        },
        checkRetina: function() {
            return (window.matchMedia && (window.matchMedia('only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx), only screen and (min-resolution: 75.6dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min--moz-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2)').matches) || window.devicePixelRatio && window.devicePixelRatio >= 2) && /(iPad|iPhone|iPod)/g.test(navigator.userAgent)
        },
        getScreenSize: function() {
            return {
                w: window.innerWidth,
                h: window.innerHeight
            }
        },
        getElemSize: function(el) {
            return {
                w: el.width(),
                h: el.height()
            }
        },
        delay: function(fn, time) {
            time * 1000;
            return setTimeout(function() {
                return fn()
            }, time)
        },
        loadJSON: function(uri, callback, errorCallBack) {
            var xtr;
            xtr = new XMLHttpRequest;
            xtr.open('GET', uri, !0);
            xtr.onreadystatechange = function() {
                var data;
                if (xtr.readyState === 4) {
                    if (xtr.status === 200) {
                        data = JSON.parse(xtr.response);
                        return callback(data)
                    } else {
                        if (errorCallBack != null) {
                            return errorCallBack()
                        }
                    }
                }
            };
            return xtr.send(null)
        },
        randomInt: function(min, max) {
            return Math.floor(Math.random() * (max - min)) + min
        },
        limitMaxMin: function(value, max, min) {
            return Math.min(Math.max(parseInt(value), min), max)
        },
        limitMax: function(value, max) {
            if (value > max) {
                return value = max
            } else {
                return value
            }
        },
        limitMin: function(value, min) {
            if (value < min) {
                return value = min
            } else {
                return value
            }
        },
        getBrowserPropertyName: function(prop) {
            var _prop,
                j,
                len,
                vendor,
                vendorProp,
                vendors;
            if (prop in dom.style) {
                return prop
            }
            vendors = ['Moz', 'Webkit', 'O', 'ms'];
            _prop = prop.charAt(0).toUpperCase() + prop.substr(1);
            for (j = 0, len = vendors.length; j < len; j++) {
                vendor = vendors[j];
                vendorProp = vendor + _prop;
                if (vendorProp in dom.style) {
                    return vendorProp
                }
            }
        },
        checkTransition3d: function() {
            dom.style[DETECT.transform] = "translate3d(0px, 0px, 0px)";
            return dom.style[DETECT.transform] !== ''
        },
        checkCanvas: function() {
            return canvas.getContext && canvas.getContext('2d') !== void 0
        },
        getIEVersion: function() {
            var Idx,
                sAgent;
            sAgent = window.navigator.userAgent;
            Idx = sAgent.indexOf('MSIE');
            if (Idx > 0) {
                return parseInt(sAgent.substring(Idx + 5, sAgent.indexOf('.', Idx)))
            } else if (!!navigator.userAgent.match(/Trident\/7\./)) {
                return 11
            } else {
                return !1
            }
        },
        checkMS: function() {
            if (document.documentMode || /Edge/.test(navigator.userAgent)) {
                return !0
            } else {
                return !1
            }
        },
        checkSmall: function() {
            if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return !0
            } else {
                return !1
            }
        },
        checkMobile: function() {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return !0
            } else {
                return !1
            }
        },
        getVisibilityPrefix: function() {
            var _hidden,
                _visibilityChange;
            _hidden = "";
            _visibilityChange = "";
            if (document.hidden !== null) {
                _hidden = 'hidden';
                _visibilityChange = "visibilitychange"
            } else if (document.msHidden !== null) {
                _hidden = "msHidden";
                _visibilityChange = "msvisibilitychange"
            }
            return [_hidden, _visibilityChange]
        }
    };
    transitionEndNames = {
        'transition': 'transitionend',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'WebkitTransition': 'webkitTransitionEnd',
        'msTransition': 'MSTransitionEnd'
    };
    DETECT = {
        transition: Utils.getBrowserPropertyName("transition"),
        delay: Utils.getBrowserPropertyName("transitionDelay"),
        transform: Utils.getBrowserPropertyName("transform"),
        ease: Utils.getBrowserPropertyName("transitionTimingFunction"),
        transformOrigin: Utils.getBrowserPropertyName("transformOrigin"),
        duration: Utils.getBrowserPropertyName("transitionDuration"),
        filter: Utils.getBrowserPropertyName("filter")
    };
    DETECT.transitionEnd = transitionEndNames[DETECT.transition];
    _visibilityPrefix = Utils.getVisibilityPrefix();
    DETECT.hidden = _visibilityPrefix[0];
    DETECT.visibilityChange = _visibilityPrefix[1];
    support = {
        SHARED_INSTANCE: null,
        isMobile: Utils.checkMobile(),
        isTouch: 'ontouchstart' in document.documentElement,
        transition3d: Utils.checkTransition3d(),
        canvas: Utils.checkCanvas(),
        isRetina: Utils.checkRetina(),
        isHighDensity: Utils.checkHighDensity(),
        isSmall: Utils.checkSmall(),
        isMS: Utils.checkMS()
    };
    console.log(support.isMS);
    thisAsThat = function(callback) {
        return function() {
            return callback.apply(null, [this].concat(arguments))
        }
    };
    cubicBezier = function(x1, y1, x2, y2) {
        var curveX,
            curveY,
            derivativeCurveX;
        curveX = function(t) {
            var v;
            v = 1 - t;
            return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t
        };
        curveY = function(t) {
            var v;
            v = 1 - t;
            return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t
        };
        derivativeCurveX = function(t) {
            var v;
            v = 1 - t;
            return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (-t * t * t + 2 * v * t) * x2
        };
        return function(t) {
            var x2;
            var d2,
                i,
                t0,
                t1,
                t2,
                x;
            x = t;
            i = d2 = x2 = t2 = t1 = t0 = void 0;
            t2 = x;
            i = 0;
            while (i < 8) {
                x2 = curveX(t2) - x;
                if (Math.abs(x2) < 0.002) {
                    return curveY(t2)
                }
                d2 = derivativeCurveX(t2);
                if (Math.abs(d2) < 1e-6) {
                    break
                }
                t2 = t2 - (x2 / d2);
                i++
            }
            t0 = 0;
            t1 = 1;
            t2 = x;
            if (t2 < t0) {
                return curveY(t0)
            }
            if (t2 > t1) {
                return curveY(t1)
            }
            while (t0 < t1) {
                x2 = curveX(t2);
                if (Math.abs(x2 - x) < 0.002) {
                    return curveY(t2)
                }
                if (x > x2) {
                    t0 = t2
                } else {
                    t1 = t2
                }
                t2 = (t1 - t0) * .5 + t0
            }
            return curveY(t2)
        }
    };
    removeClass = function(element, className) {
        var check;
        check = new RegExp('(\\s|^)' + className + '(\\s|$)');
        element.className = element.className.replace(check, ' ').trim()
    };
    clone = function(obj) {
        var attr,
            copy;
        if (null === obj || 'object' !== typeof obj) {
            return obj
        }
        copy = obj.constructor();
        for (attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = obj[attr]
            }
        }
        return copy
    };
    String.prototype.replaceAll = function(str1, str2, ignore) {
        return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, '\\$&'), ignore ? 'gi' : 'g'), typeof str2 === 'string' ? str2.replace(/\$/g, '$$$$') : str2)
    };
    vh = function(num) {
        var size;
        num /= 100;
        size = Utils.getScreenSize();
        return size.h * num
    };
    vw = function(num) {
        var size;
        num /= 100;
        size = Utils.getScreenSize();
        return size.w * num
    };
    dom = canvas = null;
    AppUtils = {
        convertNumberK: function(num) {
            if (num >= 1000) {
                return (num / 1000).toFixed(1) + "K"
            } else {
                return num
            }
        },
        convertDuration: function(num, isSec = !1) {
            var _full,
                _h,
                _m,
                _ret,
                _s;
            _full = null;
            if (isSec) {
                _full = num
            } else {
                _full = num / 1000
            }
            _m = Math.floor(_full / 60);
            _s = Math.ceil(_full % 60);
            _h = null;
            if (_m > 59) {
                _h = Math.ceil(_m / 60);
                _m = Math.ceil(_m % 60)
            }
            if (_s < 10) {
                _s = "0" + _s
            }
            if (_h !== null) {
                if (_m < 10) {
                    _m = "0" + _m
                }
                _ret = '${_h}:${_m}:${_s}'
            } else {
                if (_m < 10) {
                    _m = "0" + _m
                }
                _ret = '${_m}:${_s}'
            }
            return _ret
        }
    };
    InvertDeltaPlugin = (function() {
        class InvertDeltaPlugin extends Scrollbar.ScrollbarPlugin {
            transformDelta(delta, fromEvent)
            {
                if (this.shouldInvertDelta(fromEvent)) {
                    return {
                        x: delta.y,
                        y: delta.x
                    }
                }
                return delta
            }
            shouldInvertDelta(fromEvent)
            {
                return this.options.events.some((rule) => {return fromEvent.type.match(rule)})
            }
        }
        ;
        InvertDeltaPlugin.pluginName = 'invertDelta';
        InvertDeltaPlugin.defaultOptions = {
            events: []
        };
        return InvertDeltaPlugin
    }).call(this);
    Scrollbar.use(InvertDeltaPlugin);
    Scrollbar.use(OverscrollPlugin);
    STAGE = {};
    DATA = {
        GroupProducts: {},
        groupcuratedProductUsers: {},
        defaultTracks: {},
        tracks: {},
        nowTracks: [],
        currentNum: 0,
        _authUrl: null,
        _loading: null,
        config: {
            AUTHORIZATION_ENDPOINT: 'https://soundcloud.com/connect',
            RESOURCE_ENDPOINT: 'https://api.soundcloud.com/me',
            clientID: "cmSmzlorE2Sydh0SPDX285qwjVf9bQxJ",
            clientSecret: "8de14278685bbc8fe71a863008c06d9c",
            redirectURI: "http://127.0.0.1:5757/",
            userID: 269339,
            SfEID: 247407989,
            SfEExpandID: 292174084
        },
        auth: function() {
            var _authUrl;
            return _authUrl = DATA.config.AUTHORIZATION_ENDPOINT + '?response_type=token' + '&client_id=' + DATA.config.clientID + '&redirect_uri=' + DATA.config.redirectURI
        },
        getDefaultPlaylist: function() {
            var _uri,
                gotDefaultPlaylist;
            gotDefaultPlaylist = function(data) {
                var _tracks,
                    i,
                    j,
                    k,
                    len,
                    len1,
                    playlist,
                    ref,
                    track;
                console.log(data);
                _tracks = [];
                for (i = j = 0, len = data.length; j < len; i = ++j) {
                    playlist = data[i];
                    ref = playlist.tracks;
                    for (k = 0, len1 = ref.length; k < len1; k++) {
                        track = ref[k];
                        _tracks.push(track)
                    }
                }
                Utils.shuffle(_tracks);
                DATA.defaultTracks = _tracks;
                return basket.init(DATA.defaultTracks)
            };
            _uri = `http://api.soundcloud.com/users/${DATA.config.SfEID}/playlists?client_id=${DATA.config.clientID}`;
            return Utils.loadJSON(_uri, gotDefaultPlaylist)
        },
        getGroupProducts: function(callback) {
            var _loading,
                _uri,
                error,
                success;
            success = function(data) {
                _loading.hide();
                DATA.GroupProducts = data.collection;
                return callback()
            };
            error = function() {
                _loading.hide();
                return DATA.getError((function() {
                    return DATA.getGroupProducts(callback)
                }))
            };
            if (Object.keys(DATA.GroupProducts).length === 0) {
                _loading = new Loading;
                _uri = `http://api.soundcloud.com/users/${DATA.config.SfEID}/followings?client_id=${DATA.config.clientID}`;
                return Utils.loadJSON(_uri, success, error)
            } else {
                return callback()
            }
        },
        getcuratedProductProducts: function(callback) {
            var _loading,
                _uri,
                error,
                success;
            success = function(data) {
                _loading.hide();
                DATA.groupcuratedProductUsers = data.collection;
                return callback()
            };
            error = function() {
                _loading.hide();
                return DATA.getError((function() {
                    return DATA.getcuratedProductProducts(callback)
                }))
            };
            if (Object.keys(DATA.groupcuratedProductUsers).length === 0) {
                _loading = new Loading;
                _uri = `http://api.soundcloud.com/users/${DATA.config.SfEExpandID}/followings?client_id=${DATA.config.clientID}`;
                return Utils.loadJSON(_uri, success, error)
            } else {
                return callback()
            }
        }
    };
    SharedEvent = {
        getPointingOffset: function(evt) {
            var _x,
                _y;
            if (support.isTouch) {
                _x = evt[0].originalEvent.layerX;
                _y = evt[0].originalEvent.layerY;
                return {
                    x: _x,
                    y: _y
                }
            } else {
                _x = evt[0].offsetX;
                _y = evt[0].offsetY;
                return {
                    x: _x,
                    y: _y
                }
            }
        },
        addNoBounceEvent: function() {
            return document.addEventListener('touchmove', (function(event) {
                if (event.target.parentNode.className.indexOf('noBounce') !== -1 || event.target.className.indexOf('noBounce') !== -1) {
                    event.preventDefault();
                    return console.log("nobounce")
                }
            }), !1)
        },
        isScrollLock: !1,
        addVerticalScrollLock: function(_isScrollLock=!1) {
            var xStart,
                yStart;
            if (_isScrollLock) {
                SharedEvent.isScrollLock = !0
            }
            xStart = void 0;
            yStart = 0;
            $(document).on('touchstart', function(e) {
                xStart = e.originalEvent.touches[0].screenX;
                yStart = e.originalEvent.touches[0].screenY
            });
            return $(document).on('touchmove', function(e) {
                var xMovement,
                    yMovement;
                xMovement = Math.abs(e.originalEvent.touches[0].screenX - xStart);
                yMovement = Math.abs(e.originalEvent.touches[0].screenY - yStart);
                if (yMovement > xMovement) {
                    e.preventDefault()
                }
            })
        },
        removeVerticalScrollLock: function(_isScrollLock=!1) {
            if (_isScrollLock) {
                SharedEvent.isScrollLock = !1
            }
            $(document).off('touchstart');
            return $(document).off('touchmove')
        },
        scrollFix: function(elem) {
            var setNotToZero;
            elem.scrollTop = 1;
            setNotToZero = function() {
                var startTopScroll;
                startTopScroll = elem.scrollTop;
                if (startTopScroll <= 0) {
                    elem.scrollTop = 1
                }
                if (startTopScroll + elem.offsetHeight >= elem.scrollHeight) {
                    return elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1
                }
            };
            setNotToZero();
            elem = elem[0];
            if (!elem) {
                return
            }
            $(elem).on('touchstart', function(event) {
                return setNotToZero()
            });
            $(elem).on('scrollend', thisAsThat((that, evt) => {return setNotToZero()}));
            return $(elem).on('scroll', thisAsThat((that, evt) => {return setNotToZero()}))
        },
        getMainThumb: function(data) {
            var j,
                len,
                ref,
                track;
            if (data.artwork_url) {
                return data.artwork_url.replace('large', 't500x500')
            }
            ref = data.tracks;
            for (j = 0, len = ref.length; j < len; j++) {
                track = ref[j];
                if (track.artwork_url) {
                    return track.artwork_url.replace('large', 't500x500')
                }
            }
        },
        addSound: function() {
            return this.soundEvent(this.hSound)
        },
        addOpacity: function(el, opacity) {
            opacity = opacity != null ? opacity : 0.3;
            return TweenMax.fromTo(el, 0.3, {
                opacity: opacity
            }, {
                opacity: 1
            })
        },
        addTapEffect: function(el, scale=0.96, scaleOrigin=1) {
            el.on('mousedown touchstart', function(e) {
                return TweenMax.to(this, 0.2, {
                    scale: scale,
                    ease: Cubic.easeOut
                })
            });
            return el.on('mouseup mouseleave touchend', function(e) {
                return TweenMax.to(this, 0.3, {
                    scale: scaleOrigin,
                    ease: Cubic.easeOut
                })
            })
        },
        addClickSound: function() {
            return this.soundEvent(this.cSound)
        },
        soundEvent: function(soundObj) {
            if (!soundObj.paused) {
                soundObj.pause();
                soundObj.currentTime = 0;
                return soundObj.play()
            } else {
                return soundObj.play()
            }
        },
        setScroll: function(el, axisX) {
            if (support.isTouch) {
                if (axisX === !1) {
                    el.css({
                        'overflow-y': 'scroll',
                        '-webkit-overflow-scrolling': 'touch'
                    });
                    el.addClass('scroll');
                    return SharedEvent.scrollFix(el)
                } else if (axisX === !0) {
                    el.css({
                        'overflow-x': 'scroll',
                        '-webkit-overflow-scrolling': 'touch'
                    });
                    return SharedEvent.scrollFix(el)
                } else {
                    return el.css({
                        'overflow': 'scroll',
                        '-webkit-overflow-scrolling': 'touch'
                    })
                }
            } else {
                if (axisX === !0) {
                    return Scrollbar.init(el[0], {
                        plugins: {
                            invertDelta: {
                                events: [/wheel/]
                            }
                        }
                    })
                } else {
                    return Scrollbar.init(el[0])
                }
            }
        },
        moveWave: function(verticalRatio, duration) {
            var _backYpos,
                _marginTop,
                _yPos;
            this.verticalRatio = verticalRatio;
            duration = duration != null ? duration : 1;
            this.sSize = Utils.getScreenSize();
            _marginTop = $('#wave').height() / 2;
            _yPos = (this.sSize.h * this.verticalRatio) - _marginTop;
            _backYpos = (this.sSize.h * this.verticalRatio) - this.sSize.h / 2;
            this.waveMoving = TweenMax.to($('#wave'), duration, {
                y: _yPos,
                ease: Power2.easeInOut
            });
            return TweenMax.to($('#waveback'), duration, {
                y: _backYpos,
                ease: Power2.easeInOut
            })
        },
        resize: function() {
            if (STAGE.wave != null) {
                STAGE.wave.sizeUpdate()
            }
            return this.moveWave(this.verticalRatio, 0)
        },
        getScrollIndex: function(items) {
            var _screenWidthHalf,
                i,
                item,
                j,
                len;
            this.sSize = Utils.getScreenSize();
            _screenWidthHalf = this.sSize.w / 2;
            for (i = j = 0, len = items.length; j < len; i = ++j) {
                item = items[i];
                if (_screenWidthHalf < $(item).offset().left + $(item).width()) {
                    console.log(i);
                    return i
                }
            }
        },
        footer: {
            state: !0,
            hide: function() {
                return TweenMax.to($('footer'), 0.3, {
                    y: 30,
                    opacity: 0,
                    ease: Power2.easeIn
                })
            },
            show: function() {
                return TweenMax.to($('footer'), 0.5, {
                    y: 0,
                    opacity: .38,
                    ease: Power2.easeOut
                })
            },
            gnbShow: function() {
                SharedEvent.footer.color(color.black);
                return TweenMax.to($('footer'), 0.5, {
                    y: 0,
                    opacity: 1,
                    ease: Power2.easeOut,
                    color: color.xanadu
                })
            },
            color: function(_color) {
                return TweenMax.to($('footer, footer path'), 0.5, {
                    color: _color,
                    delay: 0.2,
                    fill: _color
                })
            }
        },
        navigator: {
            backState: !1,
            backCount: 0,
            addBackButton: function() {
                $('.back_button').remove();
                STAGE.gnb.textAnim.randomise("", color.black);
                $('#header').append(DOM.backButton);
                SharedEvent.addTapEffect($('.back_button'), 0.92);
                $('.back_button').on('click', function() {
                    SharedEvent.navigator.backCount -= 2;
                    History.back();
                    return ga('send', 'event', 'button', 'click', "Backbutton Click")
                });
                return $('.back_button').on('mouseenter', function() {
                    return SharedEvent.addOpacity($('.back_button'))
                })
            },
            setDefault: function() {
                STAGE.gnb.textAnim.randomise("", color.capstoneRed);
                return $('.back_button').remove()
            },
            setIndex: function() {
                SharedEvent.navigator.backState = !1;
                STAGE.gnb.textAnim.randomise("Capstone", color.black);
                return $('.back_button').remove()
            },
            setBack: function() {
                SharedEvent.navigator.backState = !0;
                SharedEvent.navigator.addBackButton();
                return TweenMax.from($('.back_button'), 1, {
                    x: 30,
                    opacity: 0,
                    ease: Expo.easeOut
                })
            },
            setBackInstant: function() {
                return SharedEvent.navigator.addBackButton()
            }
        }
    };
    SVG = {
        close: '<svg width="14px" height="14px" viewBox="58 58 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="close" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(60.000000, 60.000000)" stroke-linecap="round" stroke-linejoin="round"> <path d="M0,0 L10,10" id="Path-3" stroke="#333" stroke-width="2.5"></path> <path d="M0,10 L10,0" id="Path-3" stroke="#333" stroke-width="2.5"></path> </g> </svg>',
        back: '<svg width="6px" height="12px" viewBox="7 6 8 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <polyline id="Path-2" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none" points="12.9817281 8 9 11.9817281 12.9794051 15.9611333"></polyline> </svg>',
        indexLine: '<svg id="indexline" style="display: block;"><desc>Created with Snap</desc><defs></defs><rect x="0" y="0" width="100%" height="1" rx="1" ry="1" fill="#333" data-svg-origin="0 50.81600036621094" style="opacity: 1; transform: matrix(1, 0, 0, 1, 0, 0);"></rect></svg>',
        gnbIcon: '<svg id="gnb_svg" width="40px" height="40px" class="gnb_svg pointer" style="opacity: 1;"><desc>Rob K created with Snap</desc><defs></defs><g transform="matrix(1,0,0,1,8,12)"><rect x="0" y="0" width="24" height="2" rx="1" ry="1" data-svg-origin="12 1" style="transform: matrix(1, 0, 0, 1, 0, 0); transform-origin: 0px 0px 0px; opacity: 1;"></rect><rect x="0" y="7" width="24" height="2" rx="1" ry="1" data-svg-origin="12 8" style="transform: matrix(1, 0, 0, 1, 0, 0); transform-origin: 0px 0px 0px; opacity: 1;"></rect><rect x="0" y="14" width="16" height="2" rx="1" ry="1" data-svg-origin="8 15" style="transform: matrix(1, 0, 0, 1, 0, 0); transform-origin: 0px 0px 0px; opacity: 1;"></rect></g></svg>',
        indexBtn: '<div class="indexbtn"> <?xml version="1.0" encoding="UTF-8" standalone="no"?> <div class="wrapper"> <svg id="playmini" width="9px" height="14px" viewBox="0 0 9 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="Symbols" stroke="none" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"> <g id="play_svg" stroke-width="2"> <polyline id="Path-7" points="1.28303023 1.16256382 7.78303023 6.6486721 1.28303023 12.1486721 1.28303023"></polyline> </g> </g> </svg> </div> </div>',
        goSvg: '<!-- list --> <div class="svg_list"> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="35px" height="30px" viewBox="0 0 75 70" style="enable-background:new 0 0 98 98;" xml:space="preserve"><g class="list_btn" stroke="none" stroke-width="1" fill="none" fill-rule="nonezero"> <g id="list_fill" fill="#333"><path d="M74.7,20 C74.4,19.5 73.8,19.2 73.2,19.2 L67.2,19.2 L51.9,0.8 C51.2,-0.1 49.9,-0.2 49,0.6 C48.1,1.3 48,2.6 48.8,3.5 L62.1,19.4 L13.1,19.4 L26.4,3.5 C27,2.6 26.9,1.4 26.1,0.6 C25.3,-0.1 24.1,2.77555756e-15 23.4,0.8 C23.4,0.8 23.3,0.9 23.3,0.9 L8,19.2 L2.8,19.2 C2.2,19.2 1.6,19.5 1.3,20 C0.9,20.4 0.7,21.1 0.9,21.7 L8.8,56.4 C9.5,59.6 12.3,61.8 15.6,61.8 L60.4,61.8 C63.7,61.8 66.5,59.6 67.2,56.4 L75.1,21.7 C75.3,21.1 75.1,20.4 74.7,20 Z M63.3,55.6 C63,57 61.8,57.9 60.4,57.9 L15.6,57.9 C14.2,57.9 13,57 12.7,55.6 L5.3,23.3 L70.7,23.3 L63.3,55.6 Z"/></g></g></svg> </div>'
    };
    ui = {
        itemSize: 146,
        itemMargin: 3.5
    };
    color = {
        black: "#333",
        white: "#fff",
        xiketic: "#1b1725",
        ghost: "#f9f9f9",
        xanadu: "#798478",
        deepSaffron: "#f9a03f",
        capstoneRed: "#f82435",
        imperialRed: "#f82435",
        realBlack: "#252120",
        grey: "rgba(255,255,255,0.1)",
        dimm: "rgba(248,36,53,0.1)",
        background: "#f3f4f5",
        gnbText: "#CF556C"
    };
    DOM = {
        sorry: '<div class="sorrywrapper"> <ul class="sorry"> <li class="title">Sorry.</li> <li class="desc">This website is not supported in your browser. Please use <a href="https://www.google.co.uk/chrome/" target="_blank">Google Chrome</a> or another webkit based browser like a normal person.<br><br>Thank you, Rob</li> </ul> </div>',
        backButton: `<div class='back_button'><div class='circle'>${SVG.back}</div><div class='text'>Back</div></div>`,
        about: '<div id="about" class="page noBounce" data-scrollbar> <div class="about_wrapper"> <div class="title">Fit for life.</div> <div class="line"></div> <div class="desc">CSGL is an uprising retailer of fashionable sports and casual wear, offering access to a huge range of quality sports goods for both men and women, arranged and delivered to your door from our extensive online catalogue.<br><br>Established in 2020 by four graduates, the idea for Capstone came about following the Coronavirus lockdown, as a way to ease the means of shopping. We operate completely online from our base in Manchester.<br><br> With prospects to build outlets for retail in all the regions of the UK, we aim to expand our diverse range of high-quality products to people across the globe.</div> </div> </div>',
        womenswear: '<div id="womenswear" class="page noBounce" data-scrollbar> <div class="womenswear_wrapper"> <div class="title">Womens</div> <div class="desc">Here is our collection of womens clothing</div><div class="line"></div> <div class="products"><div class="product"><div class="image"><img src="assets/images/women/tshirt.jpg"/></div><div class="desc"><div class="title">T-Shirt - £19.99</div><div class="price">Clean and classic, made from soft cotton fabric</div></div> </div><div class="product"><div class="image"><img src="assets/images/women/hoodie.jpg"/></div><div class="desc"><div class="title">Hoodie - £24.99</div><div class="price">Essential for your wardrobe</div></div> </div><div class="product"><div class="image"><img src="assets/images/women/joggers.jpg"/></div><div class="desc"><div class="title">Joggers - £24.99</div><div class="price">Made from soft cotton, perfect for your gym routine</div></div> </div><div class="product"><div class="image"><img src="assets/images/women/shoes.jpg"/></div><div class="desc"><div class="title">Trainers - £24.99</div><div class="price">Our trainers are made for adventure, style and comfort!</div></div> </div><div class="product"><div class="image"><img src="assets/images/women/cap.jpg"/></div><div class="desc"><div class="title">Cap - £19.99</div><div class="price">Finish your look with our classic cap</div></div> </div></div> </div> </div>',
        menswear: '<div id="menswear" class="page noBounce" data-scrollbar> <div class="menswear_wrapper"> <div class="title">Mens</div> <div class="line"></div> <div class="products"><div class="product"><div class="image"><img src="assets/images/men/tshirt.jpg"/></div><div class="desc"><div class="title">T-Shirt - £19.99</div><div class="price">Clean and classic! The CS T-shirts are made from soft-cotton fabric</div></div> </div><div class="product"><div class="image"><img src="assets/images/men/hoodie.jpg"/></div><div class="desc"><div class="title">Hoodie - £24.99</div><div class="price">Keep warm this winter with our very own Capstone Sports Hoodie!</div></div> </div><div class="product"><div class="image"><img src="assets/images/men/joggers.jpg"/></div><div class="desc"><div class="title">Joggers - £24.99</div><div class="price">Made from 100% cotton and are known to be very comfy for your gym routine.</div></div> </div><div class="product"><div class="image"><img src="assets/images/men/shoes.jpg"/></div><div class="desc"><div class="title">Trainers - £24.99</div><div class="price">Our Brand new CS trainers are made for adventure, style and comfort!</div></div> </div><div class="product"><div class="image"><img src="assets/images/men/cap.jpg"/></div><div class="desc"><div class="title">Wooly Hat - £19.99</div><div class="price">Start your winter off with a stylish new woolly hat!</div></div> </div></div> </div> </div>',
        contact: '<div id="contact" class="page noBounce"> <div class="contact_wrapper"> <div class="title">Get in touch.</div> <div class="column1"> <h2>Customer Service</h2><p>0161 778 4565</p><h2>Email Us</h2> <a href="mailto:hello@capstonesports.com">hello@capstonesports.com</a><p>We will try to get back to you in 24 hours.</p></div> <div class="column2">  <h2>Write to Us</h2><p>If you would like to write to us you can do so at the below address:</p><p class="address">Capstone Sports Ltd<br>New Brook Road,<br>Pillsworth, Bury <br>Grt. Manchester<br>BL7 9RR</p></div> </div> </div>',
        gnb: '<nav id="gnb" class="noBounce"> <ul class="main noBounce"> <li class="pointer index_btn"><svg class="line"><rect></rect></svg>Home</div></li> <li class="pointer menswear"><svg class="line"><rect></rect></svg>Menswear</div></li> <li class="pointer womenswear"><svg class="line"><rect></rect></svg>Womenswear</li> <li class="divider"><div class="h_div"></div></li> </ul> <ul class="sub noBounce"> <li class="pointer about_btn"><svg class="line"><rect></rect></svg>About Capstone</li> <li class="pointer meettheteam_btn"><svg class="line"><rect></rect></svg>Meet the Team</li> <li class="pointer contact_btn"><svg class="line"><rect></rect></svg>Contact</li></ul> </nav>',
        index: '<div id="index" class="page noBounce"> <div class="index_bg noBounce"><!--<video muted playsinline autoplay src="webbg_a.mp4"></video>--></div> <div class="text noBounce"></div> <div class="title_base char_wrapper pointer"><h2 class="char">Icon, reinvented</h2><p>The new Capstone XT1.<br> Shop now.</p>  <div class="line"><svg id="indexline"></svg></div>  </div> </div>',
        curatedProduct: '<div id="curatedProduct" class="page sizefull"> <div class="image"></div> <div class="text"> <div class="title">Capstone XT1</div> <div class="price">£139.97</div> <div class="line"> </div>  <div class="desc">Example product page. There is a reason why XT1 are not assembled like today’s average kicks or high tops. Carefully unwrapping your personal Capstone shoes will give you a deeper understanding of their design and functionality, from the beautiful natural leather to the blah blah blah.</div> </div> </div>',
        meettheteam: '<div id="meettheteam" class="page noBounce" data-scrollbar> <div class="mtt_wrapper"> <div class="title">Meet the team</div><div class="line"></div></div><div class="mtt_mainwrapper"> <div class="members"> <div class="member"> <div class="image"><img src="assets/images/ehsan.jpg"/></div><div class="name">Ehsan Afsal</div><div class="role">Head of Sales, Ehsan ensures that all customers have a pleasant and smooth experience when buying from Capstone Sports.</div></div><div class="member"> <div class="image"><img src="assets/images/karine.jpg"/></div><div class="name">Karine</div><div class="role">Sales Coordinator Karine ensures all orders and sales are up to date and delivered within the required time to the right address. She is focused and has a great passion for swimming and bicycle riding.</div></div><div class="member"> <div class="image"><img src="assets/images/reen.jpg"/></div><div class="name">Reen Blake-Carr</div><div class="role">Reen is our Database Administrator, responsible for ensuring that the website databases are running correctly and smoothly.</div></div><div class="member"> <div class="image"><img src="assets/images/rob.jpg"/></div><div class="name">Rob</div><div class="role">Founder of Capstone Sports, Rob is lead developer for the website.</div></div><div class="member"> <div class="image"><img src="assets/images/romeela.jpg"/></div><div class="name">Romeela Nawaz</div><div class="role">Romeela is our Director of Product Design. She is an energetic and creative individual who has a passion for sports and fitness. She ensures all products are a high standard, delivering on consistency in brand look, feel, and experience.</div></div></div></div></div>',
        userCart: `<div id='userCart' class="cart"> <!--<div class="btn menswear pointer">Men</div> <div class="btn womenswear pointer">Women</div>--> <div class="btn svg_list basket_btn">${SVG.goSvg}</div>  </div>`
    };
    CoverAnimate = class CoverAnimate {
        constructor(el)
        {
            this.el = el;
            this.initSize()
        }
        action(_pos)
        {
            var xRatio,
                yRatio;
            xRatio = -(_pos.x / this.el.w - 0.5);
            yRatio = -(_pos.y / this.el.h - 0.5);
            return TweenMax.to(this.el, 0.3, {
                rotationX: -yRatio * 10,
                rotationY: xRatio * 10
            })
        }
        initSize()
        {
            this.el.w = this.el.width();
            return this.el.h = this.el.height()
        }
        init()
        {
            return TweenMax.to(this.el, 0.5, {
                rotationX: 0,
                rotationY: 0,
                ease: Cubic.easeInOut
            })
        }
    }
    ;
    DimmLayer = class DimmLayer {
        constructor(index, color1, duration1, zIndex, dimmClickFunction)
        {
            this.index = index;
            this.color = color1;
            this.duration = duration1;
            this.zIndex = zIndex;
            this.dimmClickFunction = dimmClickFunction;
            $('body').append("<div class='dimm'></div>");
            this.dimmDom = $('.dimm').last();
            this.dimmDom.hide();
            this.dimmDom.css({
                'background-color': this.color
            });
            if (this.zIndex) {
                this.dimmDom.css({
                    'z-index': this.zIndex
                })
            }
            this.addEvent();
            if (this.index) {
                this.dimmDom.css({
                    'z-index': this.index
                })
            }
        }
        show()
        {
            this.dimmDom.show();
            return TweenMax.fromTo(this.dimmDom, this.duration, {
                opacity: 0
            }, {
                opacity: 0.5
            })
        }
        hide()
        {
            return TweenMax.fromTo(this.dimmDom, this.duration / 1.3, {
                opacity: 0.5
            }, {
                opacity: 0,
                onComplete: this.remove.bind(this)
            })
        }
        remove()
        {
            return this.dimmDom.remove()
        }
        addEvent()
        {
            return this.dimmDom.on('click', () => {if (this.dimmClickFunction != null) {
                    this.dimmClickFunction();
                    return this.hide()
                }
            })
        }
    }
    ;
    Loading = class Loading {
        constructor()
        {
            $('body').append('<div class="loading"></div>');
            this.dom = $('.loading');
            this.dom.hide();
            this.show()
        }
        show()
        {
            var _dur;
            this.dom.show();
            _dur = 0.5;
            this.tween = TweenMax.fromTo(this.dom, _dur, {
                backgroundColor: color.xanadu,
                opacity: 0,
                scale: 0.5
            }, {
                opacity: 1,
                scale: 1
            });
            this.tween = TweenMax.to(this.dom, _dur, {
                scale: .5,
                backgroundColor: color.deepSaffron,
                delay: _dur * 2
            });
            this.tween = TweenMax.to(this.dom, _dur, {
                scale: 1,
                backgroundColor: color.xiketic,
                delay: _dur * 3
            });
            return this.tween = TweenMax.to(this.dom, _dur, {
                backgroundColor: color.white,
                delay: _dur * 4,
                scale: .5,
                onComplete: this.show.bind(this)
            })
        }
        hide(callback1)
        {
            this.callback = callback1;
            TweenMax.killTweensOf(this.tween);
            TweenMax.to(this.dom, 0.3, {
                scale: 1,
                backgroundColor: color.xanadu
            });
            return TweenMax.to(this.dom, 0.2, {
                opacity: 0,
                scale: 0,
                onComplete: this.hideComplete.bind(this),
                delay: 0.3
            })
        }
        hideComplete()
        {
            this.dom.remove();
            if (this.callback) {
                return this.callback()
            }
        }
    }
    ;
    SnackBar = class SnackBar {
        constructor(opts)
        {
            var _dom,
                message,
                ref;
            message = opts.message;
            this.duration = (ref = opts.duration) != null ? ref : 2;
            $('#snackbar').remove();
            _dom = `<div id='snackbar'> <div class='snackbar_wrapper'> <div class='message'>${message}</div> <div class='ok'>OK</div> </div> </div>`;
            $('body').append(_dom);
            this.dom = $('#snackbar');
            this.dom.hide();
            this.show();
            this.addEvent()
        }
        show()
        {
            this.dom.show();
            TweenMax.from(this.dom, 1.4, {
                scale: 0.8,
                y: 0,
                opacity: 0,
                ease: Elastic.easeOut.config(1, 0.6)
            });
            return TweenMax.delayedCall(this.duration, this.hide.bind(this))
        }
        hide()
        {
            var remove;
            remove = function() {
                return this.dom[0].remove()
            };
            return TweenMax.to(this.dom[0], 1, {
                scale: 0.9,
                y: 5,
                opacity: 0,
                ease: Elastic.easeOut.config(1, 0.7),
                onComplete: remove.bind(this)
            })
        }
        addEvent()
        {
            return $('#snackbar .ok').off('click').on('click', () => {return this.hide()})
        }
    }
    ;
    Popup = class Popup {
        constructor(opts)
        {
            this.title = opts.title;
            this.desc = opts.desc;
            this.dimm = new DimmLayer(1000, color.black, 0.1);
            this.dimm.show();
            this.okCallback = opts.okCallback;
            this.retryCallback = opts.retryCallback;
            $('body').append(`<div class='global popup'> <div class='title'>${this.title}</div> <div class='desc'>${this.desc}</div> <div class='btns'> <div class='btn retry'>Retry</div> <div class='btn ok'>Okay</div> </div> </div>`);
            this.dom = {
                wrapper: $(".global.popup"),
                ok: $('.global.popup .ok'),
                retry: $('.global.popup .retry')
            };
            this.dom.wrapper.hide();
            this.dom.retry.hide();
            this.show()
        }
        show()
        {
            var retryCallbackExcuter;
            this.dom.wrapper.show();
            TweenMax.from(this.dom.wrapper, 1, {
                scale: 0.8,
                y: 0,
                opacity: 0,
                ease: Elastic.easeOut.config(1, 0.75)
            });
            this.dom.ok.off('click').on('click', () => {
                this.dom.ok.off('click');
                this.hide();
                if (this.okCallback) {
                    return this.okCallback()
                }
            });
            if (this.retryCallback) {
                retryCallbackExcuter = function(callback) {
                    return callback()
                };
                this.dom.retry.show();
                return this.dom.retry.off('click').on('click', () => {
                    ga('send', 'event', 'Error', 'retry_click', 'Click Retry');
                    this.dom.retry.off('click');
                    this.hide();
                    return retryCallbackExcuter(this.retryCallback)
                })
            }
        }
        hide()
        {
            TweenMax.to(this.dom.wrapper, 1, {
                scale: 0.9,
                y: 20,
                opacity: 0,
                ease: Elastic.easeOut.config(1, 0.7),
                onComplete: this.remove.bind(this)
            });
            return this.dimm.hide()
        }
        remove()
        {
            return this.dom.wrapper.remove()
        }
    }
    ;
    StateController = class StateController {
        constructor()
        {
            this.State = History.getState();
            this.stateInit();
            this.addEvent()
        }
        stateInit()
        {
            var _page;
            _page = Utils.getHashValue(this.State.hash, 'page');
            console.log(_page);
            this.commonInit();
            if (_page === "main" || _page === "") {
                this.mainPage()
            }  else if (_page === 'curatedProduct') {
                this.curatedProductPage()
            } else if (_page === 'menswear') {
                this.menswearPage()
            } else if (_page === 'womenswear') {
                this.womenswearPage()
            } else if (_page === 'about') {
                this.aboutPage()
            } else if (_page === 'meettheteam') {
                this.meetTheTeamPage()
            } else if (_page === 'contact') {
                this.contactPage()
            }
            return this.initEnd()
        }
        mainPage()
        {
            STAGE.currentVC = STAGE.indexVC = new IndexViewController;
            SharedEvent.addVerticalScrollLock(!0);
            SharedEvent.navigator.setIndex();
            return ga('set', 'page', '/index')
        }
        curatedProductPage()
        {
            STAGE.currentVC = STAGE.curatedProductVC = new curatedProductViewController('curatedProduct');
            SharedEvent.addVerticalScrollLock(!0);
            return ga('set', 'page', '/curatedProduct')
        }
        aboutPage()
        {
            STAGE.currentVC = STAGE.aboutVC = new AboutViewController;
            SharedEvent.removeVerticalScrollLock(!0);
            return ga('set', 'page', '/about')
        }
        contactPage()
        {
            STAGE.currentVC = STAGE.contactVC = new ContactViewController;
            SharedEvent.addVerticalScrollLock(!0);
            return ga('set', 'page', '/contact')
        }
        menswearPage()
        {
            STAGE.currentVC = STAGE.menswearVC = new MenswearViewController;
            SharedEvent.addVerticalScrollLock(!0);
            return ga('set', 'page', '/menswear')
        }
        womenswearPage()
        {
            STAGE.currentVC = STAGE.womenswearVC = new WomenswearViewController;
            SharedEvent.removeVerticalScrollLock(!0);
            return ga('set', 'page', '/womenswear')
        }
        meetTheTeamPage()
        {
            STAGE.currentVC = STAGE.meetTheTeamVC = new MeetTheTeamViewController;
            SharedEvent.addVerticalScrollLock(!0);
            return ga('set', 'page', '/meettheteam')
        }
        commonInit()
        {
            if (SharedEvent.navigator.backState === !0) {
                SharedEvent.navigator.setBackInstant();
                SharedEvent.navigator.backCount++
            } else {
                SharedEvent.navigator.setBack();
                SharedEvent.navigator.backCount++
            }
            if (SharedEvent.navigator.backCount === 1) {
                SharedEvent.navigator.setIndex()
            }
            $('.page').remove();
            if (STAGE.gnb.state === !0) {
                STAGE.gnb.hide()
            }
            return SharedEvent.removeVerticalScrollLock()
        }
        initEnd()
        {
            return ga('send', 'pageview')
        }
        addEvent()
        {
            return History.Adapter.bind(window, 'statechange', () => {
                this.State = History.getState();
                return this.stateInit()
            })
        }
    }
    ;
    /* Wave setup & lightmode leftover from SongsForEle */
    Wave = (function() {
        var _then,
            delta,
            fps,
            interval,
            isStop,
            now;
        class Wave {
            constructor(opts={})
            {
                var ref,
                    ref1,
                    ref2,
                    ref3,
                    ref4,
                    ref5,
                    ref6,
                    ref7,
                    ref8;
                this.canvasDom = (ref = opts.canvasDom) != null ? ref : error("Canvas is required");
                this.amount = (ref1 = opts.amout) != null ? ref1 : 14;
                this.spring = (ref2 = opts.spring) != null ? ref2 : -4;
                this.damping = (ref3 = opts.damping) != null ? ref3 : -0.1;
                this.randomAmount = (ref4 = opts.randomAmount) != null ? ref4 : 2;
                this.baseYvalue = (ref5 = opts.baseY) != null ? ref5 : 0.5;
                this.limit = (ref6 = opts.limit) != null ? ref6 : 1.08;
                this.waveCount = (ref7 = opts.waveCount) != null ? ref7 : 3;
                this.mass = 0.1;
                this.mouseMoveCount = 0;
                this.wavePointsSet = [[]];
                this.waveColors = ["#798478", "#f9a03f", "#f82435"];
                this.lightMode = (ref8 = opts.lightmode) != null ? ref8 : !1;
                this.waveBack = $('#waveback .bottom');
                this.lightModeButton = $('.lightmode');
                this.init();
                this.addEvent();
                this.setLightMode()
            }
            init()
            {
                if (this.animFrame != null) {
                    window.cancelAnimationFrame(this.animFrame)
                }
                this.timeInterval = 0;
                if (support.isSmall) {
                    this.setMobileProp()
                } else {
                    this.timeInterval = 150
                }
                this.sizeUpdate();
                this.autoPointMultiple(this.timeInterval);
                return this.wavesLoop()
            }
            stop()
            {
                isStop = !0;
                clearInterval(this.autoPointInterval);
                window.cancelAnimationFrame(this.animFrame);
                return $(window).off('mousemove')
            }
            resume()
            {
                this.stop();
                isStop = !1;
                this.autoPointMultiple(this.timeInterval);
                return this.wavesLoop()
            }
            setLightMode()
            {
                if (this.lightMode === 'true') {
                    return this.lightModeOn()
                } else {
                    return console.log("---")
                }
            }
            lightModeOn()
            {
                this.stop();
                this.canvasDom.hide();
                TweenMax.to(this.waveBack, 0.3, {
                    backgroundColor: "#1b1725"
                });
                this.lightModeButton.addClass('lightmode-on');
                return this.lightModeButton.text('Light Mode On')
            }
            lightModeOff()
            {
                this.resume();
                this.canvasDom.show();
                TweenMax.set(this.waveBack, {
                    backgroundColor: "#f3f4f5"
                });
                this.lightModeButton.removeClass('lightmode-on');
                return this.lightModeButton.text('Light Mode')
            }
            toggleLightMode()
            {
                if (this.lightMode === 'false') {
                    this.lightMode = 'true';
                    this.lightModeOn();
                    return localStorage.setItem('lightmode', !0)
                } else {
                    this.lightMode = 'false';
                    this.lightModeOff();
                    return localStorage.setItem('lightmode', !1)
                }
            }
            setMobileProp()
            {
                this.amount = 8;
                this.timeInterval = 180;
                this.limit = 2;
                return this.damping = -.1
            }
            down()
            {
                if (isStop === !1) {
                    this.autoPointMultiple(150);
                    this.limit = 1.07;
                    return this.damping = -0.3
                }
            }
            up()
            {
                if (isStop === !1) {
                    if (support.isSmall) {
                        return this.setMobileProp()
                    } else {
                        this.autoPointMultiple(125);
                        this.limit = 1.17;
                        return this.damping = -0.12
                    }
                }
            }
            normal()
            {
                if (isStop === !1) {
                    if (support.isSmall) {
                        return this.setMobileProp()
                    } else {
                        this.autoPointMultiple(150);
                        this.limit = 1.15;
                        return this.damping = -0.1
                    }
                }
            }
            sizeUpdate()
            {
                var _y;
                this.sSize = Utils.getScreenSize();
                this.canvasDom.width(this.sSize.w);
                this.canvasDom.height(this.sSize.h / 3);
                this.ctx = this.canvasDom.get(0).getContext('2d');
                this.ctx.imageSmoothingEnabled = !1;
                this.segWidth = this.sSize.w / this.amount;
                this.baseY = this.canvasDom.height() * this.baseYvalue;
                this.ctx.canvas.width = this.sSize.w;
                this.ctx.canvas.height = this.sSize.h / 3;
                this.ctx.scale(1, 1);
                _y = this.sSize.h / 2 - this.canvasDom.height() / 2;
                TweenMax.set(this.canvasDom, {
                    y: _y
                });
                return this.readyPointsSet()
            }
            readyPointsSet()
            {
                var i,
                    j,
                    ref,
                    results1;
                results1 = [];
                for (i = j = 0, ref = this.waveCount;(0 <= ref ? j <= ref : j >= ref); i = 0 <= ref ? ++j : --j) {
                    this.wavePointsSet[i] = [];
                    results1.push(this.initPoints(this.wavePointsSet[i]))
                }
                return results1
            }
            initPoints(wavePoints)
            {
                var i,
                    j,
                    point,
                    ref,
                    results1;
                results1 = [];
                for (i = j = 0, ref = this.amount;(0 <= ref ? j <= ref : j >= ref); i = 0 <= ref ? ++j : --j) {
                    point = {
                        x: this.segWidth * i,
                        y: wavePoints[i] ? wavePoints[i].y : this.baseY,
                        vx: wavePoints[i] ? wavePoints[i].vx : 0,
                        vy: wavePoints[i] ? wavePoints[i].vy : 0
                    };
                    results1.push(wavePoints[i] = point)
                }
                return results1
            }
            updatePoints(wavePoints, spring, damping, time)
            {
                var dampingY,
                    i,
                    j,
                    len,
                    point,
                    results1,
                    springY;
                results1 = [];
                for (i = j = 0, len = wavePoints.length; j < len; i = ++j) {
                    point = wavePoints[i];
                    springY = spring * (point.y - this.baseY);
                    dampingY = damping * point.vy;
                    point.vy += (springY + dampingY) / this.mass * time;
                    results1.push(point.y += point.vy * time)
                }
                return results1
            }
            drawWaveOnCanvas(wavePoints, color)
            {
                
            }
            wavesLoop()
            {
                
            }
            setXnum(pointX)
            {
                return this.xNum = Math.round(pointX / this.sSize.w * this.amount)
            }
            initEvent(e)
            {
                var _point;
                this.mouseMoveCount++;
                this.setXnum(e.pageX);
                _point = {
                    x: e.pageX,
                    y: e.pageY
                };
                if (this.mouseMoveCount > 10) {
                    this.mouseMoveCount = 0;
                    return this.triggerPoint(_point)
                } else if (this.mouseMoveCount === 1) {
                    return this.triggerPoint(_point)
                }
            }
            triggerPoint(point)
            {
                var _limit,
                    _velocity,
                    i,
                    j,
                    len,
                    points,
                    ref,
                    results1;
                _velocity = point.y;
                if (_velocity > 0) {
                    _velocity *= -1
                }
                _limit = this.sSize.h * this.limit / 100;
                _velocity = Utils.limitMaxMin(_velocity, _limit, -_limit);
                _velocity *= 10;
                ref = this.wavePointsSet;
                results1 = [];
                for (i = j = 0, len = ref.length; j < len; i = ++j) {
                    points = ref[i];
                    if (points[this.xNum].vy < 0) {
                        results1.push(points[this.xNum].vy += _velocity)
                    } else {
                        results1.push(points[this.xNum].vy -= _velocity)
                    }
                }
                return results1
            }
            autoPointMultiple(_timeInterval)
            {
                if (this.autoPointInterval != null) {
                    clearInterval(this.autoPointInterval)
                }
                return this.autoPointInterval = setInterval((() => {
                    var _randomPoint;
                    _randomPoint = {
                        x: Utils.randomInt(0, this.sSize.w),
                        y: Utils.randomInt(0, this.baseY)
                    };
                    this.setXnum(_randomPoint.x);
                    return this.triggerPoint(_randomPoint)
                }), _timeInterval)
            }
            textBounce()
            {
                var i,
                    j,
                    len,
                    point,
                    ref,
                    results1;
                ref = this.wavePointsSet[0];
                results1 = [];
                for (i = j = 0, len = ref.length; j < len; i = ++j) {
                    point = ref[i];
                    if (!point.ty) {
                        point.ty = 0
                    }
                    if (support.isSmall) {
                        point.ty += point.vy * 0.018
                    } else {
                        point.ty += point.vy * 0.018 / 2.3
                    }
                    if (i > (this.amount - 9) && i < (this.amount - 2) && $('#index') !== void 0) {
                        results1.push(TweenMax.to($('.char').eq(i - 4), 0, {
                            y: point.ty,
                            opacity: 1 - (Math.abs(point.ty / 80))
                        }))
                    } else if (i === this.amount - 2 && $('#index .indexbtn') !== void 0) {
                        results1.push(TweenMax.to($('#index .indexbtn'), 0, {
                            y: point.ty
                        }))
                    } else {
                        results1.push(void 0)
                    }
                }
                return results1
            }
            addEvent()
            {
                var lastMouseMove,
                    oldPos;
                oldPos = [0, 0];
                lastMouseMove = 0;
                $(window).on('mousemove', (e) => {
                    var _now,
                        newPos;
                    _now = Date.now();
                    if (_now - lastMouseMove > 18) {
                        newPos = [e.pageX, e.pageY];
                        if (oldPos[0] === newPos[0] && oldPos[1] === newPos[1]) {
                            return
                        }
                        oldPos = newPos;
                        this.initEvent(e);
                        return lastMouseMove = _now
                    }
                });
                $(window).on('resize', (e) => {return this.sizeUpdate()});
                $(document).on(DETECT.visibilityChange, (e) => {if (document[DETECT.hidden] === !0) {
                        if (this.lightMode === 'false') {
                            this.stop();
                            return this.canvasDom.hide()
                        }
                    } else {
                        if (this.lightMode === 'false') {
                            this.resume();
                            return this.canvasDom.show()
                        }
                    }
                });
                return $('.lightmode').on('click', (e) => {return this.toggleLightMode()})
            }
        }
        ;
        fps = 30;
        now = void 0;
        _then = Date.now();
        interval = 1000 / fps;
        delta = void 0;
        isStop = !1;
        return Wave
    }).call(this);
    TextAnimate = class TextAnimate {
        constructor(dom, className1)
        {
            this.className = className1;
            this.dom = dom;
            this.init();
            this.cnt = 7
        }
        init(_text)
        {
            var i,
                j,
                k,
                len,
                len1,
                ref,
                ref1,
                value;
            if (_text != null) {
                this.text = _text
            } else {
                this.text = this.dom.text()
            }
            this.splitedArr = this.text.split('');
            ref = this.splitedArr;
            for (i = j = 0, len = ref.length; j < len; i = ++j) {
                value = ref[i];
                if (value === " ") {
                    this.splitedArr[i] = value = "&nbsp;"
                }
            }
            this.splitedText = "";
            ref1 = this.splitedArr;
            for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
                value = ref1[i];
                this.splitedText += `<span class='${this.className} no${i}'>${value}</span>`
            }
            this.dom.html(this.splitedText);
            this.splitDom = $(`.${this.className}`);
            return this.splitDom.css('display', 'inline-block')
        }
        slide(opts={})
        {
            var _axis,
                _delay,
                _duration,
                _offset,
                i,
                j,
                len,
                ref,
                ref1,
                ref2,
                ref3,
                ref4,
                results1,
                value;
            _delay = (ref = opts.delay) != null ? ref : 0.01;
            _axis = (ref1 = opts.axis) != null ? ref1 : 'y';
            _offset = (ref2 = opts.offset) != null ? ref2 : 50;
            _duration = (ref3 = opts.duration) != null ? ref3 : 2;
            ref4 = this.splitedArr;
            results1 = [];
            for (i = j = 0, len = ref4.length; j < len; i = ++j) {
                value = ref4[i];
                if (_axis === 'y') {
                    TweenMax.from($(`.${this.className}.no${i}`), _duration, {
                        color: color.xanadu,
                        scaleY: 1.2,
                        opacity: 0,
                        y: _offset,
                        delay: _delay,
                        ease: Elastic.easeOut.config(1, 0.8)
                    })
                } else if (_axis === 'x') {
                    TweenMax.from($(`.${this.className}.no${i}`), _duration, {
                        color: color.black,
                        scaleX: 1.2,
                        opacity: 0,
                        x: _offset,
                        delay: _delay,
                        ease: Elastic.easeOut.config(1, 0.8)
                    })
                }
                results1.push(_delay += opts.delay)
            }
            return results1
        }
        randomise(_text, _color, cnt)
        {
            var _d,
                _delay,
                i,
                j,
                len,
                orderedChar,
                randomiseChar,
                ref,
                results1,
                value;
            randomiseChar = (value, x, i) => {
                var colors,
                    colorsIdx,
                    possChar;
                if (x === this.cnt - 1) {
                    return $(`.${this.className}.no${i}`).html(value)
                } else {
                    colors = ["#798478", "#f9a03f", "#f82435"];
                    colorsIdx = Utils.randomInt(0, colors.length);
                    possChar = "capstoneport";
                    return $(`.${this.className}.no${i}`).html(possChar.charAt(Math.floor(Math.random() * possChar.length)))
                }
            };
            orderedChar = (value, i) => {
                var _d,
                    j,
                    ref,
                    results1,
                    x;
                _d = 0;
                results1 = [];
                for (x = j = 0, ref = this.cnt;(0 <= ref ? j < ref : j > ref); x = 0 <= ref ? ++j : --j) {
                    TweenMax.delayedCall(_d, randomiseChar, [value, x, i]);
                    results1.push(_d += 0.05)
                }
                return results1
            };
            _delay = 0.03;
            if (cnt != null) {
                this.cnt = cnt;
                _delay = 0.02
            }
            if (_text != null) {
                this.init(_text)
            }
            if (_color != null) {
                TweenMax.to(this.dom, 0.5, {
                    color: _color
                })
            }
            _d = 0;
            this.splitDom.html('');
            ref = this.splitedArr;
            results1 = [];
            for (i = j = 0, len = ref.length; j < len; i = ++j) {
                value = ref[i];
                TweenMax.delayedCall(_d, orderedChar, [value, i]);
                results1.push(_d += _delay)
            }
            return results1
        }
    }
    ;
    basket = {
        init: function(tracks, trackNum) {
            if (DATA.nowTracks !== tracks) {
                DATA.nowTracks = tracks
            }
            if (trackNum) {
                DATA.currentNum = trackNum
            } else {
                DATA.currentNum = 0
            }
            this.isPause = !0;
            this.isLoop = !0;
            this.item = $('#tracklist .track.item');
            if (!STAGE.basketVC) {
                STAGE.basketVC = new basketViewController;
                STAGE.basketVC.hideMiniInfo()
            }
            STAGE.basketVC.prepareList();
            return this.getTrack()
        },
        addEvent: function() {
            STAGE.error = 0;
            $('audio').on('error', (e) => {
                if (STAGE.error === 0) {
                    this.getTrack()
                } else {
                    new Popup({
                        title: "Sorry",
                        desc: "The Playback count limit that Soundcloud could allows per day is reached out. Please try again later."
                    })
                }
                return STAGE.error++
            });
            $('audio').on('loadstart', () => {
                console.log("test");
                return STAGE.basketVC.setHighlighting()
            });
            $('audio').on('playing', () => {
                STAGE.error = 0;
                return TweenMax.delayedCall(0.3, (function() {
                    return STAGE.wave.up()
                }))
            });
            $('audio').on('pause', () => {
                STAGE.basketVC.paused();
                return STAGE.wave.down()
            });
            $('audio').on('ended', () => {
                ga('send', 'event', 'Audio', 'played', DATA.nowTracks[DATA.currentNum].title);
                STAGE.wave.down();
                return basket.next()
            });
            $('audio').on('timeupdate', thisAsThat((that, evt) => {
                var _barRatio;
                _barRatio = that.currentTime / that.duration;
                if (!STAGE.basketVC.isSeeking) {
                    STAGE.basketVC.seekBarUpdate(_barRatio)
                }
                return STAGE.basketVC.seekBarTimeUpdate(that.currentTime, that.duration)
            }));
            return $(window).on('keydown', (e) => {switch (e.keyCode) {
                case 39:
                    return this.next();
                case 37:
                    return this.prev();
                case 32:
                    if (this.isPause === !0) {
                        this.play();
                        return STAGE.basketVC.played()
                    } else {
                        this.pause();
                        return STAGE.basketVC.paused()
                    }
                }
            })
        }
    };
    AboutViewController = class AboutViewController {
        constructor()
        {
            $('body').append(DOM.about);
            SharedEvent.setScroll($('#about'), !1);
            SharedEvent.footer.hide();
            this.dom = {
                title: $('#about .title'),
                line: $('#about .line'),
                desc: $('#about .desc')
            };
            this.show()
        }
        show()
        {
            TweenMax.from($('#about'), 0.3, {
                opacity: 0
            });
            TweenMax.from(this.dom.title, 2, {
                scaleY: 1.2,
                opacity: 0,
                y: 30,
                ease: Expo.easeOut,
                delay: 0.2
            });
            TweenMax.from(this.dom.line, 2.2, {
                opacity: 0,
                y: 30,
                scaleX: 0,
                delay: 0.4,
                ease: Expo.easeOut
            });
            TweenMax.from(this.dom.desc, 2, {
                opacity: 0,
                y: 30,
                delay: 0.6,
                ease: Expo.easeOut
            });
        }
    }
    ;
    MenswearViewController = class MenswearViewController {
        constructor()
        {
            $('body').append(DOM.menswear);
            SharedEvent.setScroll($('#menswear'), !1);
            SharedEvent.footer.hide();
            this.dom = {
                title: $('#menswear .title'),
                line: $('#menswear .line'),
                product: $('#menswear .product'),
                desc: $('#menswear .desc')
            };
            this.show()
        }
        show()
        {
            TweenMax.from($('#menswear'), 0.3, {
                opacity: 0
            });
            TweenMax.from(this.dom.title, 2, {
                scaleY: 1.2,
                opacity: 0,
                y: 30,
                ease: Expo.easeOut,
                delay: 0.2
            });
            TweenMax.from(this.dom.line, 2.2, {
                opacity: 0,
                y: 30,
                scaleX: 0,
                delay: 0.4,
                ease: Expo.easeOut
            });
            TweenMax.from(this.dom.desc, 2, {
                opacity: 0,
                y: 30,
                delay: 0.6,
                ease: Expo.easeOut
            });
            return TweenMax.from(this.dom.product, 2, {
                opacity: 0,
                y: 30,
                delay: 0.7,
                ease: Expo.easeOut
            });
            SharedEvent.addTapEffect($('#menswear .product'));
        }
    }
    ;
    WomenswearViewController = class WomenswearViewController {
        constructor()
        {
            $('body').append(DOM.womenswear);
            SharedEvent.setScroll($('#womenswear'), !1);
            SharedEvent.footer.hide();
            this.dom = {
                title: $('#womenswear .title'),
                line: $('#womenswear .line'),
                product: $('#womenswear .product'),
                desc: $('#womenswear .desc')
            };
            this.show()
        }
        show()
        {
            TweenMax.from($('#womenswear'), 0.3, {
                opacity: 0
            });
            TweenMax.from(this.dom.title, 2, {
                scaleY: 1.2,
                opacity: 0,
                y: 30,
                ease: Expo.easeOut,
                delay: 0.2
            });
            TweenMax.from(this.dom.line, 2.2, {
                opacity: 0,
                y: 30,
                scaleX: 0,
                delay: 0.4,
                ease: Expo.easeOut
            });
            TweenMax.from(this.dom.desc, 2, {
                opacity: 0,
                y: 30,
                delay: 0.6,
                ease: Expo.easeOut
            });
            return TweenMax.from(this.dom.product, 2, {
                opacity: 0,
                y: 30,
                delay: 0.7,
                ease: Expo.easeOut
            });
            SharedEvent.addTapEffect($('#womenswear .product'));
        }
    }
    ;
    curatedProductViewController = class curatedProductViewController {
        constructor(type)
        {
            console.log("test");
            this.type = type != null ? type : 'standardProduct';
            $('body').append(DOM.curatedProduct);
            SharedEvent.footer.hide();
            SharedEvent.footer.state = !0;
            SharedEvent.footer.color("black");
            this.init()
        }
        init()
        {
            this.dom = {
                wrapper: $('#curatedProduct'),
                container: $('#curatedProduct .container'),
                list: $('#curatedProduct .colours'),
                productImage: $('#curatedProduct .image'),
                titleWrapper: $('#curatedProduct .text'),
                title: $('#curatedProduct .text .title'),
                line: $('#curatedProduct .text .line'),
                desc: $('#curatedProduct .text .desc'),
                price: $('#curatedProduct .text .price'),
                count: $('')
            };
            if (this.type === 'curatedProduct') {
                this.dom.title.text('Capstone XT1')
            }
            this.titleAnim = new TextAnimate(this.dom.title, 'title-char');
            /*SharedEvent.moveWave(0.8);*/
            this.dom.wrapper.hide();
            if (this.type === 'standardProduct') {
                return DATA.getGroupProducts(this.gotData.bind(this))
            } else if (this.type === 'curatedProduct') {
                return DATA.getcuratedProductProducts(this.gotData.bind(this))
            }
        }
        gotData()
        {
            if (this.type === 'standardProduct') {
                this.productData = DATA.GroupProducts
            } else if (this.type === 'curatedProduct') {
                this.productData = DATA.groupcuratedProductUsers
            }
            this.appendUsers();
            return this.show()
        }
        show()
        {
            var _d,
                _dur,
                _extraDelay,
                _originW,
                _w;
            _extraDelay = .6;
            this.dom.wrapper.show();
            if (support.isSmall) {
                TweenMax.set(this.dom.list, {
                    scrollLeft: 1000
                });
                TweenMax.to(this.dom.list, 1, {
                    scrollLeft: 70,
                    ease: Power2.easeOut
                })
            }
            TweenMax.from(this.dom.titleWrapper, 0.5, {
                y: 50
            });
            this.titleAnim.slide({
                offset: 50,
                delay: 0.035,
                duration: 1.2,
                axis: 'x'
            });
            TweenMax.from(this.dom.line, 0.5, {
                backgroundColor: color.capstoneRed,
                scaleX: 0,
                opacity: 0,
                delay: _extraDelay
            });
            TweenMax.from(this.dom.price, 0.5, {
                color: color.capstoneRed,
                x: -10,
                opacity: 0,
                delay: 0.4
            });
            TweenMax.from(this.dom.desc, 0.5, {
                color: color.capstoneRed,
                x: -10,
                opacity: 0,
                delay: 0.8
            });
            TweenMax.from(this.dom.productImage, 0.5, {
                x: -10,
                opacity: 0,
                delay: 1.5
            });
            _d = 0.3;
            _w = 0;
            _dur = 1.5;
            TweenMax.from(this.dom.container, 1, {
                y: 50,
                delay: _d,
                ease: Expo.easeOut
            });
            _originW = this.dom.item.last().outerWidth(!0);
            $('#curatedProduct .item').each(function(i, value) {
                TweenMax.from(value, _dur, {
                    x: _w,
                    opacity: 0,
                    delay: _d,
                    ease: Expo.easeOut
                });
                _w += _originW / 4;
                return _d += 0.04
            });
            if (support.isMobile) {
                this.activeItem($(".item").eq(0))
            }
            SharedEvent.addTapEffect($('#curatedProduct .item'));
            return SharedEvent.setScroll($('#curatedProduct .list'), !0)
        }
        hide()
        {
            return TweenMax.to(this.dom.wrapper, 0.5, {
                scale: 1.05,
                opacity: 0,
                y: -10,
                ease: Power1.easeInOut,
                onComplete: this.remove.bind(this)
            })
        }
        remove()
        {
            this.dom.wrapper.remove();
            return History.pushState({
                state: 'playlist'
            }, 'SongsForEleanor', `?page=playlist&userid=${this.userID}`)
        }
        activeItem(that)
        {
            var _desc,
                _idx,
                _name,
                _thumb,
                _y;
            $(that).addClass('active');
            if ($(that).hasClass('c-item')) {
                _idx = $(that).index() - 2;
                _thumb = that.children[0];
                _name = that.children[0].children[0].children[0];
                _desc = that.children[0].children[0].children[1];
                TweenMax.to(that, 0.4, {
                    y: -vh(7),
                    ease: Power1.ease
                });
                TweenMax.to(_thumb, 0.4, {
                    className: "+=shadow",
                    ease: Power2.ease
                });
                this.nameAnim[_idx].randomise(null, null, 5);
                this.descAnim[_idx].randomise(null, null, 2);
                $(_name).show();
                $(_desc).show();
                TweenMax.fromTo(_name, 0, {
                    opacity: 1
                }, {
                    opacity: 1
                });
                return TweenMax.fromTo(_desc, 0.8, {
                    opacity: 1,
                    scaleX: 0.8
                }, {
                    opacity: 1,
                    scaleX: 1,
                    transformOrigin: "0 0",
                    ease: Expo.easeOut
                })
            } else if ($(that).hasClass('connect_btn')) {
                TweenMax.set(that, {
                    backgroundImage: "linear-gradient(280deg, #2F2A29 0%, #2F2A29 100%)"
                });
                _y = 0;
                if (!support.isMobile) {
                    _y = -24
                }
                return TweenMax.to(that, 0.4, {
                    y: _y,
                    className: "+=shadow",
                    ease: Power1.easeOut,
                    backgroundImage: "linear-gradient(225deg, #FF6700 0%, #FF2DF0 100%)"
                })
            }
        }
        inactiveItem(that)
        {
            var _desc,
                _name,
                _thumb;
            if ($(that).hasClass('c-item')) {
                _thumb = that.children[0];
                _name = that.children[0].children[0].children[0];
                _desc = that.children[0].children[0].children[1];
                TweenMax.to(that, 0.5, {
                    y: 0,
                    ease: Power2.easeOut
                });
                TweenMax.to(_thumb, 0.4, {
                    className: "-=shadow",
                    ease: Power3.easeOut
                });
                TweenMax.to(_name, 0.2, {
                    opacity: 0
                });
                TweenMax.to(_desc, 0.2, {
                    opacity: 0
                })
            } else if ($(that).hasClass('connect_btn')) {
                TweenMax.to(that, {
                    backgroundImage: "linear-gradient(225deg, #FF6700 0%, #FF2DF0 100%)"
                });
                TweenMax.to(that, 0.5, {
                    y: 0,
                    className: "-=shadow",
                    ease: Power2.easeOut,
                    backgroundImage: 'linear-gradient(280deg, #2F2A29 0%, #2F2A29 100%)'
                })
            }
            return $(that).removeClass('active')
        }
        sizeUpdate()
        {
            var _padd,
                extraWidth,
                totalWidth;
            totalWidth = 0;
            extraWidth = 0;
            $('#curatedProduct .item').each(function() {
                totalWidth += parseInt($(this).outerWidth(!0), 10);
                return extraWidth += 2
            });
            $('#curatedProduct .container').width(totalWidth + extraWidth);
            this.sSize = Utils.getScreenSize();
            if (totalWidth < this.sSize.w) {
                _padd = (this.sSize.w - totalWidth) / 2;
                return $('#curatedProduct .container').css({
                    'padding': `0 ${_padd - extraWidth}px`
                })
            }
        }
        appendUsers()
        {
            var _city,
                _country,
                _desc,
                _dom,
                _name,
                _thumb,
                i,
                j,
                len,
                ref,
                value;
            this.nameAnim = [];
            this.descAnim = [];
            ref = this.productData;
            for (i = j = 0, len = ref.length; j < len; i = ++j) {
                value = ref[i];
                _thumb = value.avatar_url.replace('large', 't250x250');
                this.dom.container.append(DOM.item);
                _dom = $('#curatedProduct .list .container .item').last();
                _dom.find('.thumb').css({
                    backgroundImage: `url('${_thumb}')`
                });
                _country = _city = "";
                if (value.city === null) {
                    _city = "Earth"
                } else {
                    _city = value.city + ' / '
                }
                if (value.country === null) {
                    _country = ""
                } else {
                    _country = value.country
                }
                _desc = _city + _country;
                _name = value.username;
                if (_desc.length > 20) {
                    _desc = _desc.substring(0, 19) + ".."
                }
                if (_name.length > 20) {
                    _name = _desc.substring(0, 19) + ".."
                }
                if (_desc.length > _name.length) {
                    $(_dom).find(".desc").css({
                        'border-radius': '0 3px 3px 3px'
                    });
                    $(_dom).find(".name").css({
                        'border-radius': '3px 3px 0 0'
                    })
                } else {
                    $(_dom).find(".desc").css({
                        'border-radius': '0 0 3px 3px'
                    });
                    $(_dom).find(".name").css({
                        'border-radius': '3px 3px 3px 0'
                    })
                }
                $(_dom).find(".desc").html(`<div>${_desc}</div>`);
                $(_dom).find(".name").html(`<div>${_name}</div>`);
                this.nameAnim[i] = new TextAnimate(_dom.find('.name div'), `cname_${i}`);
                this.descAnim[i] = new TextAnimate(_dom.find('.desc div'), `cdesc_${i}`)
            }
            this.dom.count.text(this.productData.length);
            this.addEvent();
            return this.sizeUpdate()
        }
        addEvent()
        {
            var _currentItem;
            this.dom.item = $('#curatedProduct .item');
            this.dom.item.on('mouseenter', thisAsThat((that, evt) => {return this.activeItem(that)}));
            this.dom.item.on('mouseleave', thisAsThat((that, evt) => {return this.inactiveItem(that)}));
            this.dom.item.off('click').on('click', thisAsThat((that, evt) => {
                var _idx,
                    popup;
                if ($(that).hasClass('c-item')) {
                    this.dom.item.off('click');
                    _idx = $(that).index() - 2;
                    this.userID = this.productData[_idx].id;
                    this.hide();
                    ga('send', 'event', 'standardProduct', 'click', this.productData[_idx].username)
                }
                if ($(that).hasClass('connect_btn')) {
                    ga('send', 'event', 'standardProduct', 'click', 'connect soundcloud');
                    return popup = new Popup({
                        title: 'Sorry',
                        desc: 'This feature is not available yet. Please, Select a playlist from the list.'
                    })
                }
            }));
            $(window).off('resize').on('resize', () => {
                this.sizeUpdate();
                return SharedEvent.resize()
            });
            _currentItem = null;
            if (support.isSmall) {
                return this.dom.list.on('scroll', thisAsThat((that, evt) => {
                    var _idx,
                        item,
                        j,
                        len,
                        ref;
                    _idx = SharedEvent.getScrollIndex(this.dom.item);
                    if (_currentItem !== _idx && _idx < this.dom.item.length) {
                        ref = $('.active');
                        for (j = 0, len = ref.length; j < len; j++) {
                            item = ref[j];
                            this.inactiveItem(item)
                        }
                        this.activeItem(this.dom.item.eq(_idx)[0]);
                        return _currentItem = _idx
                    }
                }))
            }
        }
    }
    ;
    MeetTheTeamViewController = class MeetTheTeamViewController {
        constructor()
        {
            $('body').append(DOM.meettheteam);
            SharedEvent.setScroll($('#meettheteam'), !1);
            SharedEvent.footer.hide();
            SharedEvent.footer.state = !1;
            this.dom = {
                title: $('#meettheteam .title'),
                line: $('#meettheteam .line'),
                members: $('#meettheteam .members'),
            };
            this.titleAnim = new TextAnimate(this.dom.title, 'title-char');
            this.show()
        }
        show()
        {
            this.titleAnim.slide({
                offset: 50,
                delay: 0.035,
                duration: 1.2,
                axis: 'x'
            });
            TweenMax.from($('#meettheteam'), 0.3, {
                opacity: 0,
                scaleY: 1.2
            });
            TweenMax.from(this.dom.line, 2.2, {
                opacity: 0,
                y: 30,
                scaleX: 0,
                delay: 0.4,
                ease: Expo.easeOut
            });
            TweenMax.from(this.dom.members, 2, {
                opacity: 0,
                y: 20,
                delay: 0.8,
                ease: Expo.easeOut
            });
        }
    }
    ;
    ContactViewController = class ContactViewController {
        constructor()
        {
            $('body').append(DOM.contact);
            SharedEvent.setScroll($('#contact'), !1);
            SharedEvent.footer.hide();
            this.dom = {
                title: $('#contact .title'),
                line: $('#contact .line'),
                desc: $('#contact .column1'),
                desc2: $('#contact .column2')
            };
            this.show()
        }
        show()
        {
            TweenMax.from($('#contact'), 0.3, {
                opacity: 0
            });
            TweenMax.from(this.dom.title, 2, {
                opacity: 0,
                y: 30,
                ease: Expo.easeOut,
                delay: 0.2
            });
            TweenMax.from(this.dom.line, 2.2, {
                opacity: 0,
                y: 30,
                scaleX: 0,
                delay: 0.4,
                ease: Expo.easeOut
            });
            TweenMax.from(this.dom.desc, 2, {
                opacity: 0,
                y: 10,
                delay: 0.4,
                ease: Expo.easeOut
            });
            TweenMax.from(this.dom.desc2, 2, {
                opacity: 0,
                y: 30,
                delay: 0.6,
                ease: Expo.easeOut
            });
            $(' .contact_wrapper a').off('mouseenter').on('mouseenter', thisAsThat((that, evt) => {return SharedEvent.addOpacity(that)}));
            SharedEvent.addTapEffect($('#contact .contact_wrapper a'));
        }
    }
    ;
    GnbIcon = (function() {
        class GnbIcon {
            constructor()
            {
                this.init()
            }
            init()
            {
                this.dom = $('#gnb_svg');
                this.dom.append(SVG.gnbIcon);
                this.dom.addClass('gnb_svg pointer');
                this.first = this.dom.find('rect').eq(0);
                this.second = this.dom.find('rect').eq(1);
                this.third = this.dom.find('rect').eq(2);
                this.groupDom = this.dom.find('g');
                return this.group = [this.first, this.second, this.third]
            }
            show()
            {
                var _delay,
                    j,
                    len,
                    ref,
                    value;
                _delay = 0;
                ref = this.group;
                for (j = 0, len = ref.length; j < len; j++) {
                    value = ref[j];
                    TweenMax.fromTo(value, 0.5, {
                        x: -10,
                        y: 0,
                        scaleX: 0,
                        transformOrigin: '50% 50%',
                        rotation: 0
                    }, {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        ease: Elastic.easeOut.config(1, 0.7),
                        scaleX: 1,
                        delay: _delay,
                        rotation: 0
                    });
                    _delay += 0.05
                }
                return this.state = "show"
            }
            hide()
            {
                TweenMax.to(this.first, 0.2, {
                    y: 7,
                    ease: Circ.easeIn
                });
                return TweenMax.to(this.third, 0.2, {
                    y: -7,
                    ease: Circ.easeIn,
                    onComplete: this.hideCompletion.bind(this)
                })
            }
            hideCompletion()
            {
                var j,
                    len,
                    ref,
                    value;
                ref = this.group;
                for (j = 0, len = ref.length; j < len; j++) {
                    value = ref[j];
                    TweenMax.to(value, 0.3, {
                        opacity: 0,
                        scaleX: 0,
                        ease: Expo.easeOut
                    })
                }
                return this.state = "hide"
            }
            toClose()
            {
                TweenMax.to(this.groupDom, 0.1, {
                    fill: color.capstoneRed
                });
                TweenMax.to(this.groupDom, 0.5, {
                    fill: color.black,
                    delay: 0.1
                });
                TweenMax.to(this.first, 0.15, {
                    y: 7,
                    ease: Cubic.easeIn
                });
                return TweenMax.to(this.third, 0.15, {
                    y: -7,
                    ease: Cubic.easeIn,
                    onComplete: this.toCloseCompletion.bind(this)
                })
            }
            toCloseCompletion()
            {
                TweenMax.to(this.first, 0.6, {
                    scaleX: 1,
                    rotation: 135,
                    ease: Elastic.easeOut.config(1, .7),
                    opacity: 1
                });
                TweenMax.to(this.second, 0.6, {
                    scaleX: 1,
                    rotation: 225,
                    ease: Elastic.easeOut.config(1, .7),
                    opacity: 1
                });
                TweenMax.to(this.third, 0.1, {
                    scaleX: 0,
                    opacity: 0,
                    ease: Elastic.easeOut.config(1, 0.7)
                });
                return this.state = "close"
            }
            toOrigin()
            {
                TweenMax.to(this.groupDom, 0.1, {
                    fill: color.black
                });
                TweenMax.to(this.groupDom, 0.5, {
                    fill: color.black,
                    delay: 0.1
                });
                TweenMax.to(this.first, 0.4, {
                    0.4: 0.4,
                    ease: Power4.easeOut,
                    scaleX: 0.05,
                    rotation: 180,
                    x: -10
                });
                TweenMax.to(this.second, 0.4, {
                    0.4: 0.4,
                    ease: Power4.easeOut,
                    scaleX: 0.05,
                    rotation: 180,
                    x: -10
                });
                return TweenMax.delayedCall(0.1, this.toOriginCompletion.bind(this))
            }
            toOriginCompletion()
            {
                this.show();
                return this.state = "origin"
            }
        }
        ;
        GnbIcon.state = null;
        return GnbIcon
    })
    .call(this);
    GnbController = class GnbController {
        constructor()
        {
            this.init();
            this.state = !1;
            this.isMoving = !1;
            this.textAnim = new TextAnimate($('.gnb_text'), 'spt')
        }
        init()
        {
            this.gnbIcon = new GnbIcon;
            this.gnbIcon.show();
            return this.addEvent()
        }
        show()
        {
            this.dimm = new DimmLayer(null, color.dimm, 0.5, 102, this.hide.bind(this));
            this.dimm.show();
            $('body').append(DOM.gnb);
            this.container = $('#gnb');
            this.gnbIcon.toClose();
            this.isMoving = !0;
            this.showContainer();
            this.showItems();
            SharedEvent.navigator.setDefault();
            SharedEvent.addTapEffect($('#gnb li'), 0.99);
            this.addGnbEvent();
            $('#gnb .standardProduct_btn div').hide();
            if (DATA.GroupProducts[0]) {
                this.gotUserInfo()
            }
            if (support.isMobile) {
                return STAGE.wave.stop()
            }
        }
        gotUserInfo()
        {
            var _dom;
            _dom = $('#gnb .standardProduct_btn div');
            _dom.show();
            $('#gnb .standardProduct_btn span').text(String(DATA.GroupProducts.length));
            return TweenMax.from(_dom, 0.7, {
                scale: 0,
                opacity: 0,
                ease: Elastic.easeOut.config(1, 0.8),
                delay: 0.25
            })
        }
        showContainer()
        {
            TweenMax.fromTo(this.container, 0.7, {
                ease: Expo.easeOut,
                x: -this.container.width()
            }, {
                ease: Expo.easeOut,
                x: 0,
                onComplete: this.showCompletion.bind(this)
            });
            return SharedEvent.footer.gnbShow()
        }
        showItems()
        {
            var _delay,
                j,
                len,
                ref,
                results1,
                testTimeline,
                value;
            this.mainItems = $('nav li');
            _delay = 0.1;
            ref = this.mainItems;
            results1 = [];
            for (j = 0, len = ref.length; j < len; j++) {
                value = ref[j];
                TweenMax.from(value, 0.8, {
                    opacity: 0,
                    y: 50,
                    scaleY: 1.15,
                    ease: Power4.easeOut,
                    delay: _delay
                });
                testTimeline = new TimelineLite();
                testTimeline.to(value, 0.2, {
                    color: color.capstoneRed
                }).to(value, 0.5, {
                    color: color.gnbText,
                    delay: 0.1
                });
                results1.push(_delay += 0.08)
            }
            return results1
        }
        showCompletion()
        {
            this.state = !0;
            return this.isMoving = !1
        }
        hide()
        {
            this.gnbIcon.toOrigin();
            this.isMoving = !0;
            this.hideContainer();
            console.log(SharedEvent.navigator.backState);
            if (SharedEvent.navigator.backState === !1) {
                return this.textAnim.randomise("Capstone", color.black)
            } else {
                this.textAnim.randomise("", color.black);
                return SharedEvent.navigator.setBack()
            }
        }
        hideContainer()
        {
            this.dimm.hide();
            TweenMax.to(this.container, 0.4, {
                ease: Power3.easeOut,
                x: -this.container.width(),
                onComplete: this.hideCompletion.bind(this)
            });
            if (SharedEvent.footer.state === !0) {
                SharedEvent.footer.color("black");
                return SharedEvent.footer.show()
            } else {
                return SharedEvent.footer.hide()
            }
        }
        hideCompletion()
        {
            this.container.remove();
            this.state = !1;
            this.isMoving = !1;
            if (support.isMobile) {
                return STAGE.wave.resume()
            }
        }
        mouseOver(el)
        {
            var _lineDom;
            _lineDom = $(el).find('.line rect');
            TweenMax.set(_lineDom[0], {
                scaleX: 0,
                opacity: 0
            });
            return TweenMax.to(_lineDom[0], 0.5, {
                scaleX: 1,
                opacity: 1,
                ease: Expo.easeOut
            })
        }
        mouseLeave(el)
        {
            var _lineDom;
            _lineDom = $(el).find('.line rect');
            return TweenMax.to(_lineDom[0], 0.5, {
                scaleX: 0,
                opacity: 0,
                ease: Cubic.easeOut
            })
        }
        addEvent()
        {
            return $('#gnb_svg').on('click', () => {if (this.state === !1 && this.isMoving === !1) {
                    ga('send', 'event', 'button', 'click', 'GNB - click the three lines');
                    return this.show()
                } else if (this.state === !0 && this.isMoving === !1) {
                    ga('send', 'event', 'button', 'click', 'GNB - Close with X');
                    return this.hide()
                }
            })
        }
        addGnbEvent()
        {
            var _moveX,
                _startX,
                _x;
            $('#gnb li').on('mouseenter', thisAsThat((that, evt) => {
                SharedEvent.addOpacity(that);
                return this.mouseOver(that)
            }));
            $('#gnb li').on('mouseleave', thisAsThat((that, evt) => {return this.mouseLeave(that)}));
            $('#gnb .index_btn').on('click', thisAsThat((that, evt) => {
                History.pushState({
                    state: 'main'
                }, 'Capstone Sports | English Sporting Goods', '?page=main');
                return ga('send', 'event', 'button', 'click', 'GNB - index')
            }));
            $('#gnb .curatedProduct').on('click', thisAsThat((that, evt) => {
                this.hide();
                History.pushState({
                    state: 'curatedProduct'
                }, 'SongsForEleanor', '?page=curatedProduct');
                return ga('send', 'event', 'button', 'click', 'GNB - curatedproduct')
            }));
            $('#gnb .menswear').on('click', thisAsThat((that, evt) => {
                this.hide();
                History.pushState({
                    state: 'menswear'
                }, 'Menswear - Capstone Sports | English Sporting Goods', '?page=menswear');
                return ga('send', 'event', 'button', 'click', 'GNB - menswear')
            }));
            $('#gnb .womenswear').on('click', thisAsThat((that, evt) => {
                this.hide();
                History.pushState({
                    state: 'womenswear'
                }, 'Womenswear - Capstone Sports | English Sporting Goods', '?page=womenswear');
                return ga('send', 'event', 'button', 'click', 'GNB - womenswear')
            }));
            $('#gnb .about_btn').on('click', thisAsThat((that, evt) => {
                this.hide();
                History.pushState({
                    state: 'about'
                }, 'About | Capstone Sports', "?page=about");
                return ga('send', 'event', 'button', 'click', 'GNB - about')
            }));
            $('#gnb .meettheteam_btn').on('click', thisAsThat((that, evt) => {
                this.hide();
                History.pushState({
                    state: 'meettheteam'
                }, 'Meet the Team - Capstone Sports | English Sporting Goods', '?page=meettheteam');
                return ga('send', 'event', 'button', 'click', 'GNB - meetTheTeam')
            }));
            $('#gnb .contact_btn').on('click', thisAsThat((that, evt) => {
                this.hide();
                History.pushState({
                    state: 'contact'
                }, 'Contact | Capstone Sports', "?page=contact");
                return ga('send', 'event', 'button', 'click', 'GNB - contact')
            }));
            _x = _moveX = _startX = 0;
            $('#gnb').on('touchstart', thisAsThat((that, evt) => {return _startX = evt[0].originalEvent.pageX}));
            $('#gnb').on('touchmove', thisAsThat((that, evt) => {
                _moveX = evt[0].originalEvent.pageX;
                _x = _moveX - _startX;
                if (_x > 0) {
                    _x = 0
                }
                return TweenMax.set(that, {
                    x: _x
                })
            }));
            return $('#gnb').on('touchend', thisAsThat((that, evt) => {
                _x = evt[0].originalEvent.pageX - _startX;
                console.log(_x);
                if (_x < -100) {
                    this.hide();
                    ga('send', 'event', 'Gesture', 'close', 'GNB close gesture')
                } else {
                    TweenMax.to(this.container, 0.5, {
                        ease: Expo.easeOut,
                        x: 0
                    });
                    ga('send', 'event', 'Gesture', 'notClose', 'GNB gesture to close and reopen')
                }
                return _x = _moveX = _startX = 0
            }))
        }
    }
    ;
    RootViewController = class RootViewController {
        constructor()
        {
            this.dom = {
                pointer: $('.pointer')
            };
            this.addEvent()
        }
        addEvent()
        {
            this.dom.pointer.on('mouseenter', thisAsThat((that, evt) => {return SharedEvent.addOpacity(that)}));
            this.dom.pointer.on('click', thisAsThat((that, evt) => {}));
            SharedEvent.addTapEffect($('.gnb_text'));
            return $('.gnb_text').on('click', function() {
                History.pushState({
                    state: 'main'
                }, 'Capstone | English Sporting Goods', '?page=main');
                return ga('send', 'event', 'button', 'click', "Press title text (to index)")
            })
        }
    }
    basketViewController = class basketViewController {
        constructor(tracks, trackNum)
        {
            $('body').append(DOM.userCart);
            this.addEvent();
            this.showuserCart()
        }
        buttonHide(el)
        {
            var complete;
            complete = function() {
                return el.hide()
            };
            TweenMax.set(el, {
                opacity: 1,
                x: 0,
                scale: 1
            });
            return TweenMax.to(el, 0.5, {
                opacity: 0,
                x: 15,
                onComplete: complete,
                ease: Expo.easeOut,
                scale: 0
            })
        }
        buttonShow(el)
        {
            el.show();
            TweenMax.set(el, {
                opacity: 0,
                x: -20,
                scale: 0
            });
            return TweenMax.to(el, 0.5, {
                opacity: 1,
                x: 0,
                ease: Expo.easeOut,
                scale: 1
            })
        }
        showuserCart()
        {
            var _y;
            if (support.isSmall) {
                _y = this.dom.userCart.outerHeight();
                TweenMax.set(this.dom.userCart, {
                    y: _y
                });
                return TweenMax.to(this.dom.userCart, 0.7, {
                    y: 0,
                    ease: Expo.easeOut,
                    delay: 0.1
                })
            } else {}
        }
        addEvent()
        {
            this.dom = {
                userCart: $('#userCart'),
                pointer: $('.timeline_wrapper .pointer'),
                empty: $('.timeline_wrapper .empty')
            };
            TweenMax.set(this.dom.empty, {
                opacity: 0
            });
            $('.svg_list').on('click', thisAsThat((that, evt) => {
                var popup;
                ga('send', 'event', 'button', 'click', 'usercart - Basket');
                popup = new Popup({
                    title: "Your basket is currently empty",
                    desc: "Browse the shop to add products."
                });
                return $('.svg_list').off('click').on('click', function() {
                    return ga('send', 'event', 'button', 'click', 'Basket basket accepted')
                })
            }));
            $('.onboarding .btn').off('mouseenter').on('mouseenter', thisAsThat((that, evt) => {return SharedEvent.addOpacity(that)}));
            this.dom.userCart.on('click', thisAsThat((that, evt) => {}));
            SharedEvent.addTapEffect($('.btn'));
            this.dom.empty.off('mousemove').on('mousemove touchmove', thisAsThat((that, evt) => {
                var _offset;
                _offset = SharedEvent.getPointingOffset(evt);
                if (this.isSeeking === !0 && _offset.x > 0 && _offset.x < this.dom.empty.width()) {
                    return TweenMax.set(this.dom.handle, {
                        x: _offset.x
                    })
                }
            }));
            this.dom.empty.off('mousedown touchstart').on('mousedown touchstart', thisAsThat((that, evt) => {return this.seekBarOn(evt)}));
            this.dom.empty.off('mouseup touchend').on('mouseup touchend', thisAsThat((that, evt) => {return this.seekBarOff(that, evt)}));
            return this.dom.empty.off('mouseleave').on('mouseleave', thisAsThat((that, evt) => {if (this.isSeeking === !0) {
                    return this.seekBarOff(that, evt)
                }
            }))
        }
        addTouchEvent()
        {
            var _moveY,
                _startY,
                _y;
            if (support.isSmall) {
                _y = _moveY = _startY = 0;
                $('#minilist').on('touchstart', thisAsThat((that, evt) => {return _startY = evt[0].originalEvent.pageY}));
                $('#minilist').on('touchmove', thisAsThat((that, evt) => {
                    _moveY = evt[0].originalEvent.pageY;
                    _y = _moveY - _startY;
                    if (_y < 0) {
                        _y /= 6
                    }
                    return TweenMax.set(that, {
                        y: _y
                    })
                }));
                return $('#minilist').on('touchend', thisAsThat((that, evt) => {
                    _y = _moveY - _startY;
                    if (_y > 100) {
                        this.hideMinilist();
                        ga('send', 'event', 'Gesture', 'close', 'basket 제스쳐 닫기')
                    } else {
                        this.showMinilist();
                        ga('send', 'event', 'Gesture', 'notClose', 'basket gesture to close and reopen')
                    }
                    return _y = _moveY = _startY = 0
                }))
            }
        }
        removeTouchEvent()
        {
            if (support.isSmall) {
                return $('#minilist').off('touchstart touchmove touchend')
            }
        }
        showMiniInfo()
        {
            if (this.minilistState === !1) {
                this.dom.miniInfo.show();
                TweenMax.set(this.dom.miniInfo, {
                    x: 20,
                    opacity: 0
                });
                return TweenMax.to(this.dom.miniInfo, 0.7, {
                    x: 0,
                    ease: Power4.easeOut,
                    opacity: 1
                })
            }
        }
        hideMiniInfo()
        {
            var hideMiniWrapper;
            hideMiniWrapper = () => {return this.dom.miniInfo.hide()};
            TweenMax.set(this.dom.miniInfo, {
                x: 0,
                opacity: 1
            });
            return TweenMax.to(this.dom.miniInfo, 0.7, {
                x: 50,
                ease: Power4.easeOut,
                opacity: 0,
                onComplete: hideMiniWrapper
            })
        }
    }
    ;
    IndexViewController = class IndexViewController {
        constructor()
        {
            this.init()
        }
        init()
        {
            $('body').append(DOM.index);
            $('#index').append(DOM.userCart);
            /* Old decisions, not great
            $('#index .text').append(SVG.listen);
            $('#index').prepend(SVG.indexBtn); */
            SharedEvent.footer.hide();
            SharedEvent.navigator.setDefault();
            this.dom = {
                indexLine: $('#indexline'),
                pointer: $('.pointer'),
                btnWrapper: $('.indexbtn .wrapper'),
                btnSvg: $('.indexbtn svg'),
                text: $('#index .title_base'),
                charWrapper: $('.title_base')
            };
            $('#indexline').append(SVG.indexLine);
            this.indexLine = $('#indexline').find('rect');
            this.dom.indexLine.hide();
            SharedEvent.moveWave(0.5);
            SharedEvent.footer.state = !1;
            SharedEvent.footer.color("black");
            this.addEvent();
            return this.show()
        }
        show()
        {
            var _d,
                i,
                j,
                ref;
            this.sizeUpdate();
            TweenMax.from($('.index_bg'), 1.4, {
                scale: 1.4,
                opacity: 0,
                ease: Expo.easeOut,
                delay: 0.2
            });
            _d = 0.3;
            for (i = j = 0, ref = this.dom.charWrapper.length;(0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
                TweenMax.from(this.dom.charWrapper.eq(i), 2, {
                    y: 50,
                    opacity: 0,
                    delay: 0.5,
                    ease: Expo.easeOut
                });
                _d += 0.1
            }
            this.dom.indexLine.show();
            return TweenMax.from(this.indexLine, 1.5, {
                opacity: 0,
                scaleX: 0,
                delay: 0.5,
                ease: Expo.easeOut,
                transformOrigin: '0, 100%'
            })
        }
        hide()
        {
            var _randomValue,
                i,
                j,
                ref;
            for (i = j = 0, ref = this.dom.charWrapper.length;(0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
                _randomValue = Utils.randomInt(-50, 50);
                TweenMax.to(this.dom.charWrapper.eq(i), 0.8, {
                    y: _randomValue,
                    scale: 1.1,
                    opacity: 0,
                    ease: Power2.easeOut,
                    transformOrigin: "50% 50%"
                });
                if (i === this.dom.charWrapper.length - 1) {
                    TweenMax.delayedCall(0.8, this.hideComplete.bind(this))
                }
            }
            TweenMax.to(this.indexLine, 0.3, {
                opacity: 0,
                scaleX: 1
            });
            this.mouseOut();
            this.dom.text.off('mouseenter');
            return TweenMax.to($('.index_bg'), 0.8, {
                opacity: 0,
                scale: 1.5
            })
        }
        hideComplete()
        {
            return History.pushState({
                state: 'curatedProduct'
            }, 'Capstone XT1 | Capstone Sports', '?page=curatedProduct')
        }
        sizeUpdate() {}
        mouseHover()
        {
            TweenMax.from(this.dom.btnWrapper, 0.5, {
                backgroundColor: color.capstoneRed
            });
            TweenMax.to(this.dom.btnWrapper, 0.1, {
                backgroundColor: color.white,
                delay: 0.5
            });
            TweenMax.to(this.dom.text, 0.5, {
                scale: 0.98
            }, {
                scale: 1,
                ease: Elastic.easeOut.config(1, 0.5)
            });
            TweenMax.fromTo(this.dom.btnWrapper, 1.2, {
                scale: 0.3,
                opacity: 0,
                rotation: 30
            }, {
                rotation: 0,
                scale: 1,
                opacity: 1,
                ease: Elastic.easeOut.config(1, 0.5)
            });
            TweenMax.fromTo(this.dom.btnSvg, 1, {
                x: -30,
                opacity: 0,
                ease: Elastic.easeOut.config(1, 0.8)
            }, {
                x: 0,
                opacity: 1,
                ease: Elastic.easeOut.config(1, 0.8)
            });
            return TweenMax.fromTo(this.indexLine, 0.8, {
                opacity: 1,
                scaleX: 1
            }, {
                scaleX: 0.5,
                ease: Expo.easeOut
            })
        }
        mouseOut()
        {
            TweenMax.to(this.dom.btnWrapper, 0.8, {
                scale: 0,
                opacity: 0,
                ease: Elastic.easeOut.config(1, 0.8)
            });
            return TweenMax.to(this.indexLine, 0.3, {
                scaleX: 1,
                ease: Expo.easeOut
            })
        }
        addEvent()
        {
            SharedEvent.addTapEffect(this.dom.text, 0.98);
            this.dom.text.on('mouseenter touchstart', thisAsThat((that, evt) => {return this.mouseHover()}));
            this.dom.text.on('mouseleave touchend', () => {return this.mouseOut()});
            this.dom.text.on('click', thisAsThat((that, evt) => {
                $(that).off('click');
                return this.hide()
            }));
            return $(window).off('resize').on('resize', () => {
                SharedEvent.resize();
                return this.sizeUpdate()
            })
        }
    }
    ;
    Sorry = class Sorry {
        constructor()
        {
            $('body').html("");
            $('body').append(DOM.sorry);
            ga('set', 'page', '/sorry');
            ga('send', 'pageview')
        }
    }
    ;
    console.log("test");
    (function(i, s, o, g, r, a, m) {
        i.GoogleAnalyticsObject = r;
        i[r] = i[r] || function() {
            (i[r].q = i[r].q || []).push(arguments)
        };
        i[r].l = 1 * new Date;
        a = s.createElement(o);
        m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
    ga('create', 'UA-75003725-1', 'auto');
    ga('send', 'pageview');
    $(function() {
        var isLightMode,
            loadingDone,
            ref,
            rootVC;
        loadingDone = function() {
            return $('.init').remove()
        };
        TweenMax.to($('.init'), 0.3, {
            opacity: 0,
            onComplete: loadingDone
        });
        $('iframe').remove();
        FastClick.attach(document.body);
        STAGE.gnb = new GnbController;
        rootVC = new RootViewController;
        isLightMode = (ref = localStorage && localStorage.lightmode) != null ? ref : localStorage.lightmode;
        STAGE.wave = new Wave({
            baseY: 0.5,
            canvasDom: $('canvas'),
            lightmode: isLightMode
        });
        new StateController;
        DATA.getDefaultPlaylist();
        SharedEvent.addNoBounceEvent();
        if (support.isMS) {
            return new Sorry
        }
    })
}).call(this)

