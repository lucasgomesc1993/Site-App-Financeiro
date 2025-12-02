var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b;
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React3, { Component, createContext, useContext, useState, useEffect, useRef, lazy, Suspense } from "react";
import ReactDOMServer from "react-dom/server";
import { useNavigate, useLocation, Link, useParams, Routes, Route, StaticRouter } from "react-router-dom";
import fastCompare from "react-fast-compare";
import invariant from "invariant";
import shallowEqual from "shallowequal";
import { Wallet, X, Menu, ChevronRight, Instagram, Youtube, Linkedin, MessageCircle, ChevronLeft, Video, Phone, MoreVertical, CheckCheck, Loader2, Smile, Paperclip, Camera, Send, Mic, Check, Zap, CheckCircle2, ShieldCheck, Smartphone, TrendingUp, Globe, Quote, ArrowRight, Play, ChevronUp, ChevronDown, Home as Home$1, Calculator, Plane, Fuel, DollarSign, Calendar, Clock, Briefcase, Moon, PiggyBank, Building2, Award, Flame, BarChart3, Car, Gem, QrCode, Percent, User, AlertCircle, Users, MinusCircle, Coins, Target, Key, Building, RefreshCw, ArrowRightLeft, AlertTriangle, MapPin, CheckCircle, Copy, Download, VolumeX, Volume2, BookOpen } from "lucide-react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { GoogleGenAI, Type } from "@google/genai";
import { QRCodeSVG } from "qrcode.react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { createClient } from "@supabase/supabase-js";
import ReactMarkdown from "react-markdown";
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
  { label: "Ferramentas", href: "/ferramentas" },
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
    description: "Defina quanto quer gastar por categoria. O FinZap te avisa no WhatsApp se você estiver perto do limite.",
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
  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    }
  };
  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 }
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
              "aria-label": isMobileMenuOpen ? "Fechar menu" : "Abrir menu",
              children: isMobileMenuOpen ? /* @__PURE__ */ jsx(X, { size: 22 }) : /* @__PURE__ */ jsx(Menu, { size: 22 })
            }
          )
        ] }),
        /* @__PURE__ */ jsx(AnimatePresence, { children: isMobileMenuOpen && /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: "closed",
            animate: "open",
            exit: "closed",
            variants: menuVariants,
            className: "fixed inset-0 z-40 bg-[#000000] flex flex-col pt-32 px-6 pb-10 overflow-y-auto min-h-screen",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" }),
              /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-[200px] h-[200px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 relative z-10 max-w-lg mx-auto w-full", children: [
                NAV_ITEMS.map((item, i) => /* @__PURE__ */ jsxs(
                  motion.a,
                  {
                    variants: itemVariants,
                    href: item.href,
                    onClick: (e) => handleLinkClick(e, item.href),
                    className: "group flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300",
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "text-2xl font-medium text-gray-300 group-hover:text-white tracking-tight", children: item.label }),
                      /* @__PURE__ */ jsx(ChevronRight, { className: "text-gray-600 group-hover:text-primary transition-colors", size: 20 })
                    ]
                  },
                  item.label
                )),
                /* @__PURE__ */ jsx(motion.div, { variants: itemVariants, className: "mt-8", children: /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://finzap.io/criar-conta",
                    className: "flex items-center justify-center w-full py-4 rounded-full bg-gradient-to-r from-[#008c69] to-[#05a880] hover:brightness-110 transition-all duration-300 text-white font-bold text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(0,140,105,0.3)] active:scale-[0.98]",
                    children: "Começar Grátis"
                  }
                ) }),
                /* @__PURE__ */ jsx(motion.div, { variants: itemVariants, className: "mt-auto pt-10 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-sm", children: [
                  "© 2025 FinZap AI. ",
                  /* @__PURE__ */ jsx("br", {}),
                  " Todos os direitos reservados."
                ] }) })
              ] })
            ]
          }
        ) })
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
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-gray-400", children: [
        /* @__PURE__ */ jsx(Link, { to: "/terms", className: "hover:text-gray-300", children: "Termos de Uso" }),
        /* @__PURE__ */ jsx(Link, { to: "/privacy", className: "hover:text-gray-300", children: "Privacidade" }),
        /* @__PURE__ */ jsx(Link, { to: "/blog", className: "hover:text-gray-300", children: "Blog" }),
        /* @__PURE__ */ jsx(Link, { to: "/stories", className: "hover:text-gray-300", children: "Web Stories" }),
        /* @__PURE__ */ jsx(Link, { to: "/ferramentas", className: "hover:text-gray-300", children: "Ferramentas" }),
        /* @__PURE__ */ jsx(Link, { to: "/calculadoras", className: "hover:text-gray-300", children: "Calculadoras" }),
        /* @__PURE__ */ jsx(Link, { to: "/support", className: "hover:text-gray-300", children: "Suporte" })
      ] })
    ] })
  ] }) });
};
const Hero = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen flex flex-col items-center justify-center pt-36 pb-24 md:pt-48 md:pb-32 px-4 overflow-hidden max-w-[100vw]", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-10 text-center", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { y: 50 },
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
        "h1",
        {
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
          initial: { y: 30 },
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
          initial: { y: 30 },
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
            /* @__PURE__ */ jsx("div", { className: "flex -space-x-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full border-2 border-background overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: `https://picsum.photos/50/50?random=${i + 40}`, alt: "Foto de perfil de cliente satisfeito do FinZap", width: 40, height: 40, className: "w-full h-full object-cover" }) }, i)) }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start", children: [
              /* @__PURE__ */ jsx("div", { className: "flex text-yellow-400 text-xs gap-0.5", children: "★★★★★".split("").map((star, i) => /* @__PURE__ */ jsx("span", { children: star }, i)) }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-300", children: "15mil + usuários" })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
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
              fetchPriority: "high",
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
          initial: { y: 20 },
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
        initial: { y: 30 },
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
  return /* @__PURE__ */ jsxs("section", { id: "depoimentos", className: "py-24 md:py-32 relative bg-[#0d0d0d] overflow-hidden max-w-[100vw]", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-20 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" }),
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 mb-20 text-center relative z-10", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { y: 20 },
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
const storiesData = [
  {
    slug: "5-erros-fgts",
    title: "5 Erros que Comem seu FGTS",
    publisher: "FinZap",
    publisherLogo: "https://finzap.io/favicon.ico",
    posterPortrait: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1080",
    slides: [
      {
        id: "capa",
        media: {
          type: "image",
          url: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1080"
        },
        text: "Você está perdendo dinheiro no FGTS sem saber?",
        animation: "fly-in-bottom"
      },
      {
        id: "erro-1",
        media: {
          type: "image",
          url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1080"
        },
        text: "Erro #1: Deixar o dinheiro parado na conta inativa rendendo menos que a inflação.",
        animation: "fade-in"
      },
      {
        id: "cta",
        media: {
          type: "image",
          url: "https://images.unsplash.com/photo-1604594849809-dfedbc827105?q=80&w=1080"
        },
        text: "Não perca mais tempo. Simule seu saldo agora.",
        cta: {
          label: "Simular FGTS",
          url: "https://finzap.io/calculadoras/fgts"
        }
      }
    ]
  }
];
const RecentStories = () => {
  const recentStories = storiesData.slice(0, 4);
  if (recentStories.length === 0) return null;
  return /* @__PURE__ */ jsx("section", { className: "py-24 px-4 bg-surface/30 border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-end mb-12 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 text-yellow-400" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Dicas Rápidas" })
        ] }),
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-bold text-white mb-4", children: [
          "Web Stories ",
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "FinZap" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 max-w-xl", children: "Conteúdo visual e direto ao ponto para você aprender sobre finanças em poucos segundos." })
      ] }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/stories",
          className: "flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors group",
          children: [
            "Ver todas as stories",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 transition-transform group-hover:translate-x-1" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: recentStories.map((story, index) => /* @__PURE__ */ jsxs(
      "a",
      {
        href: `/stories/${story.slug}.html`,
        className: "group relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-gray-900",
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: story.posterPortrait,
              alt: story.title,
              className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100",
              loading: "lazy"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" }),
          /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-primary text-[10px] font-bold uppercase tracking-wider mb-2", children: [
              /* @__PURE__ */ jsx(Play, { className: "w-3 h-3 fill-current" }),
              "Web Story"
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "text-white font-bold text-sm leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2", children: story.title })
          ] })
        ]
      },
      story.slug
    )) })
  ] }) });
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
    /* @__PURE__ */ jsx(RecentStories, {}),
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
const Breadcrumb = ({ items }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://finzap.io/"
        // Replace with actual domain if known, or use relative
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": `https://finzap.io${item.href}`
      }))
    ]
  };
  return /* @__PURE__ */ jsxs("nav", { "aria-label": "Breadcrumb", className: "mb-6", children: [
    /* @__PURE__ */ jsx(
      "script",
      {
        type: "application/ld+json",
        dangerouslySetInnerHTML: { __html: JSON.stringify(jsonLd) }
      }
    ),
    /* @__PURE__ */ jsxs("ol", { className: "flex items-center flex-wrap gap-2 text-sm text-gray-400", children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center hover:text-white transition-colors", children: [
        /* @__PURE__ */ jsx(Home$1, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Home" })
      ] }) }),
      items.map((item, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 text-gray-600" }),
        index === items.length - 1 ? /* @__PURE__ */ jsx("span", { className: "text-primary font-medium", "aria-current": "page", children: item.label }) : /* @__PURE__ */ jsx(Link, { to: item.href, className: "hover:text-white transition-colors", children: item.label })
      ] }, item.href))
    ] })
  ] });
};
const AppPromoBanner$4 = lazy(() => Promise.resolve().then(() => AppPromoBanner$2).then((module) => ({ default: module.AppPromoBanner })));
const Calculators = () => {
  const CALCULATOR_FAQS = [
    {
      question: "Qual a diferença entre simulador e calculadora?",
      answer: "Calculadoras normalmente retornam resultados diretos e exatos com base em dados objetivos e fórmulas fixas (como impostos). Simuladores projetam cenários futuros considerando variáveis dinâmicas e estimativas (como rentabilidade de investimentos)."
    },
    {
      question: "As calculadoras online são confiáveis?",
      answer: "Sim, nossas calculadoras são desenvolvidas com base nas regras, alíquotas e índices oficiais vigentes. No entanto, elas servem como ferramentas de estimativa e orientação."
    },
    {
      question: "Posso confiar nos resultados para tomar decisões financeiras?",
      answer: "Elas são ótimas para orientação inicial e planejamento, mas não substituem a análise de um profissional especializado. Sempre consulte um contador ou consultor financeiro para decisões críticas."
    },
    {
      question: "Posso usar as calculadoras pelo celular?",
      answer: "Sim! Nossa plataforma é totalmente responsiva e todas as ferramentas funcionam perfeitamente em qualquer dispositivo com acesso à internet, seja celular, tablet ou computador."
    },
    {
      question: "Como usar uma calculadora financeira corretamente?",
      answer: "O segredo é a precisão dos dados de entrada. Preencha campos como valor inicial, taxas e prazos com atenção. O resultado será calculado automaticamente com base nas fórmulas financeiras padrão do mercado."
    }
  ];
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadoras Financeiras FinZap",
    "description": "Ferramentas gratuitas para cálculo de férias, décimo terceiro, salário líquido e mais.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Calculadoras Financeiras Gratuitas",
        description: "Ferramentas gratuitas para cálculo de férias, décimo terceiro, salário líquido, investimentos e mais.",
        canonical: "/calculadoras"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": CALCULATOR_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsx(Breadcrumb, { items: [{ label: "Calculadoras", href: "/calculadoras" }] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsx(Calculator, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Calculadoras Gratuitas" })
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
          "Calculadoras ",
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "Financeiras" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Utilize nossas calculadoras gratuitas para planejar seus investimentos, calcular suas férias e organizar sua vida financeira." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsx(Link, { to: "/calculadoras/investimentos", className: "group", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(TrendingUp, { className: "text-primary w-6 h-6" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-3", children: "Simulador de Investimentos" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Compare CDB, LCI, LCA e Tesouro Direto. Descubra quanto seu dinheiro pode render com juros compostos." }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all", children: [
              "Acessar ferramenta ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Link, { to: "/calculadoras/ferias", className: "group", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Plane, { className: "text-primary w-6 h-6" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-3", children: "Calculadora de Férias" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Calcule o valor exato das suas férias, incluindo 1/3 constitucional, abono pecuniário e descontos de INSS/IRRF." }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all", children: [
              "Acessar ferramenta ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Link, { to: "/calculadoras/energia", className: "group", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Zap, { className: "text-primary w-6 h-6" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-3", children: "Consumo de Energia" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Descubra quanto seus aparelhos consomem e economize na conta de luz." }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all", children: [
              "Acessar ferramenta ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Link, { to: "/calculadoras/combustivel", className: "group", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Fuel, { className: "text-primary w-6 h-6" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-3", children: "Álcool ou Gasolina" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Descubra qual combustível compensa mais para abastecer seu veículo e economize no posto." }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all", children: [
              "Acessar ferramenta ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Link, { to: "/calculadoras/rescisao", className: "group", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Calculator, { className: "text-primary w-6 h-6" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-3", children: "Rescisão Trabalhista" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Simule sua rescisão CLT. Calcule saldo de salário, férias, 13º, aviso prévio e multa do FGTS." }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all", children: [
              "Acessar ferramenta ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Link, { to: "/calculadoras/inss", className: "group", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Calculator, { className: "text-primary w-6 h-6" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-3", children: "Calculadora de INSS" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Simule o desconto do INSS 2025. Tabela progressiva atualizada para CLT, Autônomos e Pro-labore." }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all", children: [
              "Acessar ferramenta ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Link, { to: "/calculadoras/salario-liquido", className: "group", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(DollarSign, { className: "text-primary w-6 h-6" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-3", children: "Salário Líquido 2025" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Descubra quanto vai cair na conta. Cálculo exato com descontos de INSS e IRRF 2025." }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all", children: [
              "Acessar ferramenta ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Link, { to: "/calculadoras/decimo-terceiro", className: "group", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Calendar, { className: "text-primary w-6 h-6" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-3", children: "Décimo Terceiro" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Antecipe seu planejamento. Simule o valor exato da 1ª e 2ª parcela do seu 13º salário." }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all", children: [
              "Acessar ferramenta ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Link, { to: "/calculadoras/horas-extras", className: "group", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Clock, { className: "text-primary w-6 h-6" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-3", children: "Horas Extras" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Estendeu a jornada? Simule o valor exato com adicionais de 50%, 100% e reflexo no DSR." }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all", children: [
              "Acessar ferramenta ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Link, { to: "/calculadoras/seguro-desemprego", className: "group", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Briefcase, { className: "text-primary w-6 h-6" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-3", children: "Seguro-Desemprego" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Foi demitido? Simule o valor exato e a quantidade de parcelas que você tem direito." }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all", children: [
              "Acessar ferramenta ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Link, { to: "/calculadoras/adicional-noturno", className: "group", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Moon, { className: "text-primary w-6 h-6" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-3", children: "Adicional Noturno" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Trabalha a noite? Descubra o valor real com acréscimo de 20% e hora reduzida." }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all", children: [
              "Acessar ferramenta ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Link, { to: "/calculadoras/fgts", className: "group", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(PiggyBank, { className: "text-primary w-6 h-6" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-3", children: "FGTS (Saldo Futuro)" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Simule o rendimento do seu FGTS com depósitos mensais e juros." }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all", children: [
              "Acessar ferramenta ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Link, { to: "/calculadoras/custo-funcionario", className: "group", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Building2, { className: "text-primary w-6 h-6" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-3", children: "Custo de Funcionário" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Vai contratar? Descubra o custo real de um funcionário para a empresa." }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all", children: [
              "Acessar ferramenta ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Link, { to: "/calculadoras/plr", className: "group", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Award, { className: "text-primary w-6 h-6" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-3", children: "PLR e IRRF" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Vai receber a bolada? Simule o desconto do IR sobre a sua PLR." }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all", children: [
              "Acessar ferramenta ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Link, { to: "/calculadoras/fire", className: "group", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Flame, { className: "text-primary w-6 h-6" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-3", children: "FIRE" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Independência Financeira: Quanto preciso juntar para parar de trabalhar?" }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all", children: [
              "Acessar ferramenta ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Link, { to: "/calculadoras/juros-compostos", className: "group", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(BarChart3, { className: "text-primary w-6 h-6" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-3", children: "Juros Compostos" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Simule o crescimento exponencial do seu patrimônio com a força dos juros sobre juros." }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all", children: [
              "Acessar ferramenta ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Link, { to: "/calculadoras/alugar-ou-financiar", className: "group", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Home$1, { className: "text-primary w-6 h-6" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-3", children: "Alugar ou Financiar?" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "A dúvida de milhões. Descubra matematicamente se vale mais a pena comprar ou alugar." }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all", children: [
              "Acessar ferramenta ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Link, { to: "/calculadoras/uber-ou-carro", className: "group", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Car, { className: "text-primary w-6 h-6" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-3", children: "Uber ou Carro?" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Será que vale a pena manter um carro na garagem? Descubra se é mais barato dirigir ou usar apps." }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all", children: [
              "Acessar ferramenta ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Link, { to: "/calculadoras/primeiro-milhao", className: "group", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Gem, { className: "text-primary w-6 h-6" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-3", children: "Primeiro Milhão" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "O sonho é possível. Simule quanto você precisa investir por mês para conquistar o seu primeiro milhão." }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all", children: [
              "Acessar ferramenta ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Link, { to: "/calculadoras/conversor-moedas", className: "group", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:border-primary/30 h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Globe, { className: "text-primary w-6 h-6" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-3", children: "Conversor de Moedas" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Converta valores entre Real, Dólar e Euro com a cotação atualizada em tempo real." }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all", children: [
              "Acessar ferramenta ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-24 max-w-4xl mx-auto space-y-16", children: [
        /* @__PURE__ */ jsxs("section", { className: "text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Calculadoras Online: Ferramentas para Decisões Financeiras" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg leading-relaxed", children: "As calculadoras online do FinZap são ferramentas digitais desenvolvidas para facilitar o cálculo de diferentes tipos de informações de forma automatizada. Elas funcionam diretamente no navegador, sem necessidade de instalação, e oferecem resultados imediatos com base nos dados fornecidos. Seja para resolver questões financeiras, trabalhistas ou de planejamento, nossas ferramentas ajudam você a economizar tempo, evitar erros manuais e tomar decisões mais conscientes." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-12", children: [
          /* @__PURE__ */ jsxs("section", { className: "bg-white/5 rounded-3xl p-8 border border-white/10", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-bold text-white mb-6 flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(Zap, { className: "text-primary w-6 h-6" }),
              "Por que usar nossas calculadoras?"
            ] }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Precisão nos cálculos:" }),
                  " Reduz erros comuns em contas complexas e segue as regras vigentes."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Rapidez e praticidade:" }),
                  " Resultados instantâneos com poucos cliques."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Gratuidade:" }),
                  " Ferramentas 100% gratuitas e sem necessidade de cadastro."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Acessível em qualquer lugar:" }),
                  " Funciona no celular, tablet ou computador."
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: "bg-white/5 rounded-3xl p-8 border border-white/10", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-bold text-white mb-6 flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(Calculator, { className: "text-primary w-6 h-6" }),
              "Como usar corretamente"
            ] }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "1" }),
                /* @__PURE__ */ jsx("span", { children: "Escolha a calculadora adequada para sua necessidade específica." })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "2" }),
                /* @__PURE__ */ jsx("span", { children: "Informe os dados corretamente nos campos indicados (atenção aos valores brutos)." })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "3" }),
                /* @__PURE__ */ jsx("span", { children: "Revise os valores inseridos antes de clicar em calcular." })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "4" }),
                /* @__PURE__ */ jsx("span", { children: "Analise o resultado e, se necessário, faça novas simulações com cenários diferentes." })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-24", children: /* @__PURE__ */ jsx(
        FAQ,
        {
          title: "Dúvidas Frequentes sobre Calculadoras",
          items: CALCULATOR_FAQS,
          showSocialProof: false
        }
      ) }),
      /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "h-96 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" }) }), children: /* @__PURE__ */ jsx(AppPromoBanner$4, {}) }),
      /* @__PURE__ */ jsx("div", { className: "mt-16 max-w-4xl mx-auto text-center border-t border-white/5 pt-12", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
        /* @__PURE__ */ jsx("strong", { children: "Aviso legal:" }),
        " As ferramentas disponibilizadas neste site são apenas para fins informativos e educacionais. Embora busquemos manter os cálculos e fórmulas atualizados, não nos responsabilizamos por eventuais divergências, perdas ou decisões tomadas com base nos resultados obtidos. Consulte sempre um profissional para orientações específicas ao seu caso."
      ] }) })
    ] })
  ] });
};
const AppPromoBanner$3 = lazy(() => Promise.resolve().then(() => AppPromoBanner$2).then((module) => ({ default: module.AppPromoBanner })));
const Tools = () => {
  const TOOLS_FAQS = [
    {
      question: "As ferramentas são gratuitas?",
      answer: "Sim, todas as ferramentas disponibilizadas nesta página são 100% gratuitas e não exigem cadastro para uso básico."
    },
    {
      question: "O Gerador de Pix é seguro?",
      answer: "Sim, o gerador de Pix roda inteiramente no seu navegador. Nenhum dado bancário é enviado para nossos servidores. O código é gerado localmente."
    },
    {
      question: "Posso usar no celular?",
      answer: "Com certeza! Todas as ferramentas são responsivas e funcionam perfeitamente em smartphones e tablets."
    }
  ];
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Ferramentas FinZap",
    "description": "Ferramentas úteis para o seu dia a dia financeiro, como Gerador de Pix e mais.",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Ferramentas Financeiras Gratuitas",
        description: "Acesse ferramentas úteis como Gerador de Pix e outras utilidades para facilitar sua vida financeira.",
        canonical: "/ferramentas"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": TOOLS_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsx(Breadcrumb, { items: [{ label: "Ferramentas", href: "/ferramentas" }] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Utilitários Gratuitos" })
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
          "Ferramentas ",
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "Úteis" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Facilite sua rotina com nossas ferramentas práticas e gratuitas." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: /* @__PURE__ */ jsx(Link, { to: "/ferramentas/gerador-pix", className: "group", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-[#1a1a1a]/80 transition-colors duration-300 hover:border-primary/30 h-full relative overflow-hidden",
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" }),
            /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(QrCode, { className: "text-primary w-6 h-6" }) }),
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-3", children: "Gerador de Pix" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Crie QR Codes Pix personalizados gratuitamente. Gere códigos Copia e Cola instantâneos." }),
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all", children: [
                "Acessar ferramenta ",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
              ] })
            ] })
          ]
        }
      ) }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-24", children: /* @__PURE__ */ jsx(
        FAQ,
        {
          title: "Dúvidas Frequentes",
          items: TOOLS_FAQS,
          showSocialProof: false
        }
      ) }),
      /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "h-96 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" }) }), children: /* @__PURE__ */ jsx(AppPromoBanner$3, {}) }),
      /* @__PURE__ */ jsx("div", { className: "mt-16 max-w-4xl mx-auto text-center border-t border-white/5 pt-12", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
        /* @__PURE__ */ jsx("strong", { children: "Aviso legal:" }),
        " As ferramentas disponibilizadas neste site são apenas para fins informativos e de utilidade. Não nos responsabilizamos pelo uso indevido das mesmas."
      ] }) })
    ] })
  ] });
};
const InvestmentSimulator = () => {
  const [initialAmount, setInitialAmount] = useState(1e3);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(10.5);
  const [type, setType] = useState("cdb");
  const [result, setResult] = useState({
    totalInvested: 0,
    totalInterest: 0,
    grossTotal: 0,
    taxAmount: 0,
    netTotal: 0
  });
  useEffect(() => {
    calculateResults();
  }, [initialAmount, monthlyContribution, years, rate, type]);
  const calculateResults = () => {
    const months = years * 12;
    const monthlyRate = Math.pow(1 + rate / 100, 1 / 12) - 1;
    let futureValueInitial = initialAmount * Math.pow(1 + monthlyRate, months);
    let futureValueMonthly = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    const grossTotal = futureValueInitial + futureValueMonthly;
    const totalInvested = initialAmount + monthlyContribution * months;
    const totalInterest = grossTotal - totalInvested;
    let taxRate = 0;
    if (type === "cdb" || type === "tesouro" || type === "debentures") {
      const days = years * 365;
      if (days <= 180) taxRate = 0.225;
      else if (days <= 360) taxRate = 0.2;
      else if (days <= 720) taxRate = 0.175;
      else taxRate = 0.15;
    }
    const taxAmount = totalInterest * taxRate;
    const netTotal = grossTotal - taxAmount;
    setResult({
      totalInvested,
      totalInterest,
      grossTotal,
      taxAmount,
      netTotal
    });
  };
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };
  return /* @__PURE__ */ jsx("div", { className: "w-full max-w-5xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8", children: [
    /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-white mb-6 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-primary" }),
        "Parâmetros"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "investment-type", className: "block text-sm text-gray-400 mb-2", children: "Tipo de Investimento" }),
          /* @__PURE__ */ jsx("div", { id: "investment-type", className: "grid grid-cols-2 gap-2", children: ["cdb", "lci", "tesouro", "debentures"].map((t) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setType(t),
              className: `py-2 px-3 rounded-xl text-sm font-medium transition-all ${type === t ? "bg-primary text-black shadow-[0_0_15px_rgba(71,255,183,0.3)]" : "bg-white/5 text-gray-400 hover:bg-white/10"}`,
              children: t === "cdb" ? "CDB" : t === "lci" ? "LCI/LCA" : t === "tesouro" ? "Tesouro" : "Debêntures"
            },
            t
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "initial-amount", className: "block text-sm text-gray-400 mb-2", children: "Investimento Inicial" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "initial-amount",
                "aria-label": "Investimento Inicial",
                type: "number",
                value: initialAmount,
                onChange: (e) => setInitialAmount(Number(e.target.value)),
                className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "monthly-contribution", className: "block text-sm text-gray-400 mb-2", children: "Aporte Mensal" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "monthly-contribution",
                "aria-label": "Aporte Mensal",
                type: "number",
                value: monthlyContribution,
                onChange: (e) => setMonthlyContribution(Number(e.target.value)),
                className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "years", className: "block text-sm text-gray-400 mb-2", children: "Prazo (Anos)" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "years",
                  "aria-label": "Prazo (Anos)",
                  type: "number",
                  value: years,
                  onChange: (e) => setYears(Number(e.target.value)),
                  className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "rate", className: "block text-sm text-gray-400 mb-2", children: "Taxa Anual (%)" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Percent, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "rate",
                  "aria-label": "Taxa Anual (%)",
                  type: "number",
                  value: rate,
                  onChange: (e) => setRate(Number(e.target.value)),
                  className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                }
              )
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "lg:col-span-7 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-1", children: "Total Investido" }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-white", children: formatCurrency(result.totalInvested) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-1", children: "Rendimento Bruto" }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-primary", children: formatCurrency(result.totalInterest) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-medium text-gray-300 mb-6 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5 text-primary" }),
            "Resultado Final"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-3 border-b border-white/5", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Valor Bruto Total" }),
              /* @__PURE__ */ jsx("span", { className: "text-xl font-medium text-white", children: formatCurrency(result.grossTotal) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-3 border-b border-white/5", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-gray-400", children: [
                "Imposto de Renda",
                type === "lci" ? /* @__PURE__ */ jsx("span", { className: "ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full", children: "Isento" }) : ""
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "text-xl font-medium text-red-400", children: [
                "-",
                formatCurrency(result.taxAmount)
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pt-4 mt-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-end", children: [
                /* @__PURE__ */ jsx("span", { className: "text-gray-300 font-medium", children: "Valor Líquido" }),
                /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: formatCurrency(result.netTotal) })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-right text-xs text-gray-500 mt-2", children: "*Estimativa baseada na taxa constante. Não é garantia de rentabilidade." })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] }) });
};
const AppPromoBanner$1 = () => {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.6 },
      className: "w-full mt-24 mb-12",
      children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d0d]/80 backdrop-blur-xl p-8 md:p-12 group shadow-[0_0_50px_rgba(0,0,0,0.5)]", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-primary/5 to-transparent opacity-50 pointer-events-none" }),
        /* @__PURE__ */ jsx("div", { className: "absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(71,255,183,0.03)_0%,transparent_50%)] animate-[spin_10s_linear_infinite] pointer-events-none" }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 grid md:grid-cols-2 gap-12 items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-2", children: [
              /* @__PURE__ */ jsx(MessageCircle, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-primary", children: "Controle Financeiro via WhatsApp" })
            ] }),
            /* @__PURE__ */ jsxs("h3", { className: "text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight", children: [
              "Organize suas finanças ",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "sem sair do chat" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg", children: "Chega de planilhas complicadas. Com o FinZap, você controla seus gastos enviando áudios ou mensagens de texto no WhatsApp. Simples, rápido e com Inteligência Artificial." }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: ["Registro automático de gastos", "Relatórios mensais inteligentes", "Dicas de economia personalizadas"].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-gray-300", children: [
              /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5 text-primary" }),
              item
            ] }, i)) }),
            /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxs(
              "a",
              {
                href: "https://finzap.io/criar-conta",
                className: "inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-[#008c69] to-[#008c69] hover:brightness-110 text-white font-bold text-base md:text-lg rounded-full transition-all shadow-[0_0_30px_rgba(71,255,183,0.2)] hover:shadow-[0_0_50px_rgba(71,255,183,0.4)] text-center uppercase tracking-wide transform hover:scale-[1.02] whitespace-nowrap",
                children: [
                  "Testar Grátis Agora ",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5" })
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "relative block", children: /* @__PURE__ */ jsxs("div", { className: "relative transform hover:scale-105 transition-transform duration-500 w-full max-w-sm md:max-w-xl mx-auto", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent z-20 rounded-2xl" }),
            /* @__PURE__ */ jsx("div", { className: "absolute -inset-1 bg-gradient-to-r from-primary to-emerald-500 rounded-2xl blur opacity-30" }),
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "/hero.webp",
                srcSet: "/hero-mobile.webp 600w, /hero-medium.webp 900w, /hero.webp 1200w",
                alt: "FinZap App Dashboard",
                width: 1200,
                height: 563,
                loading: "lazy",
                decoding: "async",
                sizes: "(max-width: 768px) 384px, 576px",
                className: "relative rounded-2xl border border-white/10 shadow-2xl w-full"
              }
            )
          ] }) })
        ] })
      ] })
    }
  );
};
const AppPromoBanner$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AppPromoBanner: AppPromoBanner$1
}, Symbol.toStringTag, { value: "Module" }));
const INVESTMENT_FAQS = [
  {
    question: "Qual é o melhor simulador de investimentos?",
    answer: "O melhor simulador de investimentos é o do FinZap, pois ele fornece as principais informações sobre sua aplicação, como: Resultado bruto e líquido, Valor pago em imposto, Valor do rendimento recebido e muito mais! Além disso, é possível fazer várias simulações de forma 100% gratuita."
  },
  {
    question: "O que é um Certificado de Depósito Bancário (CDB)?",
    answer: "CDB (Certificado de Depósito Bancário) é quando você 'empresta' dinheiro para o banco e ele te devolve com juros. É um dos investimentos mais populares do Brasil, rendendo mais que a poupança e com a mesma segurança (garantido pelo FGC)."
  },
  {
    question: "O que é uma Letra de Crédito Imobiliário (LCI)?",
    answer: "LCI (Letra de Crédito Imobiliário) é um investimento onde seu dinheiro financia o setor imobiliário. A grande vantagem? É 100% isento de Imposto de Renda para pessoa física e também tem a proteção do FGC."
  },
  {
    question: "O que é uma Letra de Crédito do Agronegócio (LCA)?",
    answer: "LCA (Letra de Crédito do Agronegócio) funciona igual à LCI, mas o dinheiro vai para o setor agropecuário. Também é isenta de Imposto de Renda e garantida pelo FGC. É uma ótima opção para diversificar sua carteira."
  },
  {
    question: "Qual a diferença entre LCI e LCA?",
    answer: "A principal diferença está no destino dos recursos. Na LCI, o dinheiro é usado para financiamentos imobiliários, enquanto na LCA, é destinado ao agronegócio. Ambas possuem isenção de IR e garantia do FGC."
  },
  {
    question: "Para que serve um simulador de investimentos online?",
    answer: "Para te dar clareza. Com ele, você projeta exatamente quanto seu dinheiro vai render, compara diferentes opções (como CDB vs LCI) e entende o impacto dos impostos e do tempo nos seus ganhos. É a ferramenta essencial para planejar suas metas."
  }
];
const InvestmentPage = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Simulador de Investimentos FinZap",
    "description": "Compare CDB, LCI, LCA e Tesouro Direto. Calcule o rendimento dos seus investimentos.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Simulador de Investimentos - Renda Fixa",
        description: "Compare CDB, LCI, LCA e Tesouro Direto. Calcule o rendimento dos seus investimentos com nosso simulador gratuito.",
        canonical: "/calculadoras/investimentos"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": INVESTMENT_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Simulador de Investimentos", href: "/calculadoras/investimentos" }
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Renda Fixa" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Simulador de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "Investimentos" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Calcule o retorno de suas aplicações em Renda Fixa (CDB, LCI, LCA e Tesouro Direto) e descubra o poder dos juros compostos." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          children: /* @__PURE__ */ jsx(InvestmentSimulator, {})
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-24 max-w-4xl mx-auto prose prose-invert prose-lg", children: [
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Simulador de Investimentos: Calcule seus rendimentos" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-8", children: "Quer saber quanto seu dinheiro vai render? Utilize o Simulador de Investimentos do FinZap para projetar seus ganhos em aplicações de Renda Fixa como CDB, LCI, LCA e Tesouro Direto." }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: "Como funciona o simulador de investimentos gratuito?" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Esta calculadora de investimentos foi desenvolvida para comparação de diferentes tipos de títulos de renda fixa. O simulador de investimento calcula de forma simples e descomplicada qual será o retorno do seu dinheiro após uma aplicação a uma determinada taxa e período." }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Ademais, o cálculo leva em conta possíveis aportes durante o tempo (investimento mensal), além do valor inicialmente aplicado. Com este simulador, será possível saber quanto conseguirá acumular no final de uma determinada quantidade de meses investindo seu dinheiro na aplicação de sua escolha." }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Contudo, é importante lembrar que o tipo de investimento escolhido é importante, porque existem títulos com tributação diferente. Dessa forma, o Simulador de Investimentos vai poder entregar o retorno líquido (já descontado o imposto) mais exato." }),
          /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-white mb-3", children: "Tipos de Rentabilidade" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 space-y-2 text-gray-400 mb-8", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Prefixada:" }),
              " o rendimento já é conhecido na data da aplicação e não varia no decorrer do tempo;"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Pós-fixada:" }),
              " o retorno varia de acordo com um índice de referência, como o CDI; e"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { className: "text-white", children: "IPCA (híbrida):" }),
              " o rendimento é a variação da inflação mais uma taxa prefixada."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: "O que é o rendimento real nos investimentos?" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "O rendimento real nos investimentos é a taxa de retorno obtida após a dedução da inflação. É um indicador importante porque leva em consideração o impacto da inflação no poder de compra do investidor." }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-8 rounded-2xl border border-white/5 mb-8", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-white mb-4", children: "Por que considerar o rendimento real?" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0", children: "1" }),
                /* @__PURE__ */ jsxs("p", { className: "text-gray-400", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Preservação do poder de compra:" }),
                  " reflete o quanto seu dinheiro realmente cresce após descontar a inflação."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0", children: "2" }),
                /* @__PURE__ */ jsxs("p", { className: "text-gray-400", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Comparação precisa:" }),
                  " permite comparar diferentes opções levando em conta o efeito da inflação."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0", children: "3" }),
                /* @__PURE__ */ jsxs("p", { className: "text-gray-400", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Metas financeiras:" }),
                  " ajuda a estabelecer metas realistas para o futuro."
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-6", children: "Entenda os tipos de investimento" }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-white mb-2 text-primary", children: "Tesouro Direto" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-4", children: "Programa do Tesouro Nacional para venda de títulos públicos. Considerado o investimento mais seguro do país." }),
              /* @__PURE__ */ jsxs("ul", { className: "text-xs text-gray-300 space-y-1", children: [
                /* @__PURE__ */ jsx("li", { children: "• Tesouro Selic (Liquidez diária)" }),
                /* @__PURE__ */ jsx("li", { children: "• Tesouro IPCA+ (Proteção contra inflação)" }),
                /* @__PURE__ */ jsx("li", { children: "• Tesouro Prefixado (Rentabilidade fixa)" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-white mb-2 text-primary", children: "CDB" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-4", children: "Certificado de Depósito Bancário. Você empresta dinheiro para o banco em troca de juros." }),
              /* @__PURE__ */ jsxs("ul", { className: "text-xs text-gray-300 space-y-1", children: [
                /* @__PURE__ */ jsx("li", { children: "• Garantia do FGC" }),
                /* @__PURE__ */ jsx("li", { children: "• Rentabilidade geralmente atrelada ao CDI" }),
                /* @__PURE__ */ jsx("li", { children: "• Opções com liquidez diária" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-white mb-2 text-emerald-400", children: "LCI e LCA" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-4", children: "Letras de Crédito Imobiliário e do Agronegócio. Isentas de Imposto de Renda para pessoa física." }),
              /* @__PURE__ */ jsxs("ul", { className: "text-xs text-gray-300 space-y-1", children: [
                /* @__PURE__ */ jsx("li", { children: "• Isenção de IR" }),
                /* @__PURE__ */ jsx("li", { children: "• Garantia do FGC" }),
                /* @__PURE__ */ jsx("li", { children: "• Foco em setores específicos (Imóveis/Agro)" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-white mb-2 text-primary", children: "Debêntures" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-4", children: "Títulos de dívida emitidos por empresas. Geralmente oferecem retornos maiores que títulos bancários." }),
              /* @__PURE__ */ jsxs("ul", { className: "text-xs text-gray-300 space-y-1", children: [
                /* @__PURE__ */ jsx("li", { children: "• Risco de crédito da empresa" }),
                /* @__PURE__ */ jsx("li", { children: "• Prazos geralmente mais longos" }),
                /* @__PURE__ */ jsx("li", { children: "• Algumas são isentas de IR (Incentivadas)" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          FAQ,
          {
            items: INVESTMENT_FAQS,
            title: "Dúvidas Frequentes sobre Investimentos",
            className: "py-12",
            showSocialProof: false
          }
        )
      ] }),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
};
const VacationCalculator = () => {
  const [salary, setSalary] = useState(3e3);
  const [days, setDays] = useState(30);
  const [sellDays, setSellDays] = useState(false);
  const [dependents, setDependents] = useState(0);
  const [result, setResult] = useState({
    grossVacation: 0,
    oneThirdBonus: 0,
    allowance: 0,
    allowanceOneThird: 0,
    totalGross: 0,
    inss: 0,
    irrf: 0,
    totalNet: 0
  });
  useEffect(() => {
    calculateVacation();
  }, [salary, days, sellDays, dependents]);
  const calculateVacation = () => {
    const vacationValue = salary / 30 * days;
    const oneThird = vacationValue / 3;
    let allowance = 0;
    let allowanceOneThird = 0;
    if (sellDays) {
      allowance = salary / 30 * 10;
      allowanceOneThird = allowance / 3;
    }
    const totalGross = vacationValue + oneThird + allowance + allowanceOneThird;
    const baseINSS = vacationValue + oneThird;
    let inss = calculateINSS(baseINSS);
    const baseIRRF = baseINSS - inss - dependents * 189.59;
    let irrf = calculateIRRF(baseIRRF);
    const totalNet = totalGross - inss - irrf;
    setResult({
      grossVacation: vacationValue,
      oneThirdBonus: oneThird,
      allowance,
      allowanceOneThird,
      totalGross,
      inss,
      irrf,
      totalNet
    });
  };
  const calculateINSS = (base) => {
    let discount = 0;
    if (base <= 1412) {
      discount = base * 0.075;
    } else if (base <= 2666.68) {
      discount = 1412 * 0.075 + (base - 1412) * 0.09;
    } else if (base <= 4000.03) {
      discount = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (base - 2666.68) * 0.12;
    } else if (base <= 7786.02) {
      discount = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (4000.03 - 2666.68) * 0.12 + (base - 4000.03) * 0.14;
    } else {
      discount = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (4000.03 - 2666.68) * 0.12 + (7786.02 - 4000.03) * 0.14;
    }
    return discount;
  };
  const calculateIRRF = (base) => {
    let discount = 0;
    if (base <= 2259.2) {
      discount = 0;
    } else if (base <= 2826.65) {
      discount = base * 0.075 - 169.44;
    } else if (base <= 3751.05) {
      discount = base * 0.15 - 381.44;
    } else if (base <= 4664.68) {
      discount = base * 0.225 - 662.77;
    } else {
      discount = base * 0.275 - 896;
    }
    return discount > 0 ? discount : 0;
  };
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };
  return /* @__PURE__ */ jsx("div", { className: "w-full max-w-5xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8", children: [
    /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-white mb-6 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-primary" }),
        "Dados das Férias"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "salary", className: "block text-sm text-gray-400 mb-2", children: "Salário Bruto" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "salary",
                "aria-label": "Salário Bruto",
                type: "number",
                value: salary,
                onChange: (e) => setSalary(Number(e.target.value)),
                className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "days", className: "block text-sm text-gray-400 mb-2", children: "Dias de Férias" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                id: "days",
                "aria-label": "Dias de Férias",
                value: days,
                onChange: (e) => setDays(Number(e.target.value)),
                className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none",
                children: [
                  /* @__PURE__ */ jsx("option", { value: 10, children: "10 dias" }),
                  /* @__PURE__ */ jsx("option", { value: 15, children: "15 dias" }),
                  /* @__PURE__ */ jsx("option", { value: 20, children: "20 dias" }),
                  /* @__PURE__ */ jsx("option", { value: 30, children: "30 dias" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "dependents", className: "block text-sm text-gray-400 mb-2", children: "Dependentes" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "dependents",
                "aria-label": "Dependentes",
                type: "number",
                value: dependents,
                onChange: (e) => setDependents(Number(e.target.value)),
                className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 pt-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              id: "sellDays",
              checked: sellDays,
              onChange: (e) => setSellDays(e.target.checked),
              className: "w-5 h-5 rounded border-gray-600 text-primary focus:ring-primary bg-black/30"
            }
          ),
          /* @__PURE__ */ jsx("label", { htmlFor: "sellDays", className: "text-sm text-gray-300 select-none cursor-pointer", children: "Vender 10 dias (Abono Pecuniário)" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-lg font-medium text-gray-300 mb-6 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5 text-primary" }),
          "Detalhamento"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-2 border-b border-white/5", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-gray-400", children: [
              "Valor Férias (",
              days,
              " dias)"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-white", children: formatCurrency(result.grossVacation) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-2 border-b border-white/5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "1/3 Constitucional" }),
            /* @__PURE__ */ jsx("span", { className: "text-white", children: formatCurrency(result.oneThirdBonus) })
          ] }),
          sellDays && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-2 border-b border-white/5", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Abono Pecuniário (10 dias)" }),
              /* @__PURE__ */ jsxs("span", { className: "text-green-400", children: [
                "+ ",
                formatCurrency(result.allowance)
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-2 border-b border-white/5", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "1/3 Abono" }),
              /* @__PURE__ */ jsxs("span", { className: "text-green-400", children: [
                "+ ",
                formatCurrency(result.allowanceOneThird)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-2 border-b border-white/5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "INSS" }),
            /* @__PURE__ */ jsxs("span", { className: "text-red-400", children: [
              "- ",
              formatCurrency(result.inss)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-2 border-b border-white/5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "IRRF" }),
            /* @__PURE__ */ jsxs("span", { className: "text-red-400", children: [
              "- ",
              formatCurrency(result.irrf)
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pt-4 mt-4 border-t border-white/10", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-end", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-300 font-medium", children: "Valor Líquido a Receber" }),
            /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: formatCurrency(result.totalNet) })
          ] }) })
        ] })
      ] })
    ] }) })
  ] }) });
};
const AppPromoBanner = lazy(() => Promise.resolve().then(() => AppPromoBanner$2).then((module) => ({ default: module.AppPromoBanner })));
const VacationPage = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Férias FinZap",
    "description": "Calcule o valor exato das suas férias com 1/3 constitucional e descontos.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-24 md:pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Calculadora de Férias 2025 - Cálculo Exato e Gratuito",
        description: "Calcule o valor exato das suas férias, incluindo 1/3 constitucional, abono pecuniário e descontos de INSS/IRRF.",
        canonical: "/calculadoras/ferias"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Calculadora de Férias", href: "/calculadoras/ferias" }
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsx(Plane, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Trabalhista" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "Férias" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Calcule o valor exato das suas férias, incluindo 1/3 constitucional, abono pecuniário e descontos de INSS/IRRF." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          children: /* @__PURE__ */ jsx(VacationCalculator, {})
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-24 max-w-4xl mx-auto prose prose-invert prose-lg", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Calculadora de Férias: Saiba quanto você vai receber" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-8", children: "Planejando seu descanso? Utilize a Calculadora de Férias do FinZap para saber exatamente o valor líquido que cairá na sua conta, já considerando todos os descontos legais e adicionais." }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: "O que compõe o cálculo de férias?" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "O cálculo de férias envolve diversas variáveis que podem confundir o trabalhador. Nossa ferramenta simplifica tudo isso, considerando:" }),
        /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 space-y-2 text-gray-400 mb-8", children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Salário Bruto:" }),
            " A base de cálculo, incluindo médias de horas extras e comissões."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { className: "text-white", children: "1/3 Constitucional:" }),
            " Adicional de 33,33% sobre o valor das férias garantido por lei."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Abono Pecuniário:" }),
            ' A famosa "venda de férias". É possível vender até 10 dias.'
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Descontos (INSS e IRRF):" }),
            " Impostos que incidem sobre o valor total e reduzem o valor líquido."
          ] })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: "Como usar a calculadora?" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-8", children: "Basta inserir seu salário bruto, a quantidade de dias que pretende tirar de férias, se possui dependentes (para cálculo do IRRF) e se deseja vender dias (abono). O FinZap faz todo o cálculo complexo das alíquotas progressivas de INSS e Imposto de Renda automaticamente." }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: "Planeje suas finanças com o FinZap" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-8", children: "Saber o valor exato das suas férias ajuda a planejar melhor sua viagem ou seus gastos no período de descanso. Use nossa ferramenta gratuita quantas vezes precisar e tenha total controle sobre seu dinheiro." })
      ] }),
      /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "h-96 w-full flex items-center justify-center text-gray-500", children: "Carregando oferta..." }), children: /* @__PURE__ */ jsx(AppPromoBanner, {}) })
    ] })
  ] });
};
const EnergyCalculator = () => {
  const [power, setPower] = useState(0);
  const [hoursPerDay, setHoursPerDay] = useState(0);
  const [daysPerMonth, setDaysPerMonth] = useState(0);
  const [kwhPrice, setKwhPrice] = useState(0);
  const [result, setResult] = useState(null);
  useEffect(() => {
    if (power > 0 && hoursPerDay > 0 && daysPerMonth > 0 && kwhPrice > 0) {
      const consumptionKwh = power * hoursPerDay * daysPerMonth / 1e3;
      const totalCost = consumptionKwh * kwhPrice;
      setResult(totalCost);
    } else {
      setResult(null);
    }
  }, [power, hoursPerDay, daysPerMonth, kwhPrice]);
  return /* @__PURE__ */ jsxs("div", { className: "w-full max-w-4xl mx-auto grid md:grid-cols-2 gap-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-white mb-6 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Zap, { className: "w-6 h-6 text-primary" }),
        "Dados do Aparelho"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Potência do Aparelho (Watts)" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Zap, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: power || "",
                onChange: (e) => setPower(Number(e.target.value)),
                className: "w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all",
                placeholder: "Ex: 1100"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Tempo de uso diário (Horas)" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Clock, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: hoursPerDay || "",
                onChange: (e) => setHoursPerDay(Number(e.target.value)),
                className: "w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all",
                placeholder: "Ex: 1"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Dias de uso por mês" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: daysPerMonth || "",
                onChange: (e) => setDaysPerMonth(Number(e.target.value)),
                className: "w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all",
                placeholder: "Ex: 30"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Preço do kWh (R$)" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                step: "0.01",
                value: kwhPrice || "",
                onChange: (e) => setKwhPrice(Number(e.target.value)),
                className: "w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all",
                placeholder: "Ex: 0.85"
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl text-gray-400 mb-2", children: "Custo Mensal Estimado" }),
        result !== null ? /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { scale: 0.9, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            children: [
              /* @__PURE__ */ jsx("div", { className: "text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight", children: new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(result) }),
              /* @__PURE__ */ jsxs("p", { className: "text-emerald-400 font-medium", children: [
                "Consumo: ",
                (power * hoursPerDay * daysPerMonth / 1e3).toFixed(2),
                " kWh/mês"
              ] })
            ]
          },
          result
        ) : /* @__PURE__ */ jsxs("div", { className: "py-12", children: [
          /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10", children: /* @__PURE__ */ jsx(Zap, { className: "w-10 h-10 text-gray-600" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Preencha os dados para calcular o consumo" })
        ] })
      ] })
    ] })
  ] });
};
const ENERGY_FAQS = [
  {
    question: "Quanto vale 1 kWh em reais?",
    answer: "O preço do kWh pode variar por diversos fatores, tais como: prestadora de energia, região do país atendida, bandeira de consumo (verde, amarela ou vermelha), tipo de estabelecimento (residencial, industrial etc.) e horário do consumo. Porém, atualmente, o preço médio do kWh no Brasil em geral fica entre R$ 0,60 a R$ 1,00."
  },
  {
    question: "O que são bandeiras tarifárias de energia?",
    answer: "As bandeiras tarifárias são faixas de preços que indicam o valor do custo de produção da energia elétrica pelo consumidor. Criadas em 2015 pela Aneel, elas permitem que o consumidor saiba com antecedência qual será o preço cobrado em sua conta e ajuste o seu consumo para diminuir o valor da conta de luz. Atualmente, há bandeiras nas cores verde, amarela ou vermelha (nos patamares 1 e 2), que classificam as tarifas das mais baratas (verde) às mais caras (vermelhas)."
  },
  {
    question: "O que é bandeira vermelha?",
    answer: "Bandeira vermelha é o tipo de faixa tarifária aplicada pelas companhias de distribuição de energia elétrica em períodos em que os custos de produção ficam mais caros. Ela acontece quando a produção de energia se torna mais cara, especialmente por fatores climáticos, como secas e diminuição no volume de água das usinas hidrelétricas, e o valor precisa ser repassado para o consumidor."
  },
  {
    question: "Como se calcula o valor da energia elétrica?",
    answer: "Para calcular o valor de energia elétrica de forma prática e precisa, basta utilizar a Calculadora de Consumo de Energia FinZap."
  }
];
const EnergyPage = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Consumo de Energia FinZap",
    "description": "Simule o consumo de energia dos seus eletrodomésticos e economize na conta de luz.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Calculadora de Consumo de Energia - Economize Luz",
        description: "Descubra quanto seus aparelhos domésticos consomem e economize na conta de luz com a calculadora do FinZap.",
        canonical: "/calculadoras/energia"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": ENERGY_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Calculadora de Energia", href: "/calculadoras/energia" }
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Utilidades" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "Consumo de Energia" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Descubra quanto seus aparelhos domésticos consomem e economize na conta de luz com a calculadora do FinZap." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          children: /* @__PURE__ */ jsx(EnergyCalculator, {})
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-24 max-w-4xl mx-auto prose prose-invert prose-lg", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Calculadora de Consumo de Energia: economize na conta de luz" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-8", children: "Quanto de energia seus aparelhos domésticos consomem? Descubra com a prática e fácil Calculadora de Consumo de Energia FinZap." }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: "Campos da Calculadora" }),
        /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 space-y-2 text-gray-400 mb-8", children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Potência do Aparelho:" }),
            " Potência do Aparelho em Watts (W)."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Tempo de uso diário (H):" }),
            " Tempo de uso por dia em horas."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Dias de uso:" }),
            " Número de dias de uso que deseja calcular."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Preço KWH:" }),
            " Preço do consumo Quilowatt-hora (R$)."
          ] })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: "Como utilizar a Calculadora de Consumo de Energia FinZap" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-4", children: "Para utilizar a Calculadora de Consumo de Energia FinZap, siga os passos abaixo:" }),
        /* @__PURE__ */ jsxs("ol", { className: "list-decimal pl-6 space-y-2 text-gray-400 mb-8", children: [
          /* @__PURE__ */ jsx("li", { children: "Informe a potência do seu aparelho;" }),
          /* @__PURE__ */ jsx("li", { children: "Preencha com o tempo de uso diário em horas;" }),
          /* @__PURE__ */ jsx("li", { children: "Complemente com a quantidade de dias de uso;" }),
          /* @__PURE__ */ jsx("li", { children: "Informe o valor do quilowatt-hora (KWH) em sua região;" }),
          /* @__PURE__ */ jsx("li", { children: "Por fim, o cálculo é feito automaticamente." })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: "Como calcular seu consumo de energia" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Veja como utilizar a calculadora de energia FinZap para descobrir o consumo dos seus aparelhos nos tópicos abaixo." }),
        /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-white mb-3", children: "Descubra qual é a potência do seu aparelho" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: 'Essa informação geralmente pode ser encontrada na caixa ou na etiqueta de consumo afixada no próprio produto. Caso não encontre a caixa ou a etiqueta, também é possível encontrar a potência do seu aparelho em uma rápida pesquisa em sites buscadores como o Google. Para isso, basta informar o modelo do aparelho com a palavra "potência" na barra de busca.' }),
        /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-white mb-3", children: "Preencha o valor do kWh em sua região" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Em seguida, pesquise em sua conta de energia ou no site da sua operadora o valor do quilowatt-hora (KWH) em sua região. Quilowatt-hora é uma unidade de faturamento comum utilizada pelas concessionárias de energia elétrica para cobrar pelo fornecimento da energia." }),
        /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-white mb-3", children: "Informe os seus dados de consumo de energia do aparelho" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-8", children: "Agora, basta preencher a Calculadora de Energia FinZap com os dados que você obteve e o seu tempo de consumo. O resultado aparecerá instantaneamente para você saber exatamente quanto vai gastar em um mês." }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/5 border border-white/10 rounded-2xl p-8 mb-12", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-white mb-4", children: "Veja o exemplo:" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-4", children: "Digamos que você esteja pensando em comprar um aspirador de pó vertical, mas antes deseja saber o quanto o aparelho vai gastar por mês." }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-4", children: "Sabendo que a potência do aparelho é de 1100W e que o preço do kWh, conforme informações da prestadora local, é de R$ 1,80, é hora de preencher os dados na calculadora. Nesse exemplo, consideramos que o tempo de uso do aparelho seria de uma hora por dia e uma vez por semana, ou seja, quatro dias de uso por mês." }),
          /* @__PURE__ */ jsx("p", { className: "text-emerald-400 font-bold", children: "Resultado: Nesse caso, o custo mensal de energia para utilizar o aparelho será de R$ 7,92." })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: "Qual é a importância de saber calcular o consumo de energia dos eletrodomésticos?" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Saber quanto um aparelho gasta de energia todo mês pode ser a chave para fazer melhores escolhas e desenvolver bons hábitos. Pode ser a sua geladeira, computador de trabalho ou mesmo o seu aspirador de pó. Cada aparelho é responsável por uma parcela específica do seu cálculo de consumo de energia." }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-8", children: "Pensando nisso, o FinZap desenvolveu uma Calculadora de Consumo de Energia para você descobrir de forma automática o quanto aquele seu eletrodoméstico vai gastar, além do preço médio que irá pagar por mês." }),
        /* @__PURE__ */ jsx(FAQ, { items: ENERGY_FAQS, title: "Perguntas frequentes sobre consumo de energia", className: "py-12", showSocialProof: false })
      ] }),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
};
const FUEL_FAQS = [
  {
    question: "Como saber qual o melhor entre álcool e gasolina?",
    answer: "A regra geral é dividir o preço do litro do álcool pelo da gasolina. Se o resultado for menor ou igual a 0,7 (70%), o álcool compensa mais. Se for maior que 0,7, a gasolina é a melhor opção para o seu bolso e rendimento do veículo."
  },
  {
    question: "Quando vale mais a pena abastecer com álcool?",
    answer: "Vale a pena abastecer com álcool (etanol) quando o seu preço for até 70% do valor da gasolina. Além da economia financeira, o etanol costuma dar mais potência ao motor, embora seja consumido mais rapidamente."
  },
  {
    question: "Quando vale mais a pena abastecer com gasolina?",
    answer: "A gasolina compensa quando o preço do etanol ultrapassa 70% do valor da gasolina. A gasolina oferece maior autonomia, permitindo rodar mais quilômetros com um tanque cheio, o que é ideal para viagens longas."
  },
  {
    question: "Qual combustível vale mais a pena na hora de abastecer?",
    answer: "Depende da relação de preços no momento. Utilize nossa calculadora gratuita sempre que for ao posto: basta inserir os valores atuais da bomba para ter a resposta exata de qual combustível trará mais economia para você."
  }
];
const FuelPage = () => {
  const [alcoholPrice, setAlcoholPrice] = useState(0);
  const [gasolinePrice, setGasolinePrice] = useState(0);
  const [result, setResult] = useState({ ratio: 0, bestOption: null });
  useEffect(() => {
    if (alcoholPrice > 0 && gasolinePrice > 0) {
      const ratio = alcoholPrice / gasolinePrice;
      setResult({
        ratio,
        bestOption: ratio <= 0.7 ? "alcohol" : "gasoline"
      });
    } else {
      setResult({ ratio: 0, bestOption: null });
    }
  }, [alcoholPrice, gasolinePrice]);
  const formatPercent = (val) => {
    return new Intl.NumberFormat("pt-BR", { style: "percent", maximumFractionDigits: 1 }).format(val);
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora Álcool ou Gasolina FinZap",
    "description": "Descubra qual combustível vale mais a pena para o seu carro.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Calculadora Álcool ou Gasolina - Qual Vale a Pena?",
        description: "Descubra qual combustível compensa mais para o seu bolso agora mesmo. Simples, rápido e direto.",
        canonical: "/calculadoras/combustivel"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FUEL_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Calculadora de Combustível", href: "/calculadoras/combustivel" }
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsx(Fuel, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Economia no Tanque" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "Álcool ou Gasolina" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Descubra qual combustível compensa mais para o seu bolso agora mesmo. Simples, rápido e direto." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          className: "grid lg:grid-cols-12 gap-8 mb-24",
          children: [
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-white mb-6 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-primary" }),
                "Preços na Bomba"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "alcoholPrice", className: "block text-sm text-gray-400 mb-2", children: "Preço do Álcool (Etanol)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "alcoholPrice",
                        type: "number",
                        step: "0.01",
                        placeholder: "0,00",
                        value: alcoholPrice || "",
                        onChange: (e) => setAlcoholPrice(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "gasolinePrice", className: "block text-sm text-gray-400 mb-2", children: "Preço da Gasolina" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "gasolinePrice",
                        type: "number",
                        step: "0.01",
                        placeholder: "0,00",
                        value: gasolinePrice || "",
                        onChange: (e) => setGasolinePrice(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col justify-center", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" }),
              /* @__PURE__ */ jsx("div", { className: "relative z-10 text-center", children: result.bestOption ? /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { type: "spring", stiffness: 200, damping: 20 },
                  children: [
                    /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest", children: "Melhor Opção" }),
                    /* @__PURE__ */ jsx("div", { className: "text-5xl md:text-7xl font-bold text-white mb-4", children: result.bestOption === "alcohol" ? /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Álcool" }) : /* @__PURE__ */ jsx("span", { className: "text-emerald-400", children: "Gasolina" }) }),
                    /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8", children: [
                      /* @__PURE__ */ jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
                      /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-300", children: [
                        "O álcool custa ",
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: formatPercent(result.ratio) }),
                        " do valor da gasolina"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "text-gray-400 max-w-md mx-auto leading-relaxed", children: result.bestOption === "alcohol" ? "O preço do etanol está abaixo de 70% do valor da gasolina. Vale a pena abastecer com álcool para economizar!" : "O preço do etanol está acima de 70% do valor da gasolina. A gasolina renderá mais e é a escolha mais econômica." })
                  ]
                }
              ) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-12 opacity-50", children: [
                /* @__PURE__ */ jsx(Fuel, { className: "w-16 h-16 text-gray-600 mb-4" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg", children: "Preencha os valores para calcular" })
              ] }) })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-24 max-w-4xl mx-auto prose prose-invert prose-lg", children: [
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Álcool ou gasolina: quando um compensa mais que o outro?" }),
          /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-none text-gray-400 leading-relaxed", children: [
            /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
              "Para entender quando um tipo de combustível compensa mais financeiramente do que o outro, basta checar a proporção entre o preço de cada um. A regra de ouro é a ",
              /* @__PURE__ */ jsx("strong", { children: "proporção de 70%" }),
              "."
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
              "Abastecer com ",
              /* @__PURE__ */ jsx("strong", { children: "álcool (etanol)" }),
              " é recomendado quando o preço for até 70% do valor da gasolina. Caso ultrapasse os 70%, compensa mais abastecer com ",
              /* @__PURE__ */ jsx("strong", { children: "gasolina" }),
              "."
            ] }),
            /* @__PURE__ */ jsx("p", { children: "Isso acontece porque o etanol tem um poder calorífico menor, ou seja, rende cerca de 30% a menos que a gasolina. Portanto, para que seja vantajoso financeiramente, ele precisa custar no máximo 70% do preço da gasolina." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "grid md:grid-cols-2 gap-8 mb-16", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-8 rounded-2xl border border-white/5", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-white mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold", children: "1" }),
              "Exemplo: Álcool Vantajoso"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-4", children: [
              "Posto com Álcool a ",
              /* @__PURE__ */ jsx("strong", { children: "R$ 4,00" }),
              " e Gasolina a ",
              /* @__PURE__ */ jsx("strong", { children: "R$ 6,00" }),
              "."
            ] }),
            /* @__PURE__ */ jsx("div", { className: "bg-black/30 p-4 rounded-xl font-mono text-sm text-gray-300", children: "4,00 ÷ 6,00 = 0,66 (66%)" }),
            /* @__PURE__ */ jsx("p", { className: "text-green-400 mt-4 text-sm font-medium", children: "Resultado menor que 0,7. Compensa abastecer com Álcool." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-8 rounded-2xl border border-white/5", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-white mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold", children: "2" }),
              "Exemplo: Gasolina Vantajosa"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-400 mb-4", children: [
              "Posto com Álcool a ",
              /* @__PURE__ */ jsx("strong", { children: "R$ 4,29" }),
              " e Gasolina a ",
              /* @__PURE__ */ jsx("strong", { children: "R$ 5,50" }),
              "."
            ] }),
            /* @__PURE__ */ jsx("div", { className: "bg-black/30 p-4 rounded-xl font-mono text-sm text-gray-300", children: "4,29 ÷ 5,50 = 0,78 (78%)" }),
            /* @__PURE__ */ jsx("p", { className: "text-emerald-400 mt-4 text-sm font-medium", children: "Resultado maior que 0,7. Compensa abastecer com Gasolina." })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          FAQ,
          {
            items: FUEL_FAQS,
            title: "Dúvidas Frequentes sobre Combustível",
            className: "py-12",
            showSocialProof: false
          }
        )
      ] }),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
};
const TERMINATION_FAQS = [
  {
    question: "A calculadora é válida para qualquer tipo de demissão?",
    answer: "Sim, nossa calculadora cobre os principais tipos de rescisão: demissão sem justa causa, pedido de demissão, demissão por justa causa e acordo entre as partes. Basta selecionar o motivo correto para ver os direitos aplicáveis."
  },
  {
    question: "A simulação considera férias vencidas e proporcionais?",
    answer: "Sim. O cálculo leva em conta tanto as férias vencidas (se houver) quanto as férias proporcionais aos meses trabalhados no ano corrente, incluindo o terço constitucional."
  },
  {
    question: "É necessário informar o saldo de FGTS?",
    answer: "Para um cálculo preciso da multa de 40% (ou 20% em caso de acordo), é importante informar o saldo atual do FGTS. Se você não souber o valor exato, pode fazer uma estimativa ou consultar o extrato no aplicativo do FGTS."
  },
  {
    question: "A calculadora funciona para contratos de experiência?",
    answer: "Esta calculadora é otimizada para contratos por tempo indeterminado. Para contratos de experiência ou temporários, as regras podem variar ligeiramente, especialmente em relação à multa por quebra de contrato."
  },
  {
    question: "Posso simular rescisão com aviso prévio trabalhado ou indenizado?",
    answer: "Sim, você pode selecionar se o aviso prévio será trabalhado, indenizado ou não cumprido. O valor será somado ou descontado do total conforme a regra da CLT para o tipo de demissão escolhido."
  }
];
const TerminationPage = () => {
  const [salary, setSalary] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("sem-justa-causa");
  const [notice, setNotice] = useState("trabalhado");
  const [hasVacationDue, setHasVacationDue] = useState(false);
  const [fgtsBalance, setFgtsBalance] = useState(0);
  const [result, setResult] = useState(null);
  const calculateTermination = () => {
    if (!salary || !startDate || !endDate) return;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
    const monthsWorked = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const daysInMonth = new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate();
    const daysWorkedInMonth = end.getDate();
    const salaryBalance = salary / daysInMonth * daysWorkedInMonth;
    let noticeValue = 0;
    let noticeDays = 30;
    if (reason === "sem-justa-causa") {
      const yearsWorked = Math.floor(diffDays / 365);
      noticeDays += Math.min(yearsWorked * 3, 60);
      if (notice === "indenizado") {
        noticeValue = salary / 30 * noticeDays;
      }
    } else if (reason === "pedido-demissao") {
      if (notice === "nao-cumprido") {
        noticeValue = -salary;
      }
    } else if (reason === "acordo") {
      if (notice === "indenizado") {
        noticeValue = salary / 30 * noticeDays / 2;
      }
    }
    let months13th = end.getMonth() + (end.getDate() >= 15 ? 1 : 0);
    if (notice === "indenizado" && reason === "sem-justa-causa") {
      const projectedEnd = new Date(end);
      projectedEnd.setDate(end.getDate() + noticeDays);
      months13th = projectedEnd.getMonth() + (projectedEnd.getDate() >= 15 ? 1 : 0);
      const startYear = start.getFullYear();
      const endYear = end.getFullYear();
      if (startYear === endYear) {
        months13th = months13th - start.getMonth();
      }
    }
    months13th = Math.min(months13th, 12);
    let thirteenth = 0;
    if (reason !== "justa-causa") {
      thirteenth = salary / 12 * months13th;
    }
    let vacationProportional = 0;
    let vacationDue = 0;
    let vacationThird = 0;
    if (reason !== "justa-causa") {
      let vacationMonths = monthsWorked % 12;
      if (notice === "indenizado" && reason === "sem-justa-causa") {
        vacationMonths += 1;
      }
      vacationProportional = salary / 12 * vacationMonths;
      if (hasVacationDue) {
        vacationDue = salary;
      }
      vacationThird = (vacationProportional + vacationDue) / 3;
    } else {
      if (hasVacationDue) {
        vacationDue = salary;
        vacationThird = vacationDue / 3;
      }
    }
    let fgtsFine = 0;
    if (reason === "sem-justa-causa") {
      fgtsFine = fgtsBalance * 0.4;
    } else if (reason === "acordo") {
      fgtsFine = fgtsBalance * 0.2;
    }
    const total = salaryBalance + noticeValue + thirteenth + vacationProportional + vacationDue + vacationThird + fgtsFine;
    setResult({
      salaryBalance,
      noticeValue,
      thirteenth,
      vacationProportional,
      vacationDue,
      vacationThird,
      fgtsFine,
      total
    });
  };
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Rescisão Trabalhista FinZap",
    "description": "Simule o valor da sua rescisão trabalhista CLT. Calcule saldo de salário, férias, 13º, aviso prévio e multa do FGTS.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Calculadora de Rescisão Trabalhista CLT - Simulação Completa",
        description: "Simule o valor da sua rescisão trabalhista CLT. Calcule saldo de salário, férias, 13º, aviso prévio e multa do FGTS.",
        canonical: "/calculadoras/rescisao"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": TERMINATION_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Rescisão Trabalhista", href: "/calculadoras/rescisao" }
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsx(Briefcase, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Direitos Trabalhistas" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "Rescisão CLT" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Simule sua rescisão trabalhista e entenda todos os seus direitos com orientações detalhadas." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          className: "grid lg:grid-cols-12 gap-8 mb-24",
          children: [
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-white mb-6 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-primary" }),
                "Dados do Contrato"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "salary", className: "block text-sm text-gray-400 mb-2", children: "Salário Bruto (R$)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "salary",
                        type: "number",
                        placeholder: "Ex: 3000",
                        value: salary || "",
                        onChange: (e) => setSalary(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "startDate", className: "block text-sm text-gray-400 mb-2", children: "Data de Admissão" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "startDate",
                        type: "date",
                        value: startDate,
                        onChange: (e) => setStartDate(e.target.value),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "endDate", className: "block text-sm text-gray-400 mb-2", children: "Data de Demissão" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "endDate",
                        type: "date",
                        value: endDate,
                        onChange: (e) => setEndDate(e.target.value),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "reason", className: "block text-sm text-gray-400 mb-2", children: "Motivo da Saída" }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      id: "reason",
                      value: reason,
                      onChange: (e) => setReason(e.target.value),
                      className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none",
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "sem-justa-causa", children: "Demissão sem Justa Causa" }),
                        /* @__PURE__ */ jsx("option", { value: "pedido-demissao", children: "Pedido de Demissão" }),
                        /* @__PURE__ */ jsx("option", { value: "justa-causa", children: "Demissão por Justa Causa" }),
                        /* @__PURE__ */ jsx("option", { value: "acordo", children: "Acordo entre as Partes" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "notice", className: "block text-sm text-gray-400 mb-2", children: "Aviso Prévio" }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      id: "notice",
                      value: notice,
                      onChange: (e) => setNotice(e.target.value),
                      className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none",
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "trabalhado", children: "Trabalhado" }),
                        /* @__PURE__ */ jsx("option", { value: "indenizado", children: "Indenizado" }),
                        /* @__PURE__ */ jsx("option", { value: "nao-cumprido", children: "Não Cumprido (Desconto)" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Tem Férias Vencidas?" }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setHasVacationDue(!hasVacationDue),
                      "aria-label": "Alternar férias vencidas",
                      className: `w-12 h-6 rounded-full transition-colors relative ${hasVacationDue ? "bg-primary" : "bg-white/10"}`,
                      children: /* @__PURE__ */ jsx("div", { className: `absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${hasVacationDue ? "left-7" : "left-1"}` })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "fgtsBalance", className: "block text-sm text-gray-400 mb-2", children: "Saldo FGTS (R$)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "fgtsBalance",
                        type: "number",
                        placeholder: "Ex: 5000",
                        value: fgtsBalance || "",
                        onChange: (e) => setFgtsBalance(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-4 pt-4", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: calculateTermination,
                      className: "flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]",
                      children: "Calcular"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => {
                        setSalary(0);
                        setStartDate("");
                        setEndDate("");
                        setFgtsBalance(0);
                        setResult(null);
                      },
                      className: "px-6 bg-white/5 hover:bg-white/10 text-white font-medium py-4 rounded-xl transition-all",
                      children: "Limpar"
                    }
                  )
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" }),
              /* @__PURE__ */ jsx("div", { className: "relative z-10", children: result ? /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { type: "spring", stiffness: 200, damping: 20 },
                  className: "space-y-6",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
                      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest", children: "Estimativa de Rescisão" }),
                      /* @__PURE__ */ jsx("div", { className: "text-5xl font-bold text-white mb-2", children: formatCurrency(result.total) }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "*Valores estimados, sujeitos a descontos de INSS e IRRF." })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Saldo de Salário" }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: formatCurrency(result.salaryBalance) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Aviso Prévio" }),
                        /* @__PURE__ */ jsx("span", { className: result.noticeValue < 0 ? "text-red-400 font-bold" : "text-white font-bold", children: formatCurrency(result.noticeValue) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "13º Salário Proporcional" }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: formatCurrency(result.thirteenth) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Férias (Vencidas + Prop. + 1/3)" }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: formatCurrency(result.vacationProportional + result.vacationDue + result.vacationThird) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Multa FGTS" }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: formatCurrency(result.fgtsFine) })
                      ] })
                    ] })
                  ]
                }
              ) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full py-12 opacity-50", children: [
                /* @__PURE__ */ jsx(Briefcase, { className: "w-16 h-16 text-gray-600 mb-4" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg text-center", children: "Preencha os dados do contrato para simular a rescisão" })
              ] }) })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-24 max-w-4xl mx-auto prose prose-invert prose-lg", children: [
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "O Que é a Rescisão Trabalhista?" }),
          /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-none text-gray-400 leading-relaxed", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-4", children: "A rescisão trabalhista ocorre quando há o encerramento do vínculo empregatício entre o empregado e o empregador. Esse processo pode acontecer por diferentes motivos, como demissão sem justa causa, pedido de demissão, acordo entre as partes ou término de contrato." }),
            /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Durante a rescisão, é necessário calcular corretamente os valores devidos ao trabalhador, que incluem direitos como saldo de salário, férias proporcionais, 13º salário proporcional, entre outros benefícios garantidos pela CLT." }),
            /* @__PURE__ */ jsx("div", { className: "bg-yellow-500/10 border-l-4 border-yellow-500 p-4 my-6", children: /* @__PURE__ */ jsxs("p", { className: "text-yellow-200 text-sm m-0", children: [
              /* @__PURE__ */ jsx("strong", { children: "Nota legal:" }),
              " A calculadora de rescisão disponibilizada nesta página tem fins meramente informativos e não substitui o cálculo oficial ou suporte jurídico. Sempre consulte um especialista para confirmar os valores em situações específicas."
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Tipos de Rescisão e Como Afetam o Cálculo" }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "Demissão sem Justa Causa" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-4", children: "O tipo mais vantajoso para o trabalhador." }),
              /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside text-gray-400 text-sm space-y-2", children: [
                /* @__PURE__ */ jsx("li", { children: "Saldo de salário" }),
                /* @__PURE__ */ jsx("li", { children: "Férias vencidas e proporcionais + 1/3" }),
                /* @__PURE__ */ jsx("li", { children: "13º salário proporcional" }),
                /* @__PURE__ */ jsx("li", { children: "Multa de 40% do FGTS" }),
                /* @__PURE__ */ jsx("li", { children: "Saque do FGTS e Seguro-Desemprego" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-blue-400", children: "Pedido de Demissão" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-4", children: "Iniciativa do trabalhador." }),
              /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside text-gray-400 text-sm space-y-2", children: [
                /* @__PURE__ */ jsx("li", { children: "Saldo de salário" }),
                /* @__PURE__ */ jsx("li", { children: "Férias vencidas e proporcionais + 1/3" }),
                /* @__PURE__ */ jsx("li", { children: "13º salário proporcional" }),
                /* @__PURE__ */ jsx("li", { children: "Sem multa do FGTS e sem saque" }),
                /* @__PURE__ */ jsx("li", { children: "Sem Seguro-Desemprego" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-red-400", children: "Demissão por Justa Causa" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-4", children: "Falta grave cometida pelo empregado." }),
              /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside text-gray-400 text-sm space-y-2", children: [
                /* @__PURE__ */ jsx("li", { children: "Saldo de salário" }),
                /* @__PURE__ */ jsx("li", { children: "Férias vencidas + 1/3 (apenas)" }),
                /* @__PURE__ */ jsx("li", { children: "Sem 13º e sem férias proporcionais" }),
                /* @__PURE__ */ jsx("li", { children: "Sem FGTS e sem Seguro" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-purple-400", children: "Acordo (Reforma Trabalhista)" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-4", children: "Consensual entre as partes." }),
              /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside text-gray-400 text-sm space-y-2", children: [
                /* @__PURE__ */ jsx("li", { children: "Verbas trabalhistas integrais" }),
                /* @__PURE__ */ jsx("li", { children: "Metade do aviso prévio (se indenizado)" }),
                /* @__PURE__ */ jsx("li", { children: "Multa de 20% do FGTS" }),
                /* @__PURE__ */ jsx("li", { children: "Saque de 80% do FGTS" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Itens do Cálculo" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-gray-400", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "Aviso Prévio" }),
              /* @__PURE__ */ jsx("p", { children: "Pode ser trabalhado (recebe salário normal) ou indenizado (recebe sem trabalhar). O período varia de 30 a 90 dias, dependendo do tempo de casa (3 dias a mais por ano)." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "Férias e 1/3" }),
              /* @__PURE__ */ jsx("p", { children: "Inclui férias vencidas (não tiradas) e proporcionais (meses trabalhados no ano atual), sempre com o acréscimo de 1/3 constitucional." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "13º Salário Proporcional" }),
              /* @__PURE__ */ jsx("p", { children: "Calculado com base nos meses trabalhados no ano (fração de 1/12 por mês com mais de 14 dias trabalhados)." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "Multa do FGTS" }),
              /* @__PURE__ */ jsx("p", { children: "40% sobre o saldo total depositado pela empresa durante o contrato (em demissão sem justa causa)." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          FAQ,
          {
            items: TERMINATION_FAQS,
            title: "Dúvidas Frequentes sobre Rescisão",
            className: "py-12",
            showSocialProof: false
          }
        )
      ] }),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
};
const INSS_FAQS = [
  {
    question: "Como funciona o desconto de INSS em 2025?",
    answer: "O cálculo do INSS em 2025 segue uma tabela progressiva. Isso significa que a alíquota (7,5%, 9%, 12% ou 14%) incide apenas sobre a parcela do salário que se enquadra em cada faixa, e não sobre o valor total. O resultado final é a soma dos descontos de cada faixa."
  },
  {
    question: "Como saber se o desconto do meu holerite está correto?",
    answer: "Verifique o salário bruto no seu holerite e insira o valor na nossa calculadora. O resultado deve ser muito próximo ao descontado. Pequenas diferenças podem ocorrer devido a arredondamentos ou outras verbas salariais."
  },
  {
    question: "A calculadora também mostra o desconto de IRRF?",
    answer: "Esta calculadora foca no INSS. Para o cálculo completo incluindo Imposto de Renda, recomendamos utilizar nossa calculadora de Salário Líquido (em breve), que considera ambos os descontos."
  },
  {
    question: "Contribuinte individual pode usar a calculadora?",
    answer: "Sim! Basta selecionar a opção 'Autônomo / Individual' ou 'Pro-labore'. Para autônomos, a alíquota padrão é de 20% sobre o salário de contribuição (limitado ao teto), e para Pro-labore (plano simplificado) é de 11%."
  },
  {
    question: "A ferramenta calcula contribuição de pro labore?",
    answer: "Sim, selecione a opção 'Pro-labore / Simplificado'. A alíquota aplicada será de 11% sobre o valor informado, respeitando o teto do INSS."
  },
  {
    question: "Tem como calcular o INSS do 13º salário?",
    answer: "Sim, o cálculo para o 13º salário segue a mesma tabela progressiva do salário mensal. Basta inserir o valor bruto do seu 13º para saber o desconto."
  },
  {
    question: "A calculadora serve para MEI?",
    answer: "O MEI paga o INSS através da guia DAS, que tem um valor fixo (5% do salário mínimo). Esta calculadora é voltada para quem contribui com base no salário real ou teto, como CLT e Autônomos."
  },
  {
    question: "O valor do INSS muda se tenho dois empregos?",
    answer: "Sim. As remunerações devem ser somadas para o cálculo do teto. Se a soma ultrapassar o teto do INSS (R$ 7.786,02 em 2025), você só contribui até esse limite. É importante comunicar as empresas para evitar desconto indevido."
  }
];
const INSSPage = () => {
  const [salary, setSalary] = useState(0);
  const [contributorType, setContributorType] = useState("clt");
  const [result, setResult] = useState(null);
  const calculateINSS = () => {
    if (!salary) return;
    let discount = 0;
    let effectiveRate = 0;
    const ceiling = 7786.02;
    const salaryBase = Math.min(salary, ceiling);
    if (contributorType === "clt") {
      if (salaryBase <= 1412) {
        discount = salaryBase * 0.075;
      } else if (salaryBase <= 2666.68) {
        discount = 1412 * 0.075 + (salaryBase - 1412) * 0.09;
      } else if (salaryBase <= 4000.03) {
        discount = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (salaryBase - 2666.68) * 0.12;
      } else {
        discount = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (4000.03 - 2666.68) * 0.12 + (salaryBase - 4000.03) * 0.14;
      }
    } else if (contributorType === "autonomo") {
      discount = salaryBase * 0.2;
    } else if (contributorType === "prolabore") {
      discount = salaryBase * 0.11;
    } else if (contributorType === "facultativo-baixa") {
      discount = salaryBase * 0.05;
    }
    effectiveRate = discount / salary * 100;
    setResult({
      discount,
      effectiveRate,
      salaryBase
    });
  };
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };
  const formatPercent = (val) => {
    return new Intl.NumberFormat("pt-BR", { style: "percent", maximumFractionDigits: 2 }).format(val / 100);
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de INSS 2025 FinZap",
    "description": "Simule o desconto do INSS com base no salário e tipo de contribuinte. Resultado rápido e atualizado com as faixas de contribuição de 2025.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Calculadora de INSS 2025 - Tabela Atualizada",
        description: "Simule o desconto do INSS com base no salário e tipo de contribuinte. Resultado rápido e atualizado com as faixas de contribuição de 2025.",
        canonical: "/calculadoras/inss"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": INSS_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Calculadora de INSS", href: "/calculadoras/inss" }
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsx(Briefcase, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Previdência Social" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "INSS 2025" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Informe seu salário bruto e tipo de contribuição para calcular o valor descontado para o INSS, com base nas regras atualizadas de 2025." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          className: "grid lg:grid-cols-12 gap-8 mb-24",
          children: [
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-white mb-6 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-primary" }),
                "Dados da Contribuição"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "salary", className: "block text-sm text-gray-400 mb-2", children: "Salário Bruto (R$)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "salary",
                        type: "number",
                        placeholder: "Ex: 3000",
                        value: salary || "",
                        onChange: (e) => setSalary(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "contributorType", className: "block text-sm text-gray-400 mb-2", children: "Tipo de Contribuinte" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        id: "contributorType",
                        value: contributorType,
                        onChange: (e) => setContributorType(e.target.value),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none",
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "clt", children: "Trabalhador CLT (Tabela Progressiva)" }),
                          /* @__PURE__ */ jsx("option", { value: "autonomo", children: "Autônomo / Individual (20%)" }),
                          /* @__PURE__ */ jsx("option", { value: "prolabore", children: "Pro-labore / Simplificado (11%)" }),
                          /* @__PURE__ */ jsx("option", { value: "facultativo-baixa", children: "Facultativo Baixa Renda (5%)" })
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-4 pt-4", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: calculateINSS,
                      className: "flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]",
                      children: "Calcular INSS"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => {
                        setSalary(0);
                        setResult(null);
                      },
                      className: "px-6 bg-white/5 hover:bg-white/10 text-white font-medium py-4 rounded-xl transition-all",
                      children: "Limpar"
                    }
                  )
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" }),
              /* @__PURE__ */ jsx("div", { className: "relative z-10", children: result ? /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { type: "spring", stiffness: 200, damping: 20 },
                  className: "space-y-6",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
                      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest", children: "Valor do Desconto INSS" }),
                      /* @__PURE__ */ jsx("div", { className: "text-5xl font-bold text-white mb-2", children: formatCurrency(result.discount) }),
                      /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
                        "Alíquota Efetiva: ",
                        /* @__PURE__ */ jsx("span", { className: "text-primary font-bold", children: formatPercent(result.effectiveRate) })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Salário Base de Cálculo" }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: formatCurrency(result.salaryBase) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Salário Líquido (Estimado)" }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: formatCurrency(salary - result.discount) })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "bg-yellow-500/10 border-l-4 border-yellow-500 p-4 mt-4", children: /* @__PURE__ */ jsxs("p", { className: "text-yellow-200 text-sm m-0", children: [
                      /* @__PURE__ */ jsx("strong", { children: "Nota:" }),
                      " O salário líquido estimado considera apenas o desconto do INSS. Outros descontos como IRRF, vale-transporte e benefícios não foram deduzidos."
                    ] }) })
                  ]
                }
              ) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full py-12 opacity-50", children: [
                /* @__PURE__ */ jsx(Briefcase, { className: "w-16 h-16 text-gray-600 mb-4" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg text-center", children: "Preencha o salário e tipo de contribuinte para ver o resultado" })
              ] }) })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-24 max-w-4xl mx-auto prose prose-invert prose-lg", children: [
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Calculadora de INSS 2025: Simule seu Desconto" }),
          /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-none text-gray-400 leading-relaxed", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Se você quer saber quanto será descontado do seu salário para o INSS em 2025, ou precisa simular a contribuição mensal como CLT, autônomo ou contribuinte individual, esta página foi feita para você." }),
            /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Com a nossa calculadora de INSS gratuita e online, você descobre em segundos o valor exato da contribuição, com base no salário bruto e no tipo de contribuinte escolhido. Os cálculos seguem rigorosamente as novas faixas e alíquotas da Previdência Social em 2025, garantindo resultados confiáveis." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Como Funciona o Cálculo do INSS em 2025" }),
          /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-none text-gray-400 leading-relaxed", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-4", children: "O cálculo do INSS em 2025 segue a lógica da tabela progressiva por faixas salariais. Ou seja, o desconto não é uma porcentagem única sobre todo o salário, mas sim uma aplicação de alíquotas diferentes para cada faixa de valor — semelhante ao Imposto de Renda." }),
            /* @__PURE__ */ jsx("p", { className: "mb-6", children: "A tabela é atualizada todos os anos pelo Governo Federal com base no salário mínimo e na inflação, e está vigente desde janeiro de 2025." }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5 mb-8", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-white mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-primary" }),
                "Tabela de Alíquotas do INSS 2025"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left text-sm text-gray-300", children: [
                /* @__PURE__ */ jsx("thead", { className: "text-xs text-gray-200 uppercase bg-white/5", children: /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("th", { className: "px-4 py-3 rounded-l-lg", children: "Faixa Salarial (R$)" }),
                  /* @__PURE__ */ jsx("th", { className: "px-4 py-3 rounded-r-lg", children: "Alíquota Aplicada" })
                ] }) }),
                /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-white/5", children: [
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: "Até R$ 1.412,00" }),
                    /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-primary font-bold", children: "7,5%" })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: "De R$ 1.412,01 até R$ 2.666,68" }),
                    /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-primary font-bold", children: "9%" })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: "De R$ 2.666,69 até R$ 4.000,03" }),
                    /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-primary font-bold", children: "12%" })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: "De R$ 4.000,04 até R$ 7.786,02" }),
                    /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-primary font-bold", children: "14%" })
                  ] })
                ] })
              ] }) }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-4", children: "*O valor máximo de contribuição (teto) é limitado ao salário de contribuição de R$ 7.786,02." })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: "Exemplo Prático de Cálculo" }),
            /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
              "Para um salário bruto de ",
              /* @__PURE__ */ jsx("strong", { children: "R$ 4.500,00" }),
              ", o cálculo é fatiado:"
            ] }),
            /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside space-y-2 mb-6 text-gray-400", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "1ª Faixa:" }),
                " 7,5% sobre R$ 1.412,00"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "2ª Faixa:" }),
                " 9% sobre a diferença entre R$ 2.666,68 e R$ 1.412,00"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "3ª Faixa:" }),
                " 12% sobre a diferença entre R$ 4.000,03 e R$ 2.666,68"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "4ª Faixa:" }),
                " 14% sobre o restante (R$ 4.500,00 - R$ 4.000,03)"
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { children: "A soma dessas parcelas resulta no desconto final. Esse método garante que quem ganha menos pague proporcionalmente menos." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Quem Precisa Contribuir?" }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "Trabalhadores CLT" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: "A contribuição é automática, descontada diretamente da folha de pagamento. A empresa recolhe e repassa ao INSS. Nossa calculadora ajuda a conferir se o valor no holerite está correto." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-blue-400", children: "Autônomos e Individuais" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: "Se você trabalha por conta própria, precisa gerar e pagar a guia GPS (ou DAS para MEI). A calculadora para autônomo aplica a alíquota de 20% (plano normal) ou 11% (plano simplificado)." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-purple-400", children: "Pro-labore" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: "Sócios de empresas que recebem pro-labore contribuem obrigatoriamente com 11% sobre o valor declarado, respeitando o teto da previdência." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-emerald-400", children: "Facultativo" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: "Estudantes, donas de casa e desempregados podem contribuir para manter a qualidade de segurado, escolhendo entre 5%, 11% ou 20%." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          FAQ,
          {
            items: INSS_FAQS,
            title: "Dúvidas Frequentes sobre INSS",
            className: "py-12",
            showSocialProof: false
          }
        )
      ] }),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
};
const NET_SALARY_FAQS = [
  {
    question: "Qual a diferença entre salário bruto e líquido?",
    answer: "O salário bruto é o valor total registrado na sua carteira de trabalho, sem nenhum desconto. Já o salário líquido é o valor que efetivamente cai na sua conta bancária, após a dedução de impostos obrigatórios (INSS e IRRF) e benefícios eventuais."
  },
  {
    question: "O que é descontado do salário em 2025?",
    answer: "Os descontos obrigatórios principais são o INSS (Previdência Social), que varia de 7,5% a 14%, e o IRRF (Imposto de Renda), que pode chegar a 27,5% dependendo da faixa salarial. Outros descontos comuns incluem vale-transporte (até 6%), vale-alimentação e planos de saúde."
  },
  {
    question: "Quanto desconta por dependente no Imposto de Renda?",
    answer: "Para o cálculo do IRRF em 2025, cada dependente garante uma dedução de R$ 189,59 na base de cálculo do imposto. Isso ajuda a reduzir o valor final a ser pago ao leão."
  },
  {
    question: "Como calcular o desconto do INSS?",
    answer: "O INSS em 2025 usa uma tabela progressiva. O salário é fatiado em faixas, e cada fatia tem uma alíquota diferente (7,5%, 9%, 12% e 14%). O valor final é a soma do imposto de cada fatia, limitado ao teto da previdência."
  },
  {
    question: "O vale-transporte é descontado do salário líquido?",
    answer: "Sim. A empresa pode descontar até 6% do seu salário base para custear o vale-transporte. Se o custo da passagem for menor que 6% do salário, desconta-se apenas o valor real da passagem."
  }
];
const NetSalaryPage = () => {
  const [salary, setSalary] = useState(0);
  const [dependents, setDependents] = useState(0);
  const [otherDiscounts, setOtherDiscounts] = useState(0);
  const [result, setResult] = useState(null);
  const calculateNetSalary = () => {
    if (!salary) return;
    let inss = 0;
    const inssTable = [
      { limit: 1412, rate: 0.075 },
      { limit: 2666.68, rate: 0.09 },
      { limit: 4000.03, rate: 0.12 },
      { limit: 7786.02, rate: 0.14 }
    ];
    let previousLimit = 0;
    for (const tier of inssTable) {
      if (salary > previousLimit) {
        const taxableAmount = Math.min(salary, tier.limit) - previousLimit;
        inss += taxableAmount * tier.rate;
        previousLimit = tier.limit;
      }
    }
    const deductionPerDependent = 189.59;
    const simplifiedDiscount = 564.8;
    const totalLegalDeductions = inss + dependents * deductionPerDependent;
    const effectiveDeduction = Math.max(totalLegalDeductions, simplifiedDiscount);
    const baseIrrfFinal = salary - effectiveDeduction;
    let irrf = 0;
    if (baseIrrfFinal <= 2259.2) {
      irrf = 0;
    } else if (baseIrrfFinal <= 2826.65) {
      irrf = baseIrrfFinal * 0.075 - 169.44;
    } else if (baseIrrfFinal <= 3751.05) {
      irrf = baseIrrfFinal * 0.15 - 381.44;
    } else if (baseIrrfFinal <= 4664.68) {
      irrf = baseIrrfFinal * 0.225 - 662.77;
    } else {
      irrf = baseIrrfFinal * 0.275 - 896;
    }
    if (irrf < 0) irrf = 0;
    const netSalary = salary - inss - irrf - otherDiscounts;
    setResult({
      grossSalary: salary,
      inss,
      irrf,
      otherDiscounts,
      netSalary,
      effectiveDeductionType: effectiveDeduction === simplifiedDiscount ? "Simplificado" : "Deduções Legais"
    });
  };
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Salário Líquido 2025",
    "description": "Descubra exatamente quanto vai cair na sua conta após todos os descontos obrigatórios (INSS e IRRF) vigentes em 2025.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Calculadora de Salário Líquido 2025 - Cálculo Exato e Gratuito",
        description: "Descubra quanto vai cair na sua conta. Calcule seu Salário Líquido 2025 com descontos de INSS, IRRF e dependentes de forma automática e gratuita.",
        canonical: "/calculadoras/salario-liquido"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": NET_SALARY_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Salário Líquido", href: "/calculadoras/salario-liquido" }
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsx(Briefcase, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Finanças Pessoais" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "Salário Líquido 2025" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Descubra exatamente quanto vai cair na sua conta após todos os descontos obrigatórios (INSS e IRRF) vigentes em 2025." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          className: "grid lg:grid-cols-12 gap-8 mb-24",
          children: [
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-white mb-6 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-primary" }),
                "Seus Dados"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "salary", className: "block text-sm text-gray-400 mb-2", children: "Salário Bruto (R$)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "salary",
                        type: "number",
                        placeholder: "Ex: 3000",
                        value: salary || "",
                        onChange: (e) => setSalary(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "dependents", className: "block text-sm text-gray-400 mb-2", children: "Número de Dependentes" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(Users, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "dependents",
                        type: "number",
                        placeholder: "Ex: 0",
                        value: dependents || "",
                        onChange: (e) => setDependents(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "otherDiscounts", className: "block text-sm text-gray-400 mb-2", children: "Outros Descontos (R$)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(MinusCircle, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "otherDiscounts",
                        type: "number",
                        placeholder: "Ex: Vale transporte, plano de saúde...",
                        value: otherDiscounts || "",
                        onChange: (e) => setOtherDiscounts(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-4 pt-4", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: calculateNetSalary,
                      className: "flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]",
                      children: "Calcular Salário Líquido"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => {
                        setSalary(0);
                        setDependents(0);
                        setOtherDiscounts(0);
                        setResult(null);
                      },
                      className: "px-6 bg-white/5 hover:bg-white/10 text-white font-medium py-4 rounded-xl transition-all",
                      children: "Limpar"
                    }
                  )
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" }),
              /* @__PURE__ */ jsx("div", { className: "relative z-10", children: result ? /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { type: "spring", stiffness: 200, damping: 20 },
                  className: "space-y-6",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
                      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest", children: "Salário Líquido Estimado" }),
                      /* @__PURE__ */ jsx("div", { className: "text-5xl font-bold text-white mb-2", children: formatCurrency(result.netSalary) }),
                      /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
                        "*Cálculo baseado na tabela de ",
                        result.effectiveDeductionType === "Simplificado" ? "Desconto Simplificado" : "Deduções Legais",
                        "."
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Salário Bruto" }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: formatCurrency(result.grossSalary) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Desconto INSS" }),
                        /* @__PURE__ */ jsxs("span", { className: "text-red-400 font-bold", children: [
                          "- ",
                          formatCurrency(result.inss)
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Desconto IRRF" }),
                        /* @__PURE__ */ jsxs("span", { className: "text-red-400 font-bold", children: [
                          "- ",
                          formatCurrency(result.irrf)
                        ] })
                      ] }),
                      result.otherDiscounts > 0 && /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Outros Descontos" }),
                        /* @__PURE__ */ jsxs("span", { className: "text-red-400 font-bold", children: [
                          "- ",
                          formatCurrency(result.otherDiscounts)
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "bg-primary/10 border border-primary/20 rounded-xl p-4 mt-4", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-300 text-center", children: [
                      "💡 ",
                      /* @__PURE__ */ jsx("strong", { children: "Você sabia?" }),
                      " Nossa calculadora verificou automaticamente que a opção de",
                      /* @__PURE__ */ jsxs("span", { className: "text-primary font-bold", children: [
                        " ",
                        result.effectiveDeductionType,
                        " "
                      ] }),
                      "é a mais vantajosa para você, garantindo o menor imposto possível."
                    ] }) })
                  ]
                }
              ) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full py-12 opacity-50", children: [
                /* @__PURE__ */ jsx(DollarSign, { className: "w-16 h-16 text-gray-600 mb-4" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg text-center", children: "Preencha os dados para calcular seu salário líquido" })
              ] }) })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-24 max-w-4xl mx-auto prose prose-invert prose-lg", children: [
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Como calcular o Salário Líquido em 2025?" }),
          /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-none text-gray-400 leading-relaxed", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Muitos trabalhadores se surpreendem quando o valor depositado na conta é menor que o contratado na carteira. Isso acontece porque o Salário Líquido é o resultado do Salário Bruto menos os descontos obrigatórios por lei." }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6 my-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "1. INSS" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Primeiro desconto aplicado. Varia de 7,5% a 14% de acordo com a tabela progressiva. Financia sua aposentadoria e benefícios." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "2. IRRF" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Calculado sobre o valor que sobrou após o INSS. Possui isenção para faixas menores e deduções por dependentes." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "3. Outros" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Podem incluir vale-transporte (até 6%), coparticipação em plano de saúde, pensão alimentícia e empréstimos consignados." })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Passo a Passo do Cálculo" }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-8 rounded-3xl border border-white/5", children: [
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Para chegar ao valor exato, a nossa calculadora segue a ordem oficial da Receita Federal:" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-gray-300", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "1" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Cálculo do INSS:" }),
                  " Aplica-se a tabela progressiva de 2025 sobre o salário bruto."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "2" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Base do IRRF:" }),
                  " Do salário bruto, subtrai-se o valor do INSS calculado e R$ 189,59 por cada dependente."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "3" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Cálculo do IRRF:" }),
                  " Sobre essa nova base, aplica-se a alíquota do Imposto de Renda correspondente (7,5% a 27,5%) e subtrai-se a parcela dedutível."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "4" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Resultado Final:" }),
                  " Salário Bruto - INSS - IRRF = Salário Líquido."
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-primary/10 to-transparent border-l-4 border-primary p-6 rounded-r-xl mb-16", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "💡 Você sabia?" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-300", children: "Em 2025, quem ganha até 2 salários mínimos pode ter isenção ou desconto simplificado no Imposto de Renda. Nossa calculadora verifica automaticamente qual opção é mais vantajosa para você (Dedução Legal ou Desconto Simplificado), garantindo o menor imposto possível." })
        ] }),
        /* @__PURE__ */ jsx(
          FAQ,
          {
            items: NET_SALARY_FAQS,
            title: "Dúvidas Frequentes sobre Salário Líquido",
            className: "py-12",
            showSocialProof: false
          }
        )
      ] }),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
};
const THIRTEENTH_FAQS = [
  {
    question: "Quem tem direito ao 13º salário?",
    answer: "Todo trabalhador com carteira assinada (CLT), sejam trabalhadores domésticos, rurais, urbanos ou avulsos. Aposentados e pensionistas do INSS também recebem. É necessário ter trabalhado pelo menos 15 dias no ano para ter direito a receber o benefício proporcional."
  },
  {
    question: "Quando é paga a primeira parcela do 13º?",
    answer: "A primeira parcela deve ser paga entre o dia 1º de fevereiro e o dia 30 de novembro. Ela corresponde a 50% do valor do salário bruto, sem descontos de INSS ou Imposto de Renda."
  },
  {
    question: "Quando cai a segunda parcela?",
    answer: "A segunda parcela deve ser depositada na conta do trabalhador até o dia 20 de dezembro. Diferente da primeira, nesta parcela incidem os descontos de INSS e Imposto de Renda sobre o valor total do benefício."
  },
  {
    question: "Como funciona o cálculo proporcional?",
    answer: "Se você não trabalhou os 12 meses do ano, receberá o valor proporcional. O cálculo é: (Salário ÷ 12) × Meses Trabalhados. Considera-se mês trabalhado a fração igual ou superior a 15 dias de trabalho."
  },
  {
    question: "Horas extras entram no cálculo do 13º?",
    answer: "Sim! A média das horas extras, adicionais noturnos e comissões recebidas durante o ano deve ser somada ao salário base para o cálculo do 13º salário."
  }
];
const ThirteenthSalaryPage = () => {
  const [salary, setSalary] = useState(0);
  const [monthsWorked, setMonthsWorked] = useState(12);
  const [dependents, setDependents] = useState(0);
  const [averages, setAverages] = useState(0);
  const [result, setResult] = useState(null);
  const calculateThirteenth = () => {
    if (!salary) return;
    const totalBase = salary + averages;
    const totalThirteenth = totalBase / 12 * monthsWorked;
    const firstInstallment = totalThirteenth / 2;
    let inss = 0;
    const inssTable = [
      { limit: 1412, rate: 0.075 },
      { limit: 2666.68, rate: 0.09 },
      { limit: 4000.03, rate: 0.12 },
      { limit: 7786.02, rate: 0.14 }
    ];
    let previousLimit = 0;
    for (const tier of inssTable) {
      if (totalThirteenth > previousLimit) {
        const taxableAmount = Math.min(totalThirteenth, tier.limit) - previousLimit;
        inss += taxableAmount * tier.rate;
        previousLimit = tier.limit;
      }
    }
    const deductionPerDependent = 189.59;
    const simplifiedDiscount = 564.8;
    const totalLegalDeductions = inss + dependents * deductionPerDependent;
    const effectiveDeduction = Math.max(totalLegalDeductions, simplifiedDiscount);
    const baseIrrfFinal = totalThirteenth - effectiveDeduction;
    let irrf = 0;
    if (baseIrrfFinal <= 2259.2) {
      irrf = 0;
    } else if (baseIrrfFinal <= 2826.65) {
      irrf = baseIrrfFinal * 0.075 - 169.44;
    } else if (baseIrrfFinal <= 3751.05) {
      irrf = baseIrrfFinal * 0.15 - 381.44;
    } else if (baseIrrfFinal <= 4664.68) {
      irrf = baseIrrfFinal * 0.225 - 662.77;
    } else {
      irrf = baseIrrfFinal * 0.275 - 896;
    }
    if (irrf < 0) irrf = 0;
    const secondInstallment = totalThirteenth - firstInstallment - inss - irrf;
    setResult({
      totalThirteenth,
      firstInstallment,
      secondInstallment,
      inss,
      irrf,
      totalDiscounts: inss + irrf
    });
  };
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Décimo Terceiro Salário",
    "description": "Antecipe seu planejamento financeiro. Simule o valor exato da 1ª e 2ª parcela do seu 13º salário com todos os descontos legais.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Calculadora de Décimo Terceiro (13º Salário) - Simulação 2025",
        description: "Antecipe seu planejamento financeiro. Simule o valor exato da 1ª e 2ª parcela do seu 13º salário com todos os descontos legais.",
        canonical: "/calculadoras/decimo-terceiro"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": THIRTEENTH_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Décimo Terceiro", href: "/calculadoras/decimo-terceiro" }
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsx(Briefcase, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Direitos Trabalhistas" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "Décimo Terceiro" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Antecipe seu planejamento financeiro. Simule o valor exato da 1ª e 2ª parcela do seu 13º salário com todos os descontos legais." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          className: "grid lg:grid-cols-12 gap-8 mb-24",
          children: [
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-white mb-6 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-primary" }),
                "Dados para Cálculo"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "salary", className: "block text-sm text-gray-400 mb-2", children: "Salário Bruto (R$)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "salary",
                        type: "number",
                        placeholder: "Ex: 3000",
                        value: salary || "",
                        onChange: (e) => setSalary(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "months", className: "block text-sm text-gray-400 mb-2", children: "Meses Trabalhados no Ano" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(Calendar, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "select",
                      {
                        id: "months",
                        value: monthsWorked,
                        onChange: (e) => setMonthsWorked(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none",
                        children: Array.from({ length: 12 }, (_, i) => i + 1).map((m) => /* @__PURE__ */ jsxs("option", { value: m, children: [
                          m,
                          " meses"
                        ] }, m))
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "dependents", className: "block text-sm text-gray-400 mb-2", children: "Número de Dependentes" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(Users, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "dependents",
                        type: "number",
                        placeholder: "Ex: 0",
                        value: dependents || "",
                        onChange: (e) => setDependents(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "averages", className: "block text-sm text-gray-400 mb-2", children: "Média de Adicionais (R$)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(Coins, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "averages",
                        type: "number",
                        placeholder: "Horas extras, comissões...",
                        value: averages || "",
                        onChange: (e) => setAverages(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-4 pt-4", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: calculateThirteenth,
                      className: "flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]",
                      children: "Calcular 13º"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => {
                        setSalary(0);
                        setMonthsWorked(12);
                        setDependents(0);
                        setAverages(0);
                        setResult(null);
                      },
                      className: "px-6 bg-white/5 hover:bg-white/10 text-white font-medium py-4 rounded-xl transition-all",
                      children: "Limpar"
                    }
                  )
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" }),
              /* @__PURE__ */ jsx("div", { className: "relative z-10", children: result ? /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { type: "spring", stiffness: 200, damping: 20 },
                  className: "space-y-6",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
                      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest", children: "Valor Total a Receber" }),
                      /* @__PURE__ */ jsx("div", { className: "text-5xl font-bold text-white mb-2", children: formatCurrency(result.firstInstallment + result.secondInstallment) }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Soma das duas parcelas líquidas" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
                      /* @__PURE__ */ jsxs("div", { className: "bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("span", { className: "block text-emerald-400 font-bold", children: "1ª Parcela (Adiantamento)" }),
                          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Até 30 de Novembro" })
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold text-xl", children: formatCurrency(result.firstInstallment) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("span", { className: "block text-gray-300", children: "2ª Parcela (Líquida)" }),
                          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: "Até 20 de Dezembro" })
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold text-xl", children: formatCurrency(result.secondInstallment) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "border-t border-white/10 my-2 pt-4 space-y-2", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-sm", children: [
                          /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Total Bruto (13º Integral)" }),
                          /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: formatCurrency(result.totalThirteenth) })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-sm", children: [
                          /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Desconto INSS" }),
                          /* @__PURE__ */ jsxs("span", { className: "text-red-400", children: [
                            "- ",
                            formatCurrency(result.inss)
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-sm", children: [
                          /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Desconto IRRF" }),
                          /* @__PURE__ */ jsxs("span", { className: "text-red-400", children: [
                            "- ",
                            formatCurrency(result.irrf)
                          ] })
                        ] })
                      ] })
                    ] })
                  ]
                }
              ) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full py-12 opacity-50", children: [
                /* @__PURE__ */ jsx(Coins, { className: "w-16 h-16 text-gray-600 mb-4" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg text-center", children: "Preencha os dados para simular seu 13º salário" })
              ] }) })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-24 max-w-4xl mx-auto prose prose-invert prose-lg", children: [
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Entenda o Pagamento do 13º Salário" }),
          /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-none text-gray-400 leading-relaxed", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Conhecido como Gratificação de Natal, o Décimo Terceiro Salário é um direito garantido pela CLT que injeta um salário extra na economia ao final do ano. O pagamento é feito em duas etapas, e entender a diferença entre elas é crucial para não se frustrar com o valor líquido final." }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6 my-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "1ª Parcela (Adiantamento)" }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { children: "Prazo:" }),
                  " Até 30 de novembro."
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
                  /* @__PURE__ */ jsx("strong", { children: "Valor:" }),
                  ' É a melhor parte! Corresponde a exatamente 50% do salário bruto do mês anterior, sem nenhum desconto. O dinheiro entra "cheio" na conta.'
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "2ª Parcela (Acerto)" }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { children: "Prazo:" }),
                  " Até 20 de dezembro."
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
                  /* @__PURE__ */ jsx("strong", { children: "Valor:" }),
                  " Aqui acontece o acerto de contas. Calcula-se o 13º integral, descontam-se o INSS e o IRRF (sobre o valor total) e subtrai-se o valor já pago na 1ª parcela. Por isso, essa parcela é sempre menor que a primeira."
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Como o valor é calculado?" }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-8 rounded-3xl border border-white/5", children: [
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "O cálculo base considera o seu salário dividido por 12 meses. Você recebe 1/12 avos para cada mês em que trabalhou pelo menos 15 dias." }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-gray-300", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "1" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Salário Integral:" }),
                  " Se trabalhou o ano todo (janeiro a dezembro), recebe um salário extra completo."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "2" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Salário Proporcional:" }),
                  " Se foi contratado no meio do ano, recebe proporcionalmente aos meses trabalhados."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "3" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Médias:" }),
                  " Se você recebe horas extras, comissões ou adicional noturno, é feita uma média desses valores que é somada ao salário fixo."
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-yellow-500/10 border-l-4 border-yellow-500 p-6 rounded-r-xl mb-16", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "⚠️ Atenção aos Descontos!" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-300", children: "Muitas pessoas se esquecem que o desconto do INSS e do Imposto de Renda incide sobre o valor total do 13º, mas é cobrado de uma vez só na segunda parcela. Isso faz com que o depósito de dezembro seja significativamente menor que o de novembro. Use nossa calculadora para se preparar e não contar com um dinheiro que não virá!" })
        ] }),
        /* @__PURE__ */ jsx(
          FAQ,
          {
            items: THIRTEENTH_FAQS,
            title: "Perguntas Frequentes sobre 13º",
            className: "py-12",
            showSocialProof: false
          }
        )
      ] }),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
};
const OVERTIME_FAQS = [
  {
    question: "Qual o valor da hora extra em 2025?",
    answer: "Pela CLT, a hora extra deve valer, no mínimo, 50% a mais que a hora normal de trabalho. Ou seja, se sua hora vale R$ 10,00, a hora extra valerá R$ 15,00. Em domingos e feriados, esse adicional costuma ser de 100% (o dobro)."
  },
  {
    question: "Como calcular o valor da minha hora de trabalho?",
    answer: "Basta dividir seu salário bruto pela sua jornada mensal. Por exemplo: Se você ganha R$ 2.200,00 e trabalha 220 horas mensais (padrão 44h semanais), o valor da sua hora é R$ 10,00."
  },
  {
    question: "O que é hora extra 50% e 100%?",
    answer: "A hora extra 50% é aplicada em dias úteis (segunda a sábado) e representa um acréscimo de metade do valor da hora normal. A hora extra 100% é aplicada geralmente em domingos e feriados, dobrando o valor da hora trabalhada."
  },
  {
    question: "Hora extra reflete no DSR (Descanso Semanal)?",
    answer: "Sim! As horas extras habituais refletem no pagamento do Descanso Semanal Remunerado (DSR). Isso significa que, além do valor das horas, você recebe um adicional pelos dias de folga proporcional às horas trabalhadas."
  },
  {
    question: "Existe limite de horas extras por dia?",
    answer: "Sim. Segundo a CLT, o limite máximo é de 2 horas extras por dia. O que passar disso pode configurar irregularidade trabalhista, exceto em casos de força maior ou serviços inadiáveis."
  }
];
const OvertimePage = () => {
  const [salary, setSalary] = useState(0);
  const [hoursJourney, setHoursJourney] = useState(220);
  const [hours50, setHours50] = useState(0);
  const [hours100, setHours100] = useState(0);
  const [businessDays, setBusinessDays] = useState(25);
  const [sundaysHolidays, setSundaysHolidays] = useState(5);
  const [result, setResult] = useState(null);
  const calculateOvertime = () => {
    if (!salary || !hoursJourney) return;
    const hourlyRate = salary / hoursJourney;
    const rate50 = hourlyRate * 1.5;
    const total50 = rate50 * hours50;
    const rate100 = hourlyRate * 2;
    const total100 = rate100 * hours100;
    const totalOvertime = total50 + total100;
    let dsr = 0;
    if (businessDays > 0 && sundaysHolidays > 0) {
      dsr = totalOvertime / businessDays * sundaysHolidays;
    }
    const totalReceivable = totalOvertime + dsr;
    setResult({
      hourlyRate,
      total50,
      total100,
      dsr,
      totalReceivable
    });
  };
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Horas Extras",
    "description": "Estendeu a jornada? Simule o valor exato que você deve receber, considerando adicionais de 50%, 100% e o reflexo no DSR.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Calculadora de Horas Extras - Cálculo 50%, 100% e DSR",
        description: "Estendeu a jornada? Simule o valor exato que você deve receber, considerando adicionais de 50%, 100% e o reflexo no DSR.",
        canonical: "/calculadoras/horas-extras"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": OVERTIME_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Horas Extras", href: "/calculadoras/horas-extras" }
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Direitos Trabalhistas" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "Horas Extras" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Estendeu a jornada? Simule o valor exato que você deve receber, considerando adicionais de 50%, 100% e o reflexo no DSR." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          className: "grid lg:grid-cols-12 gap-8 mb-24",
          children: [
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-white mb-6 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-primary" }),
                "Dados da Jornada"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "salary", className: "block text-sm text-gray-400 mb-2", children: "Salário Bruto (R$)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "salary",
                        type: "number",
                        placeholder: "Ex: 2200",
                        value: salary || "",
                        onChange: (e) => setSalary(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "hoursJourney", className: "block text-sm text-gray-400 mb-2", children: "Jornada Mensal (Horas)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(Clock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "hoursJourney",
                        type: "number",
                        placeholder: "Ex: 220",
                        value: hoursJourney || "",
                        onChange: (e) => setHoursJourney(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "hours50", className: "block text-sm text-gray-400 mb-2", children: "Horas 50% (Dias Úteis)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "hours50",
                        type: "number",
                        placeholder: "Ex: 10",
                        value: hours50 || "",
                        onChange: (e) => setHours50(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "hours100", className: "block text-sm text-gray-400 mb-2", children: "Horas 100% (Domingos)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "hours100",
                        type: "number",
                        placeholder: "Ex: 5",
                        value: hours100 || "",
                        onChange: (e) => setHours100(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "businessDays", className: "block text-sm text-gray-400 mb-2", children: "Dias Úteis no Mês" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "businessDays",
                        type: "number",
                        value: businessDays,
                        onChange: (e) => setBusinessDays(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "sundaysHolidays", className: "block text-sm text-gray-400 mb-2", children: "Domingos/Feriados" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "sundaysHolidays",
                        type: "number",
                        value: sundaysHolidays,
                        onChange: (e) => setSundaysHolidays(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-4 pt-4", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: calculateOvertime,
                      className: "flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]",
                      children: "Calcular Horas Extras"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => {
                        setSalary(0);
                        setHours50(0);
                        setHours100(0);
                        setResult(null);
                      },
                      className: "px-6 bg-white/5 hover:bg-white/10 text-white font-medium py-4 rounded-xl transition-all",
                      children: "Limpar"
                    }
                  )
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" }),
              /* @__PURE__ */ jsx("div", { className: "relative z-10", children: result ? /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { type: "spring", stiffness: 200, damping: 20 },
                  className: "space-y-6",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
                      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest", children: "Valor Total a Receber" }),
                      /* @__PURE__ */ jsx("div", { className: "text-5xl font-bold text-white mb-2", children: formatCurrency(result.totalReceivable) }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Horas Extras + Reflexo no DSR" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("span", { className: "block text-gray-300", children: "Valor da sua Hora" }),
                          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: "Salário / Jornada" })
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: formatCurrency(result.hourlyRate) })
                      ] }),
                      result.total50 > 0 && /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("span", { className: "block text-gray-300", children: "Horas 50%" }),
                          /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-500", children: [
                            hours50,
                            "h x ",
                            formatCurrency(result.hourlyRate * 1.5)
                          ] })
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: formatCurrency(result.total50) })
                      ] }),
                      result.total100 > 0 && /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("span", { className: "block text-gray-300", children: "Horas 100%" }),
                          /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-500", children: [
                            hours100,
                            "h x ",
                            formatCurrency(result.hourlyRate * 2)
                          ] })
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: formatCurrency(result.total100) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("span", { className: "block text-emerald-400 font-bold", children: "Reflexo no DSR" }),
                          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Descanso Semanal Remunerado" })
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: formatCurrency(result.dsr) })
                      ] })
                    ] })
                  ]
                }
              ) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full py-12 opacity-50", children: [
                /* @__PURE__ */ jsx(Clock, { className: "w-16 h-16 text-gray-600 mb-4" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg text-center", children: "Preencha os dados para simular suas horas extras" })
              ] }) })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-24 max-w-4xl mx-auto prose prose-invert prose-lg", children: [
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Como funciona o cálculo da Hora Extra?" }),
          /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-none text-gray-400 leading-relaxed", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-4", children: "A Hora Extra é um direito garantido pela Constituição para todo trabalhador que excede sua jornada contratual. O cálculo envolve descobrir quanto vale sua hora de trabalho normal e aplicar o percentual de acréscimo definido por lei ou convenção coletiva." }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6 my-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "1. Valor da Hora" }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
                  "Divide-se o salário mensal pela jornada (geralmente 220h). Exemplo: R$ 2.200 ÷ 220 = ",
                  /* @__PURE__ */ jsx("strong", { children: "R$ 10,00/hora" }),
                  "."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "2. Adicional" }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
                  "Soma-se a porcentagem extra ao valor da hora.",
                  /* @__PURE__ */ jsx("br", {}),
                  "50% (Dias Úteis): R$ 10,00 + 50% = ",
                  /* @__PURE__ */ jsx("strong", { children: "R$ 15,00" }),
                  ".",
                  /* @__PURE__ */ jsx("br", {}),
                  "100% (Domingos): R$ 10,00 + 100% = ",
                  /* @__PURE__ */ jsx("strong", { children: "R$ 20,00" }),
                  "."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "3. Quantidade" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Multiplica-se o valor da hora extra encontrada pelo número de horas a mais que você trabalhou no mês." })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Tipos de Hora Extra" }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-8 rounded-3xl border border-white/5", children: [
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "O percentual de acréscimo varia de acordo com o dia e horário em que o trabalho extra foi realizado:" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-gray-300", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "1" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Hora Extra 50%:" }),
                  " A mais comum. Aplica-se para horas excedentes trabalhadas em dias úteis (segunda a sábado). O valor da hora recebe um acréscimo de, no mínimo, 50%."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "2" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Hora Extra 100%:" }),
                  " Aplica-se para trabalho em domingos e feriados civis ou religiosos não compensados. O valor da hora dobra (acréscimo de 100%)."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "3" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Adicional Noturno:" }),
                  " Se a hora extra for feita entre 22h e 5h, além do acréscimo de hora extra, deve-se somar mais 20% de adicional noturno sobre a hora."
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-yellow-500/10 border-l-4 border-yellow-500 p-6 rounded-r-xl mb-16", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "⚠️ Não esqueça do DSR!" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-300", children: 'As horas extras habituais geram um "efeito colateral" positivo no seu salário: o reflexo no Descanso Semanal Remunerado (DSR). Como você trabalhou mais durante a semana, seu dia de folga remunerada também passa a valer proporcionalmente mais. É um dinheiro extra que muitos esquecem de cobrar!' })
        ] }),
        /* @__PURE__ */ jsx(
          FAQ,
          {
            items: OVERTIME_FAQS,
            title: "Perguntas Frequentes sobre Horas Extras",
            className: "py-12",
            showSocialProof: false
          }
        )
      ] }),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
};
const UNEMPLOYMENT_FAQS = [
  {
    question: "Quem tem direito ao benefício?",
    answer: "Tem direito o trabalhador formal e doméstico demitido sem justa causa (inclusive rescisão indireta), que não possua renda própria para sustento da família e que não esteja recebendo benefício previdenciário (exceto auxílio-acidente e pensão por morte)."
  },
  {
    question: "MEI tem direito a Seguro-Desemprego?",
    answer: "Em regra, não. O sistema entende que o MEI possui renda própria. Porém, se você trabalha CLT e tem um MEI inativo (sem faturamento), pode conseguir o benefício se comprovar que a empresa não gera renda suficiente para sua subsistência (requer recurso administrativo)."
  },
  {
    question: "Se eu arrumar um novo emprego, perco o seguro?",
    answer: "Sim. O benefício é suspenso imediatamente assim que o novo registro em carteira (admissão) é informado ao sistema. Você recebe apenas as parcelas anteriores à data da nova contratação."
  },
  {
    question: "O que acontece se eu pedir demissão?",
    answer: "Quem pede demissão não tem direito ao Seguro-Desemprego. O benefício é exclusivo para demissões involuntárias (sem justa causa)."
  },
  {
    question: "Posso receber seguro-desemprego e trabalhar como autônomo?",
    answer: "Cuidado. Se você começar a recolher INSS como contribuinte individual (autônomo) enquanto recebe o seguro, o governo pode cruzar os dados, entender que você possui renda e cancelar o benefício."
  }
];
const UnemploymentInsurancePage = () => {
  const [salary1, setSalary1] = useState(0);
  const [salary2, setSalary2] = useState(0);
  const [salary3, setSalary3] = useState(0);
  const [monthsWorked, setMonthsWorked] = useState(24);
  const [timesRequested, setTimesRequested] = useState(1);
  const [result, setResult] = useState(null);
  const calculateInsurance = () => {
    const salaries = [salary1, salary2, salary3].filter((s) => s > 0);
    if (salaries.length === 0) return;
    const averageSalary = salaries.reduce((a, b) => a + b, 0) / salaries.length;
    let installmentValue = 0;
    const range1Limit = 2041.39;
    const range2Limit = 3402.65;
    const fixedValueRange2 = 1633.1;
    const ceiling = 2313.74;
    const minimumWage = 1412;
    if (averageSalary <= range1Limit) {
      installmentValue = averageSalary * 0.8;
    } else if (averageSalary <= range2Limit) {
      installmentValue = (averageSalary - range1Limit) * 0.5 + fixedValueRange2;
    } else {
      installmentValue = ceiling;
    }
    if (installmentValue < minimumWage) {
      installmentValue = minimumWage;
    }
    let installmentsCount = 0;
    if (timesRequested === 1) {
      if (monthsWorked >= 24) installmentsCount = 5;
      else if (monthsWorked >= 12) installmentsCount = 4;
      else if (monthsWorked >= 6) installmentsCount = 0;
      if (monthsWorked >= 24) installmentsCount = 5;
      else if (monthsWorked >= 12) installmentsCount = 4;
      else if (monthsWorked >= 6) installmentsCount = 3;
    } else if (timesRequested === 2) {
      if (monthsWorked >= 24) installmentsCount = 5;
      else if (monthsWorked >= 12) installmentsCount = 4;
      else if (monthsWorked >= 6) installmentsCount = 3;
    } else {
      if (monthsWorked >= 24) installmentsCount = 5;
      else if (monthsWorked >= 12) installmentsCount = 4;
      else if (monthsWorked >= 6) installmentsCount = 3;
    }
    setResult({
      averageSalary,
      installmentValue,
      installmentsCount,
      totalValue: installmentValue * installmentsCount
    });
  };
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Seguro-Desemprego 2025",
    "description": "Foi demitido? Simule agora o valor exato e a quantidade de parcelas que você tem direito a receber.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Calculadora de Seguro-Desemprego 2025 - Valor e Parcelas",
        description: "Foi demitido? Saiba quantas parcelas vai receber e qual o valor exato. Calculadora de Seguro-Desemprego atualizada com as novas tabelas de 2025.",
        canonical: "/calculadoras/seguro-desemprego"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": UNEMPLOYMENT_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Seguro-Desemprego", href: "/calculadoras/seguro-desemprego" }
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsx(Briefcase, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Direitos Trabalhistas" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "Seguro-Desemprego" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Foi demitido? Simule agora o valor exato e a quantidade de parcelas que você tem direito a receber." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          className: "grid lg:grid-cols-12 gap-8 mb-24",
          children: [
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-white mb-6 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-primary" }),
                "Seus Dados"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Últimos 3 Salários (Brutos)" }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "number",
                          placeholder: "Mês 1 (Ex: 3000)",
                          value: salary1 || "",
                          onChange: (e) => setSalary1(Number(e.target.value)),
                          className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "number",
                          placeholder: "Mês 2 (Ex: 3000)",
                          value: salary2 || "",
                          onChange: (e) => setSalary2(Number(e.target.value)),
                          className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "number",
                          placeholder: "Mês 3 (Ex: 3000)",
                          value: salary3 || "",
                          onChange: (e) => setSalary3(Number(e.target.value)),
                          className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "monthsWorked", className: "block text-sm text-gray-400 mb-2", children: "Meses Trabalhados (Últimos 36 meses)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(Calendar, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "monthsWorked",
                        type: "number",
                        placeholder: "Ex: 24",
                        value: monthsWorked || "",
                        onChange: (e) => setMonthsWorked(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-4 pt-4", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: calculateInsurance,
                      className: "flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]",
                      children: "Calcular Benefício"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => {
                        setSalary1(0);
                        setSalary2(0);
                        setSalary3(0);
                        setMonthsWorked(24);
                        setResult(null);
                      },
                      className: "px-6 bg-white/5 hover:bg-white/10 text-white font-medium py-4 rounded-xl transition-all",
                      children: "Limpar"
                    }
                  )
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" }),
              /* @__PURE__ */ jsx("div", { className: "relative z-10", children: result ? /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { type: "spring", stiffness: 200, damping: 20 },
                  className: "space-y-6",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
                      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest", children: "Valor da Parcela" }),
                      /* @__PURE__ */ jsx("div", { className: "text-5xl font-bold text-white mb-2", children: formatCurrency(result.installmentValue) }),
                      /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
                        "Você tem direito a ",
                        /* @__PURE__ */ jsxs("strong", { children: [
                          result.installmentsCount,
                          " parcelas"
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Média Salarial (3 meses)" }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: formatCurrency(result.averageSalary) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Quantidade de Parcelas" }),
                        /* @__PURE__ */ jsxs("span", { className: "text-white font-bold", children: [
                          result.installmentsCount,
                          "x"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("span", { className: "block text-emerald-400 font-bold", children: "Total do Benefício" }),
                          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Soma de todas as parcelas" })
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold text-xl", children: formatCurrency(result.totalValue) })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mt-4 flex gap-3", children: [
                      /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-yellow-500 flex-shrink-0" }),
                      /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-300", children: [
                        /* @__PURE__ */ jsx("strong", { children: "Atenção ao Prazo!" }),
                        " Você tem de 7 a 120 dias corridos após a demissão para solicitar o benefício."
                      ] })
                    ] })
                  ]
                }
              ) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full py-12 opacity-50", children: [
                /* @__PURE__ */ jsx(Briefcase, { className: "w-16 h-16 text-gray-600 mb-4" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg text-center", children: "Preencha os dados para simular seu Seguro-Desemprego" })
              ] }) })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-24 max-w-4xl mx-auto prose prose-invert prose-lg", children: [
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Como funciona o Seguro-Desemprego em 2025?" }),
          /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-none text-gray-400 leading-relaxed", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-4", children: "O Seguro-Desemprego é um dos benefícios mais importantes da Seguridade Social, oferecendo assistência financeira temporária ao trabalhador dispensado sem justa causa. O valor não é fixo: ele depende da média dos seus últimos salários e segue uma tabela reajustada anualmente pelo governo." }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6 my-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "O Cálculo do Valor" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm mb-2", children: "Para chegar ao valor da parcela, calcula-se a média dos salários dos últimos 3 meses anteriores à dispensa." }),
                /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside text-sm text-gray-400", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Até o teto:" }),
                    " O valor da parcela não pode ser inferior ao salário mínimo vigente."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Acima do teto:" }),
                    " Existe um limite máximo (teto) pago pelo governo."
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "A Quantidade de Parcelas" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Você pode receber entre 3 e 5 parcelas, dependendo de quanto tempo você trabalhou com carteira assinada nos últimos meses e de quantas vezes já solicitou o benefício anteriormente." })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Regras de Parcelas (Tempo de Trabalho)" }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-8 rounded-3xl border border-white/5", children: [
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "A quantidade de dinheiro que você vai receber depende do seu histórico de trabalho. Confira a regra geral:" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-gray-300", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "3" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Parcelas:" }),
                  " Para quem trabalhou de 6 a 11 meses no período de referência."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "4" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Parcelas:" }),
                  " Para quem trabalhou de 12 a 23 meses."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "5" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Parcelas:" }),
                  " Para quem trabalhou 24 meses ou mais."
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Passo a Passo para Calcular" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-gray-400", children: [
            /* @__PURE__ */ jsx("p", { children: "Nossa calculadora faz a conta complexa da Tabela do FAT (Fundo de Amparo ao Trabalhador) para você. O processo manual seria:" }),
            /* @__PURE__ */ jsxs("ol", { className: "list-decimal list-inside space-y-2 ml-4", children: [
              /* @__PURE__ */ jsx("li", { children: "Some os salários brutos dos últimos 3 meses antes da demissão." }),
              /* @__PURE__ */ jsx("li", { children: "Divida o total por 3 para encontrar a média salarial." }),
              /* @__PURE__ */ jsxs("li", { children: [
                "Aplique a média na faixa da tabela vigente:",
                /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside ml-6 mt-2 space-y-1", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Faixa 1:" }),
                    " Multiplica-se a média por 0,8 (80%)."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Faixa 2:" }),
                    " O que exceder a Faixa 1 é multiplicado por 0,5 (50%) e somado a um valor fixo."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Faixa 3:" }),
                    " Valor fixo do teto (para médias salariais altas)."
                  ] })
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          FAQ,
          {
            items: UNEMPLOYMENT_FAQS,
            title: "Dúvidas Frequentes sobre Seguro-Desemprego",
            className: "py-12",
            showSocialProof: false
          }
        )
      ] }),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
};
const NIGHT_SHIFT_FAQS = [
  {
    question: "Quem tem direito ao Adicional Noturno?",
    answer: "Todos os trabalhadores urbanos contratados via CLT que exerçam atividades entre 22h e 5h. Trabalhadores rurais também têm direito, mas com horários e percentuais diferentes (25% de acréscimo)."
  },
  {
    question: "O Adicional Noturno reflete no DSR?",
    answer: "Sim! Se o trabalho noturno for habitual, o valor do adicional deve refletir no pagamento do Descanso Semanal Remunerado (DSR) e feriados."
  },
  {
    question: "Como funciona para escala 12x36?",
    answer: "Mesmo na jornada 12x36, se o trabalho ocorrer no período noturno (22h às 5h), o adicional é devido. A hora reduzida também se aplica, resultando em pagamento de horas extras ou adicional sobre o tempo excedente fictício."
  },
  {
    question: "O adicional noturno entra no cálculo de férias e 13º?",
    answer: "Sim. A média do adicional noturno recebido ao longo do ano integra a base de cálculo para férias, 13º salário e aviso prévio indenizado."
  },
  {
    question: "Qual a diferença para o trabalhador rural?",
    answer: "Para a lavoura, o horário noturno é das 21h às 5h. Para a pecuária, é das 20h às 4h. Em ambos os casos rurais, o adicional é de 25% (maior que o urbano), mas não existe a regra da hora reduzida (a hora tem 60 minutos)."
  }
];
const NightShiftPage = () => {
  const [salary, setSalary] = useState(0);
  const [hoursJourney, setHoursJourney] = useState(220);
  const [nightHours, setNightHours] = useState(0);
  const [businessDays, setBusinessDays] = useState(25);
  const [sundaysHolidays, setSundaysHolidays] = useState(5);
  const [result, setResult] = useState(null);
  const calculateNightShift = () => {
    if (!salary || !hoursJourney) return;
    const hourlyRate = salary / hoursJourney;
    const premiumRate = hourlyRate * 0.2;
    const reducedHourFactor = 60 / 52.5;
    const totalPaidNightHours = nightHours * reducedHourFactor;
    const totalAdditional = totalPaidNightHours * premiumRate;
    let dsr = 0;
    if (businessDays > 0 && sundaysHolidays > 0) {
      dsr = totalAdditional / businessDays * sundaysHolidays;
    }
    const totalReceivable = totalAdditional + dsr;
    setResult({
      hourlyRate,
      premiumRate,
      reducedHourFactor,
      totalPaidNightHours,
      totalAdditional,
      dsr,
      totalReceivable
    });
  };
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Adicional Noturno 2025",
    "description": "Trabalha a noite? Calcule o valor do seu Adicional Noturno considerando os 20% de acréscimo e a regra da Hora Reduzida (52min30s).",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Calculadora de Adicional Noturno 2025 - Hora Reduzida e 20%",
        description: "Trabalha a noite? Calcule o valor do seu Adicional Noturno considerando os 20% de acréscimo e a regra da Hora Reduzida (52min30s). Simulação gratuita.",
        canonical: "/calculadoras/adicional-noturno"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": NIGHT_SHIFT_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Adicional Noturno", href: "/calculadoras/adicional-noturno" }
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsx(Moon, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Direitos Trabalhistas" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "Adicional Noturno" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Trabalha entre 22h e 5h? Descubra o valor real do seu salário com o acréscimo de 20% e a regra da hora reduzida." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          className: "grid lg:grid-cols-12 gap-8 mb-24",
          children: [
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-white mb-6 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-primary" }),
                "Dados da Jornada"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "salary", className: "block text-sm text-gray-400 mb-2", children: "Salário Bruto (R$)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "salary",
                        type: "number",
                        placeholder: "Ex: 2200",
                        value: salary || "",
                        onChange: (e) => setSalary(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "hoursJourney", className: "block text-sm text-gray-400 mb-2", children: "Jornada Mensal (Horas)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(Clock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "hoursJourney",
                        type: "number",
                        placeholder: "Ex: 220",
                        value: hoursJourney || "",
                        onChange: (e) => setHoursJourney(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "nightHours", className: "block text-sm text-gray-400 mb-2", children: "Horas Noturnas Trabalhadas (Relógio)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(Moon, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "nightHours",
                        type: "number",
                        placeholder: "Ex: 100",
                        value: nightHours || "",
                        onChange: (e) => setNightHours(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Horas trabalhadas entre 22h e 5h" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "businessDays", className: "block text-sm text-gray-400 mb-2", children: "Dias Úteis no Mês" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "businessDays",
                        type: "number",
                        value: businessDays,
                        onChange: (e) => setBusinessDays(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "sundaysHolidays", className: "block text-sm text-gray-400 mb-2", children: "Domingos/Feriados" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "sundaysHolidays",
                        type: "number",
                        value: sundaysHolidays,
                        onChange: (e) => setSundaysHolidays(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-4 pt-4", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: calculateNightShift,
                      className: "flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]",
                      children: "Calcular Adicional"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => {
                        setSalary(0);
                        setNightHours(0);
                        setResult(null);
                      },
                      className: "px-6 bg-white/5 hover:bg-white/10 text-white font-medium py-4 rounded-xl transition-all",
                      children: "Limpar"
                    }
                  )
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" }),
              /* @__PURE__ */ jsx("div", { className: "relative z-10", children: result ? /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { type: "spring", stiffness: 200, damping: 20 },
                  className: "space-y-6",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
                      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest", children: "Valor Total do Adicional" }),
                      /* @__PURE__ */ jsx("div", { className: "text-5xl font-bold text-white mb-2", children: formatCurrency(result.totalReceivable) }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Adicional Noturno + Reflexo no DSR" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("span", { className: "block text-gray-300", children: "Hora Normal" }),
                          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: "Salário / Jornada" })
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: formatCurrency(result.hourlyRate) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("span", { className: "block text-gray-300", children: "Hora Noturna (20%)" }),
                          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: "Valor do acréscimo por hora" })
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: formatCurrency(result.premiumRate) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("span", { className: "block text-gray-300", children: "Horas Pagas (Fictas)" }),
                          /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-500", children: [
                            nightHours,
                            "h relógio x 1.1428"
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs("span", { className: "text-white font-bold", children: [
                          result.totalPaidNightHours.toFixed(2),
                          "h"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("span", { className: "block text-gray-300", children: "Total Adicional" }),
                          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: "Sem DSR" })
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: formatCurrency(result.totalAdditional) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("span", { className: "block text-emerald-400 font-bold", children: "Reflexo no DSR" }),
                          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Descanso Semanal Remunerado" })
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: formatCurrency(result.dsr) })
                      ] })
                    ] })
                  ]
                }
              ) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full py-12 opacity-50", children: [
                /* @__PURE__ */ jsx(Moon, { className: "w-16 h-16 text-gray-600 mb-4" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg text-center", children: "Preencha os dados para simular seu Adicional Noturno" })
              ] }) })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-24 max-w-4xl mx-auto prose prose-invert prose-lg", children: [
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "O que é o Adicional Noturno?" }),
          /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-none text-gray-400 leading-relaxed", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-4", children: 'O trabalho noturno exige mais do corpo e da saúde do trabalhador do que o diurno. Por isso, a CLT (Consolidação das Leis do Trabalho) obriga as empresas a pagarem um "bônus" compensatório: o Adicional Noturno.' }),
            /* @__PURE__ */ jsx("p", { className: "mb-4", children: 'Para trabalhadores urbanos, esse direito é garantido para qualquer atividade realizada entre 22h de um dia e 5h da manhã do dia seguinte. Além de receber um valor maior por hora, a contagem do tempo também é diferente (a hora passa "mais rápido" para fins de pagamento).' })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Como funciona o Cálculo? (Regras de 2025)" }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6 my-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "1. O Acréscimo de 20%" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm mb-2", children: "A hora noturna deve ser paga com um acréscimo de, no mínimo, 20% sobre o valor da hora diurna." }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("strong", { children: "Exemplo:" }),
                " Se sua hora normal vale R$ 10,00, a hora noturna vale R$ 12,00."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "2. A Hora Reduzida (Hora Ficta)" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm mb-2", children: 'Aqui está o "pulo do gato" que muita gente esquece. Entre 22h e 5h, a hora de trabalho não tem 60 minutos, mas sim 52 minutos e 30 segundos.' }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
                "Na prática, cada hora de relógio trabalhada à noite equivale a ",
                /* @__PURE__ */ jsx("strong", { children: "1,1428 horas" }),
                " para fins de pagamento."
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Passo a Passo para Calcular" }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-8 rounded-3xl border border-white/5", children: [
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Nossa calculadora faz a conversão automática, mas a lógica manual é a seguinte:" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-gray-300", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "1" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Descubra o valor da hora normal:" }),
                  " Divida o salário mensal pela jornada (ex: R$ 2.200 ÷ 220 = R$ 10,00)."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "2" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Aplique os 20%:" }),
                  " Multiplique o valor da hora por 0,20 para achar o valor do adicional (R$ 10,00 × 0,20 = R$ 2,00 de adicional)."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "3" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Considere a Hora Reduzida:" }),
                  " Se você trabalhou a noite toda (22h às 5h), multiplique o número de horas pelo fator de redução ou considere 8 horas pagas para cada 7 trabalhadas."
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-blue-500/10 border-l-4 border-blue-500 p-6 rounded-r-xl mb-16", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "💡 E se o turno passar das 5h da manhã?" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-300", children: "Se você cumpriu jornada noturna integral e continuou trabalhando após as 5h (hora extra ou continuação de turno), a lei entende que o cansaço continua. Por isso, o adicional noturno também deve ser pago sobre as horas trabalhadas após as 5h da manhã (Súmula 60 do TST)." })
        ] }),
        /* @__PURE__ */ jsx(
          FAQ,
          {
            items: NIGHT_SHIFT_FAQS,
            title: "Dúvidas Frequentes sobre Adicional Noturno",
            className: "py-12",
            showSocialProof: false
          }
        )
      ] }),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
};
const FGTS_FAQS = [
  {
    question: "Quem tem direito ao depósito de FGTS?",
    answer: "Todo trabalhador contratado pelo regime CLT (carteira assinada), trabalhadores rurais, domésticos, temporários, avulsos, safreiros e atletas profissionais."
  },
  {
    question: "Quando posso sacar esse dinheiro?",
    answer: "O FGTS não pode ser sacado a qualquer momento. As principais situações de saque são: Demissão sem justa causa; Aposentadoria; Compra da casa própria; Doenças graves (Câncer, HIV, etc.); Saque-Aniversário (uma parcela por ano); Calamidade pública (enchentes, desastres)."
  },
  {
    question: "O rendimento do FGTS é bom?",
    answer: "Historicamente, o FGTS rendia pouco (3% + TR), perdendo para a inflação. Porém, com a Distribuição de Lucros instituída nos últimos anos, a rentabilidade tem melhorado, muitas vezes superando a Poupança e chegando perto do CDI em alguns anos."
  },
  {
    question: "O Saque-Aniversário interfere no saldo futuro?",
    answer: "Sim! Se você opta pelo Saque-Aniversário, retira uma parte do dinheiro todo ano. Isso diminui o montante que fica rendendo juros, resultando em um saldo futuro menor do que se deixasse o dinheiro quieto."
  },
  {
    question: "Como consultar meu saldo atual?",
    answer: "A calculadora faz uma projeção. Para saber o saldo real que já está lá hoje, você deve baixar o App FGTS oficial da Caixa Econômica Federal ou consultar via Internet Banking da Caixa."
  }
];
const FGTSPage = () => {
  const [salary, setSalary] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [periodMonths, setPeriodMonths] = useState(12);
  const [depositRate, setDepositRate] = useState(0.08);
  const [result, setResult] = useState(null);
  const calculateFGTS = () => {
    if (!salary) return;
    const monthlyDeposit = salary * depositRate;
    const monthlyYieldRate = 2466e-6;
    const fvBalance = currentBalance * Math.pow(1 + monthlyYieldRate, periodMonths);
    const fvDeposits = monthlyDeposit * ((Math.pow(1 + monthlyYieldRate, periodMonths) - 1) / monthlyYieldRate);
    const totalFutureBalance = fvBalance + fvDeposits;
    const totalDeposited = currentBalance + monthlyDeposit * periodMonths;
    const totalYield = totalFutureBalance - totalDeposited;
    setResult({
      monthlyDeposit,
      totalFutureBalance,
      totalDeposited,
      totalYield,
      periodMonths
    });
  };
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de FGTS (Saldo Futuro)",
    "description": "Quer saber quanto dinheiro você terá no Fundo de Garantia daqui a alguns anos? Simule o rendimento do seu FGTS com depósitos mensais e juros.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Calculadora de FGTS - Simule seu Saldo Futuro e Rendimento",
        description: "Quanto você terá de FGTS daqui a 5 anos? Use nossa calculadora de projeção de FGTS e descubra o valor acumulado com juros e depósitos mensais.",
        canonical: "/calculadoras/fgts"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FGTS_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "FGTS", href: "/calculadoras/fgts" }
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsx(PiggyBank, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Planejamento Financeiro" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "FGTS" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Quer saber quanto dinheiro você terá no Fundo de Garantia daqui a alguns anos? Simule o rendimento do seu FGTS com depósitos mensais e juros." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          className: "grid lg:grid-cols-12 gap-8 mb-24",
          children: [
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-white mb-6 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-primary" }),
                "Dados da Simulação"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "salary", className: "block text-sm text-gray-400 mb-2", children: "Salário Bruto (R$)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "salary",
                        type: "number",
                        placeholder: "Ex: 3000",
                        value: salary || "",
                        onChange: (e) => setSalary(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "currentBalance", className: "block text-sm text-gray-400 mb-2", children: "Saldo Atual no FGTS (Opcional)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "currentBalance",
                        type: "number",
                        placeholder: "Ex: 5000",
                        value: currentBalance || "",
                        onChange: (e) => setCurrentBalance(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "periodMonths", className: "block text-sm text-gray-400 mb-2", children: "Período de Projeção (Meses)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(Calendar, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "periodMonths",
                        type: "number",
                        placeholder: "Ex: 60 (5 anos)",
                        value: periodMonths || "",
                        onChange: (e) => setPeriodMonths(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "depositRate", className: "block text-sm text-gray-400 mb-2", children: "Tipo de Contrato" }),
                  /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsxs(
                    "select",
                    {
                      id: "depositRate",
                      value: depositRate,
                      onChange: (e) => setDepositRate(Number(e.target.value)),
                      className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none",
                      children: [
                        /* @__PURE__ */ jsx("option", { value: 0.08, children: "Padrão CLT (8%)" }),
                        /* @__PURE__ */ jsx("option", { value: 0.02, children: "Jovem Aprendiz (2%)" }),
                        /* @__PURE__ */ jsx("option", { value: 0.112, children: "Trabalhador Doméstico (11,2%)" })
                      ]
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-4 pt-4", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: calculateFGTS,
                      className: "flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]",
                      children: "Projetar Saldo"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => {
                        setSalary(0);
                        setCurrentBalance(0);
                        setPeriodMonths(12);
                        setResult(null);
                      },
                      className: "px-6 bg-white/5 hover:bg-white/10 text-white font-medium py-4 rounded-xl transition-all",
                      children: "Limpar"
                    }
                  )
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" }),
              /* @__PURE__ */ jsx("div", { className: "relative z-10", children: result ? /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { type: "spring", stiffness: 200, damping: 20 },
                  className: "space-y-6",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
                      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest", children: "Saldo Futuro Estimado" }),
                      /* @__PURE__ */ jsx("div", { className: "text-5xl font-bold text-white mb-2", children: formatCurrency(result.totalFutureBalance) }),
                      /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
                        "Valor acumulado após ",
                        result.periodMonths,
                        " meses"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("span", { className: "block text-gray-300", children: "Depósito Mensal" }),
                          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: "Baseado no salário atual" })
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: formatCurrency(result.monthlyDeposit) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("span", { className: "block text-gray-300", children: "Total Depositado" }),
                          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: "Saldo inicial + Aportes" })
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: formatCurrency(result.totalDeposited) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("span", { className: "block text-emerald-400 font-bold", children: "Rendimento (Juros)" }),
                          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Lucro do período" })
                        ] }),
                        /* @__PURE__ */ jsxs("span", { className: "text-white font-bold text-xl", children: [
                          "+",
                          formatCurrency(result.totalYield)
                        ] })
                      ] })
                    ] })
                  ]
                }
              ) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full py-12 opacity-50", children: [
                /* @__PURE__ */ jsx(PiggyBank, { className: "w-16 h-16 text-gray-600 mb-4" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg text-center", children: "Preencha os dados para projetar seu FGTS" })
              ] }) })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-24 max-w-4xl mx-auto prose prose-invert prose-lg", children: [
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Como o seu FGTS cresce?" }),
          /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-none text-gray-400 leading-relaxed", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-4", children: 'O Fundo de Garantia do Tempo de Serviço (FGTS) funciona como uma "poupança forçada" e cumulativa. Todo mês, a empresa deposita uma porcentagem do seu salário em uma conta na Caixa Econômica Federal. Esse dinheiro não fica parado: ele rende juros mensais e recebe distribuição de lucros anual.' }),
            /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Nossa calculadora projeta o Saldo Futuro considerando os dois fatores principais de crescimento:" }),
            /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside space-y-2 text-gray-300", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Os Depósitos Mensais:" }),
                " O valor que a empresa coloca todo mês."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "A Rentabilidade:" }),
                " Os juros compostos que fazem o dinheiro render ao longo do tempo."
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Regras de Depósito e Rendimento" }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6 my-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "1. Valor do Depósito" }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Trabalhador Padrão (CLT):" }),
                  " 8% do salário bruto."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Jovem Aprendiz:" }),
                  " 2% do salário."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Trabalhador Doméstico:" }),
                  " 11,2% (8% + 3,2%)."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "2. Rendimento (Juros + TR)" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-2", children: "O dinheiro na conta do FGTS rende 3% ao ano mais a TR (Taxa Referencial)." }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Além disso, anualmente o governo realiza a Distribuição de Lucros do FGTS." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Passo a Passo do Cálculo" }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-8 rounded-3xl border border-white/5", children: [
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "A conta manual de juros compostos com aportes mensais é complexa, mas a lógica é esta:" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-gray-300", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "1" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Aporte Mensal:" }),
                  " Calcula-se 8% do seu Salário Bruto."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "2" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Acúmulo:" }),
                  " Multiplica-se esse valor pelo número de meses trabalhados."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "3" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Juros sobre Saldo:" }),
                  " Todo dia 10, o saldo total da conta recebe a correção monetária (JAM)."
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-yellow-500/10 border-l-4 border-yellow-500 p-6 rounded-r-xl mb-16", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "💡 Dica de Ouro" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-300", children: "O FGTS não é descontado do seu salário! Ele é uma obrigação do empregador. Se no seu holerite aparecer desconto de FGTS, a empresa está agindo ilegalmente. O único desconto permitido é o de INSS." })
        ] }),
        /* @__PURE__ */ jsx(
          FAQ,
          {
            items: FGTS_FAQS,
            title: "Dúvidas Frequentes sobre FGTS",
            className: "py-12",
            showSocialProof: false
          }
        )
      ] }),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
};
const EMPLOYEE_COST_FAQS = [
  {
    question: "Qual a porcentagem média de custo sobre o salário?",
    answer: "Para empresas do Simples Nacional, o custo costuma ser cerca de 37% a 40% acima do salário. Para empresas do Lucro Presumido/Real, esse custo pode saltar para 60% a 80% (ou até mais, dependendo dos benefícios)."
  },
  {
    question: "O Vale-Transporte entra no custo total?",
    answer: "Sim. A lei permite descontar até 6% do salário do funcionário. Se a passagem custar mais que isso, a empresa arca com a diferença, e isso entra no custo."
  },
  {
    question: "Por que provisionar Férias e 13º mensalmente?",
    answer: 'Financeiramente, é um erro esperar dezembro chegar para pagar o 13º. O correto é considerar que, a cada mês trabalhado, a empresa já "deve" 1/12 desse valor. Nossa calculadora mostra esse custo mensalizado para você precificar corretamente seu produto/serviço.'
  },
  {
    question: "Contratar PJ ou CLT?",
    answer: "Financeiramente, o PJ costuma ser mais barato por não ter encargos trabalhistas. Porém, exige cuidado jurídico: se houver subordinação e horário fixo, a justiça pode reconhecer vínculo empregatício e cobrar todos os encargos retroativos com multa."
  }
];
const EmployeeCostPage = () => {
  const [salary, setSalary] = useState(0);
  const [transportVoucher, setTransportVoucher] = useState(0);
  const [mealVoucher, setMealVoucher] = useState(0);
  const [otherBenefits, setOtherBenefits] = useState(0);
  const [taxRegime, setTaxRegime] = useState("simples");
  const [result, setResult] = useState(null);
  const calculateCost = () => {
    if (!salary) return;
    const transportDeduction = salary * 0.06;
    const transportCost = Math.max(0, transportVoucher - transportDeduction);
    const benefitsCost = transportCost + mealVoucher + otherBenefits;
    const fgts = salary * 0.08;
    let inssPatronal = 0;
    let systemS = 0;
    if (taxRegime === "presumido") {
      inssPatronal = salary * 0.2;
      systemS = salary * 0.058;
      systemS = salary * 0.08;
    }
    const totalTaxes = fgts + inssPatronal + systemS;
    const vacationProvision = salary / 12 * 1.3333;
    const thirteenthProvision = salary / 12;
    const fgtsFineProvision = salary * 0.04;
    const provisionsBase = vacationProvision + thirteenthProvision;
    const taxesOnProvisions = provisionsBase * (0.08 + (taxRegime === "presumido" ? 0.28 : 0));
    const totalProvisions = vacationProvision + thirteenthProvision + fgtsFineProvision + taxesOnProvisions;
    const totalCost = salary + benefitsCost + totalTaxes + totalProvisions;
    setResult({
      salary,
      benefitsCost,
      totalTaxes,
      totalProvisions,
      totalCost,
      details: {
        fgts,
        inssPatronal,
        systemS,
        vacationProvision,
        thirteenthProvision,
        fgtsFineProvision,
        transportCost
      }
    });
  };
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Custo de Funcionário",
    "description": "Vai contratar? Descubra o custo real de um funcionário CLT para o seu bolso (além do salário).",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Calculadora de Custo de Funcionário 2025 - Quanto Custa Contratar?",
        description: "Simples Nacional ou Lucro Presumido? Descubra o custo total de um funcionário CLT para sua empresa, incluindo impostos, férias, 13º e FGTS.",
        canonical: "/calculadoras/custo-funcionario"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": EMPLOYEE_COST_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Custo de Funcionário", href: "/calculadoras/custo-funcionario" }
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsx(Building2, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Para Empresas" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "Custo de Funcionário" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Vai contratar? Descubra o custo real de um funcionário CLT para o seu bolso (além do salário)." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          className: "grid lg:grid-cols-12 gap-8 mb-24",
          children: [
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-white mb-6 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-primary" }),
                "Dados da Contratação"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-3", children: "Regime Tributário" }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2 p-1 bg-black/30 rounded-xl border border-white/10", children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => setTaxRegime("simples"),
                        className: `py-2 px-4 rounded-lg text-sm font-medium transition-all ${taxRegime === "simples" ? "bg-primary text-black shadow-lg" : "text-gray-400 hover:text-white"}`,
                        children: "Simples Nacional"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => setTaxRegime("presumido"),
                        className: `py-2 px-4 rounded-lg text-sm font-medium transition-all ${taxRegime === "presumido" ? "bg-primary text-black shadow-lg" : "text-gray-400 hover:text-white"}`,
                        children: "Lucro Presumido/Real"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "salary", className: "block text-sm text-gray-400 mb-2", children: "Salário Bruto (R$)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "salary",
                        type: "number",
                        placeholder: "Ex: 3000",
                        value: salary || "",
                        onChange: (e) => setSalary(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "transport", className: "block text-sm text-gray-400 mb-2", children: "Vale-Transporte (Valor Mensal)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "transport",
                        type: "number",
                        placeholder: "Ex: 400",
                        value: transportVoucher || "",
                        onChange: (e) => setTransportVoucher(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "meal", className: "block text-sm text-gray-400 mb-2", children: "Vale-Refeição/Alimentação" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "meal",
                        type: "number",
                        placeholder: "Ex: 600",
                        value: mealVoucher || "",
                        onChange: (e) => setMealVoucher(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "other", className: "block text-sm text-gray-400 mb-2", children: "Outros Benefícios (Saúde, etc)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "other",
                        type: "number",
                        placeholder: "Ex: 300",
                        value: otherBenefits || "",
                        onChange: (e) => setOtherBenefits(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-4 pt-4", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: calculateCost,
                      className: "flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]",
                      children: "Calcular Custo"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => {
                        setSalary(0);
                        setTransportVoucher(0);
                        setMealVoucher(0);
                        setOtherBenefits(0);
                        setResult(null);
                      },
                      className: "px-6 bg-white/5 hover:bg-white/10 text-white font-medium py-4 rounded-xl transition-all",
                      children: "Limpar"
                    }
                  )
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" }),
              /* @__PURE__ */ jsx("div", { className: "relative z-10", children: result ? /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { type: "spring", stiffness: 200, damping: 20 },
                  className: "space-y-6",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
                      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest", children: "Custo Total Mensal" }),
                      /* @__PURE__ */ jsx("div", { className: "text-5xl font-bold text-white mb-2", children: formatCurrency(result.totalCost) }),
                      /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
                        ((result.totalCost / result.salary - 1) * 100).toFixed(1),
                        "% acima do salário bruto"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
                      /* @__PURE__ */ jsx("div", { className: "bg-white/5 rounded-xl p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-gray-300 font-medium", children: "Salário Bruto" }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: formatCurrency(result.salary) })
                      ] }) }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
                          /* @__PURE__ */ jsx("span", { className: "text-gray-300 font-medium", children: "Encargos Sociais" }),
                          /* @__PURE__ */ jsx("span", { className: "text-red-400 font-bold", children: formatCurrency(result.totalTaxes) })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500 space-y-1 pl-2 border-l border-white/10", children: [
                          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                            /* @__PURE__ */ jsx("span", { children: "FGTS (8%)" }),
                            /* @__PURE__ */ jsx("span", { children: formatCurrency(result.details.fgts) })
                          ] }),
                          result.details.inssPatronal > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                            /* @__PURE__ */ jsx("span", { children: "INSS Patronal (20%)" }),
                            /* @__PURE__ */ jsx("span", { children: formatCurrency(result.details.inssPatronal) })
                          ] }),
                          result.details.systemS > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                            /* @__PURE__ */ jsx("span", { children: "Sistema S / RAT" }),
                            /* @__PURE__ */ jsx("span", { children: formatCurrency(result.details.systemS) })
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
                          /* @__PURE__ */ jsx("span", { className: "text-gray-300 font-medium", children: "Provisões Mensais" }),
                          /* @__PURE__ */ jsx("span", { className: "text-yellow-400 font-bold", children: formatCurrency(result.totalProvisions) })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500 space-y-1 pl-2 border-l border-white/10", children: [
                          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                            /* @__PURE__ */ jsx("span", { children: "Férias + 1/3" }),
                            /* @__PURE__ */ jsx("span", { children: formatCurrency(result.details.vacationProvision) })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                            /* @__PURE__ */ jsx("span", { children: "13º Salário" }),
                            /* @__PURE__ */ jsx("span", { children: formatCurrency(result.details.thirteenthProvision) })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                            /* @__PURE__ */ jsx("span", { children: "Multa FGTS (4%)" }),
                            /* @__PURE__ */ jsx("span", { children: formatCurrency(result.details.fgtsFineProvision) })
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
                          /* @__PURE__ */ jsx("span", { className: "text-gray-300 font-medium", children: "Benefícios" }),
                          /* @__PURE__ */ jsx("span", { className: "text-blue-400 font-bold", children: formatCurrency(result.benefitsCost) })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500 space-y-1 pl-2 border-l border-white/10", children: [
                          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                            /* @__PURE__ */ jsx("span", { children: "Vale-Transporte (Custo Empresa)" }),
                            /* @__PURE__ */ jsx("span", { children: formatCurrency(result.details.transportCost) })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                            /* @__PURE__ */ jsx("span", { children: "Vale-Refeição/Outros" }),
                            /* @__PURE__ */ jsx("span", { children: formatCurrency(mealVoucher + otherBenefits) })
                          ] })
                        ] })
                      ] })
                    ] })
                  ]
                }
              ) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full py-12 opacity-50", children: [
                /* @__PURE__ */ jsx(Briefcase, { className: "w-16 h-16 text-gray-600 mb-4" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg text-center", children: "Preencha os dados para calcular o custo total" })
              ] }) })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-24 max-w-4xl mx-auto prose prose-invert prose-lg", children: [
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Quanto custa um funcionário de verdade?" }),
          /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-none text-gray-400 leading-relaxed", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Muitos empreendedores cometem o erro de olhar apenas para o salário bruto na hora de contratar. A realidade é que, no Brasil, um funcionário CLT pode custar para a empresa quase o dobro do salário registrado em carteira." }),
            /* @__PURE__ */ jsx("p", { className: "mb-4", children: 'Nossa calculadora revela os "custos invisíveis" da contratação, considerando impostos, benefícios obrigatórios e as provisões que você precisa guardar todo mês para não ser pego de surpresa.' })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "O Que Compõe o Custo?" }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6 my-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "1. Salário e Benefícios" }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Salário Bruto:" }),
                  " O valor contratado."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Vale-Transporte:" }),
                  " A empresa paga o que exceder 6% do salário."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Vale-Refeição:" }),
                  " Valor definido pela empresa."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "2. Encargos Sociais" }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "FGTS:" }),
                  " 8% do salário bruto."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "INSS Patronal:" }),
                  " Até 20% (Lucro Presumido/Real)."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Sistema S:" }),
                  " Taxas adicionais (exceto Simples)."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "3. Provisões" }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Férias + 1/3:" }),
                  " 1/12 + 1/3 por mês."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "13º Salário:" }),
                  " 1/12 do salário por mês."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Multa FGTS:" }),
                  " Provisão de 4% mensal."
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "A Diferença do Regime Tributário" }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-8 rounded-3xl border border-white/5", children: [
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "O custo muda drasticamente dependendo do enquadramento da sua empresa:" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-gray-300", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "1" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Simples Nacional:" }),
                  " Geralmente é mais barato. A maioria das empresas do Anexo I, II e III são isentas do INSS Patronal (os 20%), pagando apenas FGTS e provisões."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "2" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Lucro Presumido / Real:" }),
                  " O custo é mais alto. Além do FGTS, a empresa paga 20% de INSS Patronal + Alíquotas de Terceiros (Sistema S) e Seguro de Acidente de Trabalho (RAT)."
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          FAQ,
          {
            items: EMPLOYEE_COST_FAQS,
            title: "Dúvidas Frequentes sobre Custo de Funcionário",
            className: "py-12",
            showSocialProof: false
          }
        )
      ] }),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
};
const PLR_FAQS = [
  {
    question: "PLR sofre desconto de INSS?",
    answer: "Não! Essa é a grande vantagem. Sobre a Participação nos Lucros não incide INSS e nem FGTS. O único desconto possível é o Imposto de Renda (se o valor ultrapassar a faixa de isenção) e a pensão alimentícia (se houver determinação judicial)."
  },
  {
    question: "Quem tem direito a receber PLR?",
    answer: "A PLR não é um direito obrigatório para todas as empresas. Ela depende de negociação coletiva entre a empresa, uma comissão de empregados e o sindicato da categoria. Se estiver prevista em acordo, o pagamento é obrigatório mediante o cumprimento das metas."
  },
  {
    question: "Como funciona a PLR na Rescisão?",
    answer: "Se você sair da empresa antes do pagamento da PLR, tem direito a receber o valor proporcional aos meses trabalhados no ano, desde que as metas da empresa tenham sido atingidas."
  },
  {
    question: "Posso restituir esse imposto na Declaração Anual?",
    answer: 'Como a tributação é "exclusiva na fonte" e definitiva, o valor pago de imposto sobre a PLR geralmente não pode ser restituído na Declaração de Ajuste Anual, nem usado para abater outros impostos. Ele é declarado em uma ficha separada.'
  }
];
const PLRPage = () => {
  const [plrValue, setPlrValue] = useState(0);
  const [alimony, setAlimony] = useState(0);
  const [previousPlr, setPreviousPlr] = useState(0);
  const [previousTaxPaid, setPreviousTaxPaid] = useState(0);
  const [result, setResult] = useState(null);
  const calculatePLR = () => {
    if (!plrValue) return;
    const totalPlrReceived = plrValue + previousPlr;
    const taxBase = totalPlrReceived - alimony;
    let totalTax = 0;
    if (taxBase <= 7640.8) {
      totalTax = 0;
    } else if (taxBase <= 9922.28) {
      totalTax = taxBase * 0.075 - 573.06;
    } else if (taxBase <= 13196.31) {
      totalTax = taxBase * 0.15 - 1317.23;
    } else if (taxBase <= 16380.38) {
      totalTax = taxBase * 0.225 - 2306.95;
    } else {
      totalTax = taxBase * 0.275 - 3125.97;
    }
    totalTax = Math.max(0, totalTax);
    const taxDueNow = Math.max(0, totalTax - previousTaxPaid);
    const netValue = plrValue - taxDueNow;
    const effectiveRate = taxDueNow / plrValue * 100;
    setResult({
      grossPlr: plrValue,
      taxBase,
      totalTax,
      taxDueNow,
      netValue,
      effectiveRate,
      previousPlr,
      previousTaxPaid
    });
  };
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de PLR e IRRF 2025",
    "description": "Vai receber a bolada? Simule o desconto do Imposto de Renda sobre a sua PLR e descubra o valor líquido que cairá na conta.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Calculadora de PLR e IRRF 2025 - Simule seu Valor Líquido",
        description: "Vai receber PLR? Calcule o desconto do Imposto de Renda com a tabela exclusiva de 2025. Saiba quanto sobra líquido na sua conta.",
        canonical: "/calculadoras/plr"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": PLR_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "PLR", href: "/calculadoras/plr" }
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsx(Award, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Benefícios Corporativos" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "PLR e IRRF" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Vai receber a bolada? Simule o desconto do Imposto de Renda sobre a sua PLR e descubra o valor líquido que cairá na conta." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          className: "grid lg:grid-cols-12 gap-8 mb-24",
          children: [
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-white mb-6 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-primary" }),
                "Dados do Recebimento"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "plrValue", className: "block text-sm text-gray-400 mb-2", children: "Valor da PLR a Receber (Bruto)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "plrValue",
                        type: "number",
                        placeholder: "Ex: 15000",
                        value: plrValue || "",
                        onChange: (e) => setPlrValue(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "alimony", className: "block text-sm text-gray-400 mb-2", children: "Pensão Alimentícia (Se houver)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "alimony",
                        type: "number",
                        placeholder: "Ex: 0",
                        value: alimony || "",
                        onChange: (e) => setAlimony(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-white/5", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-4 font-medium", children: "Pagamentos Anteriores (Mesmo Ano)" }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("label", { htmlFor: "previousPlr", className: "block text-xs text-gray-500 mb-2", children: "Valor Já Recebido (1ª Parcela)" }),
                      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" }),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            id: "previousPlr",
                            type: "number",
                            placeholder: "Ex: 0",
                            value: previousPlr || "",
                            onChange: (e) => setPreviousPlr(Number(e.target.value)),
                            className: "w-full bg-black/30 border border-white/10 rounded-xl py-2 pl-8 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("label", { htmlFor: "previousTax", className: "block text-xs text-gray-500 mb-2", children: "IRRF Já Descontado" }),
                      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" }),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            id: "previousTax",
                            type: "number",
                            placeholder: "Ex: 0",
                            value: previousTaxPaid || "",
                            onChange: (e) => setPreviousTaxPaid(Number(e.target.value)),
                            className: "w-full bg-black/30 border border-white/10 rounded-xl py-2 pl-8 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                          }
                        )
                      ] })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-4 pt-4", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: calculatePLR,
                      className: "flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]",
                      children: "Calcular Líquido"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => {
                        setPlrValue(0);
                        setAlimony(0);
                        setPreviousPlr(0);
                        setPreviousTaxPaid(0);
                        setResult(null);
                      },
                      className: "px-6 bg-white/5 hover:bg-white/10 text-white font-medium py-4 rounded-xl transition-all",
                      children: "Limpar"
                    }
                  )
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" }),
              /* @__PURE__ */ jsx("div", { className: "relative z-10", children: result ? /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { type: "spring", stiffness: 200, damping: 20 },
                  className: "space-y-6",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
                      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest", children: "Valor Líquido a Receber" }),
                      /* @__PURE__ */ jsx("div", { className: "text-5xl font-bold text-white mb-2", children: formatCurrency(result.netValue) }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Após desconto do IRRF" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("span", { className: "block text-gray-300", children: "Valor Bruto (Atual)" }),
                          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: "Valor a ser pago agora" })
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: formatCurrency(result.grossPlr) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("span", { className: "block text-gray-300", children: "Base de Cálculo Total" }),
                          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: "Soma PLR Anual - Pensão" })
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: formatCurrency(result.taxBase) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("span", { className: "block text-red-400 font-bold", children: "IRRF Retido" }),
                          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Imposto a pagar nesta parcela" })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
                          /* @__PURE__ */ jsxs("span", { className: "block text-white font-bold text-xl", children: [
                            "-",
                            formatCurrency(result.taxDueNow)
                          ] }),
                          /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-500", children: [
                            "Alíquota Efetiva: ",
                            result.effectiveRate.toFixed(2),
                            "%"
                          ] })
                        ] })
                      ] })
                    ] })
                  ]
                }
              ) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full py-12 opacity-50", children: [
                /* @__PURE__ */ jsx(Award, { className: "w-16 h-16 text-gray-600 mb-4" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg text-center", children: "Preencha os dados para simular o desconto da PLR" })
              ] }) })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-24 max-w-4xl mx-auto prose prose-invert prose-lg", children: [
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "O que é a PLR e como ela é tributada?" }),
          /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-none text-gray-400 leading-relaxed", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-4", children: "A Participação nos Lucros e Resultados (PLR) é um dos benefícios mais aguardados pelos trabalhadores CLT. Diferente do salário mensal, a PLR possui uma tributação exclusiva. Isso significa que ela não se soma aos seus outros rendimentos para o cálculo do Imposto de Renda anual, o que geralmente resulta em um desconto menor." }),
            /* @__PURE__ */ jsx("p", { className: "mb-4", children: 'O "Leão" morde uma parte, mas a tabela usada é específica e mais vantajosa, com faixas de isenção mais altas do que as aplicadas aos salários normais.' })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Tabela de IR sobre PLR (Regras 2025)" }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-8 rounded-3xl border border-white/5", children: [
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "As faixas de valores são reajustadas anualmente pelo governo. Confira a lógica:" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-gray-300", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "1" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Faixa 1 (Isenção):" }),
                  ' Valores de PLR até R$ 7.640,80 estão totalmente isentos de imposto. O valor entra "limpo" na sua conta.'
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "2" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Faixas seguintes:" }),
                  ' Acima da isenção, aplicam-se alíquotas de 7,5%, 15%, 22,5% e 27,5%, sempre com uma "parcela a deduzir" para suavizar o imposto.'
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-4", children: "*Nota: Os valores das faixas podem sofrer reajustes. Nossa calculadora utiliza sempre a tabela oficial vigente." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Passo a Passo do Cálculo" }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6 my-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "Como calcular?" }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "1. Identifique a Faixa:" }),
                  " Veja em qual linha da tabela o valor total da sua PLR se encaixa."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "2. Aplique a Alíquota:" }),
                  " Multiplique o valor total da PLR pela porcentagem correspondente."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "3. Subtraia a Dedução:" }),
                  ' Do resultado anterior, subtraia o valor da "Parcela a Deduzir".'
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-yellow-500", children: "⚠️ Atenção a Parcelas!" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Se a sua empresa paga a PLR em duas parcelas no mesmo ano, o imposto é recalculado no segundo pagamento considerando a soma total recebida. Isso pode fazer com que o desconto na segunda parcela pareça muito maior." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          FAQ,
          {
            items: PLR_FAQS,
            title: "Dúvidas Frequentes sobre PLR",
            className: "py-12",
            showSocialProof: false
          }
        )
      ] }),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
};
const FIRE_FAQS = [
  {
    question: "O que é a Regra dos 4%?",
    answer: "É uma regra empírica usada para determinar quanto você pode retirar da sua carteira de investimentos a cada ano sem ficar sem dinheiro. Segundo estudos, 4% é uma taxa de retirada segura para a maioria dos cenários econômicos."
  },
  {
    question: "Quanto dinheiro preciso para parar de trabalhar?",
    answer: "Pela Regra dos 4%, você precisa acumular 25 vezes o seu custo de vida anual. Por exemplo, se você gasta R$ 5.000 por mês (R$ 60.000 por ano), seu 'Número FIRE' seria R$ 1.500.000 (1,5 milhão)."
  },
  {
    question: "A inflação afeta meu plano de aposentadoria?",
    answer: "Sim, drasticamente. R$ 5.000 hoje não comprarão as mesmas coisas daqui a 20 anos. Nossa calculadora desconta a inflação da rentabilidade para mostrar o tempo real até a liberdade."
  },
  {
    question: "Posso me aposentar com pouco dinheiro investido?",
    answer: "Depende do seu custo de vida. O segredo do FIRE não é apenas ganhar muito, mas gastar pouco (frugalidade). Quanto menor for o seu custo mensal, menor será o montante necessário para atingir a liberdade."
  }
];
const FIREPage = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [currentPatrimony, setCurrentPatrimony] = useState(0);
  const [monthlyContribution, setMonthlyContribution] = useState(0);
  const [annualReturn, setAnnualReturn] = useState(10);
  const [inflation, setInflation] = useState(4);
  const [result, setResult] = useState(null);
  const calculateFIRE = () => {
    if (!monthlyExpenses) return;
    const annualExpenses = monthlyExpenses * 12;
    const fireNumber = annualExpenses * 25;
    const realAnnualRate = (1 + annualReturn / 100) / (1 + inflation / 100) - 1;
    const realMonthlyRate = Math.pow(1 + realAnnualRate, 1 / 12) - 1;
    let monthsToFire = 0;
    if (currentPatrimony >= fireNumber) {
      monthsToFire = 0;
    } else {
      const numerator = fireNumber * realMonthlyRate + monthlyContribution;
      const denominator = currentPatrimony * realMonthlyRate + monthlyContribution;
      if (denominator <= 0) {
        monthsToFire = Infinity;
      } else {
        monthsToFire = Math.log(numerator / denominator) / Math.log(1 + realMonthlyRate);
      }
    }
    const yearsToFire = Math.floor(monthsToFire / 12);
    const remainingMonths = Math.ceil(monthsToFire % 12);
    setResult({
      fireNumber,
      realAnnualRate: realAnnualRate * 100,
      yearsToFire,
      remainingMonths,
      isAlreadyFire: currentPatrimony >= fireNumber
    });
  };
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora FIRE (Independência Financeira)",
    "description": "Quanto preciso juntar para parar de trabalhar? Descubra seu Número FIRE e trace o plano exato para viver de renda.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Calculadora FIRE - Quando posso parar de trabalhar?",
        description: "Descubra o seu Número FIRE. Simule quanto dinheiro você precisa investir para alcançar a Independência Financeira e viver de renda passiva (Regra dos 4%).",
        canonical: "/calculadoras/fire"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FIRE_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "FIRE (Independência Financeira)", href: "/calculadoras/fire" }
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsx(Flame, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Planejamento de Vida" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "FIRE" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: '"Quanto preciso juntar para parar de trabalhar?" Descubra seu Número FIRE e trace o plano exato para viver de renda.' })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          className: "grid lg:grid-cols-12 gap-8 mb-24",
          children: [
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-white mb-6 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-primary" }),
                "Seus Dados"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "expenses", className: "block text-sm text-gray-400 mb-2", children: "Custo de Vida Mensal (R$)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "expenses",
                        type: "number",
                        placeholder: "Ex: 5000",
                        value: monthlyExpenses || "",
                        onChange: (e) => setMonthlyExpenses(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "patrimony", className: "block text-sm text-gray-400 mb-2", children: "Patrimônio Atual (R$)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "patrimony",
                        type: "number",
                        placeholder: "Ex: 50000",
                        value: currentPatrimony || "",
                        onChange: (e) => setCurrentPatrimony(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "contribution", className: "block text-sm text-gray-400 mb-2", children: "Aporte Mensal (R$)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(TrendingUp, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "contribution",
                        type: "number",
                        placeholder: "Ex: 1500",
                        value: monthlyContribution || "",
                        onChange: (e) => setMonthlyContribution(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "return", className: "block text-sm text-gray-400 mb-2", children: "Rentabilidade Anual (%)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "return",
                        type: "number",
                        value: annualReturn,
                        onChange: (e) => setAnnualReturn(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "inflation", className: "block text-sm text-gray-400 mb-2", children: "Inflação Anual (%)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "inflation",
                        type: "number",
                        value: inflation,
                        onChange: (e) => setInflation(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-4 pt-4", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: calculateFIRE,
                      className: "flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]",
                      children: "Calcular Liberdade"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => {
                        setMonthlyExpenses(0);
                        setCurrentPatrimony(0);
                        setMonthlyContribution(0);
                        setResult(null);
                      },
                      className: "px-6 bg-white/5 hover:bg-white/10 text-white font-medium py-4 rounded-xl transition-all",
                      children: "Limpar"
                    }
                  )
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" }),
              /* @__PURE__ */ jsx("div", { className: "relative z-10", children: result ? /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { type: "spring", stiffness: 200, damping: 20 },
                  className: "space-y-6",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
                      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest", children: "Seu Número FIRE" }),
                      /* @__PURE__ */ jsx("div", { className: "text-5xl font-bold text-white mb-2", children: formatCurrency(result.fireNumber) }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Meta para viver de renda (Regra dos 4%)" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("span", { className: "block text-gray-300", children: "Tempo Estimado" }),
                          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: "Considerando juros reais" })
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold text-xl", children: result.isAlreadyFire ? "Você já atingiu a liberdade!" : `${result.yearsToFire} anos e ${result.remainingMonths} meses` })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("span", { className: "block text-gray-300", children: "Taxa Real (Acima da Inflação)" }),
                          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: "Rentabilidade líquida de inflação" })
                        ] }),
                        /* @__PURE__ */ jsxs("span", { className: "text-white font-bold", children: [
                          result.realAnnualRate.toFixed(2),
                          "% a.a."
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("span", { className: "block text-emerald-400 font-bold", children: "Renda Passiva Mensal" }),
                          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Ao atingir a meta (4% a.a. / 12)" })
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold text-xl", children: formatCurrency(result.fireNumber * 0.04 / 12) })
                      ] })
                    ] })
                  ]
                }
              ) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full py-12 opacity-50", children: [
                /* @__PURE__ */ jsx(Target, { className: "w-16 h-16 text-gray-600 mb-4" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg text-center", children: "Preencha os dados para traçar seu plano FIRE" })
              ] }) })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-24 max-w-4xl mx-auto prose prose-invert prose-lg", children: [
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "O que é o Movimento FIRE?" }),
          /* @__PURE__ */ jsx("div", { className: "prose prose-invert max-w-none text-gray-400 leading-relaxed", children: /* @__PURE__ */ jsx("p", { className: "mb-4", children: "FIRE (Financial Independence, Retire Early) não é apenas sobre dinheiro, é sobre tempo. A filosofia se baseia em acumular ativos suficientes para que o rendimento passivo cubra todas as suas despesas de vida, permitindo que você se aposente décadas antes do previsto." }) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Conceitos Fundamentais" }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6 my-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "1. O Número FIRE" }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
                'É o valor "mágico" que você precisa acumular. A regra básica é simples: ',
                /* @__PURE__ */ jsx("strong", { children: "Custo de Vida Anual × 25" }),
                "."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "2. A Regra dos 4%" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Afirma que se você sacar 4% do seu patrimônio investido anualmente, historicamente seu dinheiro não acabará por pelo menos 30 anos." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "3. Aceleração" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Quanto maior a porcentagem da sua renda que você investe (taxa de poupança), menos tempo leva para atingir a liberdade." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Como usar a calculadora?" }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-8 rounded-3xl border border-white/5", children: [
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Para descobrir quando você será livre, nossa ferramenta cruza três dados fundamentais:" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-gray-300", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "1" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Custo de Vida Mensal:" }),
                  " Quanto você precisa para viver confortavelmente hoje? (Seja realista, inclua lazer e saúde)."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "2" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Patrimônio Atual:" }),
                  " Quanto você já tem investido em ativos geradores de renda?"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "3" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Aporte Mensal:" }),
                  " Quanto você consegue poupar e investir rigorosamente todo mês?"
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-yellow-500/10 border-l-4 border-yellow-500 p-6 rounded-r-xl mb-16", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "⚠️ Atenção à Inflação!" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-300", children: [
            "Muitas calculadoras na internet ignoram a inflação e mostram resultados ilusórios. O FinZap utiliza a ",
            /* @__PURE__ */ jsx("strong", { children: "Taxa Real" }),
            " (Rentabilidade Nominal - Inflação) para garantir que o valor projetado mantenha o poder de compra. Se o seu investimento rende 10% e a inflação é 4%, seu ganho real para fins de liberdade financeira é de apenas 6%."
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          FAQ,
          {
            items: FIRE_FAQS,
            title: "Dúvidas Frequentes sobre FIRE",
            className: "py-12",
            showSocialProof: false
          }
        )
      ] }),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
};
const COMPOUND_INTEREST_FAQS = [
  {
    question: "O que são Juros Compostos?",
    answer: 'São os famosos "juros sobre juros". Diferente dos juros simples, onde o rendimento é calculado apenas sobre o valor inicial, nos juros compostos o rendimento do mês anterior é somado ao capital e passa a render também no mês seguinte. É o efeito bola de neve.'
  },
  {
    question: "Qual a diferença entre Juros Simples e Compostos?",
    answer: "Imagine investir R$ 1.000 a 10% ao mês. Nos juros simples, você ganha R$ 100 todo mês, para sempre. Nos juros compostos, você ganha R$ 100 no primeiro mês, R$ 110 no segundo, R$ 121 no terceiro, e assim por diante."
  },
  {
    question: "Para que serve esta calculadora?",
    answer: "Ela é uma ferramenta genérica e flexível. Serve para simular qualquer investimento de renda fixa (CDB, Tesouro, LCI), crescimento de poupança, evolução de dívidas de cartão de crédito ou apenas para estudar o poder do tempo nas suas finanças."
  },
  {
    question: "A frequência dos aportes importa?",
    answer: "Sim! A mágica dos juros compostos depende de manter a roda girando. Fazer aportes mensais aumenta drasticamente o montante final, pois você está sempre aumentando a base sobre a qual os juros incidem."
  }
];
const CompoundInterestPage = () => {
  const [initialCapital, setInitialCapital] = useState(0);
  const [monthlyContribution, setMonthlyContribution] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [rateType, setRateType] = useState("monthly");
  const [period, setPeriod] = useState(0);
  const [periodType, setPeriodType] = useState("years");
  const [result, setResult] = useState(null);
  const calculateCompoundInterest = () => {
    if (!initialCapital && !monthlyContribution) return;
    let monthlyRate = 0;
    if (rateType === "monthly") {
      monthlyRate = interestRate / 100;
    } else {
      monthlyRate = Math.pow(1 + interestRate / 100, 1 / 12) - 1;
    }
    const months = periodType === "years" ? period * 12 : period;
    const fvInitial = initialCapital * Math.pow(1 + monthlyRate, months);
    let fvContributions = 0;
    if (monthlyContribution > 0) {
      if (monthlyRate === 0) {
        fvContributions = monthlyContribution * months;
      } else {
        fvContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
      }
    }
    const totalAmount = fvInitial + fvContributions;
    const totalInvested = initialCapital + monthlyContribution * months;
    const totalInterest = totalAmount - totalInvested;
    setResult({
      totalAmount,
      totalInvested,
      totalInterest,
      months
    });
  };
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Juros Compostos",
    "description": "Simule o crescimento exponencial do seu patrimônio com a força dos juros sobre juros.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Calculadora de Juros Compostos - Simulação Online Gratuita",
        description: "O poder dos juros sobre juros. Calcule o retorno de seus investimentos a longo prazo com nossa calculadora de Juros Compostos simples e prática.",
        canonical: "/calculadoras/juros-compostos"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": COMPOUND_INTEREST_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Juros Compostos", href: "/calculadoras/juros-compostos" }
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Investimentos" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "Juros Compostos" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: 'Albert Einstein chamou de "a oitava maravilha do mundo". Simule agora o crescimento exponencial do seu patrimônio com a força dos juros sobre juros.' })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          className: "grid lg:grid-cols-12 gap-8 mb-24",
          children: [
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-white mb-6 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-primary" }),
                "Parâmetros da Simulação"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "initial", className: "block text-sm text-gray-400 mb-2", children: "Valor Inicial (R$)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "initial",
                        type: "number",
                        placeholder: "Ex: 1000",
                        value: initialCapital || "",
                        onChange: (e) => setInitialCapital(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "monthly", className: "block text-sm text-gray-400 mb-2", children: "Aporte Mensal (R$)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "monthly",
                        type: "number",
                        placeholder: "Ex: 500",
                        value: monthlyContribution || "",
                        onChange: (e) => setMonthlyContribution(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Taxa de Juros (%)" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
                      /* @__PURE__ */ jsx(Percent, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "number",
                          placeholder: "Ex: 1",
                          value: interestRate || "",
                          onChange: (e) => setInterestRate(Number(e.target.value)),
                          className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        value: rateType,
                        onChange: (e) => setRateType(e.target.value),
                        className: "bg-black/30 border border-white/10 rounded-xl px-4 text-white focus:outline-none focus:border-primary/50 transition-colors",
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "monthly", children: "Mensal" }),
                          /* @__PURE__ */ jsx("option", { value: "yearly", children: "Anual" })
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Período" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
                      /* @__PURE__ */ jsx(Clock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "number",
                          placeholder: "Ex: 10",
                          value: period || "",
                          onChange: (e) => setPeriod(Number(e.target.value)),
                          className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        value: periodType,
                        onChange: (e) => setPeriodType(e.target.value),
                        className: "bg-black/30 border border-white/10 rounded-xl px-4 text-white focus:outline-none focus:border-primary/50 transition-colors",
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "years", children: "Anos" }),
                          /* @__PURE__ */ jsx("option", { value: "months", children: "Meses" })
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-4 pt-4", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: calculateCompoundInterest,
                      className: "flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]",
                      children: "Calcular"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => {
                        setInitialCapital(0);
                        setMonthlyContribution(0);
                        setInterestRate(0);
                        setPeriod(0);
                        setResult(null);
                      },
                      className: "px-6 bg-white/5 hover:bg-white/10 text-white font-medium py-4 rounded-xl transition-all",
                      children: "Limpar"
                    }
                  )
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" }),
              /* @__PURE__ */ jsx("div", { className: "relative z-10", children: result ? /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { type: "spring", stiffness: 200, damping: 20 },
                  className: "space-y-6",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
                      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest", children: "Valor Total Acumulado" }),
                      /* @__PURE__ */ jsx("div", { className: "text-5xl font-bold text-white mb-2", children: formatCurrency(result.totalAmount) }),
                      /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
                        "Em ",
                        result.months,
                        " meses"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("span", { className: "block text-gray-300", children: "Total Investido" }),
                          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: "Seu dinheiro" })
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: formatCurrency(result.totalInvested) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("span", { className: "block text-emerald-400 font-bold", children: "Total em Juros" }),
                          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Rendimento puro" })
                        ] }),
                        /* @__PURE__ */ jsxs("span", { className: "text-white font-bold text-xl", children: [
                          "+",
                          formatCurrency(result.totalInterest)
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "mt-8", children: [
                      /* @__PURE__ */ jsx("h3", { className: "text-sm text-gray-400 mb-4", children: "Composição do Patrimônio" }),
                      /* @__PURE__ */ jsxs("div", { className: "h-4 bg-white/10 rounded-full overflow-hidden flex", children: [
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: "h-full bg-gray-500",
                            style: { width: `${result.totalInvested / result.totalAmount * 100}%` }
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: "h-full bg-primary",
                            style: { width: `${result.totalInterest / result.totalAmount * 100}%` }
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs mt-2", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-gray-500" }),
                          /* @__PURE__ */ jsxs("span", { className: "text-gray-400", children: [
                            "Investido (",
                            (result.totalInvested / result.totalAmount * 100).toFixed(0),
                            "%)"
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-primary" }),
                          /* @__PURE__ */ jsxs("span", { className: "text-gray-400", children: [
                            "Juros (",
                            (result.totalInterest / result.totalAmount * 100).toFixed(0),
                            "%)"
                          ] })
                        ] })
                      ] })
                    ] })
                  ]
                }
              ) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full py-12 opacity-50", children: [
                /* @__PURE__ */ jsx(BarChart3, { className: "w-16 h-16 text-gray-600 mb-4" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg text-center", children: "Preencha os dados para ver a mágica acontecer" })
              ] }) })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: 0.4 },
          className: "mt-24 max-w-4xl mx-auto prose prose-invert prose-lg",
          children: [
            /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "O Poder dos Juros sobre Juros" }),
              /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-none text-gray-400 leading-relaxed", children: [
                /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Se você quer enriquecer, precisa entender uma única força matemática: os Juros Compostos. Diferente do crescimento linear (onde você soma o mesmo valor todo mês), o crescimento composto é exponencial." }),
                /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Nos juros simples, seu dinheiro cresce em linha reta. Nos juros compostos, ele cresce em uma curva que aponta para o céu. Isso acontece porque o lucro de hoje vira a base de cálculo de amanhã — ou seja, você passa a ganhar dinheiro sobre o dinheiro que o investimento já gerou." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Os 3 Pilares do Enriquecimento" }),
              /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6 my-8", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "1. Aceleração" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: 'Nos primeiros anos, o crescimento parece lento. Mas há um "ponto de virada" onde os rendimentos mensais superam seus próprios aportes.' })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "2. Consistência" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Aportes mensais (mesmo que pequenos) são o combustível que mantém a curva subindo." })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "3. Tempo" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "O fator mais importante. Começar 5 anos antes pode significar o dobro do patrimônio no final." })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "A Fórmula Mágica" }),
              /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-8 rounded-3xl border border-white/5", children: [
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "A matemática por trás da nossa calculadora utiliza a fórmula universal dos juros compostos:" }),
                /* @__PURE__ */ jsx("div", { className: "text-center text-3xl font-bold text-white mb-6 font-mono", children: "M = C (1 + i)ᵗ" }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-gray-300 text-sm", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "M (Montante):" }),
                    " O valor final acumulado."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "C (Capital):" }),
                    " O dinheiro que você tem hoje."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "i (Taxa):" }),
                    " A rentabilidade (quanto rende por mês/ano)."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "t (Tempo):" }),
                    " Por quanto tempo o dinheiro ficará trabalhando."
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-primary/10 border-l-4 border-primary p-6 rounded-r-xl mb-16", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "💡 Dica de Investidor" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-300", children: "Pequenas diferenças na taxa de juros geram impactos gigantescos no longo prazo. Um investimento que rende 1% ao mês resulta em muito mais dinheiro após 20 anos do que um que rende 0,8%. Use a calculadora para comparar taxas e brigar por cada centavo de rentabilidade!" })
            ] }),
            /* @__PURE__ */ jsx(
              FAQ,
              {
                items: COMPOUND_INTEREST_FAQS,
                title: "Dúvidas Frequentes",
                className: "py-12",
                showSocialProof: false
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
};
const RENT_VS_BUY_FAQS = [
  {
    question: "O imóvel sempre valoriza?",
    answer: "Historicamente, imóveis tendem a acompanhar a inflação (INCC) no longo prazo, mas não é garantia. Existem períodos de estagnação ou desvalorização real. Nossa calculadora permite que você simule uma taxa de valorização anual."
  },
  {
    question: "E a segurança de ter onde morar?",
    answer: 'A calculadora foca no aspecto financeiro. O valor emocional de "ter a casa própria", poder reformar e não ter risco de despejo é subjetivo e deve pesar na sua decisão pessoal, mesmo que a matemática diga o contrário.'
  },
  {
    question: "O que é Custo de Oportunidade?",
    answer: "É quanto você deixa de ganhar por ter escolhido um caminho. Ao imobilizar R$ 100 mil na entrada de um apartamento, o custo de oportunidade é o rendimento que esses R$ 100 mil teriam gerado se ficassem aplicados no Tesouro Direto ou CDB."
  },
  {
    question: "Vale a pena quitar o financiamento ou investir?",
    answer: "Geralmente, se a taxa de juros do seu financiamento for maior que o rendimento líquido dos seus investimentos, vale a pena quitar a dívida (amortizar) o quanto antes para parar de pagar juros caros ao banco."
  }
];
const RentVsBuyPage = () => {
  const [propertyValue, setPropertyValue] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(10);
  const [years, setYears] = useState(30);
  const [rentValue, setRentValue] = useState(0);
  const [investmentRate, setInvestmentRate] = useState(10);
  const [appreciationRate, setAppreciationRate] = useState(4);
  const [result, setResult] = useState(null);
  const calculateComparison = () => {
    if (!propertyValue || !rentValue) return;
    const months = years * 12;
    const loanAmount = propertyValue - downPayment;
    const monthlyInterestRate = Math.pow(1 + interestRate / 100, 1 / 12) - 1;
    const monthlyPayment = loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months) / (Math.pow(1 + monthlyInterestRate, months) - 1));
    const monthlyAppreciationRate = Math.pow(1 + appreciationRate / 100, 1 / 12) - 1;
    const finalPropertyValue = propertyValue * Math.pow(1 + monthlyAppreciationRate, months);
    const netWorthBuy = finalPropertyValue;
    const monthlyInvestmentRate = Math.pow(1 + investmentRate / 100, 1 / 12) - 1;
    const fvInitial = downPayment * Math.pow(1 + monthlyInvestmentRate, months);
    const monthlySurplus = monthlyPayment - rentValue;
    let fvSurplus = 0;
    if (monthlySurplus > 0) {
      fvSurplus = monthlySurplus * ((Math.pow(1 + monthlyInvestmentRate, months) - 1) / monthlyInvestmentRate);
    }
    const netWorthRent = fvInitial + fvSurplus;
    setResult({
      monthlyPayment,
      finalPropertyValue,
      netWorthBuy,
      netWorthRent,
      monthlySurplus,
      difference: Math.abs(netWorthBuy - netWorthRent),
      winner: netWorthBuy > netWorthRent ? "buy" : "rent"
    });
  };
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora: Alugar ou Financiar Imóvel?",
    "description": "Descubra matematicamente se vale mais a pena comprar a casa própria ou morar de aluguel e investir a diferença.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Alugar ou Comprar Imóvel? Simulador e Comparativo Financeiro",
        description: "Pare de perder dinheiro. Compare o custo de oportunidade entre financiar um imóvel ou viver de aluguel e investir a diferença com nossa calculadora inteligente.",
        canonical: "/calculadoras/alugar-ou-financiar"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": RENT_VS_BUY_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Alugar ou Financiar", href: "/calculadoras/alugar-ou-financiar" }
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsx(Home$1, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Imóveis" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Alugar ou ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "Financiar?" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "A dúvida de milhões. Descubra matematicamente se vale mais a pena comprar a casa própria ou morar de aluguel e investir a diferença." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          className: "grid lg:grid-cols-12 gap-8 mb-24",
          children: [
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-white mb-6 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-primary" }),
                "Cenários"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Valor do Imóvel (R$)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        placeholder: "Ex: 500000",
                        value: propertyValue || "",
                        onChange: (e) => setPropertyValue(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Entrada Disponível (R$)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        placeholder: "Ex: 100000",
                        value: downPayment || "",
                        onChange: (e) => setDownPayment(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Valor do Aluguel (R$)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        placeholder: "Ex: 2500",
                        value: rentValue || "",
                        onChange: (e) => setRentValue(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Juros Financ. (% a.a.)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        value: interestRate,
                        onChange: (e) => setInterestRate(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Rend. Invest. (% a.a.)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        value: investmentRate,
                        onChange: (e) => setInvestmentRate(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Valorização Imóvel (% a.a.)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        value: appreciationRate,
                        onChange: (e) => setAppreciationRate(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Prazo (Anos)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        value: years,
                        onChange: (e) => setYears(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-4 pt-4", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: calculateComparison,
                      className: "flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]",
                      children: "Comparar"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => {
                        setPropertyValue(0);
                        setDownPayment(0);
                        setRentValue(0);
                        setResult(null);
                      },
                      className: "px-6 bg-white/5 hover:bg-white/10 text-white font-medium py-4 rounded-xl transition-all",
                      children: "Limpar"
                    }
                  )
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" }),
              /* @__PURE__ */ jsx("div", { className: "relative z-10", children: result ? /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { type: "spring", stiffness: 200, damping: 20 },
                  className: "space-y-6",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
                      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest", children: "Veredito Matemático" }),
                      /* @__PURE__ */ jsx("div", { className: `text-4xl md:text-5xl font-bold mb-2 ${result.winner === "rent" ? "text-primary" : "text-blue-400"}`, children: result.winner === "rent" ? "Alugar Venceu" : "Comprar Venceu" }),
                      /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
                        "Diferença patrimonial de ",
                        formatCurrency(result.difference),
                        " em ",
                        years,
                        " anos"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
                      /* @__PURE__ */ jsxs("div", { className: `rounded-xl p-6 border ${result.winner === "buy" ? "bg-blue-500/10 border-blue-500/30" : "bg-white/5 border-white/5"}`, children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
                          /* @__PURE__ */ jsx(Key, { className: `w-5 h-5 ${result.winner === "buy" ? "text-blue-400" : "text-gray-500"}` }),
                          /* @__PURE__ */ jsx("h3", { className: "font-bold text-white", children: "Cenário A: Comprar" })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx("span", { className: "block text-xs text-gray-500", children: "Patrimônio Final (Imóvel)" }),
                            /* @__PURE__ */ jsx("span", { className: "block text-xl font-bold text-white", children: formatCurrency(result.netWorthBuy) })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx("span", { className: "block text-xs text-gray-500", children: "Parcela do Financiamento" }),
                            /* @__PURE__ */ jsx("span", { className: "block text-sm text-gray-300", children: formatCurrency(result.monthlyPayment) })
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: `rounded-xl p-6 border ${result.winner === "rent" ? "bg-primary/10 border-primary/30" : "bg-white/5 border-white/5"}`, children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
                          /* @__PURE__ */ jsx(Building, { className: `w-5 h-5 ${result.winner === "rent" ? "text-primary" : "text-gray-500"}` }),
                          /* @__PURE__ */ jsx("h3", { className: "font-bold text-white", children: "Cenário B: Alugar" })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx("span", { className: "block text-xs text-gray-500", children: "Patrimônio Final (Investimentos)" }),
                            /* @__PURE__ */ jsx("span", { className: "block text-xl font-bold text-white", children: formatCurrency(result.netWorthRent) })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx("span", { className: "block text-xs text-gray-500", children: "Aporte Mensal (Diferença)" }),
                            /* @__PURE__ */ jsx("span", { className: "block text-sm text-gray-300", children: result.monthlySurplus > 0 ? formatCurrency(result.monthlySurplus) : "Sem aporte (Aluguel > Parcela)" })
                          ] })
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "bg-white/5 rounded-xl p-4 text-sm text-gray-400", children: /* @__PURE__ */ jsxs("p", { children: [
                      /* @__PURE__ */ jsx("strong", { children: "Análise:" }),
                      " Ao optar por ",
                      result.winner === "rent" ? "alugar e investir" : "comprar o imóvel",
                      ", você teria um patrimônio ",
                      formatCurrency(result.difference),
                      " maior ao final de ",
                      years,
                      " anos, considerando as taxas informadas."
                    ] }) })
                  ]
                }
              ) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full py-12 opacity-50", children: [
                /* @__PURE__ */ jsx(Home$1, { className: "w-16 h-16 text-gray-600 mb-4" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg text-center", children: "Preencha os dados para comparar os cenários" })
              ] }) })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-24 max-w-4xl mx-auto prose prose-invert prose-lg", children: [
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: 'O Dilema: "Aluguel é dinheiro jogado fora?"' }),
          /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-none text-gray-400 leading-relaxed", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-4", children: 'Crescemos ouvindo que pagar aluguel é rasgar dinheiro e que "quem compra terra não erra". Mas, financeiramente, essa nem sempre é a verdade.' }),
            /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Ao financiar um imóvel, você paga juros ao banco que, muitas vezes, somam o valor de dois ou três imóveis ao final de 30 anos. Por outro lado, o dinheiro que você daria de entrada poderia estar rendendo juros compostos em uma aplicação segura." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Como funciona a comparação?" }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6 my-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-blue-400", children: "Cenário A: O Comprador" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Você usa suas economias para dar a entrada, assume uma dívida de longo prazo e paga as parcelas do financiamento. No final, você tem um imóvel (que pode ter valorizado) e zero dívida." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "Cenário B: O Inquilino Investidor" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Você pega o dinheiro que daria de entrada e investe. Você paga o aluguel mensalmente. Se o aluguel for mais barato que a parcela do financiamento, você também investe essa diferença todos os meses." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Variáveis Importantes" }),
          /* @__PURE__ */ jsx("div", { className: "bg-[#1a1a1a] p-8 rounded-3xl border border-white/5", children: /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-gray-300", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "1" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Taxa de Juros do Financiamento:" }),
                " Quanto mais altos os juros (Selic alta), mais caro fica financiar, favorecendo o aluguel."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "2" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Rendimento da Aplicação:" }),
                " Se você consegue investir bem o dinheiro da entrada (acima da inflação), o aluguel tende a valer mais a pena."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "3" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Valorização do Imóvel:" }),
                " Se o imóvel dobrar de preço rapidamente, a compra se torna vantajosa."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "4" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Valor do Aluguel:" }),
                " A regra de bolso diz que se o aluguel anual custar menos de 4% a 5% do valor do imóvel, compensa alugar."
              ] })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx(
          FAQ,
          {
            items: RENT_VS_BUY_FAQS,
            title: "Dúvidas Frequentes",
            className: "py-12",
            showSocialProof: false
          }
        )
      ] }),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
};
const UBER_VS_CAR_FAQS = [
  {
    question: "O conforto não tem preço?",
    answer: "Tem, e ele deve entrar na sua decisão. Financeiramente o App pode ser melhor, mas ter o carro próprio oferece disponibilidade imediata, cadeirinha para crianças e porta-malas livre. A calculadora foca no dinheiro, mas a decisão final é sua."
  },
  {
    question: "E a tarifa dinâmica?",
    answer: "Nossa calculadora permite que você estime um preço médio por km no aplicativo. Se você usa o app em horários de pico com frequência, o custo mensal pode subir drasticamente, favorecendo o carro próprio."
  },
  {
    question: "Devo vender meu carro e investir o dinheiro?",
    answer: 'Essa é a estratégia do "Custo de Oportunidade". Muitas vezes, o rendimento mensal do valor do carro aplicado (ex: R$ 50.000 rendendo 0,8% ao mês = R$ 400) já paga boa parte das suas corridas de Uber.'
  },
  {
    question: "Carro por assinatura entra na conta?",
    answer: "O carro por assinatura elimina a depreciação, IPVA e seguro (já inclusos), mas tem uma mensalidade alta. Você pode usar nossa calculadora inserindo o valor da assinatura como custo fixo mensal para comparar com o App."
  }
];
const UberVsCarPage = () => {
  const [carValue, setCarValue] = useState(0);
  const [monthlyKm, setMonthlyKm] = useState(0);
  const [consumption, setConsumption] = useState(10);
  const [fuelPrice, setFuelPrice] = useState(5.5);
  const [insurance, setInsurance] = useState(0);
  const [ipva, setIpva] = useState(4);
  const [maintenance, setMaintenance] = useState(0);
  const [parking, setParking] = useState(0);
  const [appPricePerKm, setAppPricePerKm] = useState(2.5);
  const [depreciation, setDepreciation] = useState(15);
  const [opportunityRate, setOpportunityRate] = useState(0.8);
  const [result, setResult] = useState(null);
  const calculateComparison = () => {
    if (!carValue || !monthlyKm) return;
    const monthlyDepreciation = carValue * (depreciation / 100) / 12;
    const monthlyOpportunity = carValue * (opportunityRate / 100);
    const monthlyIpva = carValue * (ipva / 100) / 12;
    const monthlyInsurance = insurance / 12;
    const totalFixed = monthlyDepreciation + monthlyOpportunity + monthlyIpva + monthlyInsurance;
    const monthlyFuel = monthlyKm / consumption * fuelPrice;
    const totalVariable = monthlyFuel + maintenance + parking;
    const totalCarMonthly = totalFixed + totalVariable;
    const carCostPerKm = totalCarMonthly / monthlyKm;
    const totalAppMonthly = monthlyKm * appPricePerKm;
    setResult({
      totalCarMonthly,
      totalAppMonthly,
      carCostPerKm,
      difference: Math.abs(totalCarMonthly - totalAppMonthly),
      winner: totalAppMonthly < totalCarMonthly ? "app" : "car",
      details: {
        depreciation: monthlyDepreciation,
        opportunity: monthlyOpportunity,
        ipva: monthlyIpva,
        insurance: monthlyInsurance,
        fuel: monthlyFuel,
        maintenance,
        parking
      }
    });
  };
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora: Uber ou Carro Próprio?",
    "description": "Descubra se é mais barato dirigir seu próprio veículo ou usar aplicativos de transporte.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Uber ou Carro Próprio? Calculadora de Custos Reais 2025",
        description: "Vender o carro ou continuar dirigindo? Compare custos de gasolina, IPVA, seguro e depreciação versus gastos com Uber e 99. Faça a conta exata.",
        canonical: "/calculadoras/uber-ou-carro"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": UBER_VS_CAR_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Uber ou Carro Próprio", href: "/calculadoras/uber-ou-carro" }
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsx(Car, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Transporte" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Uber ou ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "Carro Próprio?" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Será que vale a pena manter um carro na garagem? Descubra se é mais barato dirigir seu próprio veículo ou usar aplicativos de transporte." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          className: "grid lg:grid-cols-12 gap-8 mb-24",
          children: [
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-white mb-6 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-primary" }),
                "Dados do Veículo"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Valor do Carro (R$)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        placeholder: "Ex: 60000",
                        value: carValue || "",
                        onChange: (e) => setCarValue(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Km Rodados por Mês" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(TrendingUp, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        placeholder: "Ex: 1000",
                        value: monthlyKm || "",
                        onChange: (e) => setMonthlyKm(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Consumo (km/l)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        value: consumption,
                        onChange: (e) => setConsumption(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Preço Combustível" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        value: fuelPrice,
                        onChange: (e) => setFuelPrice(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Seguro Anual (R$)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        value: insurance || "",
                        onChange: (e) => setInsurance(Number(e.target.value)),
                        placeholder: "Ex: 2500",
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "IPVA (%)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        value: ipva,
                        onChange: (e) => setIpva(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Manutenção/Mês" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        value: maintenance || "",
                        onChange: (e) => setMaintenance(Number(e.target.value)),
                        placeholder: "Ex: 200",
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Estac./Limpeza" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        value: parking || "",
                        onChange: (e) => setParking(Number(e.target.value)),
                        placeholder: "Ex: 150",
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-white/10", children: [
                  /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold text-white mb-4 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(Smartphone, { className: "w-4 h-4 text-primary" }),
                    "Comparativo App"
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Preço Médio por Km (App)" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "number",
                          value: appPricePerKm,
                          onChange: (e) => setAppPricePerKm(Number(e.target.value)),
                          className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-4 pt-4", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: calculateComparison,
                      className: "flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]",
                      children: "Comparar Custos"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => {
                        setCarValue(0);
                        setMonthlyKm(0);
                        setResult(null);
                      },
                      className: "px-6 bg-white/5 hover:bg-white/10 text-white font-medium py-4 rounded-xl transition-all",
                      children: "Limpar"
                    }
                  )
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" }),
              /* @__PURE__ */ jsx("div", { className: "relative z-10", children: result ? /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { type: "spring", stiffness: 200, damping: 20 },
                  className: "space-y-6",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
                      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest", children: "Opção Mais Econômica" }),
                      /* @__PURE__ */ jsx("div", { className: `text-4xl md:text-5xl font-bold mb-2 ${result.winner === "app" ? "text-primary" : "text-blue-400"}`, children: result.winner === "app" ? "Vá de App (Uber/99)" : "Fique com o Carro" }),
                      /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
                        "Economia mensal de ",
                        formatCurrency(result.difference)
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
                      /* @__PURE__ */ jsxs("div", { className: `rounded-xl p-6 border ${result.winner === "car" ? "bg-blue-500/10 border-blue-500/30" : "bg-white/5 border-white/5"}`, children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
                          /* @__PURE__ */ jsx(Car, { className: `w-5 h-5 ${result.winner === "car" ? "text-blue-400" : "text-gray-500"}` }),
                          /* @__PURE__ */ jsx("h3", { className: "font-bold text-white", children: "Carro Próprio" })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx("span", { className: "block text-xs text-gray-500", children: "Custo Mensal Total" }),
                            /* @__PURE__ */ jsx("span", { className: "block text-xl font-bold text-white", children: formatCurrency(result.totalCarMonthly) })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx("span", { className: "block text-xs text-gray-500", children: "Custo por Km" }),
                            /* @__PURE__ */ jsx("span", { className: "block text-sm text-gray-300", children: formatCurrency(result.carCostPerKm) })
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: `rounded-xl p-6 border ${result.winner === "app" ? "bg-primary/10 border-primary/30" : "bg-white/5 border-white/5"}`, children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
                          /* @__PURE__ */ jsx(Smartphone, { className: `w-5 h-5 ${result.winner === "app" ? "text-primary" : "text-gray-500"}` }),
                          /* @__PURE__ */ jsx("h3", { className: "font-bold text-white", children: "Aplicativo" })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx("span", { className: "block text-xs text-gray-500", children: "Custo Mensal Total" }),
                            /* @__PURE__ */ jsx("span", { className: "block text-xl font-bold text-white", children: formatCurrency(result.totalAppMonthly) })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx("span", { className: "block text-xs text-gray-500", children: "Preço por Km" }),
                            /* @__PURE__ */ jsx("span", { className: "block text-sm text-gray-300", children: formatCurrency(appPricePerKm) })
                          ] })
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-6", children: [
                      /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-white mb-4", children: "Detalhamento dos Custos do Carro (Mensal)" }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                          /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Combustível" }),
                          /* @__PURE__ */ jsx("span", { className: "text-white", children: formatCurrency(result.details.fuel) })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                          /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Depreciação (Perda de Valor)" }),
                          /* @__PURE__ */ jsx("span", { className: "text-white", children: formatCurrency(result.details.depreciation) })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                          /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Custo de Oportunidade (Rendimento Perdido)" }),
                          /* @__PURE__ */ jsx("span", { className: "text-white", children: formatCurrency(result.details.opportunity) })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                          /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "IPVA + Seguro" }),
                          /* @__PURE__ */ jsx("span", { className: "text-white", children: formatCurrency(result.details.ipva + result.details.insurance) })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                          /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Manutenção + Estac." }),
                          /* @__PURE__ */ jsx("span", { className: "text-white", children: formatCurrency(result.details.maintenance + result.details.parking) })
                        ] })
                      ] })
                    ] })
                  ]
                }
              ) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full py-12 opacity-50", children: [
                /* @__PURE__ */ jsx(Car, { className: "w-16 h-16 text-gray-600 mb-4" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg text-center", children: "Preencha os dados para comparar" })
              ] }) })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-24 max-w-4xl mx-auto prose prose-invert prose-lg", children: [
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "O Dilema: Conforto vs. Custo" }),
          /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-none text-gray-400 leading-relaxed", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Ter um carro próprio já foi sinônimo de status e liberdade. Hoje, com a alta dos combustíveis e a facilidade dos aplicativos (Uber, 99), muitos motoristas estão fazendo a conta: será que o carro não virou um passivo que drena seu dinheiro?" }),
            /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Muitas pessoas cometem o erro de comparar apenas o gasto com gasolina versus o preço da corrida. Mas a conta real é muito mais profunda. Um carro parado na garagem gera custos fixos (IPVA, Seguro, Depreciação) que você paga mesmo sem rodar um quilômetro sequer." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "O Que Você Paga (e nem percebe)" }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6 my-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: '1. Custos Fixos (O "Custo de Ter")' }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Depreciação:" }),
                  " Seu carro perde cerca de 10% a 15% do valor todo ano."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Custo de Oportunidade:" }),
                  " O rendimento que você perde ao não investir o dinheiro do carro."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "IPVA e Licenciamento:" }),
                  " Impostos anuais obrigatórios."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Seguro:" }),
                  " Proteção essencial que pesa no bolso."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: '2. Custos Variáveis (O "Custo de Rodar")' }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Combustível:" }),
                  " Gasolina, Etanol ou GNV."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Manutenção:" }),
                  " Revisões, pneus, óleo e desgastes naturais."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Estacionamento/Limpeza:" }),
                  " Mensalidades, Zona Azul e lavagens."
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Quando o App vale a pena?" }),
          /* @__PURE__ */ jsx("div", { className: "bg-[#1a1a1a] p-8 rounded-3xl border border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-white mb-2", children: "Pouco Uso (Até 15km/dia)" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: 'Geralmente o Uber/App vence. Os custos fixos do carro (seguro, IPVA) diluídos em poucos quilômetros tornam o "custo por km" do carro próprio altíssimo.' })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-white mb-2", children: "Uso Intenso (Mais de 40km/dia)" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "O Carro Próprio tende a vencer. Para quem roda muito, o custo variável do app (tarifa dinâmica + taxa da plataforma) acaba superando os custos de manutenção do veículo particular." })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx(
          FAQ,
          {
            items: UBER_VS_CAR_FAQS,
            title: "Dúvidas Frequentes",
            className: "py-12",
            showSocialProof: false
          }
        )
      ] }),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
};
const FIRST_MILLION_FAQS = [
  {
    question: "É possível ficar milionário investindo pouco?",
    answer: "Sim, mas exige muito tempo. Investindo R$ 500 por mês a uma taxa de 10% ao ano, você levaria cerca de 35 anos para chegar ao milhão. O tempo compensa o valor baixo."
  },
  {
    question: "Onde devo investir para chegar ao milhão?",
    answer: "Não existe um único investimento. O ideal é uma carteira diversificada. Renda Fixa (CDB, Tesouro) garante segurança, enquanto Renda Variável (Ações, Fundos Imobiliários) oferece potencial de retorno maior no longo prazo para acelerar a chegada."
  },
  {
    question: "Devo considerar a inflação?",
    answer: "Com certeza. R$ 1 milhão daqui a 20 anos não comprará a mesma coisa que R$ 1 milhão hoje. Para um planejamento realista, tente buscar uma rentabilidade acima da inflação (juro real) ou ajuste sua meta para um valor maior (ex: R$ 2 milhões) para manter o poder de compra."
  },
  {
    question: "O que fazer depois do primeiro milhão?",
    answer: 'Atingir essa marca geralmente significa que você alcançou a "Velocidade de Cruzeiro". Com R$ 1 milhão investido a 0,8% ao mês, você recebe R$ 8.000 de renda passiva mensal sem tocar no principal. Muitos consideram esse o ponto da Independência Financeira.'
  }
];
const FirstMillionPage = () => {
  const [activeTab, setActiveTab] = useState("time");
  const [initialCapital, setInitialCapital] = useState(0);
  const [interestRate, setInterestRate] = useState(10);
  const [monthlyContribution, setMonthlyContribution] = useState(0);
  const [yearsToGoal, setYearsToGoal] = useState(0);
  const [result, setResult] = useState(null);
  const calculate = () => {
    const target = 1e6;
    const monthlyRate = Math.pow(1 + interestRate / 100, 1 / 12) - 1;
    if (activeTab === "time") {
      if (monthlyContribution <= 0 && initialCapital < target && monthlyRate <= 0) return;
      let months = 0;
      if (monthlyRate === 0) {
        if (monthlyContribution > 0) {
          months = (target - initialCapital) / monthlyContribution;
        } else {
          months = Infinity;
        }
      } else {
        const numerator = target * monthlyRate + monthlyContribution;
        const denominator = initialCapital * monthlyRate + monthlyContribution;
        if (denominator <= 0) {
          months = Infinity;
        } else {
          months = Math.log(numerator / denominator) / Math.log(1 + monthlyRate);
        }
      }
      if (months < 0 || !isFinite(months)) {
        setResult({ error: "Parâmetros inválidos para atingir a meta." });
        return;
      }
      const years = Math.floor(months / 12);
      const remainingMonths = Math.ceil(months % 12);
      setResult({
        type: "time",
        years,
        months: remainingMonths,
        totalMonths: months
      });
    } else {
      if (!yearsToGoal) return;
      const months = yearsToGoal * 12;
      let pmt = 0;
      if (monthlyRate === 0) {
        pmt = (target - initialCapital) / months;
      } else {
        const fvInitial = initialCapital * Math.pow(1 + monthlyRate, months);
        const factor = (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
        pmt = (target - fvInitial) / factor;
      }
      if (pmt < 0) pmt = 0;
      setResult({
        type: "contribution",
        monthlyContribution: pmt
      });
    }
  };
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora do Primeiro Milhão",
    "description": "Simule quanto você precisa investir por mês para conquistar o seu primeiro milhão de reais.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Calculadora do Primeiro Milhão - Quanto investir para chegar lá?",
        description: "Quer ser milionário? Descubra quanto você precisa investir por mês e quanto tempo vai levar para acumular seu primeiro milhão de reais.",
        canonical: "/calculadoras/primeiro-milhao"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FIRST_MILLION_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Primeiro Milhão", href: "/calculadoras/primeiro-milhao" }
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsx(Gem, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Metas Financeiras" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora do ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "Primeiro Milhão" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "O sonho é possível. Simule quanto você precisa investir por mês para conquistar o seu primeiro milhão de reais." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          className: "grid lg:grid-cols-12 gap-8 mb-24",
          children: [
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex p-1 bg-black/40 rounded-xl mb-6", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => {
                      setActiveTab("time");
                      setResult(null);
                    },
                    className: `flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === "time" ? "bg-primary text-black shadow-lg" : "text-gray-400 hover:text-white"}`,
                    children: "Calcular Tempo"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => {
                      setActiveTab("contribution");
                      setResult(null);
                    },
                    className: `flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === "contribution" ? "bg-primary text-black shadow-lg" : "text-gray-400 hover:text-white"}`,
                    children: "Calcular Aporte"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-white mb-6 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-primary" }),
                activeTab === "time" ? "Quando chego lá?" : "Quanto investir?"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Investimento Inicial (R$)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        placeholder: "Ex: 10000",
                        value: initialCapital || "",
                        onChange: (e) => setInitialCapital(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                activeTab === "time" ? /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Aporte Mensal (R$)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        placeholder: "Ex: 1000",
                        value: monthlyContribution || "",
                        onChange: (e) => setMonthlyContribution(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }) : /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Meta de Tempo (Anos)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(Clock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        placeholder: "Ex: 10",
                        value: yearsToGoal || "",
                        onChange: (e) => setYearsToGoal(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Rentabilidade Anual (%)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(TrendingUp, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        value: interestRate,
                        onChange: (e) => setInterestRate(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-4 pt-4", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: calculate,
                      className: "flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]",
                      children: "Simular Milhão"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => {
                        setInitialCapital(0);
                        setMonthlyContribution(0);
                        setYearsToGoal(0);
                        setResult(null);
                      },
                      className: "px-6 bg-white/5 hover:bg-white/10 text-white font-medium py-4 rounded-xl transition-all",
                      children: "Limpar"
                    }
                  )
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" }),
              /* @__PURE__ */ jsx("div", { className: "relative z-10", children: result ? /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { type: "spring", stiffness: 200, damping: 20 },
                  className: "space-y-6",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
                      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest", children: result.type === "time" ? "Tempo até o Milhão" : "Aporte Mensal Necessário" }),
                      /* @__PURE__ */ jsx("div", { className: "text-5xl font-bold text-white mb-2", children: result.type === "time" ? `${result.years} anos e ${result.months} meses` : formatCurrency(result.monthlyContribution) }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Para atingir R$ 1.000.000,00" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
                      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("span", { className: "block text-gray-300", children: "Rentabilidade Considerada" }),
                          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: "Nominal anual" })
                        ] }),
                        /* @__PURE__ */ jsxs("span", { className: "text-white font-bold", children: [
                          interestRate,
                          "% a.a."
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex justify-between items-center", children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("span", { className: "block text-emerald-400 font-bold", children: "Renda Passiva Estimada" }),
                          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Ao atingir o milhão (0,8% a.m.)" })
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold text-xl", children: formatCurrency(8e3) })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "bg-white/5 rounded-xl p-4 text-sm text-gray-400 mt-4", children: /* @__PURE__ */ jsxs("p", { children: [
                      /* @__PURE__ */ jsx("strong", { children: "💡 Insight:" }),
                      " O primeiro milhão é o mais difícil. Depois dele, com R$ 8.000 de renda passiva mensal reinvestida, o segundo milhão chega muito mais rápido!"
                    ] }) })
                  ]
                }
              ) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full py-12 opacity-50", children: [
                /* @__PURE__ */ jsx(Target, { className: "w-16 h-16 text-gray-600 mb-4" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg text-center", children: "Preencha os dados para traçar sua rota" })
              ] }) })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-24 max-w-4xl mx-auto prose prose-invert prose-lg", children: [
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "O Primeiro Milhão é o mais difícil" }),
          /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-none text-gray-400 leading-relaxed", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-4", children: 'No mundo dos investimentos, existe um ditado famoso: "O primeiro milhão é o mais difícil, o segundo é inevitável". Isso acontece por causa do efeito exponencial dos Juros Compostos.' }),
            /* @__PURE__ */ jsx("p", { className: "mb-4", children: "No começo, o esforço vem quase todo do seu bolso (seu trabalho). Mas, conforme o patrimônio cresce, os rendimentos mensais começam a superar os seus próprios aportes. Nossa calculadora mostra exatamente essa trajetória." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Como chegar lá mais rápido?" }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6 my-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "1. Tempo" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Quanto mais cedo você começar, menos esforço terá que fazer. O tempo é o melhor amigo dos juros compostos." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "2. Aporte" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Aumentar sua renda e seus aportes mensais é a forma mais eficaz de encurtar o caminho." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "3. Rentabilidade" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Buscar investimentos que rendam acima da inflação (como Ações, FIIs ou Tesouro IPCA+) faz seu dinheiro trabalhar mais forte." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Como usar a calculadora?" }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-8 rounded-3xl border border-white/5", children: [
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Nossa ferramenta faz a projeção reversa ou direta para você:" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-gray-300", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "1" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Quero saber o valor mensal:" }),
                  " Insira em quantos anos você quer chegar lá, e nós diremos quanto investir por mês."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "2" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Quero saber o tempo:" }),
                  " Insira quanto você pode investir por mês, e nós diremos em que data você será milionário."
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-primary/10 border-l-4 border-primary p-6 rounded-r-xl mb-16", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "💡 O Efeito Bola de Neve" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-300", children: "Você vai perceber que os primeiros R$ 100 mil demoram muito para juntar. Os segundos R$ 100 mil são mais rápidos. Os últimos R$ 100 mil (para chegar ao milhão) acontecem numa velocidade impressionante. Isso é o juro composto em ação!" })
        ] }),
        /* @__PURE__ */ jsx(
          FAQ,
          {
            items: FIRST_MILLION_FAQS,
            title: "Dúvidas Frequentes",
            className: "py-12",
            showSocialProof: false
          }
        )
      ] }),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
};
const CURRENCY_FAQS = [
  {
    question: "Qual o melhor momento para comprar dólar?",
    answer: 'Tentar acertar o "fundo" (o menor preço) é quase impossível, até para especialistas. A melhor estratégia é comprar aos poucos (preço médio). Se você vai viajar daqui a 6 meses, compre um pouco todo mês. Assim você se protege das altas repentinas.'
  },
  {
    question: "Como converter Euro para Dólar?",
    answer: 'A lógica é a mesma. O par "Euro/Dólar" (EUR/USD) é o mais negociado do mundo. Geralmente, o Euro vale mais que o Dólar, mas a paridade pode mudar dependendo da economia europeia.'
  },
  {
    question: "Vale a pena usar cartão de crédito no exterior?",
    answer: "Pela praticidade e segurança, sim. Financeiramente, você paga um IOF maior e fica sujeito à variação cambial até o fechamento da fatura (embora muitos bancos já travem o dólar no dia da compra). Para economizar, prefira contas globais em dólar."
  },
  {
    question: "O que é o Spread bancário?",
    answer: "É a diferença entre o que o banco paga pela moeda e por quanto ele te vende. Bancos tradicionais costumam cobrar spreads altos (4% a 6%). Bancos digitais e fintechs de câmbio costumam ter taxas menores (1% a 2%)."
  }
];
const CurrencyConverterPage = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("BRL");
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState("");
  const [iofType, setIofType] = useState("none");
  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 3e4);
    return () => clearInterval(interval);
  }, []);
  const fetchRates = async () => {
    try {
      const response = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL");
      const data = await response.json();
      setRates({
        USD: data.USDBRL,
        EUR: data.EURBRL
      });
      setLastUpdate((/* @__PURE__ */ new Date()).toLocaleTimeString());
      setLoading(false);
    } catch (error) {
      console.error("Error fetching rates", error);
      setLoading(false);
    }
  };
  const getRate = (from, to) => {
    if (!rates) return 1;
    if (from === to) return 1;
    let rateToBrl = 1;
    if (from === "USD") rateToBrl = parseFloat(rates.USD.bid);
    if (from === "EUR") rateToBrl = parseFloat(rates.EUR.bid);
    let rateFromBrl = 1;
    if (to === "USD") rateFromBrl = 1 / parseFloat(rates.USD.bid);
    if (to === "EUR") rateFromBrl = 1 / parseFloat(rates.EUR.bid);
    return rateToBrl * rateFromBrl;
  };
  const calculateTotal = () => {
    const rawRate = getRate(fromCurrency, toCurrency);
    let finalAmount = amount * rawRate;
    if (fromCurrency === "BRL" && toCurrency !== "BRL") {
      if (iofType === "cash") {
        finalAmount = finalAmount * (1 - 0.011);
      } else if (iofType === "card") {
        finalAmount = finalAmount * (1 - 0.0438);
      }
    }
    return finalAmount;
  };
  const formatCurrency = (val, currency) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency }).format(val);
  };
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Conversor de Moedas FinZap",
    "description": "Converta valores entre Real, Dólar e Euro com a cotação atualizada em tempo real.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Conversor de Moedas Hoje - Dólar, Euro e Real (Cotação Atualizada)",
        description: "Quanto está o dólar hoje? Use nosso conversor de moedas gratuito para simular valores entre Real, Dólar e Euro. Entenda a diferença entre câmbio comercial e turismo.",
        canonical: "/calculadoras/conversor-moedas"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": CURRENCY_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Conversor de Moedas", href: "/calculadoras/conversor-moedas" }
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsx(Globe, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Câmbio Global" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Conversor de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "Moedas" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Vai viajar ou fazer compras internacionais? Converta valores entre Real, Dólar e Euro com a cotação atualizada em tempo real." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          className: "grid lg:grid-cols-12 gap-8 mb-24",
          children: [
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
                /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-white flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(RefreshCw, { className: `w-5 h-5 text-primary ${loading ? "animate-spin" : ""}` }),
                  "Conversor"
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-500", children: [
                  "Atualizado: ",
                  lastUpdate || "..."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Valor" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        value: amount,
                        onChange: (e) => setAmount(Number(e.target.value)),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors text-lg font-bold"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[1fr,auto,1fr] gap-2 items-end", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "De" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        value: fromCurrency,
                        onChange: (e) => setFromCurrency(e.target.value),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer",
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "BRL", children: "🇧🇷 BRL" }),
                          /* @__PURE__ */ jsx("option", { value: "USD", children: "🇺🇸 USD" }),
                          /* @__PURE__ */ jsx("option", { value: "EUR", children: "🇪🇺 EUR" })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: swapCurrencies,
                      className: "p-3 mb-[2px] rounded-xl bg-white/5 hover:bg-white/10 text-primary transition-colors",
                      children: /* @__PURE__ */ jsx(ArrowRightLeft, { className: "w-5 h-5" })
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Para" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        value: toCurrency,
                        onChange: (e) => setToCurrency(e.target.value),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer",
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "BRL", children: "🇧🇷 BRL" }),
                          /* @__PURE__ */ jsx("option", { value: "USD", children: "🇺🇸 USD" }),
                          /* @__PURE__ */ jsx("option", { value: "EUR", children: "🇪🇺 EUR" })
                        ]
                      }
                    )
                  ] })
                ] }),
                fromCurrency === "BRL" && toCurrency !== "BRL" && /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-white/10", children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-3", children: "Incluir IOF (Imposto)?" }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => setIofType("none"),
                        className: `py-2 px-2 rounded-lg text-xs font-medium transition-all ${iofType === "none" ? "bg-white/20 text-white" : "bg-black/20 text-gray-500 hover:bg-white/5"}`,
                        children: "Sem IOF"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => setIofType("cash"),
                        className: `py-2 px-2 rounded-lg text-xs font-medium transition-all ${iofType === "cash" ? "bg-primary/20 text-primary border border-primary/20" : "bg-black/20 text-gray-500 hover:bg-white/5"}`,
                        children: "Dinheiro (1.1%)"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => setIofType("card"),
                        className: `py-2 px-2 rounded-lg text-xs font-medium transition-all ${iofType === "card" ? "bg-primary/20 text-primary border border-primary/20" : "bg-black/20 text-gray-500 hover:bg-white/5"}`,
                        children: "Cartão (4.38%)"
                      }
                    )
                  ] })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col justify-center", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" }),
              /* @__PURE__ */ jsx("div", { className: "relative z-10 text-center", children: loading ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-12", children: [
                /* @__PURE__ */ jsx(RefreshCw, { className: "w-12 h-12 text-primary animate-spin mb-4" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "Buscando cotações..." })
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-2 text-gray-400 text-lg", children: [
                  formatCurrency(amount, fromCurrency),
                  " ="
                ] }),
                /* @__PURE__ */ jsx("div", { className: "text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight", children: formatCurrency(calculateTotal(), toCurrency) }),
                /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-sm text-gray-400 mb-8", children: [
                  /* @__PURE__ */ jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    "Cotação Comercial: 1 ",
                    fromCurrency,
                    " = ",
                    getRate(fromCurrency, toCurrency).toFixed(4),
                    " ",
                    toCurrency
                  ] })
                ] }),
                iofType !== "none" && fromCurrency === "BRL" && /* @__PURE__ */ jsxs("div", { className: "bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 max-w-md mx-auto text-left flex gap-3", children: [
                  /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5 text-yellow-500 flex-shrink-0" }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-yellow-200 font-bold text-sm mb-1", children: "Atenção ao IOF" }),
                    /* @__PURE__ */ jsxs("p", { className: "text-xs text-yellow-500/80", children: [
                      "O valor exibido já desconta o imposto de ",
                      iofType === "cash" ? "1.1%" : "4.38%",
                      ". Sem imposto, você receberia ",
                      formatCurrency(amount * getRate(fromCurrency, toCurrency), toCurrency),
                      "."
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mt-8 grid grid-cols-2 gap-4 max-w-lg mx-auto", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 text-left", children: [
                    /* @__PURE__ */ jsx("span", { className: "block text-xs text-gray-500 mb-1", children: "Dólar Comercial (Venda)" }),
                    /* @__PURE__ */ jsxs("span", { className: "block text-lg font-bold text-white", children: [
                      "R$ ",
                      parseFloat((rates == null ? void 0 : rates.USD.bid) || "0").toFixed(3)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 text-left", children: [
                    /* @__PURE__ */ jsx("span", { className: "block text-xs text-gray-500 mb-1", children: "Euro Comercial (Venda)" }),
                    /* @__PURE__ */ jsxs("span", { className: "block text-lg font-bold text-white", children: [
                      "R$ ",
                      parseFloat((rates == null ? void 0 : rates.EUR.bid) || "0").toFixed(3)
                    ] })
                  ] })
                ] })
              ] }) })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-24 max-w-4xl mx-auto prose prose-invert prose-lg", children: [
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Entendendo o Câmbio: Por que o valor muda tanto?" }),
          /* @__PURE__ */ jsx("div", { className: "prose prose-invert max-w-none text-gray-400 leading-relaxed", children: /* @__PURE__ */ jsx("p", { className: "mb-4", children: "A taxa de câmbio é o preço de uma moeda estrangeira medido em reais. Esse valor oscila a cada segundo durante o horário comercial, influenciado por fatores como Economia Global, Cenário Interno e a Lei da Oferta e Procura." }) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Dólar Comercial x Dólar Turismo: Qual a diferença?" }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6 my-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "1. Dólar Comercial" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "É a cotação utilizada por grandes empresas e bancos para transações de importação, exportação e transferências financeiras. É o valor que você vê nos jornais e notícias." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 text-primary", children: "2. Dólar Turismo" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "É a cotação para pessoas físicas que vão viajar. Ele é mais caro (em média 3% a 5% acima do comercial) porque inclui custos de logística, segurança e impostos." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-primary/10 border-l-4 border-primary p-6 rounded-r-xl", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "💡 Dica FinZap" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-sm", children: "Ao usar nosso conversor, lembre-se que ele mostra a taxa de mercado (comercial). Para saber quanto você vai pagar na casa de câmbio, adicione mentalmente cerca de 4% a 6% sobre o valor convertido." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "O Fantasma do IOF" }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-8 rounded-3xl border border-white/5", children: [
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Não basta converter a moeda; você precisa considerar o imposto do governo brasileiro sobre operações de câmbio:" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-gray-300", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx(Plane, { className: "flex-shrink-0 w-5 h-5 text-primary" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Dinheiro em Espécie (Papel):" }),
                  " IOF de 1,1%. É a opção mais barata em termos de imposto, mas menos segura."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx(Plane, { className: "flex-shrink-0 w-5 h-5 text-primary" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Cartão de Crédito/Débito Internacional:" }),
                  " IOF de 4,38% (em 2024/2025)."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx(Plane, { className: "flex-shrink-0 w-5 h-5 text-primary" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Conta Internacional (Nomad, Wise):" }),
                  " IOF de 1,1% (mesma alíquota do papel moeda). Essa tem sido a opção favorita dos viajantes."
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          FAQ,
          {
            items: CURRENCY_FAQS,
            title: "Dúvidas Frequentes sobre Câmbio",
            className: "py-12",
            showSocialProof: false
          }
        )
      ] }),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
};
const crc16ccitt = (payload) => {
  let crc = 65535;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 32768) > 0) {
        crc = crc << 1 ^ 4129;
      } else {
        crc = crc << 1;
      }
    }
  }
  return (crc & 65535).toString(16).toUpperCase().padStart(4, "0");
};
const formatField = (id, value) => {
  const len = value.length.toString().padStart(2, "0");
  return `${id}${len}${value}`;
};
const PIX_FAQS = [
  {
    question: "É seguro gerar QR Code Pix neste site?",
    answer: "Sim, 100% seguro. O nosso gerador roda totalmente no seu navegador. Nenhuma informação bancária ou chave Pix é enviada para nossos servidores. O código é criado através de uma fórmula matemática padrão do Banco Central (BR Code) diretamente no seu dispositivo."
  },
  {
    question: "O QR Code gerado tem validade?",
    answer: "Não. Este é um QR Code estático. Ele não expira e pode ser usado indefinidamente para receber múltiplos pagamentos. É ideal para imprimir e deixar no balcão da loja, vender produtos online ou receber doações."
  },
  {
    question: "Tem taxas para receber pelo QR Code?",
    answer: "O FinZap não cobra nenhuma taxa. Porém, dependendo do seu banco e tipo de conta (PJ), a instituição financeira pode cobrar tarifas por recebimento via Pix. Para pessoas físicas (PF), o recebimento costuma ser gratuito na maioria dos bancos."
  },
  {
    question: "Posso colocar um valor fixo no QR Code?",
    answer: "Sim! Se você preencher o campo 'Valor', o cliente não conseguirá alterar o montante na hora de pagar. Se deixar em branco (ou 0), o cliente poderá digitar o valor que quiser na hora do pagamento."
  },
  {
    question: "O que é o Identificador (TxID)?",
    answer: "É um código opcional para você organizar seus recebimentos. Se você colocar 'VENDA01', esse código aparecerá no seu extrato bancário, facilitando a identificação de quem pagou o quê."
  }
];
const PixGeneratorPage = () => {
  const [pixKey, setPixKey] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [amount, setAmount] = useState("");
  const [txid, setTxid] = useState("");
  const [payload, setPayload] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!pixKey || !name || !city) {
      setPayload("");
      return;
    }
    const normalizedName = name.substring(0, 25).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    const normalizedCity = city.substring(0, 15).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    const normalizedTxid = txid ? txid.replace(/[^a-zA-Z0-9]/g, "") : "***";
    let amountField = "";
    if (amount) {
      const cleanAmount = amount.replace(",", ".");
      if (!isNaN(parseFloat(cleanAmount))) {
        amountField = formatField("54", parseFloat(cleanAmount).toFixed(2));
      }
    }
    const merchantAccountInfo = formatField("00", "BR.GOV.BCB.PIX") + formatField("01", pixKey);
    const additionalData = formatField("05", normalizedTxid || "***");
    let rawPayload = formatField("00", "01") + formatField("26", merchantAccountInfo) + formatField("52", "0000") + formatField("53", "986") + amountField + formatField("58", "BR") + formatField("59", normalizedName) + formatField("60", normalizedCity) + formatField("62", additionalData) + "6304";
    const crc = crc16ccitt(rawPayload);
    setPayload(rawPayload + crc);
  }, [pixKey, name, city, amount, txid]);
  const handleCopy = () => {
    if (!payload) return;
    navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  const handleDownload = () => {
    const svg = document.getElementById("qrcode-pix");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width + 40;
      canvas.height = img.height + 40;
      if (ctx) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 20, 20);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `pix-${name.replace(/\s+/g, "-").toLowerCase()}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Gerador de QR Code Pix Grátis",
    "description": "Crie QR Codes Pix personalizados e Copia e Cola gratuitamente. Ferramenta segura para gerar cobranças instantâneas.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Gerador de QR Code Pix Grátis - Copia e Cola Seguro",
        description: "Crie QR Codes Pix personalizados gratuitamente. Gere códigos Copia e Cola instantâneos, baixe a imagem e receba pagamentos sem taxas.",
        canonical: "/ferramentas/gerador-pix"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": PIX_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Ferramentas", href: "/ferramentas" },
          { label: "Gerador de Pix", href: "/ferramentas/gerador-pix" }
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsx(QrCode, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Pagamentos Instantâneos" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Gerador de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "QR Code Pix" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: 'Crie cobranças instantâneas sem taxas. Gere o QR Code ou o código "Copia e Cola" para receber de seus clientes agora mesmo.' })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5 space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-white mb-6 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(QrCode, { className: "w-5 h-5 text-primary" }),
              "Dados do Pagamento"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Chave Pix (CPF, Celular, E-mail ou Aleatória)" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Ex: 123.456.789-00 ou email@exemplo.com",
                    value: pixKey,
                    onChange: (e) => setPixKey(e.target.value),
                    className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Nome do Beneficiário" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        placeholder: "Seu Nome",
                        value: name,
                        onChange: (e) => setName(e.target.value),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Cidade" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(MapPin, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        placeholder: "Sua Cidade",
                        value: city,
                        onChange: (e) => setCity(e.target.value),
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      }
                    )
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Valor (Opcional)" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "number",
                      placeholder: "Ex: 50.00 (Deixe 0 para valor livre)",
                      value: amount,
                      onChange: (e) => setAmount(e.target.value),
                      className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Identificador / Código (Opcional)" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Ex: PEDIDO123 (Sem espaços)",
                    value: txid,
                    onChange: (e) => setTxid(e.target.value),
                    className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Identificador único da transação (TxID)." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-primary/10 border-l-4 border-primary p-4 rounded-r-xl flex gap-3", children: [
            /* @__PURE__ */ jsx(ShieldCheck, { className: "w-5 h-5 text-primary flex-shrink-0" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-300", children: [
              /* @__PURE__ */ jsx("strong", { children: "Privacidade Total:" }),
              " Seus dados não são enviados para nenhum servidor. O código Pix é gerado matematicamente direto no seu navegador."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 space-y-6", children: /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col justify-center items-center", children: payload ? /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { scale: 0.9, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            className: "flex flex-col items-center w-full max-w-sm",
            children: [
              /* @__PURE__ */ jsx("div", { className: "bg-white p-4 rounded-2xl mb-6 shadow-2xl shadow-primary/20", children: /* @__PURE__ */ jsx(
                QRCodeSVG,
                {
                  id: "qrcode-pix",
                  value: payload,
                  size: 250,
                  level: "M",
                  includeMargin: false
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "w-full space-y-3", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: handleCopy,
                    className: `w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all ${copied ? "bg-emerald-500 text-white" : "bg-primary hover:bg-primary/90 text-black"}`,
                    children: [
                      copied ? /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Copy, { className: "w-5 h-5" }),
                      copied ? "Copiado!" : "Copiar Código Pix"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: handleDownload,
                    className: "w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-colors",
                    children: [
                      /* @__PURE__ */ jsx(Download, { className: "w-5 h-5" }),
                      "Baixar QR Code (PNG)"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-6 w-full", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs text-gray-500 mb-2 uppercase tracking-wider font-bold text-center", children: "Código Copia e Cola (Payload)" }),
                /* @__PURE__ */ jsx("div", { className: "bg-black/50 p-3 rounded-lg border border-white/5 break-all text-xs text-gray-400 font-mono text-center", children: payload })
              ] })
            ]
          }
        ) : /* @__PURE__ */ jsxs("div", { className: "text-center opacity-50 py-12", children: [
          /* @__PURE__ */ jsx(QrCode, { className: "w-24 h-24 text-gray-700 mx-auto mb-4" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg", children: "Preencha os dados para gerar seu Pix" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-24 max-w-4xl mx-auto prose prose-invert prose-lg", children: [
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Crie seu QR Code Pix Gratuito em Segundos" }),
          /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-none text-gray-400 leading-relaxed", children: [
            /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
              "Precisa receber um pagamento rápido e sem taxas? O ",
              /* @__PURE__ */ jsx("strong", { children: "Gerador de Pix FinZap" }),
              " é a ferramenta ideal para autônomos, lojistas e prestadores de serviço. Com ele, você cria um código oficial do Banco Central (padrão BR Code) na hora, pronto para ser lido por qualquer aplicativo de banco."
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Esqueça a necessidade de imprimir folhas A4 com seus dados bancários ou ficar ditando CPF e CNPJ por mensagem. Gere um QR Code profissional, passe credibilidade para seus clientes e receba o dinheiro na hora." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Como Funciona o Gerador de Pix?" }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6 my-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-white mb-3 text-primary flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(User, { className: "w-5 h-5" }),
                " 1. Seus Dados"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Insira sua Chave Pix (CPF, CNPJ, Celular, E-mail ou Chave Aleatória), seu nome e cidade. Esses dados são obrigatórios pelo Banco Central." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-white mb-3 text-primary flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(DollarSign, { className: "w-5 h-5" }),
                " 2. O Valor"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Defina um valor fixo para a cobrança ou deixe em branco (0,00) para que o cliente digite o quanto quer pagar na hora." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-6 rounded-2xl border border-white/5", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-white mb-3 text-primary flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Zap, { className: "w-5 h-5" }),
                " 3. Pronto!"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: 'O sistema gera um QR Code visual e um código "Copia e Cola". Você pode baixar a imagem ou enviar o código por WhatsApp.' })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Por que usar o QR Code Estático?" }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] p-8 rounded-3xl border border-white/5", children: [
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "O Pix possui dois tipos de QR Code: o Dinâmico (usado em grandes e-commerces, que muda a cada venda) e o Estático (que geramos aqui). Veja as vantagens do Estático:" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-gray-300", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "1" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Não Expira:" }),
                  " Você pode imprimir e usar o mesmo código para sempre."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "2" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Sem Integração:" }),
                  " Não precisa de API, sistema complexo ou maquininha de cartão. É só gerar e usar."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold", children: "3" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Multiuso:" }),
                  " Serve para balcão de loja, recebimento de aluguel, doações em lives, vaquinhas e vendas diretas."
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-emerald-500/10 border-l-4 border-emerald-500 p-6 rounded-r-xl mb-16", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-white mb-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Smartphone, { className: "w-5 h-5" }),
            "Dica para Lojistas"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-300", children: "Imprima o QR Code gerado e plastifique. Coloque no balcão visível para o cliente. Isso agiliza o pagamento, evita erros de digitação da chave e reduz as filas. E o melhor: o dinheiro cai na hora, inclusive feriados e fins de semana." })
        ] }),
        /* @__PURE__ */ jsx(
          FAQ,
          {
            items: PIX_FAQS,
            title: "Dúvidas Frequentes sobre Pix",
            className: "py-12",
            showSocialProof: false
          }
        )
      ] }),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
};
const WebStoryPage = () => {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const story = storiesData.find((s) => s.slug === storyId) || null;
  const currentSlide = story == null ? void 0 : story.slides[currentSlideIndex];
  useEffect(() => {
    if (!story) return;
    setProgress(0);
    const duration = ((currentSlide == null ? void 0 : currentSlide.duration) || 5) * 1e3;
    let startTime = Date.now();
    let animationFrameId;
    const updateProgress = () => {
      if (isPaused) {
        startTime = Date.now() - progress / 100 * duration;
        animationFrameId = requestAnimationFrame(updateProgress);
        return;
      }
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(elapsed / duration * 100, 100);
      setProgress(newProgress);
      if (newProgress >= 100) {
        goNext();
      } else {
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };
    animationFrameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationFrameId);
  }, [currentSlideIndex, isPaused, story]);
  const goNext = () => {
    if (story && currentSlideIndex < story.slides.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    } else {
      navigate("/");
    }
  };
  const goPrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };
  if (!story) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black flex items-center justify-center text-white", children: [
      /* @__PURE__ */ jsx("p", { children: "História não encontrada." }),
      /* @__PURE__ */ jsx(Link, { to: "/", className: "ml-4 text-primary underline", children: "Voltar" })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 bg-black z-50 flex items-center justify-center", children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsxs("title", { children: [
        story.title,
        " | Web Stories"
      ] }),
      /* @__PURE__ */ jsx("meta", { name: "theme-color", content: "#000000" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative w-full h-full md:w-[400px] md:h-[90vh] md:rounded-2xl overflow-hidden bg-gray-900 shadow-2xl", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-0 w-full px-2 flex gap-1 z-30", children: story.slides.map((slide, index) => /* @__PURE__ */ jsx("div", { className: "h-1 flex-1 bg-white/30 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "h-full bg-white transition-all duration-100 ease-linear",
          style: {
            width: index < currentSlideIndex ? "100%" : index === currentSlideIndex ? `${progress}%` : "0%"
          }
        }
      ) }, slide.id)) }),
      /* @__PURE__ */ jsxs("div", { className: "absolute top-8 left-4 flex items-center gap-2 z-30", children: [
        /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-white/20", children: /* @__PURE__ */ jsx("img", { src: story.publisherLogo, alt: story.publisher, className: "w-full h-full object-cover" }) }),
        /* @__PURE__ */ jsx("span", { className: "text-white text-sm font-medium drop-shadow-md", children: story.publisher })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "absolute top-8 right-4 flex gap-4 z-30 text-white", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setIsMuted(!isMuted), children: isMuted ? /* @__PURE__ */ jsx(VolumeX, { className: "w-6 h-6 drop-shadow-md" }) : /* @__PURE__ */ jsx(Volume2, { className: "w-6 h-6 drop-shadow-md" }) }),
        /* @__PURE__ */ jsx("button", { onClick: () => navigate("/"), children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6 drop-shadow-md" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-20 flex", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "w-1/3 h-full",
            onClick: goPrev,
            onTouchStart: () => setIsPaused(true),
            onTouchEnd: () => setIsPaused(false),
            onMouseDown: () => setIsPaused(true),
            onMouseUp: () => setIsPaused(false)
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "w-2/3 h-full",
            onClick: goNext,
            onTouchStart: () => setIsPaused(true),
            onTouchEnd: () => setIsPaused(false),
            onMouseDown: () => setIsPaused(true),
            onMouseUp: () => setIsPaused(false)
          }
        )
      ] }),
      /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 1.05 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.4 },
          className: "absolute inset-0 w-full h-full",
          children: [
            (currentSlide == null ? void 0 : currentSlide.media.type) === "video" ? /* @__PURE__ */ jsx(
              "video",
              {
                src: currentSlide.media.url,
                poster: currentSlide.media.poster,
                className: "w-full h-full object-cover",
                autoPlay: true,
                loop: true,
                muted: isMuted,
                playsInline: true
              }
            ) : /* @__PURE__ */ jsx(
              "img",
              {
                src: currentSlide == null ? void 0 : currentSlide.media.url,
                alt: (currentSlide == null ? void 0 : currentSlide.text) || story.title,
                className: "w-full h-full object-cover"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" }),
            /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 w-full p-6 pb-12 z-10 flex flex-col items-center text-center", children: [
              (currentSlide == null ? void 0 : currentSlide.text) && /* @__PURE__ */ jsx("p", { className: "text-white text-xl font-bold mb-6 drop-shadow-lg leading-relaxed", children: currentSlide.text }),
              (currentSlide == null ? void 0 : currentSlide.cta) && /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { y: 20, opacity: 0 },
                  animate: { y: 0, opacity: 1 },
                  transition: { delay: 0.5 },
                  children: /* @__PURE__ */ jsxs(
                    Link,
                    {
                      to: currentSlide.cta.url,
                      className: "bg-primary text-black font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2",
                      children: [
                        currentSlide.cta.label,
                        /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" })
                      ]
                    }
                  )
                }
              )
            ] })
          ]
        },
        currentSlide == null ? void 0 : currentSlide.id
      ) })
    ] })
  ] });
};
const StoriesGallery = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Web Stories Financeiras - Dicas Rápidas | FinZap",
        description: "Confira nossas Web Stories com dicas rápidas de finanças, FGTS, investimentos e economia em formato visual e direto ao ponto.",
        canonical: "/stories"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsx(Breadcrumb, { items: [
        { label: "Home", href: "/" },
        { label: "Stories", href: "/stories" }
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 text-yellow-400" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Conteúdo Rápido" })
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6", children: [
          "FinZap ",
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "Stories" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Dicas financeiras, tutoriais e novidades em formato de tela cheia. Rápido de ler, fácil de entender." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", children: storiesData.map((story, index) => /* @__PURE__ */ jsxs(
        "a",
        {
          href: `/stories/${story.slug}.html`,
          className: "group relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-gray-900",
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: story.posterPortrait,
                alt: story.title,
                className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100",
                loading: "lazy"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" }),
            /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-5", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-2", children: [
                /* @__PURE__ */ jsx(Play, { className: "w-3 h-3 fill-current" }),
                "Web Story"
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "text-white font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors", children: story.title }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-gray-400 text-sm font-medium group-hover:text-white transition-colors", children: [
                "Ver agora ",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
              ] })
            ] })
          ]
        },
        story.slug
      )) })
    ] })
  ] });
};
const CategoryBadge = ({ category, className = "" }) => {
  return /* @__PURE__ */ jsx(
    Link,
    {
      to: `/blog/categoria/${category.slug}`,
      className: `inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors border border-primary/20 ${className}`,
      children: category.name
    }
  );
};
const PostCard = ({ post }) => {
  var _a2, _b2;
  return /* @__PURE__ */ jsxs("article", { className: "group relative flex flex-col h-full bg-[#0d0d0d] rounded-2xl border border-white/5 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(71,255,183,0.1)]", children: [
    /* @__PURE__ */ jsx(Link, { to: `/blog/${post.slug}`, className: "block overflow-hidden aspect-video", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: post.cover_image,
        alt: post.cover_image_alt,
        className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
        loading: "lazy"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col flex-1 p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
        post.category && /* @__PURE__ */ jsx(CategoryBadge, { category: post.category }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center text-xs text-gray-400 gap-1", children: [
          /* @__PURE__ */ jsx(Calendar, { className: "w-3 h-3" }),
          /* @__PURE__ */ jsx("time", { dateTime: post.published_at, children: format(new Date(post.published_at), "d 'de' MMMM, yyyy", { locale: ptBR }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2", children: /* @__PURE__ */ jsx(Link, { to: `/blog/${post.slug}`, children: post.title }) }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-6 line-clamp-3 flex-1", children: post.excerpt }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-auto pt-4 border-t border-white/5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          ((_a2 = post.author) == null ? void 0 : _a2.avatar_url) && /* @__PURE__ */ jsx("img", { src: post.author.avatar_url, alt: post.author.name, className: "w-6 h-6 rounded-full" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: (_b2 = post.author) == null ? void 0 : _b2.name })
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: `/blog/${post.slug}`, className: "text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all", children: [
          "Ler artigo ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
        ] })
      ] })
    ] })
  ] });
};
const supabaseUrl = "https://cfbwntkyygkqbottkktc.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmYndudGt5eWdrcWJvdHRra3RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4MDExOTAsImV4cCI6MjA3NDM3NzE5MH0.08-1PNyvfi6YsG8z3EpAkoLLYzRMcZg8jAJSKkYVfzM";
const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
const blogService = {
  async getPosts() {
    const { data, error } = await supabase.from("posts").select("*, author:authors(*), category:categories(*)").eq("published", true).order("published_at", { ascending: false });
    if (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
    return data;
  },
  async getPostBySlug(slug) {
    const { data, error } = await supabase.from("posts").select("*, author:authors(*), category:categories(*)").eq("slug", slug).eq("published", true).single();
    if (error) {
      console.error(`Error fetching post with slug ${slug}:`, error);
      return null;
    }
    return data;
  },
  async getPostsByCategory(categorySlug) {
    const { data, error } = await supabase.from("posts").select("*, author:authors(*), category:categories!inner(*)").eq("category.slug", categorySlug).eq("published", true).order("published_at", { ascending: false });
    if (error) {
      console.error(`Error fetching posts for category ${categorySlug}:`, error);
      return [];
    }
    return data;
  },
  async getAllCategories() {
    const { data, error } = await supabase.from("categories").select("*").order("name");
    if (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
    return data;
  }
};
const BlogIndex = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      const data = await blogService.getPosts();
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Blog FinZap - Dicas de Finanças e Controle de Gastos",
        description: "Aprenda a controlar seus gastos, economizar dinheiro e organizar suas finanças com as dicas do blog FinZap.",
        canonical: "https://finzap.io/blog"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsx(Breadcrumb, { items: [{ label: "Blog", href: "/blog" }] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsx(BookOpen, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Conteúdo Educativo" })
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
          "Blog ",
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "FinZap" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Dicas práticas para você dominar suas finanças e alcançar seus objetivos." })
      ] }),
      loading ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsx("div", { className: "h-96 bg-white/5 rounded-2xl animate-pulse" }, i)) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("h2", { className: "sr-only", children: "Últimas postagens" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: posts.map((post) => /* @__PURE__ */ jsx(PostCard, { post }, post.id)) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-24", children: /* @__PURE__ */ jsx(AppPromoBanner$1, {}) }),
      /* @__PURE__ */ jsx("div", { className: "mt-16 max-w-4xl mx-auto text-center border-t border-white/5 pt-12", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
        /* @__PURE__ */ jsx("strong", { children: "Aviso legal:" }),
        " O conteúdo disponibilizado neste blog é apenas para fins informativos e educacionais. Embora busquemos manter as informações atualizadas, não nos responsabilizamos por eventuais divergências ou decisões tomadas com base nos artigos. Consulte sempre um profissional para orientações específicas ao seu caso."
      ] }) })
    ] })
  ] });
};
const CategoryPage = () => {
  const { categorySlug } = useParams();
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      if (!categorySlug) return;
      setLoading(true);
      const postsData = await blogService.getPostsByCategory(categorySlug);
      setPosts(postsData);
      const categories = await blogService.getAllCategories();
      const currentCategory = categories.find((c) => c.slug === categorySlug);
      setCategory(currentCategory || null);
      setLoading(false);
    };
    fetchData();
  }, [categorySlug]);
  if (!category && !loading) {
    return /* @__PURE__ */ jsx("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 text-center py-20", children: /* @__PURE__ */ jsx("h1", { className: "text-2xl text-white", children: "Categoria não encontrada" }) }) });
  }
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: `${(category == null ? void 0 : category.name) || "Categoria"} - Blog FinZap`,
        description: `Artigos sobre ${(category == null ? void 0 : category.name) || "finanças"} no blog FinZap.`,
        canonical: `https://finzap.io/blog/categoria/${categorySlug}`
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsx(Breadcrumb, { items: [
        { label: "Blog", href: "/blog" },
        { label: (category == null ? void 0 : category.name) || "Categoria", href: `/blog/categoria/${categorySlug}` }
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsx(BookOpen, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Categoria" })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-4", children: category == null ? void 0 : category.name }),
        (category == null ? void 0 : category.description) && /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-400 max-w-2xl mx-auto", children: category.description })
      ] }),
      loading ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsx("div", { className: "h-96 bg-white/5 rounded-2xl animate-pulse" }, i)) }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: posts.map((post) => /* @__PURE__ */ jsx(PostCard, { post }, post.id)) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-24", children: [
        /* @__PURE__ */ jsx("div", { className: "mt-24", children: /* @__PURE__ */ jsx(AppPromoBanner$1, {}) }),
        /* @__PURE__ */ jsx("div", { className: "mt-16 max-w-4xl mx-auto text-center border-t border-white/5 pt-12", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
          /* @__PURE__ */ jsx("strong", { children: "Aviso legal:" }),
          " O conteúdo disponibilizado neste blog é apenas para fins informativos e educacionais. Embora busquemos manter as informações atualizadas, não nos responsabilizamos por eventuais divergências ou decisões tomadas com base nos artigos. Consulte sempre um profissional para orientações específicas ao seu caso."
        ] }) })
      ] })
    ] })
  ] });
};
const PostContent = ({ content }) => {
  return /* @__PURE__ */ jsx("div", { className: "prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-primary prose-strong:text-white prose-code:text-primary prose-pre:bg-[#1a1a1a] prose-pre:border prose-pre:border-white/10", children: /* @__PURE__ */ jsx(ReactMarkdown, { children: content }) });
};
const BlogPost = () => {
  var _a2, _b2, _c, _d, _e, _f, _g;
  const { slug } = useParams();
  const serverData = useServerData();
  const [post, setPost] = useState(
    serverData && serverData.slug === slug ? serverData : null
  );
  const [loading, setLoading] = useState(!post);
  useEffect(() => {
    const fetchPost = async () => {
      if (!slug || post) return;
      const data = await blogService.getPostBySlug(slug);
      setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [slug, post]);
  if (loading) {
    return /* @__PURE__ */ jsx("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto space-y-8 animate-pulse", children: [
      /* @__PURE__ */ jsx("div", { className: "h-8 bg-white/5 rounded w-3/4" }),
      /* @__PURE__ */ jsx("div", { className: "h-64 bg-white/5 rounded-2xl" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("div", { className: "h-4 bg-white/5 rounded" }),
        /* @__PURE__ */ jsx("div", { className: "h-4 bg-white/5 rounded" }),
        /* @__PURE__ */ jsx("div", { className: "h-4 bg-white/5 rounded w-5/6" })
      ] })
    ] }) }) });
  }
  if (!post) {
    return /* @__PURE__ */ jsx("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 text-center py-20", children: /* @__PURE__ */ jsx("h1", { className: "text-2xl text-white", children: "Post não encontrado" }) }) });
  }
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.cover_image,
    "datePublished": post.published_at,
    "dateModified": post.updated_at || post.published_at,
    "author": {
      "@type": "Person",
      "name": ((_a2 = post.author) == null ? void 0 : _a2.name) || "FinZap Team",
      "url": (_b2 = post.author) == null ? void 0 : _b2.linkedin_url,
      "jobTitle": (_c = post.author) == null ? void 0 : _c.role
    },
    "publisher": {
      "@type": "Organization",
      "name": "FinZap",
      "logo": {
        "@type": "ImageObject",
        "url": "https://finzap.io/logo.png"
      }
    },
    "description": post.meta_description || post.excerpt
  };
  const faqSchema = post.faq && post.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faq.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null;
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: post.meta_title || post.title,
        description: post.meta_description || post.excerpt,
        canonical: `https://finzap.io/blog/${post.slug}`,
        image: post.cover_image
      }
    ),
    /* @__PURE__ */ jsx(
      "script",
      {
        type: "application/ld+json",
        dangerouslySetInnerHTML: { __html: JSON.stringify(blogPostingSchema) }
      }
    ),
    faqSchema && /* @__PURE__ */ jsx(
      "script",
      {
        type: "application/ld+json",
        dangerouslySetInnerHTML: { __html: JSON.stringify(faqSchema) }
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("article", { className: "max-w-7xl mx-auto relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsx(Breadcrumb, { items: [
        { label: "Blog", href: "/blog" },
        ...post.category ? [{ label: post.category.name, href: `/blog/categoria/${post.category.slug}` }] : [],
        { label: post.title, href: `/blog/${post.slug}` }
      ] }),
      /* @__PURE__ */ jsxs("header", { className: "mb-12 text-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-4 text-sm text-gray-400 mb-6", children: [
          post.category && /* @__PURE__ */ jsx("span", { className: "px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20", children: post.category.name }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" }),
            format(new Date(post.published_at), "d 'de' MMMM, yyyy", { locale: ptBR })
          ] })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-5xl font-bold text-white mb-6 leading-tight", children: post.title }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed", children: post.excerpt }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 mt-8", children: [
          ((_d = post.author) == null ? void 0 : _d.avatar_url) && /* @__PURE__ */ jsx("img", { src: post.author.avatar_url, alt: post.author.name, className: "w-10 h-10 rounded-full border border-white/10" }),
          /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
            /* @__PURE__ */ jsx("p", { className: "text-white font-medium", children: (_e = post.author) == null ? void 0 : _e.name }),
            ((_f = post.author) == null ? void 0 : _f.role) && /* @__PURE__ */ jsx("p", { className: "text-xs text-primary mb-0.5", children: post.author.role }),
            ((_g = post.author) == null ? void 0 : _g.bio) && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: post.author.bio })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mb-12 rounded-2xl overflow-hidden border border-white/5 shadow-2xl", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: `${post.cover_image}?width=1200&quality=80&format=webp`,
          srcSet: `
                                ${post.cover_image}?width=600&quality=80&format=webp 600w,
                                ${post.cover_image}?width=900&quality=80&format=webp 900w,
                                ${post.cover_image}?width=1200&quality=80&format=webp 1200w
                            `,
          sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px",
          alt: post.cover_image_alt,
          className: "w-full h-auto",
          width: 1200,
          height: 630,
          loading: "eager",
          decoding: "async"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto", children: /* @__PURE__ */ jsx(PostContent, { content: post.content }) })
    ] }) }),
    post.faq && post.faq.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-20 relative z-10", children: /* @__PURE__ */ jsx(FAQ, { items: post.faq, title: "Perguntas Frequentes", showSocialProof: false }) }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 relative z-10 mt-16", children: /* @__PURE__ */ jsx(AppPromoBanner$1, {}) }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 relative z-10", children: /* @__PURE__ */ jsx("div", { className: "mt-16 max-w-4xl mx-auto text-center border-t border-white/5 pt-12", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
      /* @__PURE__ */ jsx("strong", { children: "Aviso legal:" }),
      " O conteúdo disponibilizado neste blog é apenas para fins informativos e educacionais. Embora busquemos manter as informações atualizadas, não nos responsabilizamos por eventuais divergências ou decisões tomadas com base nos artigos. Consulte sempre um profissional para orientações específicas ao seu caso."
    ] }) }) })
  ] });
};
const Terms = lazy(() => import("./assets/Terms-CDyn76Yz.js").then((module) => ({ default: module.Terms })));
const Privacy = lazy(() => import("./assets/Privacy-B7FvWn7w.js").then((module) => ({ default: module.Privacy })));
const Support = lazy(() => import("./assets/Support-DnVolkSr.js").then((module) => ({ default: module.Support })));
function App() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ScrollToTop, {}),
    /* @__PURE__ */ jsxs("div", { className: "bg-background min-h-screen text-white font-sans selection:bg-primary/30 selection:text-primary", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" }) }), children: /* @__PURE__ */ jsxs(Routes, { children: [
        /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Home, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/calculadoras", element: /* @__PURE__ */ jsx(Calculators, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/ferramentas", element: /* @__PURE__ */ jsx(Tools, {}) }),
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
        /* @__PURE__ */ jsx(Route, { path: "/ferramentas/gerador-pix", element: /* @__PURE__ */ jsx(PixGeneratorPage, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/blog", element: /* @__PURE__ */ jsx(BlogIndex, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/blog/:slug", element: /* @__PURE__ */ jsx(BlogPost, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/blog/categoria/:categorySlug", element: /* @__PURE__ */ jsx(CategoryPage, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/stories/:storyId", element: /* @__PURE__ */ jsx(WebStoryPage, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/stories", element: /* @__PURE__ */ jsx(StoriesGallery, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/terms", element: /* @__PURE__ */ jsx(Terms, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/privacy", element: /* @__PURE__ */ jsx(Privacy, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/support", element: /* @__PURE__ */ jsx(Support, {}) })
      ] }) }) }),
      /* @__PURE__ */ jsx(Footer, {}),
      /* @__PURE__ */ jsx(PromoPopup, {})
    ] })
  ] });
}
function render({ path, context = {}, initialData = null }) {
  const helmetContext = {};
  const html = ReactDOMServer.renderToString(
    /* @__PURE__ */ jsx(React3.StrictMode, { children: /* @__PURE__ */ jsx(StaticRouter, { location: path, children: /* @__PURE__ */ jsx(HelmetProvider, { context: helmetContext, children: /* @__PURE__ */ jsx(ServerDataProvider, { value: initialData, children: /* @__PURE__ */ jsx(App, {}) }) }) }) })
  );
  return { html, helmetContext };
}
export {
  FAQ as F,
  SEO as S,
  render
};
