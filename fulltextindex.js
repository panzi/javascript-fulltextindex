var FulltextIndex = (function () {
	"use strict";

	// removeDiacritics is based on http://stackoverflow.com/questions/990904/javascript-remove-accents-in-strings#answer-18391901
	var diacriticsMap = (function () {
		var reverseDiacriticsMap = {
		    a:'\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250',
		    aa:'\uA733',
    		ae:'\u00E6\u01FD\u01E3',
	    	ao:'\uA735',
	    	au:'\uA737',
		    av:'\uA739\uA73B',
    		ay:'\uA73D',
		    b:'\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253',
    		c:'\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184',
	    	d:'\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A',
	    	dz:'\u01F3\u01C6',
		    e:'\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD',
	    	f:'\u0066\u24D5\uFF46\u1E1F\u0192\uA77C',
	    	g:'\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F',
		    h:'\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265',
    		hv:'\u0195',
		    i:'\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131',
    		j:'\u006A\u24D9\uFF4A\u0135\u01F0\u0249',
	    	k:'\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3',
	    	l:'\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747',
		    lj:'\u01C9',
    		m:'\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F',
		    n:'\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5',
    		nj:'\u01CC',
	    	o:'\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275',
	    	oi:'\u01A3',
		    ou:'\u0223',
    		oo:'\uA74F',
		    p:'\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755',
    		q:'\u0071\u24E0\uFF51\u024B\uA757\uA759',
	    	r:'\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783',
	    	s:'\u0073\u24E2\uFF53\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B',
	    	ss:'\u00DF',
		    t:'\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787',
    		tz:'\uA729',
		    u:'\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289',
    		v:'\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C',
	    	vy:'\uA761',
	    	w:'\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73',
		    x:'\u0078\u24E7\uFF58\u1E8B\u1E8D',
    		y:'\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF',
		    z:'\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763'
		};

		var diacriticsMap = {};
		for (var base in reverseDiacriticsMap) {
			var letters = reverseDiacriticsMap[base].split("");
			for (var i = 0; i < letters.length; ++ i) {
				diacriticsMap[letters[i]] = base;
			}
		}
		return diacriticsMap;
	})();

	function removeDiacritics (str) {
		var letters = str.split("");
		var newStr = "";
		for (var i = 0; i < letters.length; ++ i) {
			var letter = letters[i];
			newStr += letter in diacriticsMap ? diacriticsMap[letter] : letter;
		}
		return newStr;
	}

	function FulltextIndex (options) {
		this.options = {};
		this.index   = {};

		for (var name in options) {
			this.options[name] = options[name];
		}

		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for (var name in FulltextIndex.defaults) {
			if (!hasOwnProperty.call(this.options,name)) {
				this.options[name] = FulltextIndex.defaults[name];
			}
		}
	}

	FulltextIndex.defaults = {
		minLength: 2,
		substrings: true,
		normalize: function (s) { return removeDiacritics(s.toLowerCase()); },
		split: function (s) {
			// TODO: better word boundary detection?
			//       can't use /\W+/ because of lacking unicode support in node.js
			return s.split(/[-\s,;:\.\/\\\{\}\[\]\(\)<>|!\?"'^#\+~\*\$%`´&§=@€»«¢„“”]+/);
		}
	};

	FulltextIndex.removeDiacritics = removeDiacritics;

	FulltextIndex.prototype = {
		find: function (query) {
			var words = this.wordsOf(query);
			if (words.length === 0) return [];

			// start with longest word, because this is most likely to be not found
			words.sort(function (a,b) { return b.length - a.length; });

			var index = this.index;
			var hasOwnProperty = Object.prototype.hasOwnProperty;
			var word = words[0];

			if (!hasOwnProperty.call(index,word)) {
				return [];
			}

			var resultSet = {};
			for (var key in index[word]) {
				resultSet[key] = true;
			}

			for (var i = 1; i < words.length; ++ i) {
				var word = words[i];
				if (!hasOwnProperty.call(index,word)) {
					return [];
				}
				var keySet = index[word];
				for (var key in resultSet) {
					if (!hasOwnProperty.call(keySet,key)) {
						delete resultSet[key];
					}
				}
			}

			return Object.keys(resultSet);
		},
		add: function (key, text) {
			var strs = this.options.substrings ? this.substringsOf(text) :  this.wordsOf(text);
			if (strs.length === 0) {
				return false;
			}
			var index = this.index;
			var hasOwnProperty = Object.prototype.hasOwnProperty;
			for (var i = 0; i < strs.length; ++ i) {
				var str = strs[i];
				var keySet = hasOwnProperty.call(index,str) ?
					index[str] : (index[str] = {});
				keySet[key] = true;
			}
			return true;
		},
		remove: function (key) {
			var index = this.index;
			for (var word in index) {
				delete index[word][key];
			}
		},
		clear: function () {
			this.index = {};
		},
		wordsOf: function (text) {
			var words = text.trim();
			if (!words) return [];
			var minlen = this.options.minLength;
			var map = {};
			var hasOwnProperty = Object.prototype.hasOwnProperty;

			return this.options.split(this.options.normalize(words)).filter(function (word) {
				if (word.length < minlen || hasOwnProperty.call(map,word)) {
					return false;
				}
				map[word] = true;
				return true;
			});
		},
		substringsOf: function (text) {
			var minlen = this.options.minLength;
			var hasOwnProperty = Object.prototype.hasOwnProperty;
			var words = this.wordsOf(text);
			var strs  = {};

			for (var i = 0; i < words.length; ++ i) {
				var word = words[i];
				var wordlen = word.length;
				for (var n = wordlen; n >= minlen; -- n) {
					for (var j = 0, m = wordlen - n; j <= m; ++ j) {
						strs[word.slice(j, j + n)] = true;
					}
				}
			}
			return Object.keys(strs);
		},
		toJSON: function () {
			var json = {};
			var index = this.index;
			for (var str in index) {
				json[str] = Object.keys(index[str]);
			}
			return json;
		},
		toString: function () {
			return JSON.stringify(this.toJSON());
		},
		dump: function () {
			return this.toString();
		},
		load: function (str) {
			var json = JSON.parse(str);
			var index = {};
			if (typeof json !== "object" || json === null) {
				throw new TypeError("invalid JSON data");
			}
			for (var str in json) {
				var keys = json[str];
				if (!Array.isArray(keys)) {
					throw new TypeError("invalid JSON data");
				}
				var keySet = {};
				for (var i = 0; i < keys.length; ++ i) {
					var key = keys[i];
					if (typeof key !== "string") {
						throw new TypeError("invalid JSON data");
					}
					keySet[key] = true;
				}
				index[str] = keySet;
			}
			this.index = index;
		}
	};

	return FulltextIndex;
})();

if (typeof exports === "object") {
	exports.FulltextIndex = FulltextIndex;
}
