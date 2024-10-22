"use strict";

[Number, Boolean, String, RegExp, Object, Array, Set, Map, Function].map(function (dataType) {
	return {
		target: Object.prototype,
		name: `is${dataType.name}`,
		value: function () {
			return this.constructor === dataType;
		}
	};
}).concat([
	{
		target: Object.prototype,
		name: "copy",
		value: function () {
			switch (this.constructor) {
				case RegExp: {
					const result = new RegExp(this.source, this.flags);

					result.lastIndex = this.lastIndex;

					return result;
				}
				case Object: {
					const result = {};

					for (const key in this) {
						result[key] = this[key] && this[key].copy();
					}

					return result;
				}
				case Array: {
					return this.map(function (item) {
						return item && item.copy();
					});
				}
				case Set: {
					return new Set(Array.from(this.keys()).copy());
				}
				case Map: {
					const result = new Map();

					this.forEach(function (value, key) {
						result.set(key, value && value.copy());
					});

					return result;
				}
				default: {
					return this;
				}
			}
		}
	},
	{
		target: Object.prototype,
		name: "equalTo",
		value: function (target) {
			if (this === target) {
				return true;
			} else if (target && this.constructor === target.constructor) {
				switch (this.constructor) {
					case RegExp: {
						const source = this, keys = ["source", "flags", "lastIndex"];

						return keys.every(function (key) {
							return source[key] === target[key];
						});
					}
					case Object: {
						const source = this, sourceKeys = Object.keys(source), targetKeys = Object.keys(target);

						return sourceKeys.length === targetKeys.length && sourceKeys.every(function (key) {
							if (Object.hasOwn(target, key)) {
								const sourceValue = source[key], targetValue = target[key];

								return sourceValue ? sourceValue.equalTo(targetValue) : sourceValue === targetValue;
							} else {
								return false;
							}
						});
					}
					case Array: {
						return this.length === target.length && this.every(function (sourceItem, index) {
							const targetItem = target[index];

							return sourceItem ? sourceItem.equalTo(targetItem) : sourceItem === targetItem;
						});
					}
					case Set: {
						const sourceItems = Array.from(this.keys()), targetItems = Array.from(target.keys());

						return this.size === target.size && sourceItems.every(function (sourceItem) {
							return sourceItem ? targetItems.some((targetItem) => sourceItem.equalTo(targetItem)) : target.has(sourceItem);
						});
					}
					case Map: {
						const source = this, sourceKeys = Array.from(this.keys());

						return this.size === target.size && sourceKeys.every(function (key) {
							if (target.has(key)) {
								const sourceValue = source.get(key), targetValue = target.get(key);

								return sourceValue ? sourceValue.equalTo(targetValue) : sourceValue === targetValue;
							} else {
								return false;
							}
						});
					}
					default: {
						return false;
					}
				}
			} else {
				return false;
			}
		}
	},
	{
		target: String.prototype,
		name: "toCapitalize",
		value: function () {
			return this.split(" ").map(function (item) {
				return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
			}).join(" ");
		}
	},
	{
		target: String.prototype,
		name: "format",
		value: function (data = {}) {
			return data.constructor === Object ? this.replace(/{([A-Za-z0-9_-]+)}/g, function (match, key) {
				return data[key] || match;
			}) : this;
		}
	},
	{
		target: String.prototype,
		name: "isEmail",
		value: function () {
			const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return regexp.test(this);
		}
	},
	{
		target: String.prototype,
		name: "isPhoneNumber",
		value: function () {
			const regexp = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s/0-9]*$/;
			return regexp.test(this);
		}
	}
]).forEach(function (item) {
	Object.defineProperty(item.target, item.name, { value: item.value, configurable: false, enumerable: false, writable: false });
});
