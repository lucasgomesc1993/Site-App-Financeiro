var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b;
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React__default, { Component, createContext, useContext, useState, useEffect, lazy, Suspense } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { useNavigate, useLocation, Link, Routes, Route, StaticRouter } from "react-router-dom";
import fastCompare from "react-fast-compare";
import invariant from "invariant";
import shallowEqual from "shallowequal";
import { Writable } from "stream";
import { LazyMotion, domAnimation } from "framer-motion";
import { Wallet, X, Menu, ChevronRight, Instagram, Youtube, Linkedin } from "lucide-react";
var TAG_NAMES = /* @__PURE__ */ ((TAG_NAMES2) => {
  TAG_NAMES2["BASE"] = "base";
  TAG_NAMES2["BODY"] = "body";
  TAG_NAMES2["HEAD"] = "head";
  TAG_NAMES2["HTML"] = "html";
  TAG_NAMES2["LINK"] = "link";
  TAG_NAMES2["META"] = "meta";
  TAG_NAMES2["NOSCRIPT"] = "noscript";
  TAG_NAMES2["SCRIPT"] = "script";
  TAG_NAMES2["STYLE"] = "style";
  TAG_NAMES2["TITLE"] = "title";
  TAG_NAMES2["FRAGMENT"] = "Symbol(react.fragment)";
  return TAG_NAMES2;
})(TAG_NAMES || {});
var SEO_PRIORITY_TAGS = {
  link: { rel: ["amphtml", "canonical", "alternate"] },
  script: { type: ["application/ld+json"] },
  meta: {
    charset: "",
    name: ["generator", "robots", "description"],
    property: [
      "og:type",
      "og:title",
      "og:url",
      "og:image",
      "og:image:alt",
      "og:description",
      "twitter:url",
      "twitter:title",
      "twitter:description",
      "twitter:image",
      "twitter:image:alt",
      "twitter:card",
      "twitter:site"
    ]
  }
};
var VALID_TAG_NAMES = Object.values(TAG_NAMES);
var REACT_TAG_MAP = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
};
var HTML_TAG_MAP = Object.entries(REACT_TAG_MAP).reduce(
  (carry, [key, value]) => {
    carry[value] = key;
    return carry;
  },
  {}
);
var HELMET_ATTRIBUTE = "data-rh";
var HELMET_PROPS = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate",
  PRIORITIZE_SEO_TAGS: "prioritizeSeoTags"
};
var getInnermostProperty = (propsList, property) => {
  for (let i = propsList.length - 1; i >= 0; i -= 1) {
    const props = propsList[i];
    if (Object.prototype.hasOwnProperty.call(props, property)) {
      return props[property];
    }
  }
  return null;
};
var getTitleFromPropsList = (propsList) => {
  let innermostTitle = getInnermostProperty(
    propsList,
    "title"
    /* TITLE */
  );
  const innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);
  if (Array.isArray(innermostTitle)) {
    innermostTitle = innermostTitle.join("");
  }
  if (innermostTemplate && innermostTitle) {
    return innermostTemplate.replace(/%s/g, () => innermostTitle);
  }
  const innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);
  return innermostTitle || innermostDefaultTitle || void 0;
};
var getOnChangeClientState = (propsList) => getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || (() => {
});
var getAttributesFromPropsList = (tagType, propsList) => propsList.filter((props) => typeof props[tagType] !== "undefined").map((props) => props[tagType]).reduce((tagAttrs, current) => ({ ...tagAttrs, ...current }), {});
var getBaseTagFromPropsList = (primaryAttributes, propsList) => propsList.filter((props) => typeof props[
  "base"
  /* BASE */
] !== "undefined").map((props) => props[
  "base"
  /* BASE */
]).reverse().reduce((innermostBaseTag, tag) => {
  if (!innermostBaseTag.length) {
    const keys = Object.keys(tag);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const lowerCaseAttributeKey = attributeKey.toLowerCase();
      if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
        return innermostBaseTag.concat(tag);
      }
    }
  }
  return innermostBaseTag;
}, []);
var warn = (msg) => console && typeof console.warn === "function" && console.warn(msg);
var getTagsFromPropsList = (tagName, primaryAttributes, propsList) => {
  const approvedSeenTags = {};
  return propsList.filter((props) => {
    if (Array.isArray(props[tagName])) {
      return true;
    }
    if (typeof props[tagName] !== "undefined") {
      warn(
        `Helmet: ${tagName} should be of type "Array". Instead found type "${typeof props[tagName]}"`
      );
    }
    return false;
  }).map((props) => props[tagName]).reverse().reduce((approvedTags, instanceTags) => {
    const instanceSeenTags = {};
    instanceTags.filter((tag) => {
      let primaryAttributeKey;
      const keys2 = Object.keys(tag);
      for (let i = 0; i < keys2.length; i += 1) {
        const attributeKey = keys2[i];
        const lowerCaseAttributeKey = attributeKey.toLowerCase();
        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === "rel" && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === "rel" && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
          primaryAttributeKey = lowerCaseAttributeKey;
        }
        if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === "innerHTML" || attributeKey === "cssText" || attributeKey === "itemprop")) {
          primaryAttributeKey = attributeKey;
        }
      }
      if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
        return false;
      }
      const value = tag[primaryAttributeKey].toLowerCase();
      if (!approvedSeenTags[primaryAttributeKey]) {
        approvedSeenTags[primaryAttributeKey] = {};
      }
      if (!instanceSeenTags[primaryAttributeKey]) {
        instanceSeenTags[primaryAttributeKey] = {};
      }
      if (!approvedSeenTags[primaryAttributeKey][value]) {
        instanceSeenTags[primaryAttributeKey][value] = true;
        return true;
      }
      return false;
    }).reverse().forEach((tag) => approvedTags.push(tag));
    const keys = Object.keys(instanceSeenTags);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const tagUnion = {
        ...approvedSeenTags[attributeKey],
        ...instanceSeenTags[attributeKey]
      };
      approvedSeenTags[attributeKey] = tagUnion;
    }
    return approvedTags;
  }, []).reverse();
};
var getAnyTrueFromPropsList = (propsList, checkedTag) => {
  if (Array.isArray(propsList) && propsList.length) {
    for (let index = 0; index < propsList.length; index += 1) {
      const prop = propsList[index];
      if (prop[checkedTag]) {
        return true;
      }
    }
  }
  return false;
};
var reducePropsToState = (propsList) => ({
  baseTag: getBaseTagFromPropsList([
    "href"
    /* HREF */
  ], propsList),
  bodyAttributes: getAttributesFromPropsList("bodyAttributes", propsList),
  defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
  encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
  htmlAttributes: getAttributesFromPropsList("htmlAttributes", propsList),
  linkTags: getTagsFromPropsList(
    "link",
    [
      "rel",
      "href"
      /* HREF */
    ],
    propsList
  ),
  metaTags: getTagsFromPropsList(
    "meta",
    [
      "name",
      "charset",
      "http-equiv",
      "property",
      "itemprop"
      /* ITEM_PROP */
    ],
    propsList
  ),
  noscriptTags: getTagsFromPropsList("noscript", [
    "innerHTML"
    /* INNER_HTML */
  ], propsList),
  onChangeClientState: getOnChangeClientState(propsList),
  scriptTags: getTagsFromPropsList(
    "script",
    [
      "src",
      "innerHTML"
      /* INNER_HTML */
    ],
    propsList
  ),
  styleTags: getTagsFromPropsList("style", [
    "cssText"
    /* CSS_TEXT */
  ], propsList),
  title: getTitleFromPropsList(propsList),
  titleAttributes: getAttributesFromPropsList("titleAttributes", propsList),
  prioritizeSeoTags: getAnyTrueFromPropsList(propsList, HELMET_PROPS.PRIORITIZE_SEO_TAGS)
});
var flattenArray = (possibleArray) => Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
var checkIfPropsMatch = (props, toMatch) => {
  const keys = Object.keys(props);
  for (let i = 0; i < keys.length; i += 1) {
    if (toMatch[keys[i]] && toMatch[keys[i]].includes(props[keys[i]])) {
      return true;
    }
  }
  return false;
};
var prioritizer = (elementsList, propsToMatch) => {
  if (Array.isArray(elementsList)) {
    return elementsList.reduce(
      (acc, elementAttrs) => {
        if (checkIfPropsMatch(elementAttrs, propsToMatch)) {
          acc.priority.push(elementAttrs);
        } else {
          acc.default.push(elementAttrs);
        }
        return acc;
      },
      { priority: [], default: [] }
    );
  }
  return { default: elementsList, priority: [] };
};
var without = (obj, key) => {
  return {
    ...obj,
    [key]: void 0
  };
};
var SELF_CLOSING_TAGS = [
  "noscript",
  "script",
  "style"
  /* STYLE */
];
var encodeSpecialCharacters = (str, encode = true) => {
  if (encode === false) {
    return String(str);
  }
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};
var generateElementAttributesAsString = (attributes) => Object.keys(attributes).reduce((str, key) => {
  const attr = typeof attributes[key] !== "undefined" ? `${key}="${attributes[key]}"` : `${key}`;
  return str ? `${str} ${attr}` : attr;
}, "");
var generateTitleAsString = (type, title, attributes, encode) => {
  const attributeString = generateElementAttributesAsString(attributes);
  const flattenedTitle = flattenArray(title);
  return attributeString ? `<${type} ${HELMET_ATTRIBUTE}="true" ${attributeString}>${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>` : `<${type} ${HELMET_ATTRIBUTE}="true">${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>`;
};
var generateTagsAsString = (type, tags, encode = true) => tags.reduce((str, t) => {
  const tag = t;
  const attributeHtml = Object.keys(tag).filter(
    (attribute) => !(attribute === "innerHTML" || attribute === "cssText")
  ).reduce((string, attribute) => {
    const attr = typeof tag[attribute] === "undefined" ? attribute : `${attribute}="${encodeSpecialCharacters(tag[attribute], encode)}"`;
    return string ? `${string} ${attr}` : attr;
  }, "");
  const tagContent = tag.innerHTML || tag.cssText || "";
  const isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;
  return `${str}<${type} ${HELMET_ATTRIBUTE}="true" ${attributeHtml}${isSelfClosing ? `/>` : `>${tagContent}</${type}>`}`;
}, "");
var convertElementAttributesToReactProps = (attributes, initProps = {}) => Object.keys(attributes).reduce((obj, key) => {
  const mapped = REACT_TAG_MAP[key];
  obj[mapped || key] = attributes[key];
  return obj;
}, initProps);
var generateTitleAsReactComponent = (_type, title, attributes) => {
  const initProps = {
    key: title,
    [HELMET_ATTRIBUTE]: true
  };
  const props = convertElementAttributesToReactProps(attributes, initProps);
  return [React__default.createElement("title", props, title)];
};
var generateTagsAsReactComponent = (type, tags) => tags.map((tag, i) => {
  const mappedTag = {
    key: i,
    [HELMET_ATTRIBUTE]: true
  };
  Object.keys(tag).forEach((attribute) => {
    const mapped = REACT_TAG_MAP[attribute];
    const mappedAttribute = mapped || attribute;
    if (mappedAttribute === "innerHTML" || mappedAttribute === "cssText") {
      const content = tag.innerHTML || tag.cssText;
      mappedTag.dangerouslySetInnerHTML = { __html: content };
    } else {
      mappedTag[mappedAttribute] = tag[attribute];
    }
  });
  return React__default.createElement(type, mappedTag);
});
var getMethodsForTag = (type, tags, encode = true) => {
  switch (type) {
    case "title":
      return {
        toComponent: () => generateTitleAsReactComponent(type, tags.title, tags.titleAttributes),
        toString: () => generateTitleAsString(type, tags.title, tags.titleAttributes, encode)
      };
    case "bodyAttributes":
    case "htmlAttributes":
      return {
        toComponent: () => convertElementAttributesToReactProps(tags),
        toString: () => generateElementAttributesAsString(tags)
      };
    default:
      return {
        toComponent: () => generateTagsAsReactComponent(type, tags),
        toString: () => generateTagsAsString(type, tags, encode)
      };
  }
};
var getPriorityMethods = ({ metaTags, linkTags, scriptTags, encode }) => {
  const meta = prioritizer(metaTags, SEO_PRIORITY_TAGS.meta);
  const link = prioritizer(linkTags, SEO_PRIORITY_TAGS.link);
  const script = prioritizer(scriptTags, SEO_PRIORITY_TAGS.script);
  const priorityMethods = {
    toComponent: () => [
      ...generateTagsAsReactComponent("meta", meta.priority),
      ...generateTagsAsReactComponent("link", link.priority),
      ...generateTagsAsReactComponent("script", script.priority)
    ],
    toString: () => (
      // generate all the tags as strings and concatenate them
      `${getMethodsForTag("meta", meta.priority, encode)} ${getMethodsForTag(
        "link",
        link.priority,
        encode
      )} ${getMethodsForTag("script", script.priority, encode)}`
    )
  };
  return {
    priorityMethods,
    metaTags: meta.default,
    linkTags: link.default,
    scriptTags: script.default
  };
};
var mapStateOnServer = (props) => {
  const {
    baseTag,
    bodyAttributes,
    encode = true,
    htmlAttributes,
    noscriptTags,
    styleTags,
    title = "",
    titleAttributes,
    prioritizeSeoTags
  } = props;
  let { linkTags, metaTags, scriptTags } = props;
  let priorityMethods = {
    toComponent: () => {
    },
    toString: () => ""
  };
  if (prioritizeSeoTags) {
    ({ priorityMethods, linkTags, metaTags, scriptTags } = getPriorityMethods(props));
  }
  return {
    priority: priorityMethods,
    base: getMethodsForTag("base", baseTag, encode),
    bodyAttributes: getMethodsForTag("bodyAttributes", bodyAttributes, encode),
    htmlAttributes: getMethodsForTag("htmlAttributes", htmlAttributes, encode),
    link: getMethodsForTag("link", linkTags, encode),
    meta: getMethodsForTag("meta", metaTags, encode),
    noscript: getMethodsForTag("noscript", noscriptTags, encode),
    script: getMethodsForTag("script", scriptTags, encode),
    style: getMethodsForTag("style", styleTags, encode),
    title: getMethodsForTag("title", { title, titleAttributes }, encode)
  };
};
var server_default = mapStateOnServer;
var instances = [];
var isDocument = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var HelmetData = class {
  constructor(context, canUseDOM) {
    __publicField(this, "instances", []);
    __publicField(this, "canUseDOM", isDocument);
    __publicField(this, "context");
    __publicField(this, "value", {
      setHelmet: (serverState) => {
        this.context.helmet = serverState;
      },
      helmetInstances: {
        get: () => this.canUseDOM ? instances : this.instances,
        add: (instance) => {
          (this.canUseDOM ? instances : this.instances).push(instance);
        },
        remove: (instance) => {
          const index = (this.canUseDOM ? instances : this.instances).indexOf(instance);
          (this.canUseDOM ? instances : this.instances).splice(index, 1);
        }
      }
    });
    this.context = context;
    this.canUseDOM = canUseDOM || false;
    if (!canUseDOM) {
      context.helmet = server_default({
        baseTag: [],
        bodyAttributes: {},
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: "",
        titleAttributes: {}
      });
    }
  }
};
var defaultValue = {};
var Context = React__default.createContext(defaultValue);
var HelmetProvider = (_a = class extends Component {
  constructor(props) {
    super(props);
    __publicField(this, "helmetData");
    this.helmetData = new HelmetData(this.props.context || {}, _a.canUseDOM);
  }
  render() {
    return /* @__PURE__ */ React__default.createElement(Context.Provider, { value: this.helmetData.value }, this.props.children);
  }
}, __publicField(_a, "canUseDOM", isDocument), _a);
var updateTags = (type, tags) => {
  const headElement = document.head || document.querySelector(
    "head"
    /* HEAD */
  );
  const tagNodes = headElement.querySelectorAll(`${type}[${HELMET_ATTRIBUTE}]`);
  const oldTags = [].slice.call(tagNodes);
  const newTags = [];
  let indexToDelete;
  if (tags && tags.length) {
    tags.forEach((tag) => {
      const newElement = document.createElement(type);
      for (const attribute in tag) {
        if (Object.prototype.hasOwnProperty.call(tag, attribute)) {
          if (attribute === "innerHTML") {
            newElement.innerHTML = tag.innerHTML;
          } else if (attribute === "cssText") {
            if (newElement.styleSheet) {
              newElement.styleSheet.cssText = tag.cssText;
            } else {
              newElement.appendChild(document.createTextNode(tag.cssText));
            }
          } else {
            const attr = attribute;
            const value = typeof tag[attr] === "undefined" ? "" : tag[attr];
            newElement.setAttribute(attribute, value);
          }
        }
      }
      newElement.setAttribute(HELMET_ATTRIBUTE, "true");
      if (oldTags.some((existingTag, index) => {
        indexToDelete = index;
        return newElement.isEqualNode(existingTag);
      })) {
        oldTags.splice(indexToDelete, 1);
      } else {
        newTags.push(newElement);
      }
    });
  }
  oldTags.forEach((tag) => {
    var _a2;
    return (_a2 = tag.parentNode) == null ? void 0 : _a2.removeChild(tag);
  });
  newTags.forEach((tag) => headElement.appendChild(tag));
  return {
    oldTags,
    newTags
  };
};
var updateAttributes = (tagName, attributes) => {
  const elementTag = document.getElementsByTagName(tagName)[0];
  if (!elementTag) {
    return;
  }
  const helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
  const helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
  const attributesToRemove = [...helmetAttributes];
  const attributeKeys = Object.keys(attributes);
  for (const attribute of attributeKeys) {
    const value = attributes[attribute] || "";
    if (elementTag.getAttribute(attribute) !== value) {
      elementTag.setAttribute(attribute, value);
    }
    if (helmetAttributes.indexOf(attribute) === -1) {
      helmetAttributes.push(attribute);
    }
    const indexToSave = attributesToRemove.indexOf(attribute);
    if (indexToSave !== -1) {
      attributesToRemove.splice(indexToSave, 1);
    }
  }
  for (let i = attributesToRemove.length - 1; i >= 0; i -= 1) {
    elementTag.removeAttribute(attributesToRemove[i]);
  }
  if (helmetAttributes.length === attributesToRemove.length) {
    elementTag.removeAttribute(HELMET_ATTRIBUTE);
  } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
    elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
  }
};
var updateTitle = (title, attributes) => {
  if (typeof title !== "undefined" && document.title !== title) {
    document.title = flattenArray(title);
  }
  updateAttributes("title", attributes);
};
var commitTagChanges = (newState, cb) => {
  const {
    baseTag,
    bodyAttributes,
    htmlAttributes,
    linkTags,
    metaTags,
    noscriptTags,
    onChangeClientState,
    scriptTags,
    styleTags,
    title,
    titleAttributes
  } = newState;
  updateAttributes("body", bodyAttributes);
  updateAttributes("html", htmlAttributes);
  updateTitle(title, titleAttributes);
  const tagUpdates = {
    baseTag: updateTags("base", baseTag),
    linkTags: updateTags("link", linkTags),
    metaTags: updateTags("meta", metaTags),
    noscriptTags: updateTags("noscript", noscriptTags),
    scriptTags: updateTags("script", scriptTags),
    styleTags: updateTags("style", styleTags)
  };
  const addedTags = {};
  const removedTags = {};
  Object.keys(tagUpdates).forEach((tagType) => {
    const { newTags, oldTags } = tagUpdates[tagType];
    if (newTags.length) {
      addedTags[tagType] = newTags;
    }
    if (oldTags.length) {
      removedTags[tagType] = tagUpdates[tagType].oldTags;
    }
  });
  if (cb) {
    cb();
  }
  onChangeClientState(newState, addedTags, removedTags);
};
var _helmetCallback = null;
var handleStateChangeOnClient = (newState) => {
  if (_helmetCallback) {
    cancelAnimationFrame(_helmetCallback);
  }
  if (newState.defer) {
    _helmetCallback = requestAnimationFrame(() => {
      commitTagChanges(newState, () => {
        _helmetCallback = null;
      });
    });
  } else {
    commitTagChanges(newState);
    _helmetCallback = null;
  }
};
var client_default = handleStateChangeOnClient;
var HelmetDispatcher = class extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "rendered", false);
  }
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(nextProps, this.props);
  }
  componentDidUpdate() {
    this.emitChange();
  }
  componentWillUnmount() {
    const { helmetInstances } = this.props.context;
    helmetInstances.remove(this);
    this.emitChange();
  }
  emitChange() {
    const { helmetInstances, setHelmet } = this.props.context;
    let serverState = null;
    const state = reducePropsToState(
      helmetInstances.get().map((instance) => {
        const props = { ...instance.props };
        delete props.context;
        return props;
      })
    );
    if (HelmetProvider.canUseDOM) {
      client_default(state);
    } else if (server_default) {
      serverState = server_default(state);
    }
    setHelmet(serverState);
  }
  // componentWillMount will be deprecated
  // for SSR, initialize on first render
  // constructor is also unsafe in StrictMode
  init() {
    if (this.rendered) {
      return;
    }
    this.rendered = true;
    const { helmetInstances } = this.props.context;
    helmetInstances.add(this);
    this.emitChange();
  }
  render() {
    this.init();
    return null;
  }
};
var Helmet = (_b = class extends Component {
  shouldComponentUpdate(nextProps) {
    return !fastCompare(without(this.props, "helmetData"), without(nextProps, "helmetData"));
  }
  mapNestedChildrenToProps(child, nestedChildren) {
    if (!nestedChildren) {
      return null;
    }
    switch (child.type) {
      case "script":
      case "noscript":
        return {
          innerHTML: nestedChildren
        };
      case "style":
        return {
          cssText: nestedChildren
        };
      default:
        throw new Error(
          `<${child.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`
        );
    }
  }
  flattenArrayTypeChildren(child, arrayTypeChildren, newChildProps, nestedChildren) {
    return {
      ...arrayTypeChildren,
      [child.type]: [
        ...arrayTypeChildren[child.type] || [],
        {
          ...newChildProps,
          ...this.mapNestedChildrenToProps(child, nestedChildren)
        }
      ]
    };
  }
  mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren) {
    switch (child.type) {
      case "title":
        return {
          ...newProps,
          [child.type]: nestedChildren,
          titleAttributes: { ...newChildProps }
        };
      case "body":
        return {
          ...newProps,
          bodyAttributes: { ...newChildProps }
        };
      case "html":
        return {
          ...newProps,
          htmlAttributes: { ...newChildProps }
        };
      default:
        return {
          ...newProps,
          [child.type]: { ...newChildProps }
        };
    }
  }
  mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
    let newFlattenedProps = { ...newProps };
    Object.keys(arrayTypeChildren).forEach((arrayChildName) => {
      newFlattenedProps = {
        ...newFlattenedProps,
        [arrayChildName]: arrayTypeChildren[arrayChildName]
      };
    });
    return newFlattenedProps;
  }
  warnOnInvalidChildren(child, nestedChildren) {
    invariant(
      VALID_TAG_NAMES.some((name) => child.type === name),
      typeof child.type === "function" ? `You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.` : `Only elements types ${VALID_TAG_NAMES.join(
        ", "
      )} are allowed. Helmet does not support rendering <${child.type}> elements. Refer to our API for more information.`
    );
    invariant(
      !nestedChildren || typeof nestedChildren === "string" || Array.isArray(nestedChildren) && !nestedChildren.some((nestedChild) => typeof nestedChild !== "string"),
      `Helmet expects a string as a child of <${child.type}>. Did you forget to wrap your children in braces? ( <${child.type}>{\`\`}</${child.type}> ) Refer to our API for more information.`
    );
    return true;
  }
  mapChildrenToProps(children, newProps) {
    let arrayTypeChildren = {};
    React__default.Children.forEach(children, (child) => {
      if (!child || !child.props) {
        return;
      }
      const { children: nestedChildren, ...childProps } = child.props;
      const newChildProps = Object.keys(childProps).reduce((obj, key) => {
        obj[HTML_TAG_MAP[key] || key] = childProps[key];
        return obj;
      }, {});
      let { type } = child;
      if (typeof type === "symbol") {
        type = type.toString();
      } else {
        this.warnOnInvalidChildren(child, nestedChildren);
      }
      switch (type) {
        case "Symbol(react.fragment)":
          newProps = this.mapChildrenToProps(nestedChildren, newProps);
          break;
        case "link":
        case "meta":
        case "noscript":
        case "script":
        case "style":
          arrayTypeChildren = this.flattenArrayTypeChildren(
            child,
            arrayTypeChildren,
            newChildProps,
            nestedChildren
          );
          break;
        default:
          newProps = this.mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren);
          break;
      }
    });
    return this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
  }
  render() {
    const { children, ...props } = this.props;
    let newProps = { ...props };
    let { helmetData } = props;
    if (children) {
      newProps = this.mapChildrenToProps(children, newProps);
    }
    if (helmetData && !(helmetData instanceof HelmetData)) {
      const data = helmetData;
      helmetData = new HelmetData(data.context, true);
      delete newProps.helmetData;
    }
    return helmetData ? /* @__PURE__ */ React__default.createElement(HelmetDispatcher, { ...newProps, context: helmetData.value }) : /* @__PURE__ */ React__default.createElement(Context.Consumer, null, (context) => /* @__PURE__ */ React__default.createElement(HelmetDispatcher, { ...newProps, context }));
  }
}, __publicField(_b, "defaultProps", {
  defer: true,
  encodeSpecialCharacters: true,
  prioritizeSeoTags: false
}), _b);
const ServerContext = createContext(null);
const ServerDataProvider = ({ value, children }) => {
  return /* @__PURE__ */ jsx(ServerContext.Provider, { value, children });
};
const useServerData = () => {
  return useContext(ServerContext);
};
const NAV_ITEMS = [
  { label: "Como Funciona", href: "#solucao" },
  { label: "Recursos", href: "#modulos" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Planos", href: "#investimento" },
  { label: "Calculadoras", href: "/calculadoras" },
  { label: "FAQ", href: "#faq" }
];
const TESTIMONIALS = [
  {
    id: 1,
    name: "Carlos Mendes",
    handle: "@carlos_dev",
    text: "Eu nunca conseguia manter uma planilha atualizada. Com a Junny, eu só mando um áudio 'Gastei 50 no almoço' e pronto. O dashboard se atualiza sozinho. Mágico!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    name: "Fernanda Lima",
    handle: "@nanda_arq",
    text: "A IA entende até quando eu falo gírias ou divido a conta. 'Rachei o Uber com a Julia', ele já categoriza transporte e ajusta o valor. Melhor assinatura que tenho.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    name: "Roberto Campos",
    handle: "@beto_invest",
    text: "O dashboard é lindo e me dá uma visão clara de onde estou gastando muito. A meta de economia automática mudou meu jogo financeiro.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    name: "Juliana Paes",
    handle: "@ju_marketing",
    text: "Parei de usar 3 apps diferentes. Tudo agora é no WhatsApp. A notificação de 'Você excedeu o orçamento de Ifood' me salvou esse mês.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60"
  },
  {
    id: 5,
    name: "Lucas Silva",
    handle: "@lucas_tech",
    text: "Segurança era minha preocupação, mas ver que não precisa conectar conta bancária direta e funciona só com o que eu envio me deixou tranquilo.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60"
  },
  {
    id: 6,
    name: "Marina Costa",
    handle: "@mari_design",
    text: "Finalmente entendi para onde vai meu dinheiro. O relatório semanal no Zap é a única coisa que eu leio sobre finanças.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=60"
  },
  {
    id: 7,
    name: "Pedro Alcantara",
    handle: "@pedro_mkt",
    text: "Simplesmente funciona. Mando foto da nota fiscal do restaurante e ele lê os itens. Surreal a tecnologia.",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop&q=60"
  },
  {
    id: 8,
    name: "Sofia R.",
    handle: "@sofia_med",
    text: "Não tenho tempo pra organizar finanças. A Junny faz o trabalho sujo enquanto eu trabalho. Vale cada centavo.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60"
  },
  {
    id: 9,
    name: "Thiago V.",
    handle: "@thiago_vendas",
    text: "Uso para separar gastos da empresa e pessoais. A funcionalidade de #tags na mensagem é genial.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=60"
  },
  {
    id: 10,
    name: "Beatriz M.",
    handle: "@bea_arq",
    text: "A interface web é muito clean. Consigo ver gráficos de evolução patrimonial que nenhum banco me mostra.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60"
  }
];
const MODULES = [
  {
    id: 1,
    title: "Lançamento via WhatsApp",
    description: "Envie áudios, textos ou fotos de notas fiscais. Nossa IA processa em segundos.",
    image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?q=60&w=400&auto=format&fit=crop",
    cols: 1
  },
  {
    id: 2,
    title: "Categorização com IA",
    description: "Não perca tempo escolhendo categorias. A IA entende que 'Méqui' é Alimentação e 'Uber' é Transporte.",
    image: "https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?q=60&w=400&auto=format&fit=crop",
    cols: 1
  },
  {
    id: 3,
    title: "Dashboard em Tempo Real",
    description: "Visualize para onde seu dinheiro vai com gráficos interativos e bonitos, direto no navegador ou celular.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=60&w=400&auto=format&fit=crop",
    cols: 1
  },
  {
    id: 4,
    title: "Metas Inteligentes",
    description: "Defina quanto quer gastar por categoria. A Junny te avisa no WhatsApp se você estiver perto do limite.",
    image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=60&w=400&auto=format&fit=crop",
    cols: 1
  },
  {
    id: 5,
    title: "Relatórios Semanais",
    description: "Receba um resumo da sua semana toda sexta-feira direto no seu WhatsApp.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=60&w=400&auto=format&fit=crop",
    cols: 1
  },
  {
    id: 6,
    title: "Segurança Total",
    description: "Seus dados são criptografados. Não pedimos senha de banco. Você tem o controle.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=60&w=400&auto=format&fit=crop",
    cols: 1
  }
];
const FAQS = [
  {
    question: "Preciso conectar minha conta bancária?",
    answer: "Não! A Junny funciona com base no que você envia pelo WhatsApp. Isso garante total segurança e privacidade, pois não precisamos de acesso direto ao seu banco."
  },
  {
    question: "A IA entende áudios longos?",
    answer: "Sim! Você pode mandar um áudio de 1 minuto listando vários gastos do dia. A IA vai separar item por item, identificar valores e categorizar tudo automaticamente."
  },
  {
    question: "Posso testar antes de pagar?",
    answer: "Com certeza. Oferecemos 7 dias de teste grátis com acesso a todas as funcionalidades, sem compromisso."
  },
  {
    question: "Funciona para PJ e gastos pessoais?",
    answer: "Sim. Você pode criar 'tags' como #empresa ou #casa na mensagem, e a IA separa os contextos dentro do mesmo dashboard."
  },
  {
    question: "É seguro usar no WhatsApp?",
    answer: "Utilizamos a API oficial do WhatsApp Business (Meta), garantindo criptografia de ponta a ponta. Seus dados financeiros são armazenados em servidores seguros."
  },
  {
    question: "Consigo exportar os dados?",
    answer: "Sim, você pode exportar todo o seu histórico para Excel ou PDF a qualquer momento através do painel web."
  }
];
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);
  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (href.startsWith("/")) {
      navigate(href);
      return;
    }
    if (href.startsWith("#")) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const element2 = document.getElementById(href.replace("#", ""));
          if (element2) {
            const headerOffset = 100;
            const elementPosition = element2.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          }
        }, 100);
        return;
      }
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      } else if (href === "#") {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    }
  };
  return /* @__PURE__ */ jsxs(
    "header",
    {
      className: `fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${isMobileMenuOpen ? "bg-transparent" : ""} 
        `,
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `absolute inset-0 transition-all duration-500 pointer-events-none
          ${isScrolled && !isMobileMenuOpen ? "opacity-100 lg:opacity-0 backdrop-blur-xl bg-[#0d0d0d]/80" : "opacity-0"}
          border-b border-white/5`
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "max-w-[1400px] mx-auto px-4 md:px-8 h-20 md:h-24 flex items-center justify-between relative z-50", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 relative shrink-0 group z-50", onClick: () => setIsMobileMenuOpen(false), children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 group-hover:border-primary/50 transition-colors", children: /* @__PURE__ */ jsx(Wallet, { className: "text-primary w-6 h-6" }) }),
            /* @__PURE__ */ jsxs("span", { className: "text-2xl font-bold text-white tracking-tight", children: [
              "Junny",
              /* @__PURE__ */ jsx("span", { className: "text-primary", children: ".ai" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", children: /* @__PURE__ */ jsx("nav", { className: `
                flex items-center gap-1 p-1.5 rounded-full border transition-all duration-500
                ${isScrolled ? "bg-[#0d0d0d]/80 backdrop-blur-xl border-white/10 shadow-2xl shadow-black/50" : "bg-white/5 backdrop-blur-sm border-white/5"}
            `, children: NAV_ITEMS.map((item) => /* @__PURE__ */ jsx(
            "a",
            {
              href: item.href,
              onClick: (e) => handleLinkClick(e, item.href),
              className: `
                    px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300
                    text-gray-300 hover:text-white hover:bg-white/10
                    uppercase tracking-widest
                  `,
              children: item.label
            },
            item.label
          )) }) }),
          /* @__PURE__ */ jsx("div", { className: "hidden lg:flex items-center gap-3 shrink-0", children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://junny.com.br/criar-conta",
              className: "px-7 py-3 rounded-full bg-gradient-to-r from-[#008c69] to-[#05a880] hover:brightness-110 hover:scale-105 transition-all duration-300 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,140,105,0.3)]",
              children: "Começar Grátis"
            }
          ) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "lg:hidden z-50 w-12 h-12 flex items-center justify-center text-white bg-white/5 rounded-full border border-white/10 backdrop-blur-md active:scale-95 transition-all hover:bg-white/10",
              onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
              "aria-label": isMobileMenuOpen ? "Fechar menu" : "Abrir menu",
              children: isMobileMenuOpen ? /* @__PURE__ */ jsx(X, { size: 22 }) : /* @__PURE__ */ jsx(Menu, { size: 22 })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: `fixed inset-0 z-40 bg-[#000000] flex flex-col pt-32 px-6 pb-10 overflow-y-auto min-h-screen transition-all duration-500 ease-in-out ${isMobileMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-full pointer-events-none"}`,
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" }),
              /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-[200px] h-[200px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 relative z-10 max-w-lg mx-auto w-full", children: [
                NAV_ITEMS.map((item, i) => /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: item.href,
                    onClick: (e) => handleLinkClick(e, item.href),
                    style: { transitionDelay: isMobileMenuOpen ? `${i * 50}ms` : "0ms" },
                    className: `group flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`,
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "text-2xl font-medium text-gray-300 group-hover:text-white tracking-tight", children: item.label }),
                      /* @__PURE__ */ jsx(ChevronRight, { className: "text-gray-600 group-hover:text-primary transition-colors", size: 20 })
                    ]
                  },
                  item.label
                )),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `mt-8 transition-all duration-500 delay-300 ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`,
                    children: /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: "https://app.junny.com.br/criar-conta",
                        className: "flex items-center justify-center w-full py-4 rounded-full bg-gradient-to-r from-[#008c69] to-[#05a880] hover:brightness-110 transition-all duration-300 text-white font-bold text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(0,140,105,0.3)] active:scale-[0.98]",
                        children: "Começar Grátis"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: `mt-auto pt-10 text-center transition-all duration-500 delay-500 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`, children: /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-sm", children: [
                  "© 2025 Junny AI. ",
                  /* @__PURE__ */ jsx("br", {}),
                  " Todos os direitos reservados."
                ] }) })
              ] })
            ]
          }
        )
      ]
    }
  );
};
const Footer = () => {
  return /* @__PURE__ */ jsx("footer", { className: "py-12 md:py-24 px-4 border-t border-white/5 bg-surface/30", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center md:items-start gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20", children: /* @__PURE__ */ jsx(Wallet, { className: "text-primary w-5 h-5" }) }),
        /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white tracking-tight", children: "Junny.ai" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 max-w-xs text-center md:text-left", children: "Inteligência artificial aplicada à liberdade financeira. Simples, seguro e direto no seu WhatsApp." }),
      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "© 2025 Junny AI. Todos os direitos reservados." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center md:items-end gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-6", children: [
        /* @__PURE__ */ jsx("a", { href: "#", className: "text-gray-400 hover:text-white transition-colors", "aria-label": "Instagram", children: /* @__PURE__ */ jsx(Instagram, {}) }),
        /* @__PURE__ */ jsx("a", { href: "#", className: "text-gray-400 hover:text-white transition-colors", "aria-label": "Youtube", children: /* @__PURE__ */ jsx(Youtube, {}) }),
        /* @__PURE__ */ jsx("a", { href: "#", className: "text-gray-400 hover:text-white transition-colors", "aria-label": "LinkedIn", children: /* @__PURE__ */ jsx(Linkedin, {}) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-gray-400", children: [
        /* @__PURE__ */ jsx(Link, { to: "/terms", className: "hover:text-gray-300", children: "Termos de Uso" }),
        /* @__PURE__ */ jsx(Link, { to: "/privacy", className: "hover:text-gray-300", children: "Privacidade" }),
        /* @__PURE__ */ jsx(Link, { to: "/blog", className: "hover:text-gray-300", children: "Blog" }),
        /* @__PURE__ */ jsx(Link, { to: "/stories", className: "hover:text-gray-300", children: "Web Stories" }),
        /* @__PURE__ */ jsx(Link, { to: "/calculadoras", className: "hover:text-gray-300", children: "Calculadoras" }),
        /* @__PURE__ */ jsx(Link, { to: "/support", className: "hover:text-gray-300", children: "Suporte" })
      ] })
    ] })
  ] }) });
};
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }, [pathname]);
  return null;
};
const Home = lazy(() => import("./assets/Home-DF8fCt5F.js").then((module) => ({ default: module.Home })));
const PromoPopup = lazy(() => import("./assets/PromoPopup-FGg925Th.js").then((module) => ({ default: module.PromoPopup })));
const Terms = lazy(() => import("./assets/Terms-Bq083FD0.js").then((module) => ({ default: module.Terms })));
const Privacy = lazy(() => import("./assets/Privacy-DBxGVyta.js").then((module) => ({ default: module.Privacy })));
const Support = lazy(() => import("./assets/Support-DPoLbi1W.js").then((module) => ({ default: module.Support })));
const Calculators = lazy(() => import("./assets/Calculators-CDTqUg1z.js").then((module) => ({ default: module.Calculators })));
const InvestmentPage = lazy(() => import("./assets/InvestmentPage-CIE_Lr0T.js").then((module) => ({ default: module.InvestmentPage })));
const VacationPage = lazy(() => import("./assets/VacationPage-DQu_P5Td.js").then((module) => ({ default: module.VacationPage })));
const EnergyPage = lazy(() => import("./assets/EnergyPage-BaYpVdko.js").then((module) => ({ default: module.EnergyPage })));
const FuelPage = lazy(() => import("./assets/FuelPage-O-QBEuat.js").then((module) => ({ default: module.FuelPage })));
const TerminationPage = lazy(() => import("./assets/TerminationPage-BGSuKlEN.js").then((module) => ({ default: module.TerminationPage })));
const INSSPage = lazy(() => import("./assets/INSSPage-P1jLBxS5.js").then((module) => ({ default: module.INSSPage })));
const NetSalaryPage = lazy(() => import("./assets/NetSalaryPage-BOdO77Ix.js").then((module) => ({ default: module.NetSalaryPage })));
const ThirteenthSalaryPage = lazy(() => import("./assets/ThirteenthSalaryPage-DoybU4vX.js").then((module) => ({ default: module.ThirteenthSalaryPage })));
const OvertimePage = lazy(() => import("./assets/OvertimePage-D_TfFKfE.js").then((module) => ({ default: module.OvertimePage })));
const UnemploymentInsurancePage = lazy(() => import("./assets/UnemploymentInsurancePage-BxBwgZJi.js").then((module) => ({ default: module.UnemploymentInsurancePage })));
const NightShiftPage = lazy(() => import("./assets/NightShiftPage-CyT7WO7Y.js").then((module) => ({ default: module.NightShiftPage })));
const FGTSPage = lazy(() => import("./assets/FGTSPage-CtLxTYuq.js").then((module) => ({ default: module.FGTSPage })));
const EmployeeCostPage = lazy(() => import("./assets/EmployeeCostPage-BX9MfT3B.js").then((module) => ({ default: module.EmployeeCostPage })));
const PLRPage = lazy(() => import("./assets/PLRPage-4akSJAAv.js").then((module) => ({ default: module.PLRPage })));
const FIREPage = lazy(() => import("./assets/FIREPage-B44ezLe9.js").then((module) => ({ default: module.FIREPage })));
const CompoundInterestPage = lazy(() => import("./assets/CompoundInterestPage-DL_DrY9Z.js").then((module) => ({ default: module.CompoundInterestPage })));
const RentVsBuyPage = lazy(() => import("./assets/RentVsBuyPage-BDWDizIW.js").then((module) => ({ default: module.RentVsBuyPage })));
const UberVsCarPage = lazy(() => import("./assets/UberVsCarPage-DMqec1Xf.js").then((module) => ({ default: module.UberVsCarPage })));
const FirstMillionPage = lazy(() => import("./assets/FirstMillionPage-Bvl37s22.js").then((module) => ({ default: module.FirstMillionPage })));
const CurrencyConverterPage = lazy(() => import("./assets/CurrencyConverterPage-BiD6Fmu-.js").then((module) => ({ default: module.CurrencyConverterPage })));
const PurchasingPowerPage = lazy(() => import("./assets/PurchasingPowerPage-nmNORxeq.js").then((module) => ({ default: module.PurchasingPowerPage })));
const Budget503020Page = lazy(() => import("./assets/Budget503020Page-BZbnv_sD.js").then((module) => ({ default: module.Budget503020Page })));
const VehicleFinancingPage = lazy(() => import("./assets/VehicleFinancingPage-qgYL9xQb.js").then((module) => ({ default: module.VehicleFinancingPage })));
const RealEstateFinancingPage = lazy(() => import("./assets/RealEstateFinancingPage-Cv-wFFTY.js").then((module) => ({ default: module.RealEstateFinancingPage })));
const EarlyRepaymentPage = lazy(() => import("./assets/EarlyRepaymentPage-EkgCVSkA.js").then((module) => ({ default: module.EarlyRepaymentPage })));
const CETCalculatorPage = lazy(() => import("./assets/CETCalculatorPage-CGeege0O.js").then((module) => ({ default: module.CETCalculatorPage })));
const CreditCardDebtPage = lazy(() => import("./assets/CreditCardDebtPage-B_6IuABR.js").then((module) => ({ default: module.CreditCardDebtPage })));
const MEIDasPage = lazy(() => import("./assets/MEIDasPage-C9u8Qy_N.js").then((module) => ({ default: module.MEIDasPage })));
const MarkupPage = lazy(() => import("./assets/MarkupPage-CLiBSjn0.js").then((module) => ({ default: module.MarkupPage })));
const BreakEvenPage = lazy(() => import("./assets/BreakEvenPage-C1hywcrz.js").then((module) => ({ default: module.BreakEvenPage })));
const SimplesVsPresumidoPage = lazy(() => import("./assets/SimplesVsPresumidoPage-CDCT78nT.js").then((module) => ({ default: module.SimplesVsPresumidoPage })));
const WorkingCapitalPage = lazy(() => import("./assets/WorkingCapitalPage-DLpgZJ29.js").then((module) => ({ default: module.WorkingCapitalPage })));
const ROICalculatorPage = lazy(() => import("./assets/ROICalculatorPage-D1ONgj77.js").then((module) => ({ default: module.ROICalculatorPage })));
const BarbecueCalculatorPage = lazy(() => import("./assets/BarbecueCalculatorPage-CL4i94m1.js").then((module) => ({ default: module.BarbecueCalculatorPage })));
const BusinessDaysPage = lazy(() => import("./assets/BusinessDaysPage-BAEJK34Y.js").then((module) => ({ default: module.BusinessDaysPage })));
const RuleOfThreePage = lazy(() => import("./assets/RuleOfThreePage-DKj8sMgU.js").then((module) => ({ default: module.RuleOfThreePage })));
const PercentageCalculatorPage = lazy(() => import("./assets/PercentageCalculatorPage-CtOdANs-.js").then((module) => ({ default: module.PercentageCalculatorPage })));
const HoursCalculatorPage = lazy(() => import("./assets/HoursCalculatorPage-C97CSst-.js").then((module) => ({ default: module.HoursCalculatorPage })));
const TravelCostCalculatorPage = lazy(() => import("./assets/TravelCostCalculatorPage-lt5dHkDv.js").then((module) => ({ default: module.TravelCostCalculatorPage })));
const SecretSantaPage = lazy(() => import("./assets/SecretSantaPage-Bb1NUF9x.js").then((module) => ({ default: module.SecretSantaPage })));
const CLTVsPJPage = lazy(() => import("./assets/CLTVsPJPage-BgvkxXSX.js").then((module) => ({ default: module.CLTVsPJPage })));
const MonetaryCorrectionPage = lazy(() => import("./assets/MonetaryCorrectionPage-uJ3XpkpU.js").then((module) => ({ default: module.MonetaryCorrectionPage })));
const ImportTaxPage = lazy(() => import("./assets/ImportTaxPage-CJz5LVwM.js").then((module) => ({ default: module.ImportTaxPage })));
const AbusiveInterestPage = lazy(() => import("./assets/AbusiveInterestPage-D-bkY9ec.js").then((module) => ({ default: module.AbusiveInterestPage })));
const PixGeneratorPage = lazy(() => import("./assets/PixGeneratorPage-B4ikeQDR.js").then((module) => ({ default: module.PixGeneratorPage })));
const WebStoryPage = lazy(() => import("./assets/WebStoryPage-CuvWv2M6.js").then((module) => ({ default: module.WebStoryPage })));
const StoriesGallery = lazy(() => import("./assets/StoriesGallery-1PTbLMjA.js").then((module) => ({ default: module.StoriesGallery })));
const BlogIndex = lazy(() => import("./assets/BlogIndex-CaKCNcQS.js").then((module) => ({ default: module.BlogIndex })));
const CategoryPage = lazy(() => import("./assets/CategoryPage-C75By9ga.js").then((module) => ({ default: module.CategoryPage })));
const BlogPost = lazy(() => import("./assets/BlogPost-lKGI0Zcy.js").then((module) => ({ default: module.BlogPost })));
const AuthorPage = lazy(() => import("./assets/AuthorPage-CHCs_w2f.js").then((module) => ({ default: module.AuthorPage })));
const NotFound = lazy(() => import("./assets/NotFound-zd4KAkOm.js").then((module) => ({ default: module.NotFound })));
const CalculatorLayout = lazy(() => import("./assets/CalculatorLayout-B4YHJwlj.js").then((module) => ({ default: module.CalculatorLayout })));
function App() {
  const [isPopupMounted, setIsPopupMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupMounted(true);
    }, 4e3);
    return () => clearTimeout(timer);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ScrollToTop, {}),
    /* @__PURE__ */ jsxs("div", { className: "bg-background min-h-screen text-white font-sans selection:bg-primary/30 selection:text-primary", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" }) }), children: /* @__PURE__ */ jsx(LazyMotion, { features: domAnimation, children: /* @__PURE__ */ jsxs(Routes, { children: [
        /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Home, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/calculadoras", element: /* @__PURE__ */ jsx(Calculators, {}) }),
        /* @__PURE__ */ jsxs(Route, { element: /* @__PURE__ */ jsx(CalculatorLayout, {}), children: [
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/investimentos", element: /* @__PURE__ */ jsx(InvestmentPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/ferias", element: /* @__PURE__ */ jsx(VacationPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/energia", element: /* @__PURE__ */ jsx(EnergyPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/combustivel", element: /* @__PURE__ */ jsx(FuelPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/rescisao", element: /* @__PURE__ */ jsx(TerminationPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/inss", element: /* @__PURE__ */ jsx(INSSPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/salario-liquido", element: /* @__PURE__ */ jsx(NetSalaryPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/decimo-terceiro", element: /* @__PURE__ */ jsx(ThirteenthSalaryPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/horas-extras", element: /* @__PURE__ */ jsx(OvertimePage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/seguro-desemprego", element: /* @__PURE__ */ jsx(UnemploymentInsurancePage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/adicional-noturno", element: /* @__PURE__ */ jsx(NightShiftPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/fgts", element: /* @__PURE__ */ jsx(FGTSPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/custo-funcionario", element: /* @__PURE__ */ jsx(EmployeeCostPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/plr", element: /* @__PURE__ */ jsx(PLRPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/fire", element: /* @__PURE__ */ jsx(FIREPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/juros-compostos", element: /* @__PURE__ */ jsx(CompoundInterestPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/alugar-ou-financiar", element: /* @__PURE__ */ jsx(RentVsBuyPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/uber-ou-carro", element: /* @__PURE__ */ jsx(UberVsCarPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/primeiro-milhao", element: /* @__PURE__ */ jsx(FirstMillionPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/conversor-moedas", element: /* @__PURE__ */ jsx(CurrencyConverterPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/poder-de-compra", element: /* @__PURE__ */ jsx(PurchasingPowerPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/regra-50-30-20", element: /* @__PURE__ */ jsx(Budget503020Page, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/financiamento-veiculos", element: /* @__PURE__ */ jsx(VehicleFinancingPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/financiamento-imobiliario", element: /* @__PURE__ */ jsx(RealEstateFinancingPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/quitacao-antecipada", element: /* @__PURE__ */ jsx(EarlyRepaymentPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/custo-efetivo-total", element: /* @__PURE__ */ jsx(CETCalculatorPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/divida-cartao-credito", element: /* @__PURE__ */ jsx(CreditCardDebtPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/das-mei", element: /* @__PURE__ */ jsx(MEIDasPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/markup", element: /* @__PURE__ */ jsx(MarkupPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/ponto-de-equilibrio", element: /* @__PURE__ */ jsx(BreakEvenPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/simples-vs-presumido", element: /* @__PURE__ */ jsx(SimplesVsPresumidoPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/capital-de-giro", element: /* @__PURE__ */ jsx(WorkingCapitalPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/roi", element: /* @__PURE__ */ jsx(ROICalculatorPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/churrasco", element: /* @__PURE__ */ jsx(BarbecueCalculatorPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/dias-uteis", element: /* @__PURE__ */ jsx(BusinessDaysPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/regra-de-tres", element: /* @__PURE__ */ jsx(RuleOfThreePage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/porcentagem", element: /* @__PURE__ */ jsx(PercentageCalculatorPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/horas", element: /* @__PURE__ */ jsx(HoursCalculatorPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/custo-viagem", element: /* @__PURE__ */ jsx(TravelCostCalculatorPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/amigo-secreto", element: /* @__PURE__ */ jsx(SecretSantaPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/clt-vs-pj", element: /* @__PURE__ */ jsx(CLTVsPJPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/correcao-monetaria", element: /* @__PURE__ */ jsx(MonetaryCorrectionPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/impostos-importacao", element: /* @__PURE__ */ jsx(ImportTaxPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/juros-abusivos", element: /* @__PURE__ */ jsx(AbusiveInterestPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/calculadoras/gerador-pix", element: /* @__PURE__ */ jsx(PixGeneratorPage, {}) })
        ] }),
        /* @__PURE__ */ jsx(Route, { path: "/blog", element: /* @__PURE__ */ jsx(BlogIndex, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/blog/:category/:slug", element: /* @__PURE__ */ jsx(BlogPost, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/blog/:categorySlug", element: /* @__PURE__ */ jsx(CategoryPage, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/autor", element: /* @__PURE__ */ jsx(AuthorPage, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/stories/:storyId", element: /* @__PURE__ */ jsx(WebStoryPage, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/stories", element: /* @__PURE__ */ jsx(StoriesGallery, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/terms", element: /* @__PURE__ */ jsx(Terms, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/privacy", element: /* @__PURE__ */ jsx(Privacy, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/support", element: /* @__PURE__ */ jsx(Support, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) })
      ] }) }) }) }),
      /* @__PURE__ */ jsx(Footer, {}),
      /* @__PURE__ */ jsx(Suspense, { fallback: null, children: isPopupMounted && /* @__PURE__ */ jsx(PromoPopup, {}) })
    ] })
  ] });
}
async function render({ path, context = {}, initialData = null }) {
  const helmetContext = {};
  return new Promise((resolve, reject) => {
    let html = "";
    const stream = new Writable({
      write(chunk, _encoding, callback) {
        html += chunk.toString();
        callback();
      }
    });
    const { pipe } = renderToPipeableStream(
      /* @__PURE__ */ jsx(React__default.StrictMode, { children: /* @__PURE__ */ jsx(StaticRouter, { location: path, children: /* @__PURE__ */ jsx(HelmetProvider, { context: helmetContext, children: /* @__PURE__ */ jsx(ServerDataProvider, { value: initialData, children: /* @__PURE__ */ jsx(App, {}) }) }) }) }),
      {
        onAllReady() {
          pipe(stream);
        },
        onError(error) {
          reject(error);
        }
      }
    );
    stream.on("finish", () => {
      resolve({ html, helmetContext });
    });
  });
}
export {
  FAQS as F,
  Helmet as H,
  MODULES as M,
  TESTIMONIALS as T,
  render,
  useServerData as u
};
//# sourceMappingURL=entry-server.js.map
