var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b;
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import React3, { Component, useState, useEffect, useRef, lazy, Suspense } from "react";
import ReactDOMServer from "react-dom/server";
import { useNavigate, useLocation, Link, Routes, Route, StaticRouter } from "react-router-dom";
import fastCompare from "react-fast-compare";
import invariant from "invariant";
import shallowEqual from "shallowequal";
import { Wallet, X, Menu, Instagram, Youtube, Linkedin, MessageCircle, ChevronLeft, Video, Phone, MoreVertical, CheckCheck, Loader2, Smile, Paperclip, Camera, Send, Mic, Check, Zap, CheckCircle2, ShieldCheck, Smartphone, TrendingUp, Globe, Quote, ChevronUp, ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { GoogleGenAI, Type } from "@google/genai";
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
  return [React3.createElement("title", props, title)];
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
  return React3.createElement(type, mappedTag);
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
var Context = React3.createContext(defaultValue);
var HelmetProvider = (_a = class extends Component {
  constructor(props) {
    super(props);
    __publicField(this, "helmetData");
    this.helmetData = new HelmetData(this.props.context || {}, _a.canUseDOM);
  }
  render() {
    return /* @__PURE__ */ React3.createElement(Context.Provider, { value: this.helmetData.value }, this.props.children);
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
    React3.Children.forEach(children, (child) => {
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
    return helmetData ? /* @__PURE__ */ React3.createElement(HelmetDispatcher, { ...newProps, context: helmetData.value }) : /* @__PURE__ */ React3.createElement(Context.Consumer, null, (context) => /* @__PURE__ */ React3.createElement(HelmetDispatcher, { ...newProps, context }));
  }
}, __publicField(_b, "defaultProps", {
  defer: true,
  encodeSpecialCharacters: true,
  prioritizeSeoTags: false
}), _b);
const NAV_ITEMS = [
  { label: "Como Funciona", href: "#solucao" },
  { label: "Recursos", href: "#modulos" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Planos", href: "#investimento" },
  { label: "FAQ", href: "#faq" }
];
const TESTIMONIALS = [
  {
    id: 1,
    name: "Carlos Mendes",
    handle: "@carlos_dev",
    text: "Eu nunca conseguia manter uma planilha atualizada. Com o FinZap, eu só mando um áudio 'Gastei 50 no almoço' e pronto. O dashboard se atualiza sozinho. Mágico!",
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
    text: "Não tenho tempo pra organizar finanças. O FinZap faz o trabalho sujo enquanto eu trabalho. Vale cada centavo.",
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
    image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?q=70&w=600&auto=format&fit=crop",
    cols: 1
  },
  {
    id: 2,
    title: "Categorização com IA",
    description: "Não perca tempo escolhendo categorias. A IA entende que 'Méqui' é Alimentação e 'Uber' é Transporte.",
    image: "https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?q=70&w=600&auto=format&fit=crop",
    cols: 1
  },
  {
    id: 3,
    title: "Dashboard em Tempo Real",
    description: "Visualize para onde seu dinheiro vai com gráficos interativos e bonitos, direto no navegador ou celular.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=70&w=600&auto=format&fit=crop",
    cols: 1
  },
  {
    id: 4,
    title: "Metas Inteligentes",
    description: "Defina quanto quer gastar por categoria. O FinZap te avisa no WhatsApp se você estiver perto do limite.",
    image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=70&w=600&auto=format&fit=crop",
    cols: 1
  },
  {
    id: 5,
    title: "Relatórios Semanais",
    description: "Receba um resumo da sua semana toda sexta-feira direto no seu WhatsApp.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=70&w=600&auto=format&fit=crop",
    cols: 1
  },
  {
    id: 6,
    title: "Segurança Total",
    description: "Seus dados são criptografados. Não pedimos senha de banco. Você tem o controle.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=70&w=600&auto=format&fit=crop",
    cols: 1
  }
];
const FAQS = [
  {
    question: "Preciso conectar minha conta bancária?",
    answer: "Não! O FinZap funciona com base no que você envia pelo WhatsApp. Isso garante total segurança e privacidade, pois não precisamos de acesso direto ao seu banco."
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
        /* @__PURE__ */ jsxs("div", { className: "max-w-[1400px] mx-auto px-4 md:px-8 h-20 md:h-24 flex items-center justify-between relative z-10", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 z-50 relative shrink-0 group", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 group-hover:border-primary/50 transition-colors", children: /* @__PURE__ */ jsx(Wallet, { className: "text-primary w-6 h-6" }) }),
            /* @__PURE__ */ jsxs("span", { className: "text-2xl font-bold text-white tracking-tight", children: [
              "FinZap",
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
              href: "https://finzap.io/criar-conta",
              className: "px-7 py-3 rounded-full bg-gradient-to-r from-[#008c69] to-[#05a880] hover:brightness-110 hover:scale-105 transition-all duration-300 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,140,105,0.3)]",
              children: "Começar Grátis"
            }
          ) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "lg:hidden z-50 w-12 h-12 flex items-center justify-center text-white bg-white/5 rounded-full border border-white/10 backdrop-blur-md active:scale-95 transition-all hover:bg-white/10",
              onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
              "aria-label": "Abrir menu de navegação",
              children: isMobileMenuOpen ? /* @__PURE__ */ jsx(X, { size: 22 }) : /* @__PURE__ */ jsx(Menu, { size: 22 })
            }
          ),
          isMobileMenuOpen && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 p-8 animate-in fade-in duration-300 bg-[#000000]/90 backdrop-blur-2xl", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center gap-8 relative z-10", children: NAV_ITEMS.map((item) => /* @__PURE__ */ jsx(
              "a",
              {
                href: item.href,
                onClick: (e) => handleLinkClick(e, item.href),
                className: "text-3xl font-medium text-white uppercase tracking-wider cursor-pointer hover:text-primary transition-colors",
                children: item.label
              },
              item.label
            )) }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://finzap.io/criar-conta",
                className: "px-10 py-4 rounded-full bg-primary text-black font-bold text-lg uppercase mt-8 cursor-pointer relative z-10 shadow-[0_0_30px_rgba(71,255,183,0.3)] hover:scale-105 transition-transform",
                children: "Começar Grátis"
              }
            )
          ] })
        ] })
      ]
    }
  );
};
const Footer = () => {
  return /* @__PURE__ */ jsx("footer", { className: "py-12 md:py-24 px-4 border-t border-white/5 bg-surface/30", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center md:items-start gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20", children: /* @__PURE__ */ jsx(Wallet, { className: "text-primary w-5 h-5" }) }),
        /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white tracking-tight", children: "FinZap.ai" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 max-w-xs text-center md:text-left", children: "Inteligência artificial aplicada à liberdade financeira. Simples, seguro e direto no seu WhatsApp." }),
      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "© 2025 FinZap AI. Todos os direitos reservados." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center md:items-end gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-6", children: [
        /* @__PURE__ */ jsx("a", { href: "#", className: "text-gray-400 hover:text-white transition-colors", "aria-label": "Instagram", children: /* @__PURE__ */ jsx(Instagram, {}) }),
        /* @__PURE__ */ jsx("a", { href: "#", className: "text-gray-400 hover:text-white transition-colors", "aria-label": "Youtube", children: /* @__PURE__ */ jsx(Youtube, {}) }),
        /* @__PURE__ */ jsx("a", { href: "#", className: "text-gray-400 hover:text-white transition-colors", "aria-label": "LinkedIn", children: /* @__PURE__ */ jsx(Linkedin, {}) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-6 text-sm text-gray-400", children: [
        /* @__PURE__ */ jsx(Link, { to: "/terms", className: "hover:text-gray-300", children: "Termos de Uso" }),
        /* @__PURE__ */ jsx(Link, { to: "/privacy", className: "hover:text-gray-300", children: "Privacidade" }),
        /* @__PURE__ */ jsx(Link, { to: "/calculadoras", className: "hover:text-gray-300", children: "Calculadoras" }),
        /* @__PURE__ */ jsx(Link, { to: "/support", className: "hover:text-gray-300", children: "Suporte" })
      ] })
    ] })
  ] }) });
};
const Hero = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen flex flex-col items-center justify-center pt-36 pb-24 md:pt-48 md:pb-32 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-10 text-center", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8 },
          className: "w-24 h-24 md:w-28 md:h-28 mb-4 relative flex items-center justify-center",
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent rounded-3xl blur-xl" }),
            /* @__PURE__ */ jsxs("div", { className: "relative w-full h-full bg-[#0d0d0d] border border-primary/30 rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(71,255,183,0.15)]", children: [
              /* @__PURE__ */ jsx(MessageCircle, { className: "w-12 h-12 text-primary", strokeWidth: 1.5 }),
              /* @__PURE__ */ jsx("div", { className: "absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-[#0d0d0d]", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-black", children: "AI" }) })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.h1,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: 0.2 },
          className: "text-4xl md:text-6xl lg:text-7xl font-medium leading-tight text-white tracking-tight",
          children: [
            "Controle financeiro no ",
            /* @__PURE__ */ jsx("br", { className: "hidden md:block" }),
            "WhatsApp com ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500", children: "Inteligência Artificial" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: 0.4 },
          className: "text-lg md:text-xl text-muted max-w-2xl font-light",
          children: [
            /* @__PURE__ */ jsx("span", { className: "font-normal text-white", children: "Esqueça as planilhas chatas." }),
            " Basta enviar um áudio ou mensagem e nossa IA categoriza, organiza e gera relatórios em segundos."
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: 0.6 },
          children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://finzap.io/criar-conta",
              className: "inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#008c69] to-[#008c69] hover:brightness-110 text-white font-bold text-lg rounded-full transition-all shadow-[0_0_30px_rgba(71,255,183,0.2)] hover:shadow-[0_0_50px_rgba(71,255,183,0.4)] text-center uppercase tracking-wide transform hover:scale-[1.02]",
              children: "Testar Grátis Agora"
            }
          )
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 1, delay: 1 },
          className: "flex items-center gap-4 mt-8",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex -space-x-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full border-2 border-background overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: `https://picsum.photos/50/50?random=${i + 40}`, alt: "User", className: "w-full h-full object-cover" }) }, i)) }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start", children: [
              /* @__PURE__ */ jsx("div", { className: "flex text-yellow-400 text-xs gap-0.5", children: "★★★★★".split("").map((star, i) => /* @__PURE__ */ jsx("span", { children: star }, i)) }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-300", children: "15mil + usuários" })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, rotateX: 45, y: 100 },
        animate: { opacity: 1, rotateX: 20, y: 0 },
        transition: { duration: 1.2, delay: 0.5 },
        className: "mt-20 w-full max-w-6xl mx-auto perspective-1000 relative z-0",
        style: { perspective: "1200px" },
        children: /* @__PURE__ */ jsxs("div", { className: "relative transform rotate-x-12 scale-90 opacity-90 border border-white/10 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(71,255,183,0.15)] bg-[#0a0a0a]", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" }),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "/hero.webp",
              srcSet: "/hero-mobile.webp 600w, /hero-medium.webp 900w, /hero.webp 1200w",
              sizes: "(max-width: 768px) 100vw, 1200px",
              alt: "FinZap Dashboard",
              width: 1200,
              height: 563,
              decoding: "async",
              className: "w-full h-auto object-cover opacity-80"
            }
          )
        ] })
      }
    )
  ] });
};
function SEO({ title, description, canonical, image }) {
  const siteUrl = "https://finzap.io";
  const fullCanonical = canonical ? canonical.startsWith("http") ? canonical : `${siteUrl}${canonical}` : void 0;
  const ogImage = image ? image.startsWith("http") ? image : `${siteUrl}${image}` : `${siteUrl}/og-image.png`;
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsxs("title", { children: [
      title,
      " | FinZap"
    ] }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
    fullCanonical && /* @__PURE__ */ jsx("link", { rel: "canonical", href: fullCanonical }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: title }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
    fullCanonical && /* @__PURE__ */ jsx("meta", { property: "og:url", content: fullCanonical }),
    /* @__PURE__ */ jsx("meta", { property: "og:image", content: ogImage }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:width", content: "1200" }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:height", content: "630" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: title }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: description }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: ogImage })
  ] });
}
const Hook = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "user",
      content: "Gastei 45,90 no almoço",
      timestamp: "14:30"
    },
    {
      id: "2",
      role: "assistant",
      content: { title: "Almoço", value: 45.9, category: "Alimentação", type: "expense" },
      timestamp: "14:30"
    }
  ]);
  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    try {
      let transaction;
      if ("AIzaSyDGjDuLqao4jlpUNsDZlC_Je1_MqtD3aZk") {
        const ai = new GoogleGenAI({ apiKey: "AIzaSyDGjDuLqao4jlpUNsDZlC_Je1_MqtD3aZk" });
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `Analise esta mensagem financeira: "${userMsg.content}". 
                Identifique o item, o valor e sugira uma categoria (ex: Alimentação, Transporte, Lazer, Casa, Saúde, Salário, Investimento).
                Identifique se é despesa (expense) ou receita (income).
                Retorne JSON.`,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                value: { type: Type.NUMBER },
                category: { type: Type.STRING },
                type: { type: Type.STRING, enum: ["expense", "income"] }
              }
            }
          }
        });
        const json = JSON.parse(response.text || "{}");
        transaction = {
          title: json.title || "Despesa",
          value: json.value || 0,
          category: json.category || "Geral",
          type: json.type || "expense"
        };
      }
      const botMsg = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: transaction,
        timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "py-32 px-4 relative bg-background overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -50 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.8 },
          className: "relative order-2 lg:order-1",
          children: [
            /* @__PURE__ */ jsx("div", { className: "relative w-full aspect-[9/19] max-w-sm mx-auto rounded-[3rem] overflow-hidden border-[8px] border-[#1a1a1a] shadow-2xl bg-[#111]", children: /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex flex-col h-full bg-black", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-[#202c33] px-2 py-3 flex items-center gap-1 z-10 shadow-sm", children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1 text-[#00a884]", children: /* @__PURE__ */ jsx(ChevronLeft, { size: 24, className: "text-white" }) }),
                /* @__PURE__ */ jsx("div", { className: "w-9 h-9 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold border border-primary/20 mr-2 overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: "https://ui-avatars.com/api/?name=FinZap&background=00a884&color=fff", alt: "Profile", className: "w-full h-full object-cover" }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col justify-center", children: [
                  /* @__PURE__ */ jsxs("span", { className: "text-white font-medium text-base leading-tight", children: [
                    "FinZap ",
                    /* @__PURE__ */ jsx("span", { className: "text-[#00a884] ml-1", children: "✔" })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-white/60", children: "online" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-white mr-2", children: [
                  /* @__PURE__ */ jsx(Video, { size: 22 }),
                  /* @__PURE__ */ jsx(Phone, { size: 20 }),
                  /* @__PURE__ */ jsx(MoreVertical, { size: 20 })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 relative bg-black overflow-hidden", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.1] bg-[url('/whatsapp-bg.webp')] bg-repeat bg-[length:400px_auto] pointer-events-none grayscale z-0" }),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    ref: scrollRef,
                    className: "absolute inset-0 overflow-y-auto p-4 flex flex-col gap-2 z-10",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-4 relative z-10", children: /* @__PURE__ */ jsx("span", { className: "bg-[#1f2c34] text-[#8696a0] text-xs px-3 py-1.5 rounded-lg shadow-sm font-medium", children: "Hoje" }) }),
                      /* @__PURE__ */ jsxs("div", { className: "self-end max-w-[85%] relative z-10 group", children: [
                        /* @__PURE__ */ jsxs("div", { className: "bg-[#005c4b] text-white p-2 pl-3 pr-2 rounded-lg rounded-tr-none shadow-sm text-[14.2px] leading-[19px]", children: [
                          /* @__PURE__ */ jsx("span", { children: "Gastei 120 reais no mercado e 30 na farmácia" }),
                          /* @__PURE__ */ jsxs("div", { className: "flex justify-end items-end gap-1 mt-1 -mb-1", children: [
                            /* @__PURE__ */ jsx("span", { className: "text-[11px] text-white/60 font-medium", children: "10:42" }),
                            /* @__PURE__ */ jsx("span", { className: "text-[#53bdeb]", children: /* @__PURE__ */ jsx(CheckCheck, { size: 16, className: "ml-0.5" }) })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: "absolute top-0 -right-2 w-3 h-3 bg-[#005c4b] [clip-path:polygon(0_0,100%_0,0_100%)]" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "self-start max-w-[85%] relative z-10 mt-1", children: [
                        /* @__PURE__ */ jsxs("div", { className: "bg-[#202c33] text-white p-2 pl-3 pr-2 rounded-lg rounded-tl-none shadow-sm text-[14.2px] leading-[19px]", children: [
                          /* @__PURE__ */ jsx("p", { className: "font-bold text-[#00a884] text-xs mb-1", children: "FinZap AI" }),
                          /* @__PURE__ */ jsxs("div", { className: "bg-black/20 rounded-md p-2 mb-2 border-l-4 border-[#00a884]", children: [
                            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-1", children: [
                              /* @__PURE__ */ jsx("span", { className: "text-xs text-white/80 capitalize flex items-center gap-1", children: "🛒 Mercado" }),
                              /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-white", children: "R$ 120,00" })
                            ] }),
                            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                              /* @__PURE__ */ jsx("span", { className: "text-xs text-white/80 capitalize flex items-center gap-1", children: "💊 Saúde" }),
                              /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-white", children: "R$ 30,00" })
                            ] })
                          ] }),
                          /* @__PURE__ */ jsx("span", { children: "Lançamentos confirmados! ✅" }),
                          /* @__PURE__ */ jsx("div", { className: "flex justify-end items-end gap-1 mt-1 -mb-1", children: /* @__PURE__ */ jsx("span", { className: "text-[11px] text-white/60 font-medium", children: "10:42" }) })
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: "absolute top-0 -left-2 w-3 h-3 bg-[#202c33] [clip-path:polygon(100%_0,0_0,100%_100%)]" })
                      ] }),
                      messages.slice(2).map((msg) => /* @__PURE__ */ jsx("div", { className: `flex ${msg.role === "user" ? "justify-end" : "justify-start"} relative z-10 mb-1`, children: msg.role === "user" ? /* @__PURE__ */ jsxs("div", { className: "relative max-w-[85%]", children: [
                        /* @__PURE__ */ jsxs("div", { className: "bg-[#005c4b] text-white p-2 pl-3 pr-2 rounded-lg rounded-tr-none shadow-sm text-[14.2px] leading-[19px]", children: [
                          typeof msg.content === "string" ? msg.content : "",
                          /* @__PURE__ */ jsxs("div", { className: "flex justify-end items-end gap-1 mt-1 -mb-1", children: [
                            /* @__PURE__ */ jsx("span", { className: "text-[11px] text-white/60 font-medium", children: msg.timestamp }),
                            /* @__PURE__ */ jsx("span", { className: "text-[#53bdeb]", children: /* @__PURE__ */ jsx(CheckCheck, { size: 16, className: "ml-0.5" }) })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: "absolute top-0 -right-2 w-3 h-3 bg-[#005c4b] [clip-path:polygon(0_0,100%_0,0_100%)]" })
                      ] }) : /* @__PURE__ */ jsxs("div", { className: "relative max-w-[85%]", children: [
                        /* @__PURE__ */ jsxs("div", { className: "bg-[#202c33] text-white p-2 pl-3 pr-2 rounded-lg rounded-tl-none shadow-sm text-[14.2px] leading-[19px]", children: [
                          typeof msg.content !== "string" && /* @__PURE__ */ jsxs(Fragment, { children: [
                            /* @__PURE__ */ jsx("p", { className: "font-bold text-[#00a884] text-xs mb-1", children: "FinZap AI" }),
                            /* @__PURE__ */ jsx("div", { className: "bg-black/20 rounded-md p-2 mb-2 border-l-4 border-[#00a884]", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                              /* @__PURE__ */ jsxs("span", { className: "text-xs text-white/80 capitalize flex items-center gap-1", children: [
                                (() => {
                                  const cat = msg.content.category.toLowerCase();
                                  if (cat.includes("alimentação") || cat.includes("mercado") || cat.includes("comida")) return "🛒";
                                  if (cat.includes("transporte") || cat.includes("uber") || cat.includes("gasolina")) return "🚗";
                                  if (cat.includes("saúde") || cat.includes("farmácia") || cat.includes("médico")) return "💊";
                                  if (cat.includes("lazer") || cat.includes("cinema") || cat.includes("jogo")) return "🎮";
                                  if (cat.includes("casa") || cat.includes("aluguel") || cat.includes("luz")) return "🏠";
                                  return "📝";
                                })(),
                                " ",
                                msg.content.title
                              ] }),
                              /* @__PURE__ */ jsxs("span", { className: "text-xs font-bold text-white", children: [
                                "R$ ",
                                msg.content.value.toFixed(2).replace(".", ",")
                              ] })
                            ] }) }),
                            /* @__PURE__ */ jsx("span", { children: "Lançamentos confirmados! ✅" })
                          ] }),
                          /* @__PURE__ */ jsx("div", { className: "flex justify-end items-end gap-1 mt-1 -mb-1", children: /* @__PURE__ */ jsx("span", { className: "text-[11px] text-white/60 font-medium", children: msg.timestamp }) })
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: "absolute top-0 -left-2 w-3 h-3 bg-[#202c33] [clip-path:polygon(100%_0,0_0,100%_100%)]" })
                      ] }) }, msg.id)),
                      isLoading && /* @__PURE__ */ jsx("div", { className: "self-start bg-[#202c33] px-3 py-2 rounded-lg rounded-tl-none shadow-sm flex items-center gap-2 relative z-10", children: /* @__PURE__ */ jsx(Loader2, { size: 14, className: "animate-spin text-[#00a884]" }) })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-[#202c33] p-2 flex items-end gap-2 min-h-[62px] items-center", children: [
                /* @__PURE__ */ jsx("button", { className: "p-2 text-[#8696a0] hover:text-white transition-colors", "aria-label": "Inserir emoji", children: /* @__PURE__ */ jsx(Smile, { size: 24 }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 bg-[#2a3942] rounded-lg flex items-center min-h-[42px] px-3 gap-2", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: input,
                      onChange: (e) => setInput(e.target.value),
                      onKeyDown: (e) => e.key === "Enter" && handleSend(),
                      placeholder: "Mensagem",
                      className: "flex-1 bg-transparent border-none focus:ring-0 text-white text-[15px] placeholder:text-[#8696a0] outline-none h-full py-2",
                      disabled: isLoading
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-[#8696a0]", children: [
                    /* @__PURE__ */ jsx(Paperclip, { size: 20, className: "rotate-45" }),
                    !input && /* @__PURE__ */ jsx(Camera, { size: 20 })
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: handleSend,
                    disabled: !input.trim() || isLoading,
                    className: "w-12 h-12 rounded-full bg-[#00a884] flex items-center justify-center text-white shadow-md hover:bg-[#008f6f] transition-colors shrink-0",
                    "aria-label": input.trim() ? "Enviar mensagem" : "Gravar áudio",
                    children: input.trim() ? /* @__PURE__ */ jsx(Send, { size: 20, className: "ml-0.5" }) : /* @__PURE__ */ jsx(Mic, { size: 20 })
                  }
                )
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-primary/10 blur-[80px] -z-10" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 50 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.8 },
          className: "flex flex-col gap-10 order-1 lg:order-2",
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] text-white uppercase tracking-tight", children: [
                "Pare de sofrer com ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "planilhas" }),
                " ",
                /* @__PURE__ */ jsx("br", {}),
                " complexas"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "h-1.5 w-24 bg-primary mt-6 rounded-full shadow-[0_0_15px_rgba(71,255,183,0.5)]" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-lg md:text-xl text-gray-400 leading-relaxed font-light max-w-lg border-l-2 border-white/10 pl-6", children: [
              "Você sabe que precisa organizar o dinheiro, mas odeia abrir o Excel ou apps complicados cheios de botões.",
              /* @__PURE__ */ jsx("span", { className: "text-white font-medium block mt-2", children: "A gente te entende." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 mt-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "group flex items-center gap-5 p-5 rounded-2xl bg-[#1a0505]/50 border border-red-500/10 hover:border-red-500/30 hover:bg-[#1a0505] transition-all duration-300", children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform border border-red-500/10", children: /* @__PURE__ */ jsx(X, { size: 24, className: "text-red-500" }) }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-300 font-medium text-lg group-hover:text-red-100 transition-colors", children: "Apps manuais que você esquece de preencher." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "group flex items-center gap-5 p-5 rounded-2xl bg-[#1a0505]/50 border border-red-500/10 hover:border-red-500/30 hover:bg-[#1a0505] transition-all duration-300", children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform border border-red-500/10", children: /* @__PURE__ */ jsx(X, { size: 24, className: "text-red-500" }) }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-300 font-medium text-lg group-hover:text-red-100 transition-colors", children: "Planilhas que quebram e são difíceis de usar no celular." })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "relative mt-6 p-1 rounded-[26px] bg-gradient-to-br from-primary/30 to-transparent", children: /* @__PURE__ */ jsxs("div", { className: "relative p-6 rounded-3xl bg-[#051a14] border border-primary/20 overflow-hidden group", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" }),
                /* @__PURE__ */ jsx("div", { className: "absolute -right-10 -top-10 w-32 h-32 bg-primary/20 blur-[50px] rounded-full" }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 relative z-10", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-full bg-gradient-to-br from-primary to-[#00cc99] flex items-center justify-center shrink-0 shadow-[0_0_25px_rgba(71,255,183,0.3)] group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsx(Check, { size: 28, className: "text-black stroke-[3]" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-primary text-xs font-bold uppercase tracking-[0.2em] mb-1 flex items-center gap-2", children: "A Solução Definitiva" }),
                    /* @__PURE__ */ jsx("p", { className: "text-white font-bold text-xl md:text-2xl leading-tight", children: 'Com FinZap, é tão fácil quanto mandar um "oi".' })
                  ] })
                ] })
              ] }) })
            ] })
          ]
        }
      )
    ] })
  ] });
};
const Modules = () => {
  return /* @__PURE__ */ jsx("section", { id: "modulos", className: "py-24 md:py-32 px-4 relative bg-surface/30", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-20", children: [
      /* @__PURE__ */ jsxs(
        motion.h3,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-4xl md:text-6xl font-medium text-white mb-6",
          children: [
            "Tudo o que você precisa para ",
            /* @__PURE__ */ jsx("br", {}),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-primary", children: "dominar seu dinheiro" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-muted max-w-2xl mx-auto", children: "Uma plataforma completa disfarçada de contato no seu WhatsApp. Simples, poderoso e automático." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: MODULES.map((module, idx) => /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: idx * 0.1, duration: 0.6 },
        className: "glass-card rounded-3xl p-1 overflow-hidden group",
        children: /* @__PURE__ */ jsxs("div", { className: "bg-[#111] rounded-[20px] h-full flex flex-col overflow-hidden relative", children: [
          /* @__PURE__ */ jsxs("div", { className: "h-48 w-full overflow-hidden relative", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#111] to-transparent z-10 opacity-80" }),
            /* @__PURE__ */ jsx(
              "img",
              {
                src: module.image,
                alt: module.title,
                className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-6 z-20", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20", children: [
              /* @__PURE__ */ jsx(Zap, { size: 12 }),
              /* @__PURE__ */ jsxs("span", { children: [
                "Recurso ",
                module.id
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-8 flex-1 flex flex-col gap-4", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-white group-hover:text-primary transition-colors", children: module.title }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 leading-relaxed text-sm", children: module.description }),
            /* @__PURE__ */ jsx("div", { className: "mt-auto pt-4 border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-500", children: [
              /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-primary/50" }),
              /* @__PURE__ */ jsx("span", { children: "Disponível no plano Pro" })
            ] }) })
          ] })
        ] })
      },
      module.id
    )) })
  ] }) });
};
const Certificate = () => {
  return /* @__PURE__ */ jsx("section", { className: "py-24 md:py-32 px-4 relative overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto flex flex-col items-center text-center gap-12", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        className: "z-10",
        children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-4xl md:text-6xl font-medium text-white mb-4", children: [
            "Relatórios de ",
            /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Inteligência" }),
            " Financeira"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-muted max-w-3xl mx-auto", children: "Não apenas dados, mas insights. Receba mensalmente uma análise completa do seu comportamento financeiro, sugestões de economia e previsões para o próximo mês." })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.9, rotateX: 20 },
        whileInView: { opacity: 1, scale: 1, rotateX: 0 },
        viewport: { once: true },
        transition: { duration: 0.8 },
        className: "relative w-full max-w-4xl perspective-1000",
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 bg-primary/20 rounded-[40px] blur-3xl" }),
          /* @__PURE__ */ jsx("div", { className: "relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#1a1a1a]", children: /* @__PURE__ */ jsxs("div", { className: "w-full aspect-[16/9] flex flex-col", children: [
            /* @__PURE__ */ jsxs("div", { className: "h-12 bg-[#252525] flex items-center px-4 gap-2 border-b border-white/5", children: [
              /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-red-500/50" }),
              /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-yellow-500/50" }),
              /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-green-500/50" }),
              /* @__PURE__ */ jsx("div", { className: "ml-4 bg-[#111] px-4 py-1 rounded text-xs text-gray-500 font-mono w-64", children: "finzap.ai/reports/january" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 bg-[#111] p-8 flex gap-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "w-1/3 bg-white/5 rounded-xl p-6 flex flex-col gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "h-32 w-32 rounded-full border-4 border-primary/30 mx-auto flex items-center justify-center relative", children: /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-white", children: "72%" }) }),
                /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: "Meta de Economia" }),
                  /* @__PURE__ */ jsx("p", { className: "text-white font-bold", children: "R$ 1.200 / R$ 1.500" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "w-2/3 flex flex-col gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "h-8 w-1/2 bg-white/10 rounded animate-pulse" }),
                /* @__PURE__ */ jsx("div", { className: "h-4 w-3/4 bg-white/5 rounded" }),
                /* @__PURE__ */ jsx("div", { className: "h-4 w-2/3 bg-white/5 rounded" }),
                /* @__PURE__ */ jsxs("div", { className: "mt-8 grid grid-cols-3 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "h-24 bg-emerald-500/10 rounded-lg border border-emerald-500/20 p-4", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-emerald-400 text-xs mb-2", children: "Entradas" }),
                    /* @__PURE__ */ jsx("p", { className: "text-white text-lg font-bold", children: "R$ 5.450" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "h-24 bg-red-500/10 rounded-lg border border-red-500/20 p-4", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-red-400 text-xs mb-2", children: "Saídas" }),
                    /* @__PURE__ */ jsx("p", { className: "text-white text-lg font-bold", children: "R$ 3.210" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "h-24 bg-blue-500/10 rounded-lg border border-blue-500/20 p-4", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-blue-400 text-xs mb-2", children: "Investido" }),
                    /* @__PURE__ */ jsx("p", { className: "text-white text-lg font-bold", children: "R$ 1.000" })
                  ] })
                ] })
              ] })
            ] })
          ] }) })
        ]
      }
    )
  ] }) });
};
const Community = () => {
  return /* @__PURE__ */ jsx("section", { className: "py-24 md:py-32 px-4 relative overflow-hidden bg-[#0d0d0d]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 mb-20", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center",
          children: [
            /* @__PURE__ */ jsx("h3", { className: "text-5xl md:text-7xl font-medium text-white tracking-tighter mb-2", children: "2.5M+" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 uppercase tracking-widest text-sm", children: "Transações Processadas" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: 0.1 },
          className: "text-center",
          children: [
            /* @__PURE__ */ jsx("h3", { className: "text-5xl md:text-7xl font-medium text-white tracking-tighter mb-2", children: "R$ 12K" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 uppercase tracking-widest text-sm", children: "Economia Média/Ano" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-[48px] bg-[#141414] border border-white/5 p-8 md:p-16 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 w-full h-full opacity-40 mix-blend-screen pointer-events-none", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent animate-pulse-slow" }) }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-[#141414]/90" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col items-center text-center gap-12", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md", children: [
                /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-green-500 animate-pulse" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-white font-medium tracking-wide uppercase", children: "Ecossistema Completo" })
              ] }),
              /* @__PURE__ */ jsxs("h2", { className: "text-5xl md:text-8xl font-medium text-white uppercase tracking-tighter leading-none", children: [
                "MAIS QUE UM APP ",
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500", children: "SEU NOVO CFO" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-8", children: [
          { icon: ShieldCheck, title: "Segurança", desc: "Dados criptografados e proteção nível bancário." },
          { icon: Smartphone, title: "Mobile First", desc: "Funciona nativamente onde você já está: WhatsApp." },
          { icon: TrendingUp, title: "Investimentos", desc: "Controle sua carteira de ativos em breve." },
          { icon: Globe, title: "Acesso Web", desc: "Visualize gráficos detalhados no computador." }
        ].map((card, idx) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: idx * 0.1 },
            className: "bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-start gap-4 hover:bg-white/10 transition-colors backdrop-blur-sm group",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(card.icon, { size: 24 }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: card.title }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 leading-relaxed text-left", children: card.desc })
              ] })
            ]
          },
          idx
        )) })
      ] })
    ] })
  ] }) });
};
const TestimonialCard = ({ t }) => /* @__PURE__ */ jsxs("div", { className: "relative w-[350px] md:w-[400px] bg-[#141414]/80 border border-white/5 p-6 rounded-2xl flex-shrink-0 hover:bg-[#1a1a1a] transition-colors duration-300 group backdrop-blur-md", children: [
  /* @__PURE__ */ jsx("div", { className: "absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-primary/20 rounded-full blur-2xl" }) }),
  /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-4 relative z-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("img", { src: t.image, alt: t.name, className: "w-10 h-10 rounded-full object-cover border border-white/10" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-white font-semibold text-sm", children: t.name }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: t.handle })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Quote, { className: "w-5 h-5 text-primary/30" })
  ] }),
  /* @__PURE__ */ jsxs("p", { className: "text-gray-300 text-sm leading-relaxed mb-4 font-light relative z-10", children: [
    '"',
    t.text,
    '"'
  ] }),
  /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1", children: "★★★★★".split("").map((star, i) => /* @__PURE__ */ jsx("span", { className: "text-[10px] text-[#f5c518]", children: star }, i)) })
] });
const Testimonials = () => {
  const firstRow = TESTIMONIALS.slice(0, 5);
  const secondRow = TESTIMONIALS.slice(5, 10);
  return /* @__PURE__ */ jsxs("section", { id: "depoimentos", className: "py-24 md:py-32 relative bg-[#0d0d0d] overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-20 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" }),
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 mb-20 text-center relative z-10", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-4xl md:text-6xl font-medium text-white mb-6 tracking-tight", children: [
            "O fim da ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500", children: "ansiedade financeira" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-muted max-w-2xl mx-auto font-light", children: "Junte-se a milhares de pessoas que transformaram sua relação com o dinheiro usando apenas o WhatsApp e a nossa IA." })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-8 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 h-full w-24 md:w-48 bg-gradient-to-r from-[#0d0d0d] to-transparent z-20 pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 h-full w-24 md:w-48 bg-gradient-to-l from-[#0d0d0d] to-transparent z-20 pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "flex overflow-hidden select-none", children: /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "flex gap-6 pr-6",
          animate: { x: ["0%", "-50%"] },
          transition: {
            repeat: Infinity,
            ease: "linear",
            duration: 40
          },
          children: [...firstRow, ...firstRow, ...firstRow].map((t, idx) => /* @__PURE__ */ jsx(TestimonialCard, { t }, `row1-${idx}`))
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "flex overflow-hidden select-none", children: /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "flex gap-6 pr-6",
          animate: { x: ["-50%", "0%"] },
          transition: {
            repeat: Infinity,
            ease: "linear",
            duration: 45
          },
          children: [...secondRow, ...secondRow, ...secondRow].map((t, idx) => /* @__PURE__ */ jsx(TestimonialCard, { t }, `row2-${idx}`))
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent z-20 pointer-events-none" })
  ] });
};
const Price = () => {
  return /* @__PURE__ */ jsx("section", { id: "investimento", className: "py-24 md:py-32 px-4", children: /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "glass-card rounded-[40px] p-8 md:p-16 relative overflow-hidden border border-white/10 shadow-2xl", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-12 items-start justify-between relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase mb-6 tracking-wider", children: "Oferta de Lançamento" }),
        /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-5xl font-medium text-white mb-6 tracking-tight leading-tight", children: [
          "ASSUMA O CONTROLE ",
          /* @__PURE__ */ jsx("br", {}),
          " DA SUA VIDA FINANCEIRA"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-muted mb-8 font-light leading-relaxed", children: "Pare de perder dinheiro sem saber onde. O preço de um café para organizar sua vida inteira." }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-5 mb-10", children: ["Lançamentos Ilimitados no WhatsApp", "Dashboard Completo Web", "Suporte Prioritário", "Cancelamento a qualquer momento"].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-4 text-gray-200 font-medium", children: [
          /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-[0_0_10px_rgba(71,255,183,0.4)]", children: /* @__PURE__ */ jsx(Check, { size: 14, className: "text-black stroke-[3]" }) }),
          item
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full md:w-auto flex flex-col items-start md:items-end gap-2 bg-white/5 p-8 rounded-3xl border border-white/5 backdrop-blur-sm", children: [
        /* @__PURE__ */ jsx("span", { className: "text-gray-500 text-lg line-through font-medium", children: "R$ 49,90/mês" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-1.5", children: [
          /* @__PURE__ */ jsx("span", { className: "text-3xl font-bold text-white", children: "R$" }),
          /* @__PURE__ */ jsx("span", { className: "text-6xl font-bold text-primary tracking-tight", children: "29,90" }),
          /* @__PURE__ */ jsx("span", { className: "text-xl text-gray-400", children: "/mês" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-sm uppercase tracking-wide font-medium", children: "Plano Anual: 2 meses grátis" }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://finzap.io/criar-conta",
            className: "mt-8 w-full px-8 py-5 bg-gradient-to-r from-[#008c69] to-[#008c69] hover:brightness-110 text-white font-bold text-lg rounded-full transition-all shadow-[0_0_30px_rgba(71,255,183,0.2)] hover:shadow-[0_0_50px_rgba(71,255,183,0.4)] text-center uppercase tracking-wide transform hover:scale-[1.02]",
            children: "Assinar Agora"
          }
        ),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mt-4 w-full text-center flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" }) }),
          "7 dias grátis • Sem compromisso"
        ] })
      ] })
    ] })
  ] }) }) });
};
const FAQ = ({ items, title = "Dúvidas frequentes", className = "py-24 md:py-32", showSocialProof = true }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const data = items || FAQS;
  return /* @__PURE__ */ jsx("section", { id: "faq", className: `px-4 bg-background ${className}`, children: /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "relative bg-[#0d0d0d] rounded-[40px] p-8 md:p-12 overflow-hidden border border-white/5 shadow-2xl", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-[#47ffb7] to-transparent shadow-[0_0_25px_rgba(71,255,183,1)] z-20" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full h-48 bg-[#47ffb7]/5 blur-[80px] pointer-events-none z-0" }),
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-16 relative z-10", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-3xl md:text-5xl font-medium text-white mb-6 tracking-tight", children: title }),
      showSocialProof && /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center gap-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 bg-white/5 pr-6 pl-2 py-2 rounded-full border border-white/5 backdrop-blur-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "flex -space-x-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full border-2 border-[#0d0d0d] overflow-hidden", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: `https://picsum.photos/100/100?random=${i + 30}`,
            alt: "Student",
            className: "w-full h-full object-cover"
          }
        ) }, i)) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start", children: [
          /* @__PURE__ */ jsx("div", { className: "flex text-[#f5c518] text-[10px] gap-0.5 mb-0.5", children: "★★★★★".split("").map((star, i) => /* @__PURE__ */ jsx("span", { children: star }, i)) }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-gray-300", children: "6mil + alunos" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col relative z-10", children: data.map((faq, idx) => {
      const isOpen = openIndex === idx;
      return /* @__PURE__ */ jsx("div", { className: "border-b border-white/5 last:border-none", children: /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setOpenIndex(isOpen ? null : idx),
          className: "w-full py-6 md:py-8 flex items-start justify-between text-left focus:outline-none group gap-6",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 flex-1 pt-1", children: [
              /* @__PURE__ */ jsx("span", { className: `text-lg md:text-xl font-medium transition-colors duration-300 ${isOpen ? "text-white" : "text-gray-300 group-hover:text-white"}`, children: faq.question }),
              /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { height: 0, opacity: 0, marginTop: 0 },
                  animate: { height: "auto", opacity: 1, marginTop: 8 },
                  exit: { height: 0, opacity: 0, marginTop: 0 },
                  transition: { duration: 0.3, ease: "easeInOut" },
                  className: "overflow-hidden",
                  children: /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-base leading-relaxed pr-4 md:pr-12 font-light", children: faq.answer })
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border transition-all duration-300 flex-shrink-0 mt-1
                                    ${isOpen ? "bg-[#47ffb7]/5 border-[#47ffb7] shadow-[0_0_20px_rgba(71,255,183,0.2)]" : "bg-[#1a1a1a] border-white/10 group-hover:border-[#47ffb7]/50"}`,
                children: isOpen ? /* @__PURE__ */ jsx(ChevronUp, { size: 20, className: "text-[#47ffb7]", strokeWidth: 2 }) : /* @__PURE__ */ jsx(ChevronDown, { size: 20, className: "text-[#47ffb7]", strokeWidth: 2 })
              }
            )
          ]
        }
      ) }, idx);
    }) })
  ] }) }) });
};
const Home = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "FinZap - Controle Financeiro Inteligente",
        description: "Gerencie suas finanças, calcule férias, rescisão e investimentos com as ferramentas gratuitas do FinZap.",
        canonical: "/"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "FinZap",
      "url": "https://finzap.io",
      "logo": "https://finzap.io/favicon.ico",
      "description": "Organize suas finanças sem sair do chat. O FinZap é a maneira mais simples e rápida de controlar seus gastos usando Inteligência Artificial no WhatsApp.",
      "sameAs": []
    }) }),
    /* @__PURE__ */ jsx(Hero, {}),
    /* @__PURE__ */ jsx(Hook, {}),
    /* @__PURE__ */ jsx(Modules, {}),
    /* @__PURE__ */ jsx(Certificate, {}),
    /* @__PURE__ */ jsx(Community, {}),
    /* @__PURE__ */ jsx(Testimonials, {}),
    /* @__PURE__ */ jsx(Price, {}),
    /* @__PURE__ */ jsx(FAQ, {})
  ] });
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
const PromoPopup = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const buttonControls = useAnimation();
  useEffect(() => {
    if (location.pathname.startsWith("/calculadoras") && !isDismissed) {
      const timer = setTimeout(() => setIsVisible(true), 2e3);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [location, isDismissed]);
  useEffect(() => {
    if (isVisible) {
      const sequence = async () => {
        while (true) {
          await new Promise((resolve) => setTimeout(resolve, 1e4));
          await buttonControls.start({
            y: [0, -6, 0],
            transition: { duration: 0.5, ease: "easeInOut" }
          });
        }
      };
      sequence();
    }
  }, [isVisible, buttonControls]);
  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };
  return /* @__PURE__ */ jsx(AnimatePresence, { children: isVisible && /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 50, scale: 0.9 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: 50, scale: 0.9 },
      transition: { type: "spring", damping: 20, stiffness: 300 },
      className: "fixed z-50 \r\n                        bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 \r\n                        md:w-[380px] w-auto",
      children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d]/90 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] p-5", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleDismiss,
            "aria-label": "Fechar popup",
            className: "absolute top-3 right-3 text-gray-500 hover:text-white transition-colors",
            children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0", children: /* @__PURE__ */ jsx(Zap, { className: "w-5 h-5 text-primary" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-base font-bold text-white leading-tight mb-1", children: "Controle Financeiro Inteligente" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 leading-relaxed", children: "Organize suas finanças automaticamente pelo WhatsApp com nossa IA." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            motion.a,
            {
              href: "https://finzap.io/criar-conta",
              target: "_blank",
              rel: "noopener noreferrer",
              animate: buttonControls,
              className: "flex items-center justify-center gap-2 w-full py-2 px-4 bg-primary hover:bg-primary/90 text-[#0d0d0d] font-bold text-xs uppercase tracking-wide rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap",
              children: [
                "Testar Grátis Agora",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" })
              ]
            }
          )
        ] })
      ] })
    }
  ) });
};
const Terms = lazy(() => import("./assets/Terms-DxvkZ4jC.js").then((module) => ({ default: module.Terms })));
const Privacy = lazy(() => import("./assets/Privacy-BgUVqtGz.js").then((module) => ({ default: module.Privacy })));
const Support = lazy(() => import("./assets/Support-BmMCwfrP.js").then((module) => ({ default: module.Support })));
const Calculators = lazy(() => import("./assets/Calculators-BiekH7zO.js").then((module) => ({ default: module.Calculators })));
const InvestmentPage = lazy(() => import("./assets/InvestmentPage-BewI9Nrl.js").then((module) => ({ default: module.InvestmentPage })));
const VacationPage = lazy(() => import("./assets/VacationPage-DUEcDpom.js").then((module) => ({ default: module.VacationPage })));
const EnergyPage = lazy(() => import("./assets/EnergyPage-B62-ShxG.js").then((module) => ({ default: module.EnergyPage })));
const FuelPage = lazy(() => import("./assets/FuelPage-DpjbEg6c.js").then((module) => ({ default: module.FuelPage })));
const TerminationPage = lazy(() => import("./assets/TerminationPage-DJ4tkBAQ.js").then((module) => ({ default: module.TerminationPage })));
const INSSPage = lazy(() => import("./assets/INSSPage-BURdk6ja.js").then((module) => ({ default: module.INSSPage })));
function App() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ScrollToTop, {}),
    /* @__PURE__ */ jsxs("div", { className: "bg-background min-h-screen text-white font-sans selection:bg-primary/30 selection:text-primary", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" }) }), children: /* @__PURE__ */ jsxs(Routes, { children: [
        /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Home, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/calculadoras", element: /* @__PURE__ */ jsx(Calculators, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/calculadoras/investimentos", element: /* @__PURE__ */ jsx(InvestmentPage, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/calculadoras/ferias", element: /* @__PURE__ */ jsx(VacationPage, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/calculadoras/energia", element: /* @__PURE__ */ jsx(EnergyPage, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/calculadoras/combustivel", element: /* @__PURE__ */ jsx(FuelPage, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/calculadoras/rescisao", element: /* @__PURE__ */ jsx(TerminationPage, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/calculadoras/inss", element: /* @__PURE__ */ jsx(INSSPage, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/terms", element: /* @__PURE__ */ jsx(Terms, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/privacy", element: /* @__PURE__ */ jsx(Privacy, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/support", element: /* @__PURE__ */ jsx(Support, {}) })
      ] }) }) }),
      /* @__PURE__ */ jsx(Footer, {}),
      /* @__PURE__ */ jsx(PromoPopup, {})
    ] })
  ] });
}
function render({ path, context = {} }) {
  const helmetContext = {};
  const html = ReactDOMServer.renderToString(
    /* @__PURE__ */ jsx(React3.StrictMode, { children: /* @__PURE__ */ jsx(StaticRouter, { location: path, children: /* @__PURE__ */ jsx(HelmetProvider, { context: helmetContext, children: /* @__PURE__ */ jsx(App, {}) }) }) })
  );
  return { html, helmetContext };
}
export {
  FAQ as F,
  SEO as S,
  render
};
