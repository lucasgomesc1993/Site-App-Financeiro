var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b;
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React, { Component, createContext, useContext, useState, useEffect, useRef, lazy, Suspense } from "react";
import ReactDOMServer from "react-dom/server";
import { useNavigate, useLocation, Link, useParams, Routes, Route, StaticRouter } from "react-router-dom";
import fastCompare from "react-fast-compare";
import invariant from "invariant";
import shallowEqual from "shallowequal";
import { Wallet, X, Menu, ChevronRight, Instagram, Youtube, Linkedin, MessageCircle, ChevronLeft, Video, Phone, MoreVertical, CheckCheck, Loader2, Smile, Paperclip, Camera, Send, Mic, Check, Zap, CheckCircle2, ShieldCheck, Smartphone, TrendingUp, Globe, Quote, ArrowRight, Play, Calendar, ChevronUp, ChevronDown, Home as Home$1, Calculator, Plane, DollarSign, Clock, Briefcase, Moon, PiggyBank, Building2, Award, Flame, BarChart3, Gem, PieChart, History, Car, FileText, CreditCard, Tag, Scale, QrCode, Gift, Fuel, Layers, ChefHat, Divide, Percent, Activity, Droplets, Baby, LineChart, User, AlertCircle, TrendingDown, Timer, AlertTriangle, Building, Users, Trophy, Target, RefreshCw, Key, AlertOctagon, ShoppingCart, CalendarDays, HelpCircle, RotateCcw, Info, Ruler, Grid, MapPin, Heart, GlassWater, Plus, Trash2, Shuffle, EyeOff, Eye, Copy, Download, VolumeX, Volume2, Search, BookOpen, ArrowLeft } from "lucide-react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { GoogleGenAI, Type } from "@google/genai";
import { createClient } from "@supabase/supabase-js";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { QRCodeSVG } from "qrcode.react";
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
  return [React.createElement("title", props, title)];
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
  return React.createElement(type, mappedTag);
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
var Context = React.createContext(defaultValue);
var HelmetProvider = (_a = class extends Component {
  constructor(props) {
    super(props);
    __publicField(this, "helmetData");
    this.helmetData = new HelmetData(this.props.context || {}, _a.canUseDOM);
  }
  render() {
    return /* @__PURE__ */ React.createElement(Context.Provider, { value: this.helmetData.value }, this.props.children);
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
    React.Children.forEach(children, (child) => {
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
    return helmetData ? /* @__PURE__ */ React.createElement(HelmetDispatcher, { ...newProps, context: helmetData.value }) : /* @__PURE__ */ React.createElement(Context.Consumer, null, (context) => /* @__PURE__ */ React.createElement(HelmetDispatcher, { ...newProps, context }));
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
                    href: "https://junny.com.br/criar-conta",
                    className: "flex items-center justify-center w-full py-4 rounded-full bg-gradient-to-r from-[#008c69] to-[#05a880] hover:brightness-110 transition-all duration-300 text-white font-bold text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(0,140,105,0.3)] active:scale-[0.98]",
                    children: "Começar Grátis"
                  }
                ) }),
                /* @__PURE__ */ jsx(motion.div, { variants: itemVariants, className: "mt-auto pt-10 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-sm", children: [
                  "© 2025 Junny AI. ",
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
              href: "https://junny.com.br/criar-conta",
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
            /* @__PURE__ */ jsx("div", { className: "flex -space-x-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full border-2 border-background overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: `https://picsum.photos/50/50?random=${i + 40}`, alt: "Foto de perfil de cliente satisfeito da Junny", width: 40, height: 40, className: "w-full h-full object-cover" }) }, i)) }),
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
              alt: "Junny Dashboard",
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
      " | Junny"
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
                /* @__PURE__ */ jsx("div", { className: "w-9 h-9 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold border border-primary/20 mr-2 overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: "https://ui-avatars.com/api/?name=Junny&background=00a884&color=fff", alt: "Profile", className: "w-full h-full object-cover" }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col justify-center", children: [
                  /* @__PURE__ */ jsxs("span", { className: "text-white font-medium text-base leading-tight", children: [
                    "Junny ",
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
                          /* @__PURE__ */ jsx("p", { className: "font-bold text-[#00a884] text-xs mb-1", children: "Junny AI" }),
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
                            /* @__PURE__ */ jsx("p", { className: "font-bold text-[#00a884] text-xs mb-1", children: "Junny AI" }),
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
                    /* @__PURE__ */ jsx("p", { className: "text-white font-bold text-xl md:text-2xl leading-tight", children: 'Com a Junny, é tão fácil quanto mandar um "oi".' })
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
              /* @__PURE__ */ jsx("div", { className: "ml-4 bg-[#111] px-4 py-1 rounded text-xs text-gray-500 font-mono w-64", children: "junny.com.br/reports/january" })
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
            href: "https://junny.com.br/criar-conta",
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
    publisher: "Junny",
    publisherLogo: "https://junny.com.br/favicon.ico",
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
          url: "https://junny.com.br/calculadoras/fgts"
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
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Junny" })
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
        href: `/stories/${story.slug}`,
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
    return data.map((post) => ({
      ...post,
      reading_time: Math.ceil(post.content.split(" ").length / 200)
    }));
  },
  async getPostBySlug(slug) {
    const { data, error } = await supabase.from("posts").select("*, author:authors(*), category:categories(*)").eq("slug", slug).eq("published", true).single();
    if (error) {
      console.error(`Error fetching post with slug ${slug}:`, error);
      return null;
    }
    return {
      ...data,
      reading_time: Math.ceil(data.content.split(" ").length / 200)
    };
  },
  async getPostsByCategory(categorySlug) {
    const { data, error } = await supabase.from("posts").select("*, author:authors(*), category:categories!inner(*)").eq("category.slug", categorySlug).eq("published", true).order("published_at", { ascending: false });
    if (error) {
      console.error(`Error fetching posts for category ${categorySlug}:`, error);
      return [];
    }
    return data.map((post) => ({
      ...post,
      reading_time: Math.ceil(post.content.split(" ").length / 200)
    }));
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
const CategoryBadge = ({ category, className = "" }) => {
  return /* @__PURE__ */ jsx(
    Link,
    {
      to: `/blog/${category.slug}`,
      className: `inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors border border-primary/20 whitespace-nowrap ${className}`,
      children: category.name
    }
  );
};
const PostCard = ({ post }) => {
  var _a2, _b2, _c, _d, _e;
  return /* @__PURE__ */ jsxs("article", { className: "group relative flex flex-col h-full bg-[#0d0d0d] rounded-2xl border border-white/5 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(71,255,183,0.1)]", children: [
    /* @__PURE__ */ jsx(Link, { to: `/blog/${((_a2 = post.category) == null ? void 0 : _a2.slug) || "geral"}/${post.slug}`, className: "block overflow-hidden aspect-video", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: post.cover_image,
        alt: post.cover_image_alt,
        className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
        loading: "lazy"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col flex-1 p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start gap-3 mb-4", children: [
        post.category && /* @__PURE__ */ jsx(CategoryBadge, { category: post.category }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center text-xs text-gray-400 gap-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "w-3 h-3" }),
            /* @__PURE__ */ jsx("time", { dateTime: post.published_at, children: format(new Date(post.published_at), "d 'de' MMM, yyyy", { locale: ptBR }) })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "w-1 h-1 rounded-full bg-gray-600" }),
          /* @__PURE__ */ jsxs("span", { children: [
            post.reading_time || 5,
            " min de leitura"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2", children: /* @__PURE__ */ jsx(Link, { to: `/blog/${((_b2 = post.category) == null ? void 0 : _b2.slug) || "geral"}/${post.slug}`, children: post.title }) }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-6 line-clamp-3 flex-1", children: post.excerpt }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-auto pt-4 border-t border-white/5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          ((_c = post.author) == null ? void 0 : _c.avatar_url) && /* @__PURE__ */ jsx("img", { src: post.author.avatar_url, alt: post.author.name, className: "w-6 h-6 rounded-full" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: (_d = post.author) == null ? void 0 : _d.name })
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: `/blog/${((_e = post.category) == null ? void 0 : _e.slug) || "geral"}/${post.slug}`, className: "text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all", children: [
          "Ler artigo ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
        ] })
      ] })
    ] })
  ] });
};
const LatestPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await blogService.getPosts();
        setPosts(allPosts.slice(0, 3));
      } catch (error) {
        console.error("Error fetching latest posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  if (!loading && posts.length === 0) return null;
  return /* @__PURE__ */ jsxs("section", { className: "py-24 bg-[#0d0d0d] relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-8 relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-end justify-between mb-12 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-bold text-white mb-4", children: [
            "Últimas do ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "Blog" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 max-w-xl", children: "Fique por dentro das novidades, dicas de economia e estratégias para dominar suas finanças." })
        ] }),
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/blog",
            className: "group flex items-center gap-2 text-primary font-medium hover:text-emerald-400 transition-colors",
            children: [
              "Ver todos os artigos",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })
            ]
          }
        )
      ] }),
      loading ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsx("div", { className: "h-[400px] bg-white/5 rounded-2xl animate-pulse border border-white/5" }, i)) }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: posts.map((post) => /* @__PURE__ */ jsx(PostCard, { post }, post.id)) })
    ] })
  ] });
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
        title: "Junny - Controle Financeiro Inteligente",
        description: "Gerencie suas finanças, calcule férias, rescisão e investimentos com as ferramentas gratuitas da Junny.",
        canonical: "/"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Junny",
      "url": "https://junny.com.br",
      "logo": "https://junny.com.br/favicon.ico",
      "description": "Organize suas finanças sem sair do chat. A Junny é a maneira mais simples e rápida de controlar seus gastos usando Inteligência Artificial no WhatsApp.",
      "sameAs": []
    }) }),
    /* @__PURE__ */ jsx(Hero, {}),
    /* @__PURE__ */ jsx(Hook, {}),
    /* @__PURE__ */ jsx(Modules, {}),
    /* @__PURE__ */ jsx(Certificate, {}),
    /* @__PURE__ */ jsx(Community, {}),
    /* @__PURE__ */ jsx(Testimonials, {}),
    /* @__PURE__ */ jsx(Price, {}),
    /* @__PURE__ */ jsx(LatestPosts, {}),
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
    if ((location.pathname.startsWith("/calculadoras") || location.pathname.startsWith("/blog")) && !isDismissed) {
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
              href: "https://junny.com.br/criar-conta",
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
        "item": "https://junny.com.br/"
        // Replace with actual domain if known, or use relative
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": `https://junny.com.br${item.href}`
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
const AppPromoBanner$3 = lazy(() => Promise.resolve().then(() => AppPromoBanner$2).then((module) => ({ default: module.AppPromoBanner })));
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
  const categories = [
    {
      title: "Trabalhistas e Previdenciárias",
      color: "blue",
      items: [
        { title: "Férias", description: "Calcule o valor exato das suas férias.", icon: Plane, href: "/calculadoras/ferias" },
        { title: "Rescisão", description: "Simule sua rescisão CLT completa.", icon: Calculator, href: "/calculadoras/rescisao" },
        { title: "INSS", description: "Simule o desconto do INSS 2025.", icon: Calculator, href: "/calculadoras/inss" },
        { title: "Salário Líquido", description: "Descubra quanto vai cair na conta.", icon: DollarSign, href: "/calculadoras/salario-liquido" },
        { title: "Décimo Terceiro", description: "Simule o valor do seu 13º salário.", icon: Calendar, href: "/calculadoras/decimo-terceiro" },
        { title: "Horas Extras", description: "Simule o valor com adicionais.", icon: Clock, href: "/calculadoras/horas-extras" },
        { title: "Seguro-Desemprego", description: "Simule valor e parcelas.", icon: Briefcase, href: "/calculadoras/seguro-desemprego" },
        { title: "Adicional Noturno", description: "Descubra o valor com acréscimo.", icon: Moon, href: "/calculadoras/adicional-noturno" },
        { title: "FGTS", description: "Simule o rendimento do seu FGTS.", icon: PiggyBank, href: "/calculadoras/fgts" },
        { title: "Custo Funcionário", description: "Descubra o custo real para a empresa.", icon: Building2, href: "/calculadoras/custo-funcionario" },
        { title: "PLR e IRRF", description: "Simule o desconto do IR sobre PLR.", icon: Award, href: "/calculadoras/plr" },
        { title: "Calculadora de Horas", description: "Some e subtraia horas e minutos.", icon: Clock, href: "/calculadoras/horas" },
        { title: "Dias Úteis", description: "Conte prazos excluindo feriados.", icon: Calendar, href: "/calculadoras/dias-uteis" }
      ]
    },
    {
      title: "Investimentos e Planejamento",
      color: "emerald",
      items: [
        { title: "Simulador Investimentos", description: "Compare CDB, LCI, LCA e Tesouro.", icon: TrendingUp, href: "/calculadoras/investimentos" },
        { title: "FIRE", description: "Quanto juntar para parar de trabalhar?", icon: Flame, href: "/calculadoras/fire" },
        { title: "Juros Compostos", description: "Simule o crescimento do patrimônio.", icon: BarChart3, href: "/calculadoras/juros-compostos" },
        { title: "Primeiro Milhão", description: "Simule quanto investir por mês.", icon: Gem, href: "/calculadoras/primeiro-milhao" },
        { title: "Regra 50-30-20", description: "Organize suas finanças pessoais.", icon: PieChart, href: "/calculadoras/regra-50-30-20" },
        { title: "Poder de Compra", description: "Corrija valores pela inflação.", icon: History, href: "/calculadoras/poder-de-compra" },
        { title: "Conversor Moedas", description: "Converta Real, Dólar e Euro.", icon: Globe, href: "/calculadoras/conversor-moedas" }
      ]
    },
    {
      title: "Empréstimos e Financiamentos",
      color: "purple",
      items: [
        { title: "Financiamento Imóvel", description: "SAC ou Price? Compare tabelas.", icon: Home$1, href: "/calculadoras/financiamento-imobiliario" },
        { title: "Financiamento Veículo", description: "Simule parcelas de carro ou moto.", icon: Car, href: "/calculadoras/financiamento-veiculos" },
        { title: "Quitação Antecipada", description: "Descubra o desconto ao antecipar.", icon: PiggyBank, href: "/calculadoras/quitacao-antecipada" },
        { title: "Custo Efetivo (CET)", description: "Descubra os juros reais.", icon: FileText, href: "/calculadoras/custo-efetivo-total" },
        { title: "Dívida Cartão", description: "Simule o efeito bola de neve.", icon: CreditCard, href: "/calculadoras/divida-cartao-credito" }
      ]
    },
    {
      title: "Empresariais e Empreendedorismo",
      color: "amber",
      items: [
        { title: "DAS MEI", description: "Calcule o valor da sua guia.", icon: Building2, href: "/calculadoras/das-mei" },
        { title: "Markup", description: "Defina o preço de venda ideal.", icon: Tag, href: "/calculadoras/markup" },
        { title: "Ponto de Equilíbrio", description: "Quanto vender para não ter prejuízo.", icon: Scale, href: "/calculadoras/ponto-de-equilibrio" },
        { title: "Simples vs Presumido", description: "Compare regimes tributários.", icon: FileText, href: "/calculadoras/simples-vs-presumido" },
        { title: "Capital de Giro", description: "Quanto ter em caixa.", icon: DollarSign, href: "/calculadoras/capital-de-giro" },
        { title: "ROI", description: "Eficiência dos investimentos.", icon: BarChart3, href: "/calculadoras/roi" }
      ]
    },
    {
      title: "Dia a Dia e Utilidades",
      color: "rose",
      items: [
        { title: "Gerador de Pix", description: "Crie QR Codes Pix personalizados.", icon: QrCode, href: "/calculadoras/gerador-pix" },
        { title: "Amigo Secreto", description: "Sorteio rápido e imparcial.", icon: Gift, href: "/calculadoras/amigo-secreto" },
        { title: "Energia", description: "Calcule o consumo de aparelhos.", icon: Zap, href: "/calculadoras/energia" },
        { title: "Combustível", description: "Álcool ou Gasolina?", icon: Fuel, href: "/calculadoras/combustivel" },
        { title: "Alugar ou Financiar", description: "Vale a pena comprar ou alugar?", icon: Home$1, href: "/calculadoras/alugar-ou-financiar" },
        { title: "Uber ou Carro", description: "Qual compensa mais?", icon: Car, href: "/calculadoras/uber-ou-carro" },
        { title: "Custo de Viagem", description: "Combustível e pedágios.", icon: Car, href: "/calculadoras/custo-viagem" },
        { title: "Churrasco", description: "Quantidade de carne e bebida.", icon: Flame, href: "/calculadoras/churrasco" },
        { title: "Tijolos e Pisos", description: "Quantidade de material.", icon: Layers, href: "/calculadoras/tijolos-pisos" },
        { title: "Conversor Culinário", description: "Xícaras para gramas.", icon: ChefHat, href: "/calculadoras/conversor-culinario" }
      ]
    },
    {
      title: "Matemática e Saúde",
      color: "cyan",
      items: [
        { title: "Regra de Três", description: "Resolva problemas de proporção.", icon: Divide, href: "/calculadoras/regra-de-tres" },
        { title: "Porcentagem", description: "Calcule descontos e aumentos.", icon: Percent, href: "/calculadoras/porcentagem" },
        { title: "IMC", description: "Descubra se seu peso está ideal.", icon: Activity, href: "/calculadoras/imc" },
        { title: "Água", description: "Meta diária de hidratação.", icon: Droplets, href: "/calculadoras/agua" },
        { title: "Idade Gestacional", description: "Data provável do parto.", icon: Baby, href: "/calculadoras/idade-gestacional" }
      ]
    }
  ];
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadoras Financeiras Junny",
    "description": "Ferramentas gratuitas para cálculo de férias, décimo terceiro, salário líquido e mais.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    }
  };
  const getColorClasses = (color) => {
    const colors = {
      blue: {
        border: "border-blue-500",
        text: "text-blue-500",
        bg: "bg-blue-500/10",
        hoverBorder: "hover:border-blue-500/30",
        gradient: "from-blue-500/5"
      },
      emerald: {
        border: "border-emerald-500",
        text: "text-emerald-500",
        bg: "bg-emerald-500/10",
        hoverBorder: "hover:border-emerald-500/30",
        gradient: "from-emerald-500/5"
      },
      purple: {
        border: "border-purple-500",
        text: "text-purple-500",
        bg: "bg-purple-500/10",
        hoverBorder: "hover:border-purple-500/30",
        gradient: "from-purple-500/5"
      },
      amber: {
        border: "border-amber-500",
        text: "text-amber-500",
        bg: "bg-amber-500/10",
        hoverBorder: "hover:border-amber-500/30",
        gradient: "from-amber-500/5"
      },
      rose: {
        border: "border-rose-500",
        text: "text-rose-500",
        bg: "bg-rose-500/10",
        hoverBorder: "hover:border-rose-500/30",
        gradient: "from-rose-500/5"
      },
      cyan: {
        border: "border-cyan-500",
        text: "text-cyan-500",
        bg: "bg-cyan-500/10",
        hoverBorder: "hover:border-cyan-500/30",
        gradient: "from-cyan-500/5"
      }
    };
    return colors[color] || colors.blue;
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
      /* @__PURE__ */ jsx("div", { className: "space-y-16", children: categories.map((category, index) => {
        const colors = getColorClasses(category.color);
        return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsx("h2", { className: `text-2xl font-bold text-white pl-2 border-l-4 ${colors.border}`, children: category.title }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4", children: category.items.map((item, itemIndex) => /* @__PURE__ */ jsx(Link, { to: item.href, className: "group", children: /* @__PURE__ */ jsxs("div", { className: `bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-2xl p-3 md:p-5 hover:bg-[#1a1a1a]/80 transition-all duration-300 ${colors.hoverBorder} h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98] flex flex-col`, children: [
            /* @__PURE__ */ jsx("div", { className: `absolute inset-0 bg-gradient-to-br ${colors.gradient} to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity` }),
            /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col h-full", children: [
              /* @__PURE__ */ jsx("div", { className: `w-8 h-8 md:w-10 md:h-10 ${colors.bg} rounded-lg flex items-center justify-center mb-3 border border-white/5 group-hover:scale-110 transition-transform`, children: /* @__PURE__ */ jsx(item.icon, { className: `${colors.text} w-4 h-4 md:w-5 md:h-5` }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-sm md:text-base font-bold text-white mb-1 md:mb-2 leading-tight line-clamp-2", children: item.title }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 line-clamp-2 md:line-clamp-3 mb-2 md:mb-4 flex-grow hidden md:block", children: item.description }),
              /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center gap-1 ${colors.text} text-xs font-bold group-hover:gap-2 transition-all mt-auto`, children: [
                "Acessar ",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3" })
              ] })
            ] })
          ] }) }, itemIndex)) })
        ] }, index);
      }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-24", children: /* @__PURE__ */ jsx(
        FAQ,
        {
          title: "Dúvidas Frequentes sobre Calculadoras",
          items: CALCULATOR_FAQS,
          showSocialProof: false
        }
      ) }),
      /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "h-96 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" }) }), children: /* @__PURE__ */ jsx(AppPromoBanner$3, {}) }),
      /* @__PURE__ */ jsx("div", { className: "mt-16 max-w-4xl mx-auto text-center border-t border-white/5 pt-12", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
        /* @__PURE__ */ jsx("strong", { children: "Aviso legal:" }),
        " As ferramentas disponibilizadas neste site são apenas para fins informativos e educacionais. Embora busquemos manter os cálculos e fórmulas atualizados, não nos responsabilizamos por eventuais divergências, perdas ou decisões tomadas com base nos resultados obtidos. Consulte sempre um profissional para orientações específicas ao seu caso."
      ] }) })
    ] })
  ] });
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
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg", children: "Chega de planilhas complicadas. Com a Junny, você controla seus gastos enviando áudios ou mensagens de texto no WhatsApp. Simples, rápido e com Inteligência Artificial." }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: ["Registro automático de gastos", "Relatórios mensais inteligentes", "Dicas de economia personalizadas"].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-gray-300", children: [
              /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5 text-primary" }),
              item
            ] }, i)) }),
            /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxs(
              "a",
              {
                href: "https://junny.com.br/criar-conta",
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
                alt: "Junny App Dashboard",
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
    question: "Qual o melhor investimento hoje?",
    answer: "Não existe um 'melhor' universal. Depende do seu objetivo e prazo. Para reserva de emergência, Tesouro Selic ou CDB com liquidez diária. Para longo prazo, ações ou Tesouro IPCA+."
  },
  {
    question: "O que é CDI?",
    answer: "Certificado de Depósito Interbancário. É a taxa que os bancos usam para emprestar dinheiro entre si. A maioria dos investimentos de Renda Fixa (CDB, LCI, LCA) rende uma porcentagem do CDI."
  },
  {
    question: "LCI e LCA são isentos de IR?",
    answer: "Sim! Para pessoas físicas, LCI (Letra de Crédito Imobiliário) e LCA (Letra de Crédito do Agronegócio) são isentos de Imposto de Renda, o que aumenta a rentabilidade líquida."
  }
];
function InvestmentPage() {
  const [initialAmount, setInitialAmount] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [years, setYears] = useState("");
  const [rate, setRate] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const p = parseFloat(initialAmount.replace(/\./g, "").replace(",", "."));
    const pmt = parseFloat(monthlyContribution.replace(/\./g, "").replace(",", "."));
    const t = parseInt(years);
    const r = parseFloat(rate.replace(",", "."));
    if (isNaN(p) || isNaN(pmt) || isNaN(t) || isNaN(r) || t === 0) {
      setResult(null);
      return;
    }
    const months = t * 12;
    const i = r / 100 / 12;
    const fvInitial = p * Math.pow(1 + i, months);
    const fvContributions = pmt * (Math.pow(1 + i, months) - 1) / i;
    const totalAmount = fvInitial + fvContributions;
    const totalInvested = p + pmt * months;
    const totalInterest = totalAmount - totalInvested;
    setResult({
      totalInvested,
      totalInterest,
      totalAmount
    });
  };
  useEffect(() => {
    calculate();
  }, [initialAmount, monthlyContribution, years, rate]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const handleNumberInput = (value, setter) => {
    if (/^[\d.,]*$/.test(value)) {
      setter(value);
    }
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Simulador de Investimentos",
    "description": "Simule o rendimento de seus investimentos em Renda Fixa (CDB, LCI, LCA, Tesouro Direto) e veja seu patrimônio crescer.",
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
        title: "Simulador de Investimentos - Renda Fixa e Juros Compostos",
        description: "Veja quanto seu dinheiro pode render. Simule investimentos em CDB, Tesouro Direto, LCI e LCA com nossa calculadora de juros compostos.",
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
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
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
                /* @__PURE__ */ jsx(TrendingUp, { className: "w-4 h-4 text-emerald-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Investimentos e Planejamento" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Simulador de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-500", children: "Investimentos" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Projete seu futuro financeiro. Compare rentabilidades e veja o poder dos juros compostos." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-emerald-500" }),
                "Simular Rendimento"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor Inicial" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: initialAmount,
                          onChange: (e) => handleCurrencyInput(e.target.value, setInitialAmount),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Aporte Mensal" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: monthlyContribution,
                          onChange: (e) => handleCurrencyInput(e.target.value, setMonthlyContribution),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Taxa de Juros Anual (%)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: rate,
                        onChange: (e) => handleNumberInput(e.target.value, setRate),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                        placeholder: "Ex: 10,5"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Prazo (Anos)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: years,
                        onChange: (e) => handleNumberInput(e.target.value, setYears),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                        placeholder: "Ex: 10"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-emerald-400 block mb-2", children: "Valor Total Acumulado" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.totalAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Total Investido" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.totalInvested.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Total em Juros" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-emerald-400", children: result ? `+ R$ ${result.totalInterest.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(LineChart, { className: "w-5 h-5 text-emerald-500" }),
                "O Poder dos Juros Compostos"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: 'Albert Einstein chamou os juros compostos de "a oitava maravilha do mundo". Aquele que entende, ganha. Aquele que não entende, paga.' }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Dica de Investidor" }),
                  "O tempo é seu maior aliado. Comece cedo, mesmo que com pouco. A constância dos aportes mensais é mais importante que a rentabilidade no curto prazo."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: INVESTMENT_FAQS,
          title: "Dúvidas sobre Investimentos",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
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
    "name": "Calculadora de Férias",
    "description": "Calcule o valor exato das suas férias com 1/3 constitucional e descontos.",
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
        title: "Calculadora de Férias 2025 - Cálculo Exato e Gratuito",
        description: "Calcule o valor exato das suas férias, incluindo 1/3 constitucional, abono pecuniário e descontos de INSS/IRRF.",
        canonical: "/calculadoras/ferias"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
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
                /* @__PURE__ */ jsx(Plane, { className: "w-4 h-4 text-blue-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Trabalhistas e Previdenciárias" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500", children: "Férias" })
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
    answer: "Para calcular o valor de energia elétrica de forma prática e precisa, basta utilizar a Calculadora de Consumo de Energia Junny."
  }
];
const EnergyPage = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Consumo de Energia Junny",
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
        description: "Descubra quanto seus aparelhos domésticos consomem e economize na conta de luz com a calculadora da Junny.",
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
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
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
                /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 text-rose-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Utilidades" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500", children: "Consumo de Energia" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Descubra quanto seus aparelhos domésticos consomem e economize na conta de luz com a calculadora da Junny." })
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
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-8", children: "Quanto de energia seus aparelhos domésticos consomem? Descubra com a prática e fácil Calculadora de Consumo de Energia Junny." }),
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
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: "Como utilizar a Calculadora de Consumo de Energia Junny" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-4", children: "Para utilizar a Calculadora de Consumo de Energia Junny, siga os passos abaixo:" }),
        /* @__PURE__ */ jsxs("ol", { className: "list-decimal pl-6 space-y-2 text-gray-400 mb-8", children: [
          /* @__PURE__ */ jsx("li", { children: "Informe a potência do seu aparelho;" }),
          /* @__PURE__ */ jsx("li", { children: "Preencha com o tempo de uso diário em horas;" }),
          /* @__PURE__ */ jsx("li", { children: "Complemente com a quantidade de dias de uso;" }),
          /* @__PURE__ */ jsx("li", { children: "Informe o valor do quilowatt-hora (KWH) em sua região;" }),
          /* @__PURE__ */ jsx("li", { children: "Por fim, o cálculo é feito automaticamente." })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: "Como calcular seu consumo de energia" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Veja como utilizar a calculadora de energia Junny para descobrir o consumo dos seus aparelhos nos tópicos abaixo." }),
        /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-white mb-3", children: "Descubra qual é a potência do seu aparelho" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: 'Essa informação geralmente pode ser encontrada na caixa ou na etiqueta de consumo afixada no próprio produto. Caso não encontre a caixa ou a etiqueta, também é possível encontrar a potência do seu aparelho em uma rápida pesquisa em sites buscadores como o Google. Para isso, basta informar o modelo do aparelho com a palavra "potência" na barra de busca.' }),
        /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-white mb-3", children: "Preencha o valor do kWh em sua região" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Em seguida, pesquise em sua conta de energia ou no site da sua operadora o valor do quilowatt-hora (KWH) em sua região. Quilowatt-hora é uma unidade de faturamento comum utilizada pelas concessionárias de energia elétrica para cobrar pelo fornecimento da energia." }),
        /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-white mb-3", children: "Informe os seus dados de consumo de energia do aparelho" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-8", children: "Agora, basta preencher a Calculadora de Energia Junny com os dados que você obteve e o seu tempo de consumo. O resultado aparecerá instantaneamente para você saber exatamente quanto vai gastar em um mês." }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/5 border border-white/10 rounded-2xl p-8 mb-12", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-white mb-4", children: "Veja o exemplo:" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-4", children: "Digamos que você esteja pensando em comprar um aspirador de pó vertical, mas antes deseja saber o quanto o aparelho vai gastar por mês." }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-4", children: "Sabendo que a potência do aparelho é de 1100W e que o preço do kWh, conforme informações da prestadora local, é de R$ 1,80, é hora de preencher os dados na calculadora. Nesse exemplo, consideramos que o tempo de uso do aparelho seria de uma hora por dia e uma vez por semana, ou seja, quatro dias de uso por mês." }),
          /* @__PURE__ */ jsx("p", { className: "text-rose-400 font-bold", children: "Resultado: Nesse caso, o custo mensal de energia para utilizar o aparelho será de R$ 7,92." })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: "Qual é a importância de saber calcular o consumo de energia dos eletrodomésticos?" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Saber quanto um aparelho gasta de energia todo mês pode ser a chave para fazer melhores escolhas e desenvolver bons hábitos. Pode ser a sua geladeira, computador de trabalho ou mesmo o seu aspirador de pó. Cada aparelho é responsável por uma parcela específica do seu cálculo de consumo de energia." }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-8", children: "Pensando nisso, a Junny desenvolveu uma Calculadora de Consumo de Energia para você descobrir de forma automática o quanto aquele seu eletrodoméstico vai gastar, além do preço médio que irá pagar por mês." }),
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
    "name": "Calculadora Álcool ou Gasolina Junny",
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
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
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
                /* @__PURE__ */ jsx(Fuel, { className: "w-4 h-4 text-rose-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Economia no Tanque" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500", children: "Álcool ou Gasolina" })
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
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-rose-500" }),
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
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 transition-colors"
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
                        className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 transition-colors"
                      }
                    )
                  ] })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col justify-center", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-[80px] pointer-events-none" }),
              /* @__PURE__ */ jsx("div", { className: "relative z-10 text-center", children: result.bestOption ? /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { type: "spring", stiffness: 200, damping: 20 },
                  children: [
                    /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest", children: "Melhor Opção" }),
                    /* @__PURE__ */ jsx("div", { className: "text-5xl md:text-7xl font-bold text-white mb-4", children: result.bestOption === "alcohol" ? /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "Álcool" }) : /* @__PURE__ */ jsx("span", { className: "text-emerald-400", children: "Gasolina" }) }),
                    /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8", children: [
                      /* @__PURE__ */ jsx(TrendingUp, { className: "w-4 h-4 text-rose-500" }),
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
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-500 font-bold", children: "1" }),
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
    question: "O que é aviso prévio indenizado?",
    answer: "É quando a empresa decide desligar o funcionário imediatamente, sem que ele precise trabalhar os 30 dias do aviso. Nesse caso, a empresa paga o salário correspondente a esse mês."
  },
  {
    question: "Tenho direito a multa de 40% do FGTS?",
    answer: "Sim, se a demissão for sem justa causa. A empresa deve pagar uma multa de 40% sobre todo o valor depositado no seu FGTS durante o contrato."
  },
  {
    question: "Como funciona o 13º proporcional?",
    answer: "Você recebe 1/12 do seu salário para cada mês trabalhado no ano (considerando fração igual ou superior a 15 dias)."
  }
];
function TerminationPage() {
  var _a2, _b2, _c, _d, _e;
  const [salary, setSalary] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("sem_justa_causa");
  const [notice, setNotice] = useState("trabalhado");
  const [balanceFGTS, setBalanceFGTS] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const sal = parseFloat(salary.replace(/\./g, "").replace(",", "."));
    const fgts = parseFloat(balanceFGTS.replace(/\./g, "").replace(",", ".") || "0");
    if (isNaN(sal) || !startDate || !endDate) {
      setResult(null);
      return;
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    const monthsWorked = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    let total = 0;
    const breakdown = {};
    const daysInMonth = new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate();
    const daysWorkedInLastMonth = end.getDate();
    breakdown.salaryBalance = sal / daysInMonth * daysWorkedInLastMonth;
    total += breakdown.salaryBalance;
    const vacationMonths = monthsWorked % 12;
    breakdown.vacationProportional = sal / 12 * vacationMonths;
    breakdown.vacationThird = breakdown.vacationProportional / 3;
    total += breakdown.vacationProportional + breakdown.vacationThird;
    const monthsInCurrentYear = end.getMonth() + 1;
    breakdown.thirteenthProportional = sal / 12 * monthsInCurrentYear;
    total += breakdown.thirteenthProportional;
    if (reason === "sem_justa_causa" && notice === "indenizado") {
      const years = Math.floor(monthsWorked / 12);
      const noticeDays = 30 + years * 3;
      breakdown.noticeIndemnified = sal / 30 * noticeDays;
      total += breakdown.noticeIndemnified;
    }
    if (reason === "sem_justa_causa") {
      breakdown.fgtsFine = fgts * 0.4;
      total += breakdown.fgtsFine;
    }
    setResult({ total, breakdown });
  };
  useEffect(() => {
    calculate();
  }, [salary, startDate, endDate, reason, notice, balanceFGTS]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Rescisão CLT",
    "description": "Simule o valor da sua rescisão de contrato de trabalho CLT. Cálculo completo com férias, 13º, aviso prévio e multa do FGTS.",
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
        title: "Calculadora de Rescisão CLT - Simule seu Acerto",
        description: "Foi demitido ou pediu demissão? Calcule o valor exato da sua rescisão, incluindo férias, 13º salário, aviso prévio e multa de 40% do FGTS.",
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
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Rescisão CLT", href: "/calculadoras/rescisao" }
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
                /* @__PURE__ */ jsx(Briefcase, { className: "w-4 h-4 text-blue-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Trabalhistas e Previdenciárias" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500", children: "Rescisão" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Simule seus direitos trabalhistas. Saiba quanto receber ao sair da empresa." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }),
                "Calcular Acerto"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Último Salário Bruto" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: salary,
                        onChange: (e) => handleCurrencyInput(e.target.value, setSalary),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Data de Admissão" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "date",
                        value: startDate,
                        onChange: (e) => setStartDate(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark]"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Data de Afastamento" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "date",
                        value: endDate,
                        onChange: (e) => setEndDate(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark]"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Motivo da Rescisão" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        value: reason,
                        onChange: (e) => setReason(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "sem_justa_causa", children: "Demissão sem Justa Causa" }),
                          /* @__PURE__ */ jsx("option", { value: "pedido_demissao", children: "Pedido de Demissão" }),
                          /* @__PURE__ */ jsx("option", { value: "com_justa_causa", children: "Demissão por Justa Causa" }),
                          /* @__PURE__ */ jsx("option", { value: "acordo", children: "Acordo (Comum Acordo)" })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Aviso Prévio" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        value: notice,
                        onChange: (e) => setNotice(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "trabalhado", children: "Trabalhado" }),
                          /* @__PURE__ */ jsx("option", { value: "indenizado", children: "Indenizado" }),
                          /* @__PURE__ */ jsx("option", { value: "nao_cumprido", children: "Não Cumprido (Descontado)" })
                        ]
                      }
                    )
                  ] })
                ] }),
                reason === "sem_justa_causa" && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Saldo do FGTS (para multa)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: balanceFGTS,
                        onChange: (e) => handleCurrencyInput(e.target.value, setBalanceFGTS),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-blue-400 block mb-2", children: "Total Estimado a Receber" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  result && result.breakdown && /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-gray-400", children: [
                      /* @__PURE__ */ jsx("span", { children: "Saldo de Salário" }),
                      /* @__PURE__ */ jsxs("span", { children: [
                        "R$ ",
                        (_a2 = result.breakdown.salaryBalance) == null ? void 0 : _a2.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-gray-400", children: [
                      /* @__PURE__ */ jsx("span", { children: "Férias Proporcionais + 1/3" }),
                      /* @__PURE__ */ jsxs("span", { children: [
                        "R$ ",
                        (_b2 = result.breakdown.vacationProportional + result.breakdown.vacationThird) == null ? void 0 : _b2.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-gray-400", children: [
                      /* @__PURE__ */ jsx("span", { children: "13º Proporcional" }),
                      /* @__PURE__ */ jsxs("span", { children: [
                        "R$ ",
                        (_c = result.breakdown.thirteenthProportional) == null ? void 0 : _c.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                      ] })
                    ] }),
                    result.breakdown.noticeIndemnified > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-gray-400", children: [
                      /* @__PURE__ */ jsx("span", { children: "Aviso Prévio Indenizado" }),
                      /* @__PURE__ */ jsxs("span", { children: [
                        "R$ ",
                        (_d = result.breakdown.noticeIndemnified) == null ? void 0 : _d.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                      ] })
                    ] }),
                    result.breakdown.fgtsFine > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-gray-400", children: [
                      /* @__PURE__ */ jsx("span", { children: "Multa 40% FGTS" }),
                      /* @__PURE__ */ jsxs("span", { children: [
                        "R$ ",
                        (_e = result.breakdown.fgtsFine) == null ? void 0 : _e.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                      ] })
                    ] })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-blue-500" }),
                "Importante"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: "O cálculo de rescisão é complexo e pode variar dependendo da convenção coletiva da sua categoria." }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Homologação" }),
                  "Sempre confira os valores no momento da homologação. Se tiver dúvidas, consulte o sindicato da sua categoria ou um advogado trabalhista."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: TERMINATION_FAQS,
          title: "Dúvidas sobre Rescisão",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const INSS_FAQS = [
  {
    question: "Como é calculado o INSS?",
    answer: "O cálculo é progressivo. O salário é fatiado em faixas, e cada fatia tem uma alíquota diferente (7,5%, 9%, 12% e 14%). O valor final é a soma do imposto de cada faixa."
  },
  {
    question: "Qual o teto do INSS em 2025?",
    answer: "O teto previdenciário muda anualmente. Em 2024, era R$ 7.786,02. Para 2025, o valor será reajustado pelo governo no início do ano."
  },
  {
    question: "O INSS é descontado do salário bruto?",
    answer: "Sim, o INSS é o primeiro desconto aplicado sobre o salário bruto. O Imposto de Renda (IRRF) é calculado depois, sobre o valor já deduzido do INSS."
  }
];
function INSSPage() {
  const [salary, setSalary] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const sal = parseFloat(salary.replace(/\./g, "").replace(",", "."));
    if (isNaN(sal)) {
      setResult(null);
      return;
    }
    let discount = 0;
    if (sal <= 1412) {
      discount = sal * 0.075;
    } else {
      discount += 1412 * 0.075;
      if (sal <= 2666.68) {
        discount += (sal - 1412) * 0.09;
      } else {
        discount += (2666.68 - 1412) * 0.09;
        if (sal <= 4000.03) {
          discount += (sal - 2666.68) * 0.12;
        } else {
          discount += (4000.03 - 2666.68) * 0.12;
          if (sal <= 7786.02) {
            discount += (sal - 4000.03) * 0.14;
          } else {
            discount += (7786.02 - 4000.03) * 0.14;
          }
        }
      }
    }
    if (sal > 7786.02) {
      let maxDiscount = 1412 * 0.075;
      maxDiscount += (2666.68 - 1412) * 0.09;
      maxDiscount += (4000.03 - 2666.68) * 0.12;
      maxDiscount += (7786.02 - 4000.03) * 0.14;
      discount = maxDiscount;
    }
    setResult({
      discount,
      netSalary: sal - discount,
      effectiveRate: discount / sal * 100
    });
  };
  useEffect(() => {
    calculate();
  }, [salary]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de INSS 2025",
    "description": "Calcule o desconto do INSS no seu salário. Tabela atualizada e cálculo progressivo automático.",
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
        description: "Quanto vai ser descontado de INSS do seu salário? Use nossa calculadora oficial com a tabela progressiva de 2025.",
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
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "INSS 2025", href: "/calculadoras/inss" }
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
                /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4 text-blue-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Trabalhistas e Previdenciárias" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500", children: "INSS" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Descubra o valor exato do desconto previdenciário no seu contracheque." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }),
                "Calcular Desconto"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Salário Bruto" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: salary,
                        onChange: (e) => handleCurrencyInput(e.target.value, setSalary),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-blue-400 block mb-2", children: "Valor do Desconto INSS" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.discount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Alíquota Efetiva" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `${result.effectiveRate.toFixed(2)}%` : "---" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Salário Pós-INSS" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.netSalary.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(TrendingDown, { className: "w-5 h-5 text-blue-500" }),
                "Tabela Progressiva"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                  /* @__PURE__ */ jsx("span", { children: "Até R$ 1.412,00" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white font-mono", children: "7,5%" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                  /* @__PURE__ */ jsx("span", { children: "De 1.412,01 a 2.666,68" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white font-mono", children: "9%" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                  /* @__PURE__ */ jsx("span", { children: "De 2.666,69 a 4.000,03" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white font-mono", children: "12%" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsx("span", { children: "De 4.000,04 a 7.786,02" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white font-mono", children: "14%" })
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: INSS_FAQS,
          title: "Dúvidas sobre INSS",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const NET_SALARY_FAQS = [
  {
    question: "O que é descontado do salário?",
    answer: "Os principais descontos obrigatórios são INSS (previdência) e IRRF (imposto de renda). Outros descontos comuns são vale-transporte (até 6%), plano de saúde e vale-refeição."
  },
  {
    question: "Como calcular o IRRF?",
    answer: "O IRRF é calculado sobre o salário base após descontar o INSS e o valor por dependente (R$ 189,59 em 2024). Aplica-se a alíquota da tabela progressiva e subtrai-se a parcela a deduzir."
  },
  {
    question: "O que é salário líquido?",
    answer: "É o valor que efetivamente cai na sua conta bancária, após todas as deduções legais e benefícios."
  }
];
function NetSalaryPage() {
  const [grossSalary, setGrossSalary] = useState("");
  const [dependents, setDependents] = useState("0");
  const [otherDiscounts, setOtherDiscounts] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const salary = parseFloat(grossSalary.replace(/\./g, "").replace(",", "."));
    const deps = parseInt(dependents);
    const others = parseFloat(otherDiscounts.replace(/\./g, "").replace(",", ".") || "0");
    if (isNaN(salary)) {
      setResult(null);
      return;
    }
    let inss = 0;
    if (salary <= 1412) {
      inss = salary * 0.075;
    } else if (salary <= 2666.68) {
      inss = 1412 * 0.075 + (salary - 1412) * 0.09;
    } else if (salary <= 4000.03) {
      inss = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (salary - 2666.68) * 0.12;
    } else if (salary <= 7786.02) {
      inss = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (4000.03 - 2666.68) * 0.12 + (salary - 4000.03) * 0.14;
    } else {
      inss = 908.85;
    }
    const deductionPerDependent = 189.59;
    const irrfBase = salary - inss - deps * deductionPerDependent;
    let irrf = 0;
    if (irrfBase <= 2259.2) {
      irrf = 0;
    } else if (irrfBase <= 2826.65) {
      irrf = irrfBase * 0.075 - 169.44;
    } else if (irrfBase <= 3751.05) {
      irrf = irrfBase * 0.15 - 381.44;
    } else if (irrfBase <= 4664.68) {
      irrf = irrfBase * 0.225 - 662.77;
    } else {
      irrf = irrfBase * 0.275 - 896;
    }
    if (irrf < 0) irrf = 0;
    const netSalary = salary - inss - irrf - others;
    setResult({
      inss,
      irrf,
      netSalary
    });
  };
  useEffect(() => {
    calculate();
  }, [grossSalary, dependents, otherDiscounts]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Salário Líquido 2025",
    "description": "Descubra quanto vai cair na sua conta. Cálculo exato de salário líquido com descontos de INSS e Imposto de Renda.",
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
        title: "Calculadora de Salário Líquido 2025 - Cálculo Exato",
        description: "Salário Bruto x Líquido: saiba a diferença. Calcule seus descontos de INSS e IRRF e descubra seu salário real.",
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
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
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
                /* @__PURE__ */ jsx(Wallet, { className: "w-4 h-4 text-blue-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Trabalhistas e Previdenciárias" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500", children: "Salário Líquido" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Entenda seu holerite. Veja para onde vai seu dinheiro e quanto sobra no final." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }),
                "Calcular Líquido"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Salário Bruto" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: grossSalary,
                        onChange: (e) => handleCurrencyInput(e.target.value, setGrossSalary),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Número de Dependentes" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        value: dependents,
                        onChange: (e) => setDependents(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                        placeholder: "0",
                        min: "0"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Outros Descontos" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: otherDiscounts,
                          onChange: (e) => handleCurrencyInput(e.target.value, setOtherDiscounts),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-blue-400 block mb-2", children: "Salário Líquido Estimado" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.netSalary.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Desconto INSS" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-red-400", children: result ? `- R$ ${result.inss.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Desconto IRRF" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-red-400", children: result ? `- R$ ${result.irrf.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(DollarSign, { className: "w-5 h-5 text-blue-500" }),
                "Para onde vai o dinheiro?"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: 'O "Leão" e a Previdência levam uma fatia considerável.' }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-2 list-disc pl-4", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "INSS:" }),
                    " Garante sua aposentadoria e auxílios."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "IRRF:" }),
                    " Imposto sobre a renda, retido na fonte."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5 mt-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Dica" }),
                  "Dependentes reduzem o Imposto de Renda. Certifique-se de informar todos ao RH da sua empresa."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: NET_SALARY_FAQS,
          title: "Dúvidas sobre Salário Líquido",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const THIRTEENTH_FAQS = [
  {
    question: "Quem tem direito ao 13º salário?",
    answer: "Todo trabalhador com carteira assinada (CLT), aposentados, pensionistas e servidores públicos. É necessário ter trabalhado pelo menos 15 dias no ano."
  },
  {
    question: "Quando é pago?",
    answer: "Geralmente em duas parcelas. A primeira até 30 de novembro (sem descontos) e a segunda até 20 de dezembro (com descontos de INSS e IRRF)."
  },
  {
    question: "Como é calculado?",
    answer: "O valor é proporcional aos meses trabalhados. Divide-se o salário por 12 e multiplica-se pelo número de meses em que você trabalhou pelo menos 15 dias."
  }
];
function ThirteenthSalaryPage() {
  const [salary, setSalary] = useState("");
  const [monthsWorked, setMonthsWorked] = useState("12");
  const [dependents, setDependents] = useState("0");
  const [firstInstallmentPaid, setFirstInstallmentPaid] = useState(false);
  const [result, setResult] = useState(null);
  const calculate = () => {
    const sal = parseFloat(salary.replace(/\./g, "").replace(",", "."));
    const months = parseInt(monthsWorked);
    const deps = parseInt(dependents);
    if (isNaN(sal) || isNaN(months) || months < 1 || months > 12) {
      setResult(null);
      return;
    }
    const fullThirteenth = sal / 12 * months;
    const first = fullThirteenth / 2;
    let inss = 0;
    if (fullThirteenth <= 1412) {
      inss = fullThirteenth * 0.075;
    } else if (fullThirteenth <= 2666.68) {
      inss = 1412 * 0.075 + (fullThirteenth - 1412) * 0.09;
    } else if (fullThirteenth <= 4000.03) {
      inss = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (fullThirteenth - 2666.68) * 0.12;
    } else if (fullThirteenth <= 7786.02) {
      inss = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (4000.03 - 2666.68) * 0.12 + (fullThirteenth - 4000.03) * 0.14;
    } else {
      inss = 908.85;
    }
    const deductionPerDependent = 189.59;
    const irrfBase = fullThirteenth - inss - deps * deductionPerDependent;
    let irrf = 0;
    if (irrfBase <= 2259.2) {
      irrf = 0;
    } else if (irrfBase <= 2826.65) {
      irrf = irrfBase * 0.075 - 169.44;
    } else if (irrfBase <= 3751.05) {
      irrf = irrfBase * 0.15 - 381.44;
    } else if (irrfBase <= 4664.68) {
      irrf = irrfBase * 0.225 - 662.77;
    } else {
      irrf = irrfBase * 0.275 - 896;
    }
    if (irrf < 0) irrf = 0;
    const totalDiscounts = inss + irrf;
    const second = fullThirteenth - first - totalDiscounts;
    setResult({
      first,
      second,
      total: first + second
    });
  };
  useEffect(() => {
    calculate();
  }, [salary, monthsWorked, dependents]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Décimo Terceiro",
    "description": "Calcule o valor da primeira e segunda parcela do seu 13º salário.",
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
        title: "Calculadora de Décimo Terceiro 2025 - 1ª e 2ª Parcela",
        description: "Quanto vou receber de 13º? Calcule o valor exato das parcelas e os descontos de INSS e Imposto de Renda.",
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
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
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
                /* @__PURE__ */ jsx(Gift, { className: "w-4 h-4 text-blue-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Trabalhistas e Previdenciárias" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-yellow-500", children: "Décimo Terceiro" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "O bônus de natal. Veja quanto você vai receber na primeira e segunda parcela." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }),
                "Calcular Parcelas"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Salário Bruto" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: salary,
                        onChange: (e) => handleCurrencyInput(e.target.value, setSalary),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Meses Trabalhados" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        value: monthsWorked,
                        onChange: (e) => setMonthsWorked(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                        placeholder: "12",
                        min: "1",
                        max: "12"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Dependentes" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        value: dependents,
                        onChange: (e) => setDependents(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                        placeholder: "0",
                        min: "0"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-blue-400 block mb-1", children: "1ª Parcela (Nov)" }),
                      /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-white", children: result ? `R$ ${result.first.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-blue-400 block mb-1", children: "2ª Parcela (Dez)" }),
                      /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-white", children: result ? `R$ ${result.second.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Total Líquido" }),
                    /* @__PURE__ */ jsx("span", { className: "text-3xl font-bold text-white", children: result ? `R$ ${result.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5 text-blue-500" }),
                "Datas Importantes"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                  /* @__PURE__ */ jsx("span", { children: "1ª Parcela" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white", children: "Até 30 de Novembro" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsx("span", { children: "2ª Parcela" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white", children: "Até 20 de Dezembro" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5 mt-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Atenção" }),
                  "A 2ª parcela é menor porque nela são descontados o INSS e o Imposto de Renda sobre o valor total do benefício."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: THIRTEENTH_FAQS,
          title: "Dúvidas sobre o 13º",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const OVERTIME_FAQS = [
  {
    question: "Quanto vale a hora extra?",
    answer: "No mínimo 50% a mais que a hora normal (dias úteis). Aos domingos e feriados, o adicional costuma ser de 100%."
  },
  {
    question: "Como calcular o valor da hora?",
    answer: "Divida seu salário mensal pela jornada mensal (geralmente 220 horas). O resultado é o valor da sua hora normal."
  },
  {
    question: "Incide INSS e FGTS?",
    answer: "Sim. As horas extras integram o salário para todos os fins, incidindo INSS, FGTS, Férias e 13º salário (reflexos)."
  }
];
function OvertimePage() {
  const [salary, setSalary] = useState("");
  const [hoursWorked, setHoursWorked] = useState("220");
  const [overtime50, setOvertime50] = useState("");
  const [overtime100, setOvertime100] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const sal = parseFloat(salary.replace(/\./g, "").replace(",", "."));
    const hours = parseFloat(hoursWorked);
    const ot50 = parseFloat(overtime50.replace(",", ".") || "0");
    const ot100 = parseFloat(overtime100.replace(",", ".") || "0");
    if (isNaN(sal) || isNaN(hours) || hours === 0) {
      setResult(null);
      return;
    }
    const hourlyRate = sal / hours;
    const value50 = hourlyRate * 1.5 * ot50;
    const value100 = hourlyRate * 2 * ot100;
    const totalOvertime = value50 + value100;
    setResult({
      hourlyRate,
      totalOvertime,
      totalSalary: sal + totalOvertime
    });
  };
  useEffect(() => {
    calculate();
  }, [salary, hoursWorked, overtime50, overtime100]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Horas Extras",
    "description": "Calcule o valor das suas horas extras (50% e 100%) e veja o impacto no seu salário final.",
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
        title: "Calculadora de Horas Extras - 50% e 100%",
        description: "Trabalhou a mais? Calcule quanto você vai receber de horas extras. Suporte para adicionais de 50% e 100%.",
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
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
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
                /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-blue-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Trabalhistas e Previdenciárias" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500", children: "Horas Extras" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Valorize seu tempo. Calcule exatamente quanto você tem a receber pelo trabalho extra." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }),
                "Calcular Adicional"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Salário Bruto" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: salary,
                          onChange: (e) => handleCurrencyInput(e.target.value, setSalary),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Jornada Mensal (Horas)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        value: hoursWorked,
                        onChange: (e) => setHoursWorked(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                        placeholder: "220"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Horas Extras 50%" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: overtime50,
                        onChange: (e) => setOvertime50(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                        placeholder: "Qtd horas"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Horas Extras 100%" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: overtime100,
                        onChange: (e) => setOvertime100(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                        placeholder: "Qtd horas"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-blue-400 block mb-2", children: "Valor Total das Horas Extras" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.totalOvertime.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Valor da sua Hora" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.hourlyRate.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Salário + Extras" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.totalSalary.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Timer, { className: "w-5 h-5 text-blue-500" }),
                "Regras Básicas"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                  /* @__PURE__ */ jsx("span", { children: "Hora Normal" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white", children: "Valor Base" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                  /* @__PURE__ */ jsx("span", { children: "Hora Extra 50%" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white", children: "Valor Base x 1,5" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsx("span", { children: "Hora Extra 100%" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white", children: "Valor Base x 2,0" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5 mt-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Reflexos" }),
                  "Lembre-se que as horas extras habituais aumentam o valor das suas férias, 13º salário e FGTS."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: OVERTIME_FAQS,
          title: "Dúvidas sobre Horas Extras",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const UNEMPLOYMENT_FAQS = [
  {
    question: "Quem tem direito?",
    answer: "Trabalhadores demitidos sem justa causa que trabalharam por um período mínimo (12 meses para a 1ª solicitação, 9 meses para a 2ª e 6 meses para as demais)."
  },
  {
    question: "Quantas parcelas vou receber?",
    answer: "Varia de 3 a 5 parcelas, dependendo do tempo de trabalho nos últimos 36 meses antes da demissão."
  },
  {
    question: "Qual o valor da parcela?",
    answer: "É calculado com base na média dos últimos 3 salários. O valor não pode ser inferior ao salário mínimo nem superior ao teto do benefício (R$ 2.313,74 em 2024)."
  }
];
function UnemploymentInsurancePage() {
  const [salary1, setSalary1] = useState("");
  const [salary2, setSalary2] = useState("");
  const [salary3, setSalary3] = useState("");
  const [monthsWorked, setMonthsWorked] = useState("12");
  const [requestCount, setRequestCount] = useState("1");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const s1 = parseFloat(salary1.replace(/\./g, "").replace(",", ".") || "0");
    const s2 = parseFloat(salary2.replace(/\./g, "").replace(",", ".") || "0");
    const s3 = parseFloat(salary3.replace(/\./g, "").replace(",", ".") || "0");
    const months = parseInt(monthsWorked);
    const request = parseInt(requestCount);
    if (months === 0) {
      setResult(null);
      return;
    }
    let averageSalary = (s1 + s2 + s3) / 3;
    let installmentValue = 0;
    if (averageSalary <= 2041.39) {
      installmentValue = averageSalary * 0.8;
    } else if (averageSalary <= 3402.65) {
      installmentValue = 1633.1 + (averageSalary - 2041.39) * 0.5;
    } else {
      installmentValue = 2313.74;
    }
    if (installmentValue < 1412) {
      installmentValue = 1412;
    }
    let installmentCount = 0;
    if (request === 1) {
      if (months >= 12 && months <= 23) installmentCount = 4;
      else if (months >= 24) installmentCount = 5;
      else installmentCount = 0;
    } else if (request === 2) {
      if (months >= 9 && months <= 11) installmentCount = 3;
      else if (months >= 12 && months <= 23) installmentCount = 4;
      else if (months >= 24) installmentCount = 5;
      else installmentCount = 0;
    } else {
      if (months >= 6 && months <= 11) installmentCount = 3;
      else if (months >= 12 && months <= 23) installmentCount = 4;
      else if (months >= 24) installmentCount = 5;
      else installmentCount = 0;
    }
    if (installmentCount === 0) {
      setResult(null);
      return;
    }
    setResult({
      installmentValue,
      installmentCount
    });
  };
  useEffect(() => {
    calculate();
  }, [salary1, salary2, salary3, monthsWorked, requestCount]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Seguro Desemprego",
    "description": "Veja se você tem direito e calcule o valor e a quantidade de parcelas do seu Seguro Desemprego.",
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
        title: "Calculadora de Seguro Desemprego 2025 - Valor das Parcelas",
        description: "Fui demitido, quanto vou receber? Calcule o valor e a quantidade de parcelas do seu Seguro Desemprego.",
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
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Seguro Desemprego", href: "/calculadoras/seguro-desemprego" }
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
                /* @__PURE__ */ jsx(ShieldCheck, { className: "w-4 h-4 text-blue-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Trabalhistas e Previdenciárias" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-orange-500", children: "Seguro Desemprego" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Consulte seu direito. Veja o valor e a quantidade de parcelas que você irá receber." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }),
                "Simular Benefício"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Últimos 3 Salários" }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: salary1,
                        onChange: (e) => handleCurrencyInput(e.target.value, setSalary1),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all text-center",
                        placeholder: "Mês 1"
                      }
                    ) }),
                    /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: salary2,
                        onChange: (e) => handleCurrencyInput(e.target.value, setSalary2),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all text-center",
                        placeholder: "Mês 2"
                      }
                    ) }),
                    /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: salary3,
                        onChange: (e) => handleCurrencyInput(e.target.value, setSalary3),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all text-center",
                        placeholder: "Mês 3"
                      }
                    ) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Meses Trabalhados" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        value: monthsWorked,
                        onChange: (e) => setMonthsWorked(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                        placeholder: "12"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Qual solicitação?" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        value: requestCount,
                        onChange: (e) => setRequestCount(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "1", children: "1ª Solicitação" }),
                          /* @__PURE__ */ jsx("option", { value: "2", children: "2ª Solicitação" }),
                          /* @__PURE__ */ jsx("option", { value: "3", children: "3ª ou mais" })
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-blue-400 block mb-2", children: "Valor da Parcela" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.installmentValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Quantidade de Parcelas" }),
                    /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-white", children: result ? `${result.installmentCount}x` : "---" })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5 text-blue-500" }),
                "Regras de Carência"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                  /* @__PURE__ */ jsx("span", { children: "1ª Solicitação" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white", children: "Min. 12 meses trabalhados" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                  /* @__PURE__ */ jsx("span", { children: "2ª Solicitação" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white", children: "Min. 9 meses trabalhados" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsx("span", { children: "3ª Solicitação" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white", children: "Min. 6 meses trabalhados" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5 mt-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Prazo" }),
                  "Você tem de 7 a 120 dias após a demissão para dar entrada no benefício."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: UNEMPLOYMENT_FAQS,
          title: "Dúvidas sobre o Benefício",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const NIGHT_SHIFT_FAQS = [
  {
    question: "O que é adicional noturno?",
    answer: "É um acréscimo no salário pago a quem trabalha entre 22h de um dia e 5h do dia seguinte (trabalhadores urbanos). O valor é, no mínimo, 20% superior à hora diurna."
  },
  {
    question: "A hora noturna é menor?",
    answer: "Sim! A hora noturna tem 52 minutos e 30 segundos. Isso significa que 7 horas de relógio trabalhadas à noite equivalem a 8 horas de trabalho para fins de pagamento."
  },
  {
    question: "Incide sobre horas extras?",
    answer: "Sim. Se você fizer hora extra no período noturno, deve receber o valor da hora extra + o adicional noturno sobre ela (efeito cascata)."
  }
];
function NightShiftPage() {
  const [salary, setSalary] = useState("");
  const [hoursWorked, setHoursWorked] = useState("220");
  const [nightHours, setNightHours] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const sal = parseFloat(salary.replace(/\./g, "").replace(",", "."));
    const hours = parseFloat(hoursWorked);
    const night = parseFloat(nightHours.replace(",", ".") || "0");
    if (isNaN(sal) || isNaN(hours) || hours === 0) {
      setResult(null);
      return;
    }
    const hourlyRate = sal / hours;
    const nightBonusRate = hourlyRate * 0.2;
    const totalNightBonus = nightBonusRate * night;
    setResult({
      hourlyRate,
      nightBonus: totalNightBonus,
      total: sal + totalNightBonus
    });
  };
  useEffect(() => {
    calculate();
  }, [salary, hoursWorked, nightHours]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Adicional Noturno",
    "description": "Calcule o valor do seu adicional noturno (20%) e veja quanto vai receber a mais no final do mês.",
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
        title: "Calculadora de Adicional Noturno - Hora Noturna Reduzida",
        description: "Trabalha à noite? Calcule seu adicional noturno de 20% e entenda como funciona a hora reduzida.",
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
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
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
                /* @__PURE__ */ jsx(Moon, { className: "w-4 h-4 text-blue-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Trabalhistas e Previdenciárias" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500", children: "Adicional Noturno" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Quem trabalha enquanto os outros dormem merece ganhar mais. Calcule seu direito." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }),
                "Calcular Adicional"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Salário Base" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: salary,
                          onChange: (e) => handleCurrencyInput(e.target.value, setSalary),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Jornada Mensal (Horas)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        value: hoursWorked,
                        onChange: (e) => setHoursWorked(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                        placeholder: "220"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Horas Noturnas Trabalhadas" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: nightHours,
                      onChange: (e) => setNightHours(e.target.value),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                      placeholder: "Qtd horas"
                    }
                  ),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Considere a hora reduzida (52min 30s) se aplicável." })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-blue-400 block mb-2", children: "Valor do Adicional" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.nightBonus.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Valor da Hora Normal" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.hourlyRate.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Salário + Adicional" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 text-blue-500" }),
                "Horário Noturno"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                  /* @__PURE__ */ jsx("span", { children: "Urbano" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white", children: "22h às 05h" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                  /* @__PURE__ */ jsx("span", { children: "Rural (Lavoura)" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white", children: "21h às 05h" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsx("span", { children: "Rural (Pecuária)" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white", children: "20h às 04h" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5 mt-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Dica" }),
                  "Se você trabalha a noite toda e estende para o dia (ex: até 7h), o adicional noturno também incide sobre as horas diurnas prorrogadas."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: NIGHT_SHIFT_FAQS,
          title: "Dúvidas sobre Adicional Noturno",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const FGTS_FAQS = [
  {
    question: "Quem tem direito ao FGTS?",
    answer: "Todo trabalhador com carteira assinada (CLT), trabalhadores rurais, temporários, avulsos, safreiros e atletas profissionais. Empregados domésticos também têm direito."
  },
  {
    question: "Qual o valor do depósito?",
    answer: "O empregador deve depositar mensalmente 8% do salário bruto do funcionário. Para Jovem Aprendiz, a alíquota é de 2%."
  },
  {
    question: "Quando posso sacar?",
    answer: "Em caso de demissão sem justa causa, aposentadoria, compra da casa própria, doenças graves ou no Saque-Aniversário (opcional)."
  }
];
function FGTSPage() {
  const [salary, setSalary] = useState("");
  const [balance, setBalance] = useState("");
  const [months, setMonths] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const sal = parseFloat(salary.replace(/\./g, "").replace(",", "."));
    const bal = parseFloat(balance.replace(/\./g, "").replace(",", ".") || "0");
    const m = parseInt(months || "0");
    if (isNaN(sal)) {
      setResult(null);
      return;
    }
    const monthlyDeposit = sal * 0.08;
    const totalEstimated = bal + monthlyDeposit * m;
    setResult({
      monthlyDeposit,
      totalEstimated
    });
  };
  useEffect(() => {
    calculate();
  }, [salary, balance, months]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de FGTS",
    "description": "Calcule quanto sua empresa deve depositar de FGTS por mês e projete seu saldo futuro.",
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
        title: "Calculadora de FGTS - Saldo e Depósitos Mensais",
        description: "Confira se o valor do seu FGTS está correto. Calcule o depósito mensal de 8% e projete seu saldo.",
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
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
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
                /* @__PURE__ */ jsx(PiggyBank, { className: "w-4 h-4 text-blue-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Trabalhistas e Previdenciárias" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500", children: "FGTS" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Fundo de Garantia do Tempo de Serviço. Seu patrimônio protegido." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }),
                "Simular Depósitos"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Salário Bruto" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: salary,
                        onChange: (e) => handleCurrencyInput(e.target.value, setSalary),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Saldo Atual (Opcional)" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: balance,
                          onChange: (e) => handleCurrencyInput(e.target.value, setBalance),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Meses a Projetar" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        value: months,
                        onChange: (e) => setMonths(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                        placeholder: "Ex: 12"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-blue-400 block mb-2", children: "Depósito Mensal (8%)" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.monthlyDeposit.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Saldo Projetado" }),
                    /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-white", children: result ? `R$ ${result.totalEstimated.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Building, { className: "w-5 h-5 text-blue-500" }),
                "O que é o FGTS?"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: "É uma poupança forçada criada para proteger o trabalhador demitido sem justa causa. O dinheiro pertence a você, mas fica retido na Caixa Econômica Federal." }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Rendimento" }),
                  "O FGTS rende 3% ao ano + TR. Recentemente, houve mudanças para garantir que renda pelo menos a inflação (IPCA)."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: FGTS_FAQS,
          title: "Dúvidas sobre FGTS",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const EMPLOYEE_COST_FAQS = [
  {
    question: "Quanto custa um funcionário?",
    answer: "Em média, um funcionário pode custar para a empresa quase o dobro do seu salário nominal, dependendo do regime tributário (Simples Nacional, Lucro Presumido ou Real)."
  },
  {
    question: "O que entra no custo?",
    answer: "Salário, férias + 1/3, 13º salário, FGTS (8%), INSS patronal (20% - exceto Simples), RAT, Sistema S, vale-transporte, vale-refeição e provisões para rescisão."
  },
  {
    question: "Simples Nacional é mais barato?",
    answer: "Geralmente sim, pois as empresas do Simples (anexos I, II, III e V) são isentas do INSS Patronal (20%) sobre a folha de pagamento."
  }
];
function EmployeeCostPage() {
  const [salary, setSalary] = useState("");
  const [regime, setRegime] = useState("simples");
  const [transport, setTransport] = useState("");
  const [food, setFood] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const sal = parseFloat(salary.replace(/\./g, "").replace(",", "."));
    const vt = parseFloat(transport.replace(/\./g, "").replace(",", ".") || "0");
    const vr = parseFloat(food.replace(/\./g, "").replace(",", ".") || "0");
    if (isNaN(sal) || sal === 0) {
      setResult(null);
      return;
    }
    const vacation = sal / 12;
    const vacationThird = vacation / 3;
    const thirteenth = sal / 12;
    const fgts = sal * 0.08;
    const fgtsProvision = (vacation + vacationThird + thirteenth) * 0.08;
    let taxes = 0;
    if (regime === "presumido_real") {
      taxes = sal * 0.28;
      taxes += (vacation + vacationThird + thirteenth) * 0.28;
    }
    const benefits = vt + vr;
    const totalMonthlyCost = sal + vacation + vacationThird + thirteenth + fgts + fgtsProvision + taxes + benefits;
    setResult({
      totalCost: totalMonthlyCost,
      multiplier: totalMonthlyCost / sal
    });
  };
  useEffect(() => {
    calculate();
  }, [salary, regime, transport, food]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Custo de Funcionário",
    "description": "Quanto custa contratar? Calcule o custo total de um funcionário para sua empresa (Simples Nacional ou Lucro Presumido).",
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
        title: "Custo de Funcionário para Empresa - Calculadora CLT",
        description: "Contratar custa caro? Simule o custo total de um funcionário (salário + encargos + benefícios) para sua empresa.",
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
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
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
                /* @__PURE__ */ jsx(Users, { className: "w-4 h-4 text-blue-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Trabalhistas e Previdenciárias" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500", children: "Custo de Funcionário" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Entenda o peso da folha de pagamento. Simule quanto sua empresa paga além do salário." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }),
                "Simular Custo"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Salário Bruto" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: salary,
                        onChange: (e) => handleCurrencyInput(e.target.value, setSalary),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Regime Tributário" }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      value: regime,
                      onChange: (e) => setRegime(e.target.value),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "simples", children: "Simples Nacional" }),
                        /* @__PURE__ */ jsx("option", { value: "presumido_real", children: "Lucro Presumido / Real" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Vale Transporte (Mensal)" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: transport,
                          onChange: (e) => handleCurrencyInput(e.target.value, setTransport),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Vale Refeição (Mensal)" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: food,
                          onChange: (e) => handleCurrencyInput(e.target.value, setFood),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-blue-400 block mb-2", children: "Custo Total Mensal" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.totalCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Multiplicador" }),
                    /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `${result.multiplier.toFixed(2)}x o salário` : "---" })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Briefcase, { className: "w-5 h-5 text-blue-500" }),
                "Custos Invisíveis"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: "Além do salário, a empresa deve provisionar mensalmente valores para férias e 13º salário, além de pagar os encargos sociais." }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Lucro Real/Presumido" }),
                  "Nesses regimes, o custo dispara devido aos 20% de INSS Patronal e outras taxas do Sistema S e RAT."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: EMPLOYEE_COST_FAQS,
          title: "Dúvidas sobre Custos Trabalhistas",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const PLR_FAQS = [
  {
    question: "O que é PLR?",
    answer: "Participação nos Lucros e Resultados. É um bônus pago pela empresa aos funcionários quando metas são atingidas."
  },
  {
    question: "Tem desconto de INSS?",
    answer: "Não! A PLR é isenta de encargos trabalhistas e previdenciários (INSS e FGTS) tanto para a empresa quanto para o funcionário."
  },
  {
    question: "Tem desconto de Imposto de Renda?",
    answer: "Sim, mas possui uma tabela exclusiva e mais vantajosa que a dos salários. Valores até determinado limite são isentos."
  }
];
function PLRPage() {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const val = parseFloat(amount.replace(/\./g, "").replace(",", "."));
    if (isNaN(val) || val === 0) {
      setResult(null);
      return;
    }
    let tax = 0;
    if (val <= 7640.8) {
      tax = 0;
    } else if (val <= 9922.28) {
      tax = val * 0.075 - 573.06;
    } else if (val <= 13167) {
      tax = val * 0.15 - 1317.23;
    } else if (val <= 16380.38) {
      tax = val * 0.225 - 2304.76;
    } else {
      tax = val * 0.275 - 3123.78;
    }
    setResult({
      tax,
      netAmount: val - tax,
      effectiveRate: tax / val * 100
    });
  };
  useEffect(() => {
    calculate();
  }, [amount]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de PLR",
    "description": "Calcule o Imposto de Renda sobre sua PLR (Participação nos Lucros e Resultados).",
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
        title: "Calculadora de PLR - Imposto de Renda Exclusivo",
        description: "Vai receber PLR? Calcule o desconto do Imposto de Renda. A tabela da PLR é diferente e mais vantajosa que a do salário.",
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
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
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
                /* @__PURE__ */ jsx(Trophy, { className: "w-4 h-4 text-blue-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Trabalhistas e Previdenciárias" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-yellow-500", children: "PLR" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Participação nos Lucros e Resultados. Veja quanto sobra líquido para você." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }),
                "Calcular Imposto"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor Bruto da PLR" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: amount,
                        onChange: (e) => handleCurrencyInput(e.target.value, setAmount),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-blue-400 block mb-2", children: "Valor Líquido a Receber" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.netAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Imposto Retido" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-red-400", children: result ? `- R$ ${result.tax.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Alíquota Efetiva" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `${result.effectiveRate.toFixed(2)}%` : "---" })
                    ] })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Target, { className: "w-5 h-5 text-blue-500" }),
                "Benefício Fiscal"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: "A PLR tem tributação exclusiva na fonte. Isso significa que ela não se soma aos seus salários no ajuste anual do Imposto de Renda, o que é ótimo para o seu bolso." }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Isenção" }),
                  "Em 2024, quem recebe até R$ 7.640,80 de PLR no ano está isento de imposto de renda sobre esse valor."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: PLR_FAQS,
          title: "Dúvidas sobre PLR",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const FIRE_FAQS = [
  {
    question: "O que é o movimento FIRE?",
    answer: "FIRE significa 'Financial Independence, Retire Early' (Independência Financeira, Aposentadoria Antecipada). É um estilo de vida focado em economizar agressivamente para se aposentar jovem."
  },
  {
    question: "O que é a Regra dos 4%?",
    answer: "É uma regra prática que diz que você pode retirar 4% do seu patrimônio investido anualmente sem que o dinheiro acabe, considerando a inflação e rendimentos históricos."
  },
  {
    question: "Onde devo investir para o FIRE?",
    answer: "Geralmente em uma carteira diversificada com ações (para crescimento) e renda fixa (para segurança), focando no longo prazo e juros compostos."
  }
];
function FIREPage() {
  const [monthlyExpense, setMonthlyExpense] = useState("");
  const [currentSavings, setCurrentSavings] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [annualReturn, setAnnualReturn] = useState("8");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const expense = parseFloat(monthlyExpense.replace(/\./g, "").replace(",", "."));
    const savings = parseFloat(currentSavings.replace(/\./g, "").replace(",", "."));
    const contribution = parseFloat(monthlyContribution.replace(/\./g, "").replace(",", "."));
    const rate = parseFloat(annualReturn.replace(",", "."));
    if (isNaN(expense) || isNaN(savings) || isNaN(contribution) || isNaN(rate) || expense === 0) {
      setResult(null);
      return;
    }
    const fireNumber = expense * 300;
    const r = Math.pow(1 + rate / 100, 1 / 12) - 1;
    const numerator = fireNumber * r + contribution;
    const denominator = savings * r + contribution;
    let months = 0;
    if (denominator > 0) {
      months = Math.log(numerator / denominator) / Math.log(1 + r);
    }
    setResult({
      fireNumber,
      yearsToFire: Math.max(0, months / 12)
    });
  };
  useEffect(() => {
    calculate();
  }, [monthlyExpense, currentSavings, monthlyContribution, annualReturn]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const handleNumberInput = (value, setter) => {
    if (/^[\d.,]*$/.test(value)) {
      setter(value);
    }
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora FIRE - Independência Financeira",
    "description": "Descubra seu número FIRE e quanto tempo falta para você atingir a independência financeira e se aposentar cedo.",
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
        title: "Calculadora FIRE - Independência Financeira",
        description: "Quer se aposentar cedo? Calcule seu 'Número FIRE' e descubra quanto tempo falta para atingir a liberdade financeira.",
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
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Calculadora FIRE", href: "/calculadoras/fire" }
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
                /* @__PURE__ */ jsx(Flame, { className: "w-4 h-4 text-emerald-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Investimentos e Planejamento" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-orange-500", children: "FIRE" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Financial Independence, Retire Early. Descubra quanto você precisa para viver de renda." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-emerald-500" }),
                "Calcular Liberdade"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Gasto Mensal Desejado na Aposentadoria" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: monthlyExpense,
                        onChange: (e) => handleCurrencyInput(e.target.value, setMonthlyExpense),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Patrimônio Atual" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: currentSavings,
                          onChange: (e) => handleCurrencyInput(e.target.value, setCurrentSavings),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Aporte Mensal" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: monthlyContribution,
                          onChange: (e) => handleCurrencyInput(e.target.value, setMonthlyContribution),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Rentabilidade Real Anual Esperada (%)" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: annualReturn,
                      onChange: (e) => handleNumberInput(e.target.value, setAnnualReturn),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                      placeholder: "Ex: 8"
                    }
                  ),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Acima da inflação. Média histórica do mercado de ações é ~7-10%." })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-emerald-400 block mb-2", children: "Seu Número FIRE" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.fireNumber.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-2", children: "Este é o valor que você precisa acumular." })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Tempo Estimado" }),
                    /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-white", children: result ? `${result.yearsToFire.toFixed(1)} anos` : "---" })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5 text-emerald-500" }),
                "Como funciona?"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: 'O cálculo baseia-se na "Regra dos 4%". Estudos mostram que se você retirar 4% do seu portfólio inicial por ano (ajustado pela inflação), seu dinheiro tem altíssima probabilidade de durar 30 anos ou mais.' }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Fórmula Simples" }),
                  "Pegue seu custo de vida mensal e multiplique por 300. Esse é o seu objetivo.",
                  /* @__PURE__ */ jsx("br", {}),
                  "Ex: R$ 5.000 x 300 = R$ 1.500.000."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: FIRE_FAQS,
          title: "Dúvidas sobre FIRE",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const INTEREST_FAQS = [
  {
    question: "O que são juros compostos?",
    answer: "São 'juros sobre juros'. O rendimento de cada mês é somado ao capital inicial, e no mês seguinte, o juro é calculado sobre esse novo total maior."
  },
  {
    question: "Qual a diferença para juros simples?",
    answer: "Nos juros simples, o rendimento é sempre calculado apenas sobre o valor inicial. Nos compostos, o rendimento cresce exponencialmente com o tempo."
  },
  {
    question: "Como aproveitar os juros compostos?",
    answer: "Comece a investir o quanto antes e mantenha a regularidade. O tempo é o fator que mais influencia o crescimento exponencial da curva de juros."
  }
];
function CompoundInterestPage() {
  const [initialAmount, setInitialAmount] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [period, setPeriod] = useState("");
  const [periodType, setPeriodType] = useState("years");
  const [rateType, setRateType] = useState("yearly");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const p = parseFloat(initialAmount.replace(/\./g, "").replace(",", "."));
    const pmt = parseFloat(monthlyContribution.replace(/\./g, "").replace(",", "."));
    const r = parseFloat(interestRate.replace(",", "."));
    const t = parseInt(period);
    if (isNaN(p) || isNaN(pmt) || isNaN(r) || isNaN(t) || t === 0) {
      setResult(null);
      return;
    }
    let months = t;
    if (periodType === "years") {
      months = t * 12;
    }
    let monthlyRate = r / 100;
    if (rateType === "yearly") {
      monthlyRate = Math.pow(1 + r / 100, 1 / 12) - 1;
    }
    const fvInitial = p * Math.pow(1 + monthlyRate, months);
    const fvContributions = pmt * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
    const totalAmount = fvInitial + fvContributions;
    const totalInvested = p + pmt * months;
    const totalInterest = totalAmount - totalInvested;
    setResult({
      totalInvested,
      totalInterest,
      totalAmount
    });
  };
  useEffect(() => {
    calculate();
  }, [initialAmount, monthlyContribution, interestRate, period, periodType, rateType]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const handleNumberInput = (value, setter) => {
    if (/^[\d.,]*$/.test(value)) {
      setter(value);
    }
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Juros Compostos",
    "description": "Simule o crescimento do seu patrimônio com a força dos juros compostos.",
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
        title: "Calculadora de Juros Compostos Online",
        description: "Veja a mágica dos juros compostos acontecer. Simule seus investimentos e descubra quanto você terá no futuro.",
        canonical: "/calculadoras/juros-compostos"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": INTEREST_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Juros Compostos", href: "/calculadoras/juros-compostos" }
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
                /* @__PURE__ */ jsx(BarChart3, { className: "w-4 h-4 text-emerald-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Investimentos e Planejamento" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500", children: "Juros Compostos" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "A força mais poderosa do universo financeiro. Simule o crescimento exponencial do seu dinheiro." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-emerald-500" }),
                "Simular Crescimento"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor Inicial" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: initialAmount,
                          onChange: (e) => handleCurrencyInput(e.target.value, setInitialAmount),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Aporte Mensal" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: monthlyContribution,
                          onChange: (e) => handleCurrencyInput(e.target.value, setMonthlyContribution),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Taxa de Juros (%)" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: interestRate,
                          onChange: (e) => handleNumberInput(e.target.value, setInterestRate),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                          placeholder: "Ex: 10"
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "select",
                        {
                          value: rateType,
                          onChange: (e) => setRateType(e.target.value),
                          className: "bg-[#0a0a0a] border border-white/10 rounded-xl px-2 text-white text-sm focus:outline-none focus:border-emerald-500/50",
                          children: [
                            /* @__PURE__ */ jsx("option", { value: "yearly", children: "Anual" }),
                            /* @__PURE__ */ jsx("option", { value: "monthly", children: "Mensal" })
                          ]
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Período" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: period,
                          onChange: (e) => handleNumberInput(e.target.value, setPeriod),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                          placeholder: "Ex: 5"
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "select",
                        {
                          value: periodType,
                          onChange: (e) => setPeriodType(e.target.value),
                          className: "bg-[#0a0a0a] border border-white/10 rounded-xl px-2 text-white text-sm focus:outline-none focus:border-emerald-500/50",
                          children: [
                            /* @__PURE__ */ jsx("option", { value: "years", children: "Anos" }),
                            /* @__PURE__ */ jsx("option", { value: "months", children: "Meses" })
                          ]
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-emerald-400 block mb-2", children: "Valor Final Total" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.totalAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Total Investido" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.totalInvested.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Total em Juros" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-emerald-400", children: result ? `+ R$ ${result.totalInterest.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5 text-emerald-500" }),
                "Juros sobre Juros"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: "A diferença entre juros simples e compostos é brutal no longo prazo." }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Exemplo" }),
                  "Investindo R$ 1.000 por mês a 1% a.m. por 30 anos:",
                  /* @__PURE__ */ jsx("br", {}),
                  "- Total investido: R$ 360.000",
                  /* @__PURE__ */ jsx("br", {}),
                  "- Total final: ",
                  /* @__PURE__ */ jsx("strong", { children: "R$ 3.500.000" }),
                  /* @__PURE__ */ jsx("br", {}),
                  "Os juros geraram 10x mais que o seu trabalho!"
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: INTEREST_FAQS,
          title: "Dúvidas sobre Juros Compostos",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const RENT_VS_BUY_FAQS = [
  {
    question: "Quando vale a pena alugar?",
    answer: "Financeiramente, alugar vale a pena quando o valor do aluguel é muito inferior ao rendimento que você teria se investisse o dinheiro da compra do imóvel. Também é indicado para quem precisa de mobilidade ou não tem certeza de onde vai morar a longo prazo."
  },
  {
    question: "Quando vale a pena comprar?",
    answer: "Comprar é vantajoso para quem busca estabilidade, personalização do imóvel e proteção contra aumentos de aluguel. Financeiramente, compensa se a parcela do financiamento for próxima ao valor do aluguel ou se o imóvel tiver grande potencial de valorização."
  },
  {
    question: "O que é custo de oportunidade?",
    answer: "É o quanto você deixa de ganhar ao escolher uma opção. Ao comprar um imóvel à vista, o custo de oportunidade é o rendimento que esse dinheiro teria se ficasse investido no mercado financeiro."
  }
];
function RentVsBuyPage() {
  const [propertyValue, setPropertyValue] = useState("");
  const [rentValue, setRentValue] = useState("");
  const [investmentYield, setInvestmentYield] = useState("0.85");
  const [appreciationRate, setAppreciationRate] = useState("0.5");
  const [years, setYears] = useState("10");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const propVal = parseFloat(propertyValue.replace(/\./g, "").replace(",", ".") || "0");
    const rentVal = parseFloat(rentValue.replace(/\./g, "").replace(",", ".") || "0");
    const yieldRate = parseFloat(investmentYield.replace(",", ".") || "0") / 100;
    const apprecRate = parseFloat(appreciationRate.replace(",", ".") || "0") / 100;
    const periodMonths = parseInt(years) * 12;
    if (propVal === 0 || rentVal === 0) {
      setResult(null);
      return;
    }
    let capitalRent = propVal;
    let currentRent = rentVal;
    for (let i = 0; i < periodMonths; i++) {
      capitalRent = capitalRent * (1 + yieldRate) - currentRent;
      currentRent = currentRent * (1 + apprecRate);
    }
    const rentTotalWealth = capitalRent;
    const buyTotalWealth = propVal * Math.pow(1 + apprecRate, periodMonths);
    setResult({
      rentTotalWealth,
      buyTotalWealth,
      difference: Math.abs(rentTotalWealth - buyTotalWealth),
      bestOption: rentTotalWealth > buyTotalWealth ? "rent" : "buy"
    });
  };
  useEffect(() => {
    calculate();
  }, [propertyValue, rentValue, investmentYield, appreciationRate, years]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora Alugar ou Comprar Imóvel",
    "description": "Descubra se vale mais a pena comprar ou alugar um imóvel com base em seus objetivos financeiros.",
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
        title: "Alugar ou Comprar Imóvel? Calculadora de Decisão",
        description: "Tire a dúvida cruel. Simule se financeiramente vale mais a pena pagar aluguel e investir ou comprar a casa própria.",
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
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Alugar ou Comprar", href: "/calculadoras/alugar-ou-financiar" }
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
                /* @__PURE__ */ jsx(Home$1, { className: "w-4 h-4 text-rose-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Utilidades" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Alugar ou ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-indigo-500", children: "Comprar?" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "A matemática por trás da casa própria. Descubra qual opção constrói mais patrimônio." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-rose-500" }),
                "Simular Cenários"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor do Imóvel" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: propertyValue,
                        onChange: (e) => handleCurrencyInput(e.target.value, setPropertyValue),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor do Aluguel (Mensal)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: rentValue,
                        onChange: (e) => handleCurrencyInput(e.target.value, setRentValue),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Rendimento Invest. (% a.m.)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: investmentYield,
                        onChange: (e) => setInvestmentYield(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                        placeholder: "0.85"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valorização Imóvel (% a.m.)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: appreciationRate,
                        onChange: (e) => setAppreciationRate(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                        placeholder: "0.5"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Período (Anos)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        value: years,
                        onChange: (e) => setYears(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                        placeholder: "10"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-rose-500/10 p-6 rounded-2xl border border-rose-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-rose-400 block mb-2", children: "Melhor Opção Financeira" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? result.bestOption === "rent" ? "Alugar + Investir" : "Comprar Imóvel" : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border text-center ${result && result.bestOption === "rent" ? "bg-green-500/10 border-green-500/20" : "bg-white/5 border-white/5"}`, children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Patrimônio Alugando" }),
                      /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-white", children: result ? `R$ ${result.rentTotalWealth.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}` : "---" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border text-center ${result && result.bestOption === "buy" ? "bg-green-500/10 border-green-500/20" : "bg-white/5 border-white/5"}`, children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Patrimônio Comprando" }),
                      /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-white", children: result ? `R$ ${result.buyTotalWealth.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}` : "---" })
                    ] })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5 text-rose-500" }),
                "Análise"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: "Esta simulação compara dois cenários partindo do princípio que você tem o dinheiro à vista:" }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-2 list-disc pl-4", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Alugar:" }),
                    " Você investe o dinheiro do imóvel e paga o aluguel com os rendimentos (ou parte deles)."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Comprar:" }),
                    " Você compra o imóvel e ganha com a valorização dele ao longo do tempo."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5 mt-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Dica" }),
                  "Se o aluguel for menor que 0,4% do valor do imóvel, geralmente compensa mais alugar e investir a diferença."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: RENT_VS_BUY_FAQS,
          title: "Dúvidas sobre Imóveis",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const UBER_VS_CAR_FAQS = [
  {
    question: "O que sai mais barato?",
    answer: "Depende da quilometragem mensal. Para quem roda pouco (até 300-500km/mês), aplicativos costumam ser mais baratos pois não têm custos fixos como IPVA, seguro e depreciação."
  },
  {
    question: "Quais os custos ocultos do carro?",
    answer: "Além de combustível e manutenção, o carro tem a depreciação (perda de valor anual), custo de oportunidade do dinheiro investido na compra, seguro, IPVA, licenciamento e estacionamento."
  },
  {
    question: "E o conforto?",
    answer: "O carro próprio oferece disponibilidade imediata e liberdade. O aplicativo oferece a comodidade de não precisar dirigir nem procurar estacionamento. A escolha também é sobre estilo de vida."
  }
];
function UberVsCarPage() {
  const [carValue, setCarValue] = useState("");
  const [kmPerMonth, setKmPerMonth] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [consumption, setConsumption] = useState("");
  const [insurance, setInsurance] = useState("");
  const [parking, setParking] = useState("");
  const [uberPrice, setUberPrice] = useState("");
  const [uberPricePerKm, setUberPricePerKm] = useState("2.50");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const carVal = parseFloat(carValue.replace(/\./g, "").replace(",", ".") || "0");
    const km = parseFloat(kmPerMonth.replace(/\./g, "").replace(",", ".") || "0");
    const fuel = parseFloat(fuelPrice.replace(",", ".") || "0");
    const cons = parseFloat(consumption.replace(",", ".") || "0");
    const ins = parseFloat(insurance.replace(/\./g, "").replace(",", ".") || "0");
    const park = parseFloat(parking.replace(/\./g, "").replace(",", ".") || "0");
    const uberKmPrice = parseFloat(uberPricePerKm.replace(",", ".") || "0");
    if (carVal === 0 || km === 0) {
      setResult(null);
      return;
    }
    const depreciation = carVal * 0.1 / 12;
    const opportunity = carVal * 8e-3;
    const ipva = carVal * 0.04 / 12;
    const insuranceMonthly = ins / 12;
    const fuelMonthly = km / cons * fuel;
    const maintenance = carVal * 0.03 / 12;
    const carMonthlyCost = depreciation + opportunity + ipva + insuranceMonthly + fuelMonthly + maintenance + park;
    const uberMonthlyCost = km * uberKmPrice;
    setResult({
      carMonthlyCost,
      uberMonthlyCost,
      bestOption: carMonthlyCost < uberMonthlyCost ? "car" : "uber"
    });
  };
  useEffect(() => {
    calculate();
  }, [carValue, kmPerMonth, fuelPrice, consumption, insurance, parking, uberPricePerKm]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora Uber ou Carro Próprio",
    "description": "Descubra se vale mais a pena ter carro próprio ou andar de Uber/99 com base na sua rotina.",
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
        title: "Uber ou Carro Próprio? Calculadora de Custos",
        description: "Faça as contas. Descubra se é mais barato manter um carro ou usar aplicativos de transporte como Uber e 99.",
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
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-gray-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Uber ou Carro", href: "/calculadoras/uber-ou-carro" }
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
                /* @__PURE__ */ jsx(Smartphone, { className: "w-4 h-4 text-rose-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Utilidades" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Uber ou ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-gray-400", children: "Carro Próprio?" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Coloque na ponta do lápis. Compare os custos reais de manter um veículo versus usar apps." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-rose-500" }),
                "Comparar Custos"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor do Carro" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: carValue,
                          onChange: (e) => handleCurrencyInput(e.target.value, setCarValue),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Km Rodados (Mês)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: kmPerMonth,
                        onChange: (e) => setKmPerMonth(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                        placeholder: "Ex: 500"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Preço Combustível" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: fuelPrice,
                        onChange: (e) => setFuelPrice(e.target.value.replace(",", ".")),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                        placeholder: "5.50"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Consumo (km/L)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: consumption,
                        onChange: (e) => setConsumption(e.target.value.replace(",", ".")),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                        placeholder: "10"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Preço Uber (por km)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: uberPricePerKm,
                        onChange: (e) => setUberPricePerKm(e.target.value.replace(",", ".")),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                        placeholder: "2.50"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Seguro (Anual)" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: insurance,
                          onChange: (e) => handleCurrencyInput(e.target.value, setInsurance),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Estacionamento (Mês)" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: parking,
                          onChange: (e) => handleCurrencyInput(e.target.value, setParking),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-rose-500/10 p-6 rounded-2xl border border-rose-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-rose-400 block mb-2", children: "Opção Mais Econômica" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? result.bestOption === "car" ? "Carro Próprio" : "Uber / App" : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border text-center ${result && result.bestOption === "car" ? "bg-green-500/10 border-green-500/20" : "bg-white/5 border-white/5"}`, children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Custo Mensal Carro" }),
                      /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-white", children: result ? `R$ ${result.carMonthlyCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border text-center ${result && result.bestOption === "uber" ? "bg-green-500/10 border-green-500/20" : "bg-white/5 border-white/5"}`, children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Custo Mensal App" }),
                      /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-white", children: result ? `R$ ${result.uberMonthlyCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Car, { className: "w-5 h-5 text-rose-500" }),
                "Custos Invisíveis"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: "Muitas pessoas só contam o combustível, mas o carro tem custos fixos altos:" }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-2 list-disc pl-4", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Depreciação:" }),
                    " O carro perde cerca de 10% a 15% do valor todo ano."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Custo de Oportunidade:" }),
                    " Se você vendesse o carro e investisse o dinheiro, quanto renderia?"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Manutenção:" }),
                    " Pneus, revisões, óleo, imprevistos."
                  ] })
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: UBER_VS_CAR_FAQS,
          title: "Dúvidas sobre Transporte",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const MILLION_FAQS = [
  {
    question: "É possível ficar milionário investindo pouco?",
    answer: "Sim, mas exige tempo. Com aportes menores, o prazo para atingir o milhão será maior. O segredo é a constância e o tempo de exposição aos juros compostos."
  },
  {
    question: "Onde investir para chegar no milhão?",
    answer: "Uma carteira diversificada é o ideal. Renda fixa para segurança e ações/fundos imobiliários para potencializar o retorno no longo prazo."
  },
  {
    question: "A inflação atrapalha?",
    answer: "Sim. Um milhão hoje compra muito menos do que comprava há 10 anos. Por isso, é importante buscar investimentos que rendam acima da inflação (ganho real)."
  }
];
function FirstMillionPage() {
  const [initialAmount, setInitialAmount] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const p = parseFloat(initialAmount.replace(/\./g, "").replace(",", "."));
    const pmt = parseFloat(monthlyContribution.replace(/\./g, "").replace(",", "."));
    const r = parseFloat(interestRate.replace(",", "."));
    if (isNaN(p) || isNaN(pmt) || isNaN(r) || r === 0) {
      setResult(null);
      return;
    }
    const target = 1e6;
    const i = r / 100 / 12;
    const numerator = target * i + pmt;
    const denominator = p * i + pmt;
    if (denominator <= 0) {
      setResult(null);
      return;
    }
    const months = Math.log(numerator / denominator) / Math.log(1 + i);
    setResult({
      months: Math.ceil(months),
      years: months / 12
    });
  };
  useEffect(() => {
    calculate();
  }, [initialAmount, monthlyContribution, interestRate]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const handleNumberInput = (value, setter) => {
    if (/^[\d.,]*$/.test(value)) {
      setter(value);
    }
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora do Primeiro Milhão",
    "description": "Descubra quanto tempo falta para você conquistar seu primeiro milhão de reais investindo mensalmente.",
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
        title: "Calculadora do Primeiro Milhão - Quando vou ficar rico?",
        description: "Quer ser milionário? Simule quanto investir por mês e em quanto tempo você alcançará seu primeiro milhão de reais.",
        canonical: "/calculadoras/primeiro-milhao"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": MILLION_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
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
                /* @__PURE__ */ jsx(Gem, { className: "w-4 h-4 text-emerald-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Investimentos e Planejamento" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora do ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-yellow-500", children: "Primeiro Milhão" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Trace a rota para a sua liberdade financeira. Quanto falta para o 1º milhão?" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-emerald-500" }),
                "Simular Tempo"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Quanto você já tem?" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: initialAmount,
                          onChange: (e) => handleCurrencyInput(e.target.value, setInitialAmount),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Aporte Mensal" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: monthlyContribution,
                          onChange: (e) => handleCurrencyInput(e.target.value, setMonthlyContribution),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Rentabilidade Anual Esperada (%)" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: interestRate,
                      onChange: (e) => handleNumberInput(e.target.value, setInterestRate),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                      placeholder: "Ex: 10"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("div", { className: "pt-6 border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center mb-4", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-emerald-400 block mb-2", children: "Tempo até o Milhão" }),
                  /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `${result.years.toFixed(1)} anos` : "---" }),
                  result && /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400 mt-2", children: [
                    "ou ",
                    result.months,
                    " meses de disciplina."
                  ] })
                ] }) })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5 text-emerald-500" }),
                "Acelere o processo"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: "Para chegar mais rápido, você tem três alavancas:" }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-2 list-disc pl-4", children: [
                  /* @__PURE__ */ jsx("li", { children: "Aumentar os aportes mensais (ganhar mais/gastar menos)" }),
                  /* @__PURE__ */ jsx("li", { children: "Melhorar a rentabilidade (investir melhor)" }),
                  /* @__PURE__ */ jsx("li", { children: "Começar com mais dinheiro (vender bens parados)" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5 mt-4", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Fato Curioso" }),
                  "O primeiro milhão é o mais difícil. O segundo vem muito mais rápido graças aos juros compostos de uma base maior."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: MILLION_FAQS,
          title: "Dúvidas sobre o Primeiro Milhão",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const CURRENCY_FAQS = [
  {
    question: "Qual cotação é usada?",
    answer: "Utilizamos a cotação comercial, que é a taxa usada em transações entre bancos e empresas. Para turismo (compra de papel-moeda), o valor costuma ser mais alto."
  },
  {
    question: "O que é PTAX?",
    answer: "É a taxa de câmbio média calculada pelo Banco Central do Brasil. É a referência oficial para contratos em dólar."
  },
  {
    question: "Como comprar dólar mais barato?",
    answer: "Contas globais digitais (como Wise, Nomad, C6) geralmente oferecem cotações muito próximas do dólar comercial e IOF reduzido (1,1%) em comparação aos cartões de crédito tradicionais (4,38%)."
  }
];
function CurrencyConverterPage() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("BRL");
  const [toCurrency, setToCurrency] = useState("USD");
  const [result, setResult] = useState(null);
  const [rate, setRate] = useState(null);
  const displayRates = {
    "USD": 5.88,
    "EUR": 6.2,
    "GBP": 7.45,
    "BRL": 1
  };
  const calculate = () => {
    const val = parseFloat(amount.replace(/\./g, "").replace(",", "."));
    if (isNaN(val) || val === 0) {
      setResult(null);
      return;
    }
    const fromRate = displayRates[fromCurrency];
    const toRate = displayRates[toCurrency];
    const valueInBRL = val * fromRate;
    const finalValue = valueInBRL / toRate;
    setResult(finalValue);
    setRate(fromRate / toRate);
  };
  useEffect(() => {
    calculate();
  }, [amount, fromCurrency, toCurrency]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Conversor de Moedas",
    "description": "Converta Real, Dólar, Euro e Libra com a cotação comercial atualizada.",
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
        title: "Conversor de Moedas - Dólar, Euro e Real Hoje",
        description: "Vai viajar ou fazer compras internacionais? Converta valores entre Real, Dólar, Euro e Libra com nossa calculadora de câmbio.",
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
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
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
                /* @__PURE__ */ jsx(Globe, { className: "w-4 h-4 text-emerald-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Investimentos e Planejamento" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Conversor de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500", children: "Moedas" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Cotação comercial atualizada. Converta valores para viagens e compras." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-emerald-500" }),
                "Converter Agora"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor" }),
                  /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: amount,
                      onChange: (e) => handleCurrencyInput(e.target.value, setAmount),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                      placeholder: "0,00"
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[1fr_auto_1fr] gap-4 items-end", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "De" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        value: fromCurrency,
                        onChange: (e) => setFromCurrency(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "BRL", children: "Real (BRL)" }),
                          /* @__PURE__ */ jsx("option", { value: "USD", children: "Dólar (USD)" }),
                          /* @__PURE__ */ jsx("option", { value: "EUR", children: "Euro (EUR)" }),
                          /* @__PURE__ */ jsx("option", { value: "GBP", children: "Libra (GBP)" })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: swapCurrencies,
                      className: "p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors mb-[1px]",
                      children: /* @__PURE__ */ jsx(RefreshCw, { className: "w-5 h-5 text-emerald-500" })
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Para" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        value: toCurrency,
                        onChange: (e) => setToCurrency(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "BRL", children: "Real (BRL)" }),
                          /* @__PURE__ */ jsx("option", { value: "USD", children: "Dólar (USD)" }),
                          /* @__PURE__ */ jsx("option", { value: "EUR", children: "Euro (EUR)" }),
                          /* @__PURE__ */ jsx("option", { value: "GBP", children: "Libra (GBP)" })
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "pt-6 border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center mb-4", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-emerald-400 block mb-2", children: "Valor Convertido" }),
                  /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `${toCurrency === "BRL" ? "R$" : toCurrency === "USD" ? "$" : toCurrency === "EUR" ? "€" : "£"} ${result.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" }),
                  rate && /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400 mt-2", children: [
                    "1 ",
                    fromCurrency,
                    " = ",
                    rate.toFixed(4),
                    " ",
                    toCurrency
                  ] })
                ] }) })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Globe, { className: "w-5 h-5 text-emerald-500" }),
                "Moedas Globais"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-white", children: "Dólar (USD)" }),
                  /* @__PURE__ */ jsx("span", { className: "font-mono text-emerald-400", children: "R$ 5,88" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-white", children: "Euro (EUR)" }),
                  /* @__PURE__ */ jsx("span", { className: "font-mono text-emerald-400", children: "R$ 6,20" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-white", children: "Libra (GBP)" }),
                  /* @__PURE__ */ jsx("span", { className: "font-mono text-emerald-400", children: "R$ 7,45" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-2", children: "*Cotação aproximada para fins de demonstração." })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: CURRENCY_FAQS,
          title: "Dúvidas sobre Câmbio",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const INFLATION_DATA = [
  { year: 1994, ipca: 47.43, igpm: 27.24 },
  // July-Dec (Plano Real start approx) - simplified for annual context or partial
  { year: 1995, ipca: 22.41, igpm: 15.25 },
  { year: 1996, ipca: 9.56, igpm: 9.2 },
  { year: 1997, ipca: 5.22, igpm: 7.48 },
  { year: 1998, ipca: 1.65, igpm: 1.78 },
  { year: 1999, ipca: 8.94, igpm: 20.1 },
  { year: 2e3, ipca: 5.97, igpm: 9.95 },
  { year: 2001, ipca: 7.67, igpm: 10.37 },
  { year: 2002, ipca: 12.53, igpm: 25.31 },
  { year: 2003, ipca: 9.3, igpm: 8.71 },
  { year: 2004, ipca: 7.6, igpm: 12.41 },
  { year: 2005, ipca: 5.69, igpm: 1.2 },
  { year: 2006, ipca: 3.14, igpm: 3.83 },
  { year: 2007, ipca: 4.46, igpm: 7.75 },
  { year: 2008, ipca: 5.9, igpm: 9.81 },
  { year: 2009, ipca: 4.31, igpm: -1.72 },
  { year: 2010, ipca: 5.91, igpm: 11.32 },
  { year: 2011, ipca: 6.5, igpm: 5.1 },
  { year: 2012, ipca: 5.84, igpm: 7.82 },
  { year: 2013, ipca: 5.91, igpm: 5.51 },
  { year: 2014, ipca: 6.41, igpm: 3.69 },
  { year: 2015, ipca: 10.67, igpm: 10.54 },
  { year: 2016, ipca: 6.29, igpm: 7.17 },
  { year: 2017, ipca: 2.95, igpm: -0.52 },
  { year: 2018, ipca: 3.75, igpm: 7.54 },
  { year: 2019, ipca: 4.31, igpm: 7.3 },
  { year: 2020, ipca: 4.52, igpm: 23.14 },
  { year: 2021, ipca: 10.06, igpm: 17.78 },
  { year: 2022, ipca: 5.79, igpm: 5.45 },
  { year: 2023, ipca: 4.62, igpm: -3.18 },
  { year: 2024, ipca: 4.62, igpm: 6.54 },
  // Estimated/Partial
  { year: 2025, ipca: 4.68, igpm: -1.03 }
  // Estimated/Partial
];
const INFLATION_FAQS = [
  {
    question: "O que é inflação?",
    answer: "É o aumento generalizado dos preços. Quando a inflação sobe, seu dinheiro perde valor, ou seja, você compra menos coisas com a mesma quantia."
  },
  {
    question: "Qual índice é usado?",
    answer: "Esta calculadora utiliza o IPCA (Índice Nacional de Preços ao Consumidor Amplo), que é o índice oficial de inflação do Brasil, medido pelo IBGE."
  },
  {
    question: "Por que corrigir valores?",
    answer: "Para saber quanto um valor do passado valeria hoje. Por exemplo, um salário de R$ 1.000 em 1994 não compra as mesmas coisas que R$ 1.000 hoje."
  }
];
function PurchasingPowerPage() {
  const [amount, setAmount] = useState("");
  const [startYear, setStartYear] = useState("2000");
  const [endYear, setEndYear] = useState((/* @__PURE__ */ new Date()).getFullYear().toString());
  const [result, setResult] = useState(null);
  const calculate = () => {
    const val = parseFloat(amount.replace(/\./g, "").replace(",", "."));
    const start = parseInt(startYear);
    const end = parseInt(endYear);
    if (isNaN(val) || isNaN(start) || isNaN(end) || start >= end) {
      setResult(null);
      return;
    }
    let accumulatedInflation = 1;
    const relevantData = INFLATION_DATA.filter((d) => d.year >= start && d.year < end);
    relevantData.forEach((d) => {
      accumulatedInflation *= 1 + d.ipca / 100;
    });
    const adjustedAmount = val * accumulatedInflation;
    setResult({
      adjustedAmount,
      inflation: (accumulatedInflation - 1) * 100
    });
  };
  useEffect(() => {
    calculate();
  }, [amount, startYear, endYear]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const years = Array.from({ length: (/* @__PURE__ */ new Date()).getFullYear() - 1994 }, (_, i) => 1995 + i);
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Poder de Compra (IPCA)",
    "description": "Corrija valores pela inflação (IPCA) e descubra quanto seu dinheiro valia no passado ou quanto precisa valer hoje.",
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
        title: "Calculadora de Inflação - Correção pelo IPCA",
        description: "Seu dinheiro perdeu valor? Corrija valores pela inflação oficial (IPCA) e compare o poder de compra entre diferentes anos.",
        canonical: "/calculadoras/poder-de-compra"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": INFLATION_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Poder de Compra", href: "/calculadoras/poder-de-compra" }
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
                /* @__PURE__ */ jsx(History, { className: "w-4 h-4 text-emerald-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Investimentos e Planejamento" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-red-500", children: "Poder de Compra" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Veja como a inflação corroeu seu dinheiro. Corrija valores pelo IPCA histórico." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-emerald-500" }),
                "Corrigir Valor"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor Original" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: amount,
                        onChange: (e) => handleCurrencyInput(e.target.value, setAmount),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Ano Inicial" }),
                    /* @__PURE__ */ jsx(
                      "select",
                      {
                        value: startYear,
                        onChange: (e) => setStartYear(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                        children: years.map((year) => /* @__PURE__ */ jsx("option", { value: year, children: year }, year))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Ano Final" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        value: endYear,
                        onChange: (e) => setEndYear(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                        children: [
                          years.filter((y) => y > parseInt(startYear)).map((year) => /* @__PURE__ */ jsx("option", { value: year, children: year }, year)),
                          /* @__PURE__ */ jsx("option", { value: (/* @__PURE__ */ new Date()).getFullYear(), children: (/* @__PURE__ */ new Date()).getFullYear() })
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-emerald-400 block mb-2", children: "Valor Corrigido (Hoje)" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.adjustedAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Inflação Acumulada (IPCA)" }),
                    /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-red-400", children: result ? `${result.inflation.toFixed(2)}%` : "---" })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(TrendingDown, { className: "w-5 h-5 text-red-500" }),
                "O vilão invisível"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: "A inflação é como um imposto invisível. Se você deixa seu dinheiro parado na conta corrente ou embaixo do colchão, ele está perdendo valor todos os dias." }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Proteja-se" }),
                  "Para não perder poder de compra, seus investimentos precisam render, no mínimo, acima da inflação (IPCA)."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: INFLATION_FAQS,
          title: "Dúvidas sobre Inflação",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const BUDGET_FAQS = [
  {
    question: "O que é a regra 50-30-20?",
    answer: "É um método simples de divisão de orçamento: 50% para necessidades essenciais, 30% para desejos pessoais e 20% para objetivos financeiros (investimentos/dívidas)."
  },
  {
    question: "Posso adaptar as porcentagens?",
    answer: "Claro! A regra é um guia. Se você tem muitas dívidas, pode ser 50-20-30. Se ganha pouco, talvez seja 60-30-10. O importante é ter um plano."
  },
  {
    question: "Onde entram as dívidas?",
    answer: "Pagamento de dívidas deve entrar nos 20% (Objetivos Financeiros). Se a dívida for essencial para viver (ex: aluguel atrasado), pode entrar nos 50% temporariamente."
  }
];
function Budget503020Page() {
  const [income, setIncome] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const val = parseFloat(income.replace(/\./g, "").replace(",", "."));
    if (isNaN(val) || val === 0) {
      setResult(null);
      return;
    }
    setResult({
      needs: val * 0.5,
      wants: val * 0.3,
      savings: val * 0.2
    });
  };
  useEffect(() => {
    calculate();
  }, [income]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora Regra 50-30-20",
    "description": "Organize seu orçamento mensal com a regra 50-30-20: Necessidades, Desejos e Investimentos.",
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
        title: "Calculadora Regra 50-30-20 - Organização Financeira",
        description: "Aprenda a dividir seu salário. Use a regra 50-30-20 para equilibrar contas, lazer e investimentos de forma simples.",
        canonical: "/calculadoras/regra-50-30-20"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": BUDGET_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Regra 50-30-20", href: "/calculadoras/regra-50-30-20" }
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
                /* @__PURE__ */ jsx(PieChart, { className: "w-4 h-4 text-emerald-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Investimentos e Planejamento" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500", children: "Regra 50-30-20" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "O método mais simples para organizar suas finanças e começar a investir." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-emerald-500" }),
                "Dividir Orçamento"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Sua Renda Mensal Líquida" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: income,
                        onChange: (e) => handleCurrencyInput(e.target.value, setIncome),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5 space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-blue-400 font-bold block mb-1", children: "50% - Necessidades" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: "Aluguel, contas, mercado" })
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.needs.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-purple-400 font-bold block mb-1", children: "30% - Desejos" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: "Lazer, hobbies, streaming" })
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.wants.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-emerald-400 font-bold block mb-1", children: "20% - Objetivos" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: "Investimentos, reserva, dívidas" })
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.savings.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Wallet, { className: "w-5 h-5 text-emerald-500" }),
                "Por que funciona?"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: 'A regra 50-30-20 funciona porque é simples e flexível. Ela garante que você pague suas contas, se divirta hoje e ainda cuide do seu "eu" do futuro.' }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Prioridade" }),
                  "Sempre pague a si mesmo primeiro. Assim que receber, separe os 20% dos investimentos antes de gastar com o resto."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: BUDGET_FAQS,
          title: "Dúvidas sobre a Regra",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const VEHICLE_FAQS = [
  {
    question: "Qual a taxa média de juros para veículos?",
    answer: "As taxas variam muito conforme o banco, o score do cliente e a idade do veículo. Em média, giram em torno de 1,5% a 3% ao mês."
  },
  {
    question: "O que é TAC?",
    answer: "Taxa de Abertura de Crédito. É uma tarifa cobrada pelos bancos para iniciar o financiamento. Fique atento, pois ela encarece o custo final."
  },
  {
    question: "Carro zero tem juros menor?",
    answer: "Geralmente sim. Bancos e montadoras costumam oferecer taxas subsidiadas (às vezes até taxa zero) para veículos novos como incentivo de venda."
  }
];
function VehicleFinancingPage() {
  const [vehicleValue, setVehicleValue] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [months, setMonths] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const vv = parseFloat(vehicleValue.replace(/\./g, "").replace(",", "."));
    const dp = parseFloat(downPayment.replace(/\./g, "").replace(",", "."));
    const rateMonth = parseFloat(interestRate.replace(",", "."));
    const periodMonths = parseInt(months);
    if (isNaN(vv) || isNaN(dp) || isNaN(rateMonth) || isNaN(periodMonths) || periodMonths === 0) {
      setResult(null);
      return;
    }
    const loanAmount = vv - dp;
    const i = rateMonth / 100;
    const pmt = loanAmount * (i * Math.pow(1 + i, periodMonths)) / (Math.pow(1 + i, periodMonths) - 1);
    const totalPaid = pmt * periodMonths;
    const totalInterest = totalPaid - loanAmount;
    setResult({
      monthlyPayment: pmt,
      totalInterest,
      totalPaid
    });
  };
  useEffect(() => {
    calculate();
  }, [vehicleValue, downPayment, interestRate, months]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const handleNumberInput = (value, setter) => {
    if (/^[\d.,]*$/.test(value)) {
      setter(value);
    }
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Simulador de Financiamento de Veículos",
    "description": "Simule as parcelas do financiamento do seu carro ou moto.",
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
        title: "Simulador de Financiamento de Veículos - Carro e Moto",
        description: "Quer comprar um carro ou moto? Simule o valor das parcelas e veja quanto vai pagar de juros no financiamento.",
        canonical: "/calculadoras/financiamento-veiculos"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": VEHICLE_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Financiamento de Veículos", href: "/calculadoras/financiamento-veiculos" }
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
                /* @__PURE__ */ jsx(Car, { className: "w-4 h-4 text-purple-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Empréstimos e Financiamentos" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Simulador de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500", children: "Financiamento de Veículos" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Planeje a compra do seu carro novo. Simule parcelas e juros reais." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-purple-500" }),
                "Simular Parcelas"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor do Veículo" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: vehicleValue,
                          onChange: (e) => handleCurrencyInput(e.target.value, setVehicleValue),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor da Entrada" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: downPayment,
                          onChange: (e) => handleCurrencyInput(e.target.value, setDownPayment),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Taxa de Juros Mensal (%)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: interestRate,
                        onChange: (e) => handleNumberInput(e.target.value, setInterestRate),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500/50 transition-all",
                        placeholder: "Ex: 1,5"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Prazo (Meses)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: months,
                        onChange: (e) => handleNumberInput(e.target.value, setMonths),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500/50 transition-all",
                        placeholder: "Ex: 48"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-6 rounded-2xl border border-white/5 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-400 block mb-2", children: "Valor da Parcela Mensal" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.monthlyPayment.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "bg-purple-500/10 p-4 rounded-xl border border-purple-500/20 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-purple-400 block mb-1", children: "Total em Juros" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.totalInterest.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Custo Total" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.totalPaid.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Key, { className: "w-5 h-5 text-purple-500" }),
                "Dicas para Financiar"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Dê a maior entrada possível" }),
                  "Quanto maior a entrada, menor o valor financiado e, consequentemente, menor o juro total pago."
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Cuidado com o prazo" }),
                  "Parcelas longas (60x) parecem atraentes, mas fazem você pagar quase dois carros no final. Tente prazos menores (24x ou 36x)."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: VEHICLE_FAQS,
          title: "Dúvidas sobre Financiamento de Veículos",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const REAL_ESTATE_FAQS = [
  {
    question: "Qual a diferença entre Tabela SAC e Price?",
    answer: "Na SAC (Sistema de Amortização Constante), as parcelas começam mais altas e diminuem ao longo do tempo. Na Price, as parcelas são fixas do início ao fim, mas você paga mais juros no total."
  },
  {
    question: "O que compõe a parcela do financiamento?",
    answer: "A parcela é composta por: Amortização (valor que abate a dívida) + Juros + Seguros (MIP e DFI) + Taxas Administrativas."
  },
  {
    question: "Vale a pena antecipar parcelas?",
    answer: "Sim! Ao antecipar, você abate o saldo devedor e deixa de pagar os juros sobre esse valor, reduzindo significativamente o custo total e o tempo da dívida."
  }
];
function RealEstateFinancingPage() {
  const [propertyValue, setPropertyValue] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [years, setYears] = useState("");
  const [tableType, setTableType] = useState("SAC");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const pv = parseFloat(propertyValue.replace(/\./g, "").replace(",", "."));
    const dp = parseFloat(downPayment.replace(/\./g, "").replace(",", "."));
    const rateYear = parseFloat(interestRate.replace(",", "."));
    const periodYears = parseInt(years);
    if (isNaN(pv) || isNaN(dp) || isNaN(rateYear) || isNaN(periodYears) || periodYears === 0) {
      setResult(null);
      return;
    }
    const loanAmount = pv - dp;
    const months = periodYears * 12;
    const rateMonth = Math.pow(1 + rateYear / 100, 1 / 12) - 1;
    let totalInterest = 0;
    let firstInstallment = 0;
    let lastInstallment = 0;
    if (tableType === "SAC") {
      const amortization = loanAmount / months;
      firstInstallment = amortization + loanAmount * rateMonth;
      lastInstallment = amortization + amortization * rateMonth;
      const firstInterest = loanAmount * rateMonth;
      const lastInterest = amortization * rateMonth;
      const totalInterestSAC = (firstInterest + lastInterest) * months / 2;
      totalInterest = totalInterestSAC;
    } else {
      const pmt = loanAmount * (rateMonth * Math.pow(1 + rateMonth, months)) / (Math.pow(1 + rateMonth, months) - 1);
      firstInstallment = pmt;
      lastInstallment = pmt;
      totalInterest = pmt * months - loanAmount;
    }
    setResult({
      firstInstallment,
      lastInstallment,
      totalInterest,
      totalPaid: loanAmount + totalInterest
    });
  };
  useEffect(() => {
    calculate();
  }, [propertyValue, downPayment, interestRate, years, tableType]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const handleNumberInput = (value, setter) => {
    if (/^[\d.,]*$/.test(value)) {
      setter(value);
    }
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Simulador de Financiamento Imobiliário",
    "description": "Compare tabelas SAC e Price e simule as parcelas do seu financiamento imobiliário.",
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
        title: "Simulador de Financiamento Imobiliário - SAC e Price",
        description: "Vai comprar um imóvel? Simule o valor das parcelas e compare as tabelas SAC e Price. Descubra qual a melhor opção para o seu bolso.",
        canonical: "/calculadoras/financiamento-imobiliario"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": REAL_ESTATE_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Financiamento Imobiliário", href: "/calculadoras/financiamento-imobiliario" }
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
                /* @__PURE__ */ jsx(Home$1, { className: "w-4 h-4 text-purple-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Empréstimos e Financiamentos" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Simulador de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500", children: "Financiamento Imobiliário" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Compare SAC vs Price e planeje a compra da sua casa própria com segurança." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-purple-500" }),
                "Simular Financiamento"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor do Imóvel" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: propertyValue,
                          onChange: (e) => handleCurrencyInput(e.target.value, setPropertyValue),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor da Entrada" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: downPayment,
                          onChange: (e) => handleCurrencyInput(e.target.value, setDownPayment),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Taxa de Juros Anual (%)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: interestRate,
                        onChange: (e) => handleNumberInput(e.target.value, setInterestRate),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500/50 transition-all",
                        placeholder: "Ex: 9,5"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Prazo (Anos)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: years,
                        onChange: (e) => handleNumberInput(e.target.value, setYears),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500/50 transition-all",
                        placeholder: "Ex: 30"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Sistema de Amortização" }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => setTableType("SAC"),
                        className: `py-3 rounded-xl text-sm font-medium transition-all border ${tableType === "SAC" ? "bg-purple-500/20 border-purple-500 text-purple-400" : "bg-[#0a0a0a] border-white/10 text-gray-400 hover:border-white/30"}`,
                        children: "SAC (Parcelas Decrescentes)"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => setTableType("PRICE"),
                        className: `py-3 rounded-xl text-sm font-medium transition-all border ${tableType === "PRICE" ? "bg-purple-500/20 border-purple-500 text-purple-400" : "bg-[#0a0a0a] border-white/10 text-gray-400 hover:border-white/30"}`,
                        children: "Price (Parcelas Fixas)"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Primeira Parcela" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.firstInstallment.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Última Parcela" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.lastInstallment.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-purple-500/10 p-4 rounded-xl border border-purple-500/20 text-center", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-purple-400 block mb-1", children: "Total Pago em Juros" }),
                    /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-white", children: result ? `R$ ${result.totalInterest.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Building, { className: "w-5 h-5 text-purple-500" }),
                "SAC ou Price?"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Tabela SAC" }),
                  "Melhor para quem quer pagar menos juros no total. A parcela começa alta e vai caindo. Ideal para financiamentos longos."
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Tabela Price" }),
                  "Melhor para quem precisa de uma parcela inicial menor para caber no orçamento. O valor é fixo, mas paga-se mais juros no final."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: REAL_ESTATE_FAQS,
          title: "Dúvidas sobre Financiamento",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const REPAYMENT_FAQS = [
  {
    question: "O banco é obrigado a dar desconto?",
    answer: "Sim! Pelo Código de Defesa do Consumidor, ao antecipar parcelas, você tem direito ao abatimento proporcional dos juros."
  },
  {
    question: "Como funciona a antecipação?",
    answer: "Você paga o valor presente da dívida. Ou seja, trazemos o valor da parcela futura para o dia de hoje, descontando a taxa de juros do período."
  },
  {
    question: "É melhor antecipar as primeiras ou as últimas?",
    answer: "Financeiramente, antecipar as últimas é mais vantajoso, pois elas têm mais juros embutidos devido ao tempo maior até o vencimento."
  }
];
function EarlyRepaymentPage() {
  const [installmentValue, setInstallmentValue] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [monthsAnticipated, setMonthsAnticipated] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const val = parseFloat(installmentValue.replace(/\./g, "").replace(",", "."));
    const rate = parseFloat(interestRate.replace(",", "."));
    const months = parseInt(monthsAnticipated);
    if (isNaN(val) || isNaN(rate) || isNaN(months) || months === 0) {
      setResult(null);
      return;
    }
    const i = rate / 100;
    const presentValue = val / Math.pow(1 + i, months);
    setResult({
      discount: val - presentValue,
      finalValue: presentValue
    });
  };
  useEffect(() => {
    calculate();
  }, [installmentValue, interestRate, monthsAnticipated]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const handleNumberInput = (value, setter) => {
    if (/^[\d.,]*$/.test(value)) {
      setter(value);
    }
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Quitação Antecipada",
    "description": "Calcule o desconto ao antecipar parcelas de empréstimos ou financiamentos.",
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
        title: "Calculadora de Desconto por Antecipação - Quitação de Dívida",
        description: "Vai adiantar parcelas do financiamento? Calcule o desconto exato que você deve receber ao quitar sua dívida antecipadamente.",
        canonical: "/calculadoras/quitacao-antecipada"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": REPAYMENT_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Quitação Antecipada", href: "/calculadoras/quitacao-antecipada" }
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
                /* @__PURE__ */ jsx(PiggyBank, { className: "w-4 h-4 text-purple-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Empréstimos e Financiamentos" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500", children: "Quitação Antecipada" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Descubra quanto você economiza ao adiantar o pagamento de parcelas do seu financiamento." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-purple-500" }),
                "Calcular Desconto"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor da Parcela" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: installmentValue,
                        onChange: (e) => handleCurrencyInput(e.target.value, setInstallmentValue),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Taxa de Juros Mensal (%)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: interestRate,
                        onChange: (e) => handleNumberInput(e.target.value, setInterestRate),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500/50 transition-all",
                        placeholder: "Ex: 1,5"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Meses a Antecipar" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: monthsAnticipated,
                        onChange: (e) => handleNumberInput(e.target.value, setMonthsAnticipated),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500/50 transition-all",
                        placeholder: "Ex: 12"
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Quantos meses faltam para o vencimento desta parcela?" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "pt-6 border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-purple-500/10 p-4 rounded-xl border border-purple-500/20 text-center", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-purple-400 block mb-1", children: "Desconto Obtido" }),
                    /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-white", children: result ? `R$ ${result.discount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Valor a Pagar" }),
                    /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-white", children: result ? `R$ ${result.finalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] })
                ] }) })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(TrendingDown, { className: "w-5 h-5 text-purple-500" }),
                "Por que antecipar?"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: "Quando você antecipa uma parcela, você está pagando ela hoje, e não no futuro. Por isso, o banco deve remover os juros que seriam cobrados durante esse tempo." }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Exemplo Prático" }),
                  "Se você tem uma parcela de R$1.000 para daqui a 1 ano e a taxa é 1% ao mês, ao pagar hoje você pagaria cerca de R$887. Uma economia de R$113!"
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: REPAYMENT_FAQS,
          title: "Dúvidas sobre Antecipação",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const CET_FAQS = [
  {
    question: "O que é CET?",
    answer: "CET significa Custo Efetivo Total. É a taxa real que você paga em um empréstimo, somando os juros, tarifas, seguros e impostos (IOF)."
  },
  {
    question: "Por que o CET é maior que a taxa de juros?",
    answer: "Porque a taxa de juros é apenas uma parte do custo. O banco também cobra taxas administrativas e seguros que encarecem a parcela final."
  },
  {
    question: "Como usar o CET para comparar empréstimos?",
    answer: "Sempre compare o CET anual, e não a taxa de juros. A opção com menor CET é a mais barata, mesmo que a taxa de juros pareça maior."
  }
];
function CETCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [months, setMonths] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const pv = parseFloat(loanAmount.replace(/\./g, "").replace(",", "."));
    const pmt = parseFloat(monthlyPayment.replace(/\./g, "").replace(",", "."));
    const n = parseInt(months);
    if (isNaN(pv) || isNaN(pmt) || isNaN(n) || n === 0 || pv === 0) {
      setResult(null);
      return;
    }
    let r = 0.01;
    for (let i = 0; i < 20; i++) {
      const f = pmt / r * (1 - Math.pow(1 + r, -n)) - pv;
      const df = pmt / r * (n * Math.pow(1 + r, -n - 1)) - pmt / (r * r) * (1 - Math.pow(1 + r, -n));
      const newR = r - f / df;
      if (Math.abs(newR - r) < 1e-6) {
        r = newR;
        break;
      }
      r = newR;
    }
    const monthlyRate = r * 100;
    const annualRate = (Math.pow(1 + r, 12) - 1) * 100;
    const totalPaid = pmt * n;
    setResult({
      monthlyRate,
      annualRate,
      totalPaid
    });
  };
  useEffect(() => {
    calculate();
  }, [loanAmount, monthlyPayment, months]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const handleNumberInput = (value, setter) => {
    if (/^[\d.,]*$/.test(value)) {
      setter(value);
    }
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de CET (Custo Efetivo Total)",
    "description": "Descubra a taxa real de juros do seu empréstimo ou financiamento calculando o CET.",
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
        title: "Calculadora de CET - Custo Efetivo Total Online",
        description: "Não seja enganado pelos juros. Calcule o Custo Efetivo Total (CET) do seu empréstimo e descubra quanto você realmente vai pagar.",
        canonical: "/calculadoras/custo-efetivo-total"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": CET_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Custo Efetivo Total (CET)", href: "/calculadoras/custo-efetivo-total" }
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
                /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4 text-purple-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Empréstimos e Financiamentos" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500", children: "CET" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Descubra a taxa real do seu empréstimo. O CET revela o custo oculto além dos juros." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-purple-500" }),
                "Calcular Custo Real"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor Recebido (Líquido)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: loanAmount,
                        onChange: (e) => handleCurrencyInput(e.target.value, setLoanAmount),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Valor que realmente caiu na sua conta." })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor da Parcela" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: monthlyPayment,
                          onChange: (e) => handleCurrencyInput(e.target.value, setMonthlyPayment),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Prazo (Meses)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: months,
                        onChange: (e) => handleNumberInput(e.target.value, setMonths),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500/50 transition-all",
                        placeholder: "Ex: 24"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "bg-purple-500/10 p-4 rounded-xl border border-purple-500/20 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-purple-400 block mb-1", children: "CET Mensal" }),
                      /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-white", children: result ? `${result.monthlyRate.toFixed(2)}%` : "---" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-purple-500/10 p-4 rounded-xl border border-purple-500/20 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-purple-400 block mb-1", children: "CET Anual" }),
                      /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-white", children: result ? `${result.annualRate.toFixed(2)}%` : "---" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Total a Pagar" }),
                    /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.totalPaid.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5 text-purple-500" }),
                "Atenção às Taxas"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: "Muitas vezes o banco anuncia uma taxa de juros de 1,99% a.m., mas quando você calcula o CET, ele salta para 2,50% ou mais." }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "O que encarece?" }),
                  "Seguro Prestamista, Tarifa de Cadastro (TAC), IOF e Taxas de Avaliação. Tudo isso entra no cálculo do CET."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: CET_FAQS,
          title: "Dúvidas sobre CET",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const CREDIT_CARD_FAQS = [
  {
    question: "Como funciona o rotativo do cartão?",
    answer: "Quando você paga apenas o mínimo ou um valor parcial da fatura, o restante entra no crédito rotativo, que tem as taxas de juros mais altas do mercado."
  },
  {
    question: "Vale a pena pegar empréstimo para pagar o cartão?",
    answer: "Geralmente sim. As taxas de empréstimo pessoal costumam ser muito menores que as do rotativo do cartão. Trocar uma dívida cara por uma barata é inteligente."
  },
  {
    question: "Em quanto tempo a dívida dobra?",
    answer: "Com juros de 14% ao mês (comum no rotativo), a dívida dobra de valor em aproximadamente 5 a 6 meses."
  }
];
function CreditCardDebtPage() {
  const [debtAmount, setDebtAmount] = useState("");
  const [interestRate, setInterestRate] = useState("14");
  const [months, setMonths] = useState("12");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const pv = parseFloat(debtAmount.replace(/\./g, "").replace(",", "."));
    const rate = parseFloat(interestRate.replace(",", "."));
    const n = parseInt(months);
    if (isNaN(pv) || isNaN(rate) || isNaN(n) || n === 0) {
      setResult(null);
      return;
    }
    const i = rate / 100;
    const fv = pv * Math.pow(1 + i, n);
    setResult({
      totalDebt: fv,
      totalInterest: fv - pv
    });
  };
  useEffect(() => {
    calculate();
  }, [debtAmount, interestRate, months]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const handleNumberInput = (value, setter) => {
    if (/^[\d.,]*$/.test(value)) {
      setter(value);
    }
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Dívida de Cartão de Crédito",
    "description": "Simule o efeito bola de neve dos juros do cartão de crédito e veja quanto sua dívida pode crescer.",
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
        title: "Calculadora de Dívida de Cartão de Crédito - Juros Rotativos",
        description: "Cuidado com o rotativo! Simule quanto sua dívida de cartão de crédito vai crescer com os juros compostos e evite o efeito bola de neve.",
        canonical: "/calculadoras/divida-cartao-credito"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": CREDIT_CARD_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Dívida de Cartão", href: "/calculadoras/divida-cartao-credito" }
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
                /* @__PURE__ */ jsx(CreditCard, { className: "w-4 h-4 text-purple-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Empréstimos e Financiamentos" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-red-500", children: "Dívida de Cartão" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Veja o impacto dos juros rotativos no seu bolso. Simule o crescimento da dívida." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-purple-500" }),
                "Simular Evolução"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor da Fatura em Aberto" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: debtAmount,
                        onChange: (e) => handleCurrencyInput(e.target.value, setDebtAmount),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Juros do Rotativo (% a.m.)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: interestRate,
                        onChange: (e) => handleNumberInput(e.target.value, setInterestRate),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500/50 transition-all",
                        placeholder: "Ex: 14"
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Média de mercado: 12% a 15%" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Meses sem pagar" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: months,
                        onChange: (e) => handleNumberInput(e.target.value, setMonths),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500/50 transition-all",
                        placeholder: "Ex: 12"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-red-500/10 p-6 rounded-2xl border border-red-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-red-400 block mb-2", children: "Dívida Total Estimada" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.totalDebt.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Juros Acumulados" }),
                    /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.totalInterest.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(AlertOctagon, { className: "w-5 h-5 text-red-500" }),
                "Perigo dos Juros Compostos"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: "O cartão de crédito tem os juros mais altos do mercado. Se você deixar de pagar R$1.000 hoje, em 1 ano essa dívida pode virar mais de R$4.000." }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Dica de Ouro" }),
                  "Se não conseguir pagar a fatura total, tente parcelar a fatura (juros menores que o rotativo) ou pegar um empréstimo pessoal para quitar à vista."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: CREDIT_CARD_FAQS,
          title: "Dúvidas sobre Dívida de Cartão",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const MEI_FAQS = [
  {
    question: "O que é o DAS MEI?",
    answer: "É o Documento de Arrecadação do Simples Nacional. É a guia mensal que o MEI deve pagar para manter sua empresa regular e ter direito aos benefícios previdenciários."
  },
  {
    question: "Qual o valor do DAS em 2025?",
    answer: "O valor é calculado com base no salário mínimo vigente (5% para INSS) + ICMS (R$ 1,00) e/ou ISS (R$ 5,00), dependendo da atividade."
  },
  {
    question: "O que acontece se eu atrasar?",
    answer: "Você paga multa e juros sobre o valor devido. Além disso, o tempo de atraso não conta para a carência da aposentadoria e outros benefícios."
  }
];
function MEIDasPage() {
  const [activity, setActivity] = useState("comercio");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const minimumWage = 1412;
    const inss = minimumWage * 0.05;
    let icms = 0;
    let iss = 0;
    switch (activity) {
      case "comercio":
        icms = 1;
        break;
      case "servicos":
        iss = 5;
        break;
      case "comercio_servicos":
        icms = 1;
        iss = 5;
        break;
    }
    setResult({
      inss,
      icms,
      iss,
      total: inss + icms + iss
    });
  };
  useEffect(() => {
    calculate();
  }, [activity]);
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora DAS MEI",
    "description": "Calcule o valor da guia mensal do MEI (DAS) atualizado para 2025.",
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
        title: "Calculadora DAS MEI 2025 - Valor da Guia Mensal",
        description: "Quanto vou pagar de MEI? Calcule o valor exato do DAS (Documento de Arrecadação) para Comércio, Indústria ou Serviços.",
        canonical: "/calculadoras/mei-das"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": MEI_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "DAS MEI", href: "/calculadoras/mei-das" }
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
                /* @__PURE__ */ jsx(Building2, { className: "w-4 h-4 text-amber-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Empresariais" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500", children: "DAS MEI" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Mantenha sua empresa em dia. Saiba o valor da contribuição mensal do Microempreendedor Individual." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-amber-500" }),
                "Calcular Guia"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Atividade da Empresa" }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      value: activity,
                      onChange: (e) => setActivity(e.target.value),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500/50 transition-all",
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "comercio", children: "Comércio ou Indústria" }),
                        /* @__PURE__ */ jsx("option", { value: "servicos", children: "Prestação de Serviços" }),
                        /* @__PURE__ */ jsx("option", { value: "comercio_servicos", children: "Comércio e Serviços (Misto)" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-amber-500/10 p-6 rounded-2xl border border-amber-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-amber-400 block mb-2", children: "Valor Total do DAS" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "INSS (5%)" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.inss.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "ICMS" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.icms.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "ISS" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.iss.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5 text-amber-500" }),
                "Composição do Valor"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: "O valor do DAS é fixo e mensal, independente se você faturou ou não naquele mês." }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-2 list-disc pl-4", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "INSS:" }),
                    " 5% do Salário Mínimo (garante aposentadoria, auxílio-doença, etc)."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "ICMS:" }),
                    " R$ 1,00 (para comércio/indústria)."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "ISS:" }),
                    " R$ 5,00 (para serviços)."
                  ] })
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: MEI_FAQS,
          title: "Dúvidas sobre MEI",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const MARKUP_FAQS = [
  {
    question: "O que é Markup?",
    answer: "É um índice multiplicador aplicado sobre o custo de um produto para formar o preço de venda. Ele deve cobrir os custos fixos, variáveis e garantir a margem de lucro desejada."
  },
  {
    question: "Markup é o mesmo que Margem?",
    answer: "Não! Markup é o índice aplicado SOBRE o custo. Margem é a porcentagem de lucro DENTRO do preço de venda. Um Markup de 100% gera uma Margem de 50%."
  },
  {
    question: "Como calcular?",
    answer: "A fórmula básica é: Preço de Venda = Custo / (1 - (Despesas Variáveis + Despesas Fixas + Lucro Desejado))."
  }
];
function MarkupPage() {
  const [cost, setCost] = useState("");
  const [fixedExpenses, setFixedExpenses] = useState("");
  const [variableExpenses, setVariableExpenses] = useState("");
  const [profitMargin, setProfitMargin] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const c = parseFloat(cost.replace(/\./g, "").replace(",", ".") || "0");
    const fe = parseFloat(fixedExpenses.replace(",", ".") || "0");
    const ve = parseFloat(variableExpenses.replace(",", ".") || "0");
    const pm = parseFloat(profitMargin.replace(",", ".") || "0");
    if (c === 0) {
      setResult(null);
      return;
    }
    const totalPercentages = fe + ve + pm;
    if (totalPercentages >= 100) {
      setResult(null);
      return;
    }
    const divisor = 1 - totalPercentages / 100;
    const sellingPrice = c / divisor;
    const markup = (sellingPrice - c) / c * 100;
    setResult({
      sellingPrice,
      markup
    });
  };
  useEffect(() => {
    calculate();
  }, [cost, fixedExpenses, variableExpenses, profitMargin]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Markup",
    "description": "Calcule o preço de venda ideal dos seus produtos usando o método de Markup.",
    "applicationCategory": "BusinessApplication",
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
        title: "Calculadora de Markup - Formação de Preço de Venda",
        description: "Não tenha prejuízo! Calcule o preço de venda correto dos seus produtos considerando custos, impostos e margem de lucro.",
        canonical: "/calculadoras/markup"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": MARKUP_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Markup", href: "/calculadoras/markup" }
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
                /* @__PURE__ */ jsx(TrendingUp, { className: "w-4 h-4 text-amber-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Empresariais" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500", children: "Markup" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Precifique seus produtos com segurança. Garanta que todos os custos sejam cobertos e o lucro seja real." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-amber-500" }),
                "Calcular Preço"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Custo do Produto (Unitário)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: cost,
                        onChange: (e) => handleCurrencyInput(e.target.value, setCost),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Despesas Fixas (%)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: fixedExpenses,
                        onChange: (e) => setFixedExpenses(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500/50 transition-all",
                        placeholder: "Ex: 15"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Despesas Var. (%)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: variableExpenses,
                        onChange: (e) => setVariableExpenses(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500/50 transition-all",
                        placeholder: "Ex: 10"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Lucro Desejado (%)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: profitMargin,
                        onChange: (e) => setProfitMargin(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500/50 transition-all",
                        placeholder: "Ex: 20"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-amber-500/10 p-6 rounded-2xl border border-amber-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-amber-400 block mb-2", children: "Preço de Venda Sugerido" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.sellingPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Markup Multiplicador" }),
                    /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `${result.markup.toFixed(2)}%` : "---" })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(DollarSign, { className: "w-5 h-5 text-amber-500" }),
                "Entenda os Custos"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("ul", { className: "space-y-2 list-disc pl-4", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Despesas Fixas:" }),
                    " Aluguel, salários, internet (rateados por produto)."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Despesas Variáveis:" }),
                    " Impostos sobre venda, comissões, taxas de cartão."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Lucro:" }),
                    " O que sobra limpo para a empresa reinvestir ou distribuir."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5 mt-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Atenção" }),
                  "Se a soma das porcentagens for próxima de 100%, o preço de venda tenderá ao infinito. Revise seus custos!"
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: MARKUP_FAQS,
          title: "Dúvidas sobre Precificação",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const BREAK_EVEN_FAQS = [
  {
    question: "O que é Ponto de Equilíbrio?",
    answer: "É o momento em que as receitas da empresa igualam os custos e despesas. Nesse ponto, o lucro é zero, mas também não há prejuízo."
  },
  {
    question: "Para que serve?",
    answer: "Para saber quanto você precisa vender (em valor ou quantidade) apenas para pagar as contas. Tudo que vender acima disso é lucro."
  },
  {
    question: "O que é Margem de Contribuição?",
    answer: "É o quanto sobra do preço de venda após pagar os custos variáveis (impostos, comissões, custo do produto). É esse valor que ajuda a pagar as despesas fixas."
  }
];
function BreakEvenPage() {
  const [fixedCosts, setFixedCosts] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [variableCosts, setVariableCosts] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const fc = parseFloat(fixedCosts.replace(/\./g, "").replace(",", ".") || "0");
    const sp = parseFloat(sellingPrice.replace(/\./g, "").replace(",", ".") || "0");
    const vc = parseFloat(variableCosts.replace(/\./g, "").replace(",", ".") || "0");
    if (sp === 0 || sp <= vc) {
      setResult(null);
      return;
    }
    const contributionMargin = sp - vc;
    const quantity = fc / contributionMargin;
    const revenue = quantity * sp;
    setResult({
      quantity,
      revenue,
      contributionMargin
    });
  };
  useEffect(() => {
    calculate();
  }, [fixedCosts, sellingPrice, variableCosts]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Ponto de Equilíbrio",
    "description": "Descubra quanto sua empresa precisa vender para não ter prejuízo. Cálculo de Break-even Point.",
    "applicationCategory": "BusinessApplication",
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
        title: "Calculadora de Ponto de Equilíbrio - Break-even Point",
        description: "Quanto preciso vender para pagar as contas? Calcule o Ponto de Equilíbrio da sua empresa e saiba sua meta mínima de vendas.",
        canonical: "/calculadoras/ponto-de-equilibrio"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": BREAK_EVEN_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Ponto de Equilíbrio", href: "/calculadoras/ponto-de-equilibrio" }
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
                /* @__PURE__ */ jsx(Scale, { className: "w-4 h-4 text-amber-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Empresariais" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-red-500", children: "Ponto de Equilíbrio" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Descubra sua meta mínima. Saiba exatamente quanto faturar para cobrir todos os custos." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-amber-500" }),
                "Calcular Break-even"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Custos Fixos Totais (Mensal)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: fixedCosts,
                        onChange: (e) => handleCurrencyInput(e.target.value, setFixedCosts),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Preço de Venda (Unitário)" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: sellingPrice,
                          onChange: (e) => handleCurrencyInput(e.target.value, setSellingPrice),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Custo Variável (Unitário)" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: variableCosts,
                          onChange: (e) => handleCurrencyInput(e.target.value, setVariableCosts),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-amber-500/10 p-6 rounded-2xl border border-amber-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-amber-400 block mb-2", children: "Faturamento Necessário" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? `R$ ${result.revenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Qtd. Vendas Necessária" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? Math.ceil(result.quantity).toLocaleString("pt-BR") : "---" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Margem Contribuição" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.contributionMargin.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5 text-amber-500" }),
                "Análise"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: "O Ponto de Equilíbrio mostra o nível de segurança do seu negócio." }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-2 list-disc pl-4", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Abaixo dele:" }),
                    " Prejuízo. Você está pagando para trabalhar."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Acima dele:" }),
                    " Lucro. Cada venda adicional gera riqueza."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5 mt-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Dica" }),
                  "Reduzir custos fixos ou aumentar a margem de contribuição (preço - custo variável) ajuda a atingir o equilíbrio mais rápido."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: BREAK_EVEN_FAQS,
          title: "Dúvidas sobre Ponto de Equilíbrio",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const SIMPLES_VS_PRESUMIDO_FAQS = [
  {
    question: "Qual a diferença básica?",
    answer: "No Simples Nacional, você paga uma guia única (DAS) com alíquota progressiva sobre o faturamento. No Lucro Presumido, os impostos são pagos separadamente (PIS, COFINS, IRPJ, CSLL, ISS/ICMS) e as alíquotas variam conforme a atividade."
  },
  {
    question: "Quando o Simples vale a pena?",
    answer: "Geralmente para empresas com faturamento menor e folha de pagamento alta (Anexo III ou V com Fator R), pois o Simples isenta a cota patronal do INSS (20%)."
  },
  {
    question: "Quando o Presumido vale a pena?",
    answer: "Para empresas com margem de lucro alta, faturamento elevado (próximo ao teto do Simples) ou atividades com alíquotas muito altas no Simples (Anexo V sem Fator R)."
  }
];
function SimplesVsPresumidoPage() {
  const [revenue, setRevenue] = useState("");
  const [payroll, setPayroll] = useState("");
  const [activity, setActivity] = useState("servicos");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const rev = parseFloat(revenue.replace(/\./g, "").replace(",", ".") || "0");
    const pay = parseFloat(payroll.replace(/\./g, "").replace(",", ".") || "0");
    if (rev === 0) {
      setResult(null);
      return;
    }
    let simplesTax = 0;
    if (activity === "comercio") {
      if (rev <= 18e4 / 12) simplesTax = rev * 0.04;
      else if (rev <= 36e4 / 12) simplesTax = rev * 0.073;
      else simplesTax = rev * 0.095;
    } else {
      const factorR = pay / rev;
      if (factorR >= 0.28) {
        if (rev <= 18e4 / 12) simplesTax = rev * 0.06;
        else if (rev <= 36e4 / 12) simplesTax = rev * 0.112;
        else simplesTax = rev * 0.135;
      } else {
        if (rev <= 18e4 / 12) simplesTax = rev * 0.155;
        else simplesTax = rev * 0.18;
      }
    }
    let presumidoTax = 0;
    presumidoTax += rev * 0.0365;
    if (activity === "servicos") {
      presumidoTax += rev * 0.1133;
      presumidoTax += rev * 0.05;
    } else {
      presumidoTax += rev * 0.0593;
      presumidoTax += rev * 0.04;
    }
    presumidoTax += pay * 0.2;
    setResult({
      simples: simplesTax,
      presumido: presumidoTax,
      bestOption: simplesTax < presumidoTax ? "Simples Nacional" : "Lucro Presumido"
    });
  };
  useEffect(() => {
    calculate();
  }, [revenue, payroll, activity]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora Simples Nacional vs Lucro Presumido",
    "description": "Qual o melhor regime tributário para sua empresa? Compare os impostos e economize dinheiro.",
    "applicationCategory": "BusinessApplication",
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
        title: "Simples Nacional ou Lucro Presumido? Comparador 2025",
        description: "Faça a escolha certa. Compare os impostos do Simples Nacional e Lucro Presumido e descubra qual regime tributário é mais barato para sua empresa.",
        canonical: "/calculadoras/simples-vs-presumido"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": SIMPLES_VS_PRESUMIDO_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Simples vs Presumido", href: "/calculadoras/simples-vs-presumido" }
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
                /* @__PURE__ */ jsx(Scale, { className: "w-4 h-4 text-amber-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Empresariais" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Simples Nacional ou ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-blue-500", children: "Lucro Presumido?" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Compare os regimes tributários e descubra onde sua empresa paga menos impostos." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-amber-500" }),
                "Comparar Regimes"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Faturamento Mensal" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: revenue,
                        onChange: (e) => handleCurrencyInput(e.target.value, setRevenue),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Folha de Pagamento (Mensal)" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: payroll,
                          onChange: (e) => handleCurrencyInput(e.target.value, setPayroll),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Atividade Principal" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        value: activity,
                        onChange: (e) => setActivity(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500/50 transition-all",
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "servicos", children: "Prestação de Serviços" }),
                          /* @__PURE__ */ jsx("option", { value: "comercio", children: "Comércio" })
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-amber-500/10 p-6 rounded-2xl border border-amber-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-amber-400 block mb-2", children: "Melhor Opção Estimada" }),
                    /* @__PURE__ */ jsx("span", { className: "text-3xl font-bold text-white", children: result ? result.bestOption : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border text-center ${result && result.bestOption === "Simples Nacional" ? "bg-green-500/10 border-green-500/20" : "bg-white/5 border-white/5"}`, children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Simples Nacional" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.simples.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border text-center ${result && result.bestOption === "Lucro Presumido" ? "bg-green-500/10 border-green-500/20" : "bg-white/5 border-white/5"}`, children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Lucro Presumido" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? `R$ ${result.presumido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                    ] })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Building2, { className: "w-5 h-5 text-amber-500" }),
                "Fator R"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: "Para empresas de serviços no Simples Nacional, a relação entre folha de pagamento e faturamento (Fator R) define o anexo." }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-2 list-disc pl-4", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsxs("strong", { children: [
                      "Fator R ",
                      ">",
                      "= 28%:"
                    ] }),
                    " Anexo III (Alíquotas menores, a partir de 6%)."
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsxs("strong", { children: [
                      "Fator R ",
                      "<",
                      " 28%:"
                    ] }),
                    " Anexo V (Alíquotas maiores, a partir de 15,5%)."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5 mt-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Dica" }),
                  "Às vezes, aumentar o Pró-Labore para atingir o Fator R de 28% gera uma economia tributária enorme no Simples."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: SIMPLES_VS_PRESUMIDO_FAQS,
          title: "Dúvidas sobre Regimes Tributários",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const WORKING_CAPITAL_FAQS = [
  {
    question: "O que é Capital de Giro?",
    answer: "É o dinheiro necessário para manter a empresa funcionando enquanto você não recebe das vendas a prazo. Ele cobre estoques, contas a pagar e custos operacionais."
  },
  {
    question: "Como calcular?",
    answer: "A fórmula básica é: Ativo Circulante (dinheiro em caixa + contas a receber + estoque) - Passivo Circulante (contas a pagar + empréstimos curto prazo)."
  },
  {
    question: "Por que ele é importante?",
    answer: "A falta de capital de giro é a principal causa de falência de pequenas empresas. É ele que garante a saúde financeira nos meses de baixa venda ou atraso de clientes."
  }
];
function WorkingCapitalPage() {
  const [currentAssets, setCurrentAssets] = useState("");
  const [currentLiabilities, setCurrentLiabilities] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const assets = parseFloat(currentAssets.replace(/\./g, "").replace(",", ".") || "0");
    const liabilities = parseFloat(currentLiabilities.replace(/\./g, "").replace(",", ".") || "0");
    if (assets === 0 && liabilities === 0) {
      setResult(null);
      return;
    }
    const workingCapital = assets - liabilities;
    const ratio = liabilities > 0 ? assets / liabilities : 0;
    setResult({
      workingCapital,
      ratio
    });
  };
  useEffect(() => {
    calculate();
  }, [currentAssets, currentLiabilities]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Capital de Giro",
    "description": "Calcule a necessidade de capital de giro da sua empresa e avalie sua saúde financeira.",
    "applicationCategory": "BusinessApplication",
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
        title: "Calculadora de Capital de Giro Líquido",
        description: "Sua empresa tem dinheiro para rodar? Calcule o Capital de Giro Líquido e o Índice de Liquidez Corrente.",
        canonical: "/calculadoras/capital-de-giro"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": WORKING_CAPITAL_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Capital de Giro", href: "/calculadoras/capital-de-giro" }
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
                /* @__PURE__ */ jsx(Wallet, { className: "w-4 h-4 text-amber-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Empresariais" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-green-500", children: "Capital de Giro" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Monitore a saúde do seu caixa. Garanta recursos para operar com tranquilidade." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-amber-500" }),
                "Calcular Liquidez"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Ativo Circulante" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: currentAssets,
                        onChange: (e) => handleCurrencyInput(e.target.value, setCurrentAssets),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-all",
                        placeholder: "Caixa + Estoque + Recebíveis"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Soma de dinheiro em caixa, bancos, estoques e contas a receber no curto prazo." })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Passivo Circulante" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: currentLiabilities,
                        onChange: (e) => handleCurrencyInput(e.target.value, setCurrentLiabilities),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-all",
                        placeholder: "Contas a Pagar + Empréstimos"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Soma de fornecedores, impostos, salários e empréstimos a pagar no curto prazo." })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-amber-500/10 p-6 rounded-2xl border border-amber-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-amber-400 block mb-2", children: "Capital de Giro Líquido" }),
                    /* @__PURE__ */ jsx("span", { className: `text-4xl font-bold ${result && result.workingCapital < 0 ? "text-red-400" : "text-white"}`, children: result ? `R$ ${result.workingCapital.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Índice de Liquidez Corrente" }),
                    /* @__PURE__ */ jsx("span", { className: `text-xl font-bold ${result && result.ratio < 1 ? "text-red-400" : "text-white"}`, children: result ? result.ratio.toFixed(2) : "---" })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(RefreshCw, { className: "w-5 h-5 text-amber-500" }),
                "Interpretação"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "space-y-4 text-sm text-gray-400", children: /* @__PURE__ */ jsxs("ul", { className: "space-y-2 list-disc pl-4", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Positivo:" }),
                  " Sua empresa tem recursos suficientes para pagar as dívidas de curto prazo."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Negativo:" }),
                  " Alerta vermelho! Você deve mais do que tem disponível no curto prazo."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsxs("strong", { children: [
                    "Liquidez ",
                    ">",
                    " 1:"
                  ] }),
                  " Saudável. Para cada R$ 1 de dívida, você tem mais de R$ 1 de ativo."
                ] })
              ] }) })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: WORKING_CAPITAL_FAQS,
          title: "Dúvidas sobre Capital de Giro",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const ROI_FAQS = [
  {
    question: "O que é ROI?",
    answer: "Return on Investment (Retorno sobre Investimento). É uma métrica usada para saber quanto dinheiro a empresa ganhou ou perdeu em relação ao valor investido."
  },
  {
    question: "Como calcular?",
    answer: "A fórmula é: (Receita Obtida - Custo do Investimento) / Custo do Investimento. O resultado é multiplicado por 100 para obter a porcentagem."
  },
  {
    question: "Qual um bom ROI?",
    answer: "Depende do setor e do risco. Em campanhas de marketing, um ROI de 500% (5x) é excelente. Em investimentos financeiros conservadores, 10% ao ano pode ser bom."
  }
];
function ROICalculatorPage() {
  const [investment, setInvestment] = useState("");
  const [revenue, setRevenue] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const inv = parseFloat(investment.replace(/\./g, "").replace(",", ".") || "0");
    const rev = parseFloat(revenue.replace(/\./g, "").replace(",", ".") || "0");
    if (inv === 0) {
      setResult(null);
      return;
    }
    const profit = rev - inv;
    const roi = profit / inv * 100;
    setResult({
      roi,
      profit
    });
  };
  useEffect(() => {
    calculate();
  }, [investment, revenue]);
  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };
  const handleCurrencyInput = (value, setter) => {
    setter(formatCurrency(value));
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de ROI",
    "description": "Calcule o Retorno sobre Investimento (ROI) de seus projetos ou campanhas de marketing.",
    "applicationCategory": "BusinessApplication",
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
        title: "Calculadora de ROI - Retorno sobre Investimento",
        description: "Valeu a pena? Calcule o ROI de seus investimentos, campanhas de marketing ou projetos e descubra a porcentagem de lucro.",
        canonical: "/calculadoras/roi"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": ROI_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "ROI", href: "/calculadoras/roi" }
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
                /* @__PURE__ */ jsx(BarChart3, { className: "w-4 h-4 text-amber-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Empresariais" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-purple-500", children: "ROI" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Retorno sobre Investimento. Meça a eficiência dos seus aportes financeiros." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-amber-500" }),
                "Calcular Retorno"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor Investido" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: investment,
                        onChange: (e) => handleCurrencyInput(e.target.value, setInvestment),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor Retornado (Receita)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: revenue,
                        onChange: (e) => handleCurrencyInput(e.target.value, setRevenue),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-amber-500/10 p-6 rounded-2xl border border-amber-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-amber-400 block mb-2", children: "ROI (Retorno)" }),
                    /* @__PURE__ */ jsx("span", { className: `text-4xl font-bold ${result && result.roi < 0 ? "text-red-400" : "text-white"}`, children: result ? `${result.roi.toFixed(2)}%` : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Lucro / Prejuízo" }),
                    /* @__PURE__ */ jsx("span", { className: `text-xl font-bold ${result && result.profit < 0 ? "text-red-400" : "text-white"}`, children: result ? `R$ ${result.profit.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5 text-amber-500" }),
                "Análise"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "space-y-4 text-sm text-gray-400", children: /* @__PURE__ */ jsxs("ul", { className: "space-y-2 list-disc pl-4", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "ROI Positivo:" }),
                  " Você ganhou dinheiro. Ex: 100% significa que você dobrou o investimento."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "ROI Negativo:" }),
                  " Você perdeu dinheiro. O retorno foi menor que o custo."
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "ROI Zero:" }),
                  " Empate. Você recuperou exatamente o que investiu."
                ] })
              ] }) })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: ROI_FAQS,
          title: "Dúvidas sobre ROI",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const BBQ_FAQS = [
  {
    question: "Qual a quantidade de carne por pessoa?",
    answer: "Recomendamos 400g de carne por adulto (se houver acompanhamentos) ou 500g se for apenas carne. Para crianças, considere metade dessa quantidade."
  },
  {
    question: "Como calcular a bebida?",
    answer: "Cerveja: 4 a 6 latas por pessoa que bebe. Refrigerante/Água: 600ml por pessoa."
  },
  {
    question: "O que não pode faltar?",
    answer: "Além das carnes, não esqueça: carvão (1 saco de 5kg para cada 6kg de carne), sal grosso, pão de alho e vinagrete."
  }
];
function BarbecueCalculatorPage() {
  const [men, setMen] = useState(0);
  const [women, setWomen] = useState(0);
  const [kids, setKids] = useState(0);
  const [duration, setDuration] = useState(4);
  const [result, setResult] = useState(null);
  const calculate = () => {
    const durationFactor = 1 + Math.max(0, duration - 4) * 0.1;
    const meat = (men * 0.5 + women * 0.35 + kids * 0.2) * durationFactor;
    const beer = (men * 1.5 + women * 1) * durationFactor;
    const soda = (men * 0.5 + women * 0.6 + kids * 0.8) * durationFactor;
    const coal = meat * 0.8;
    setResult({
      meat: Math.ceil(meat * 10) / 10,
      beer: Math.ceil(beer),
      soda: Math.ceil(soda),
      coal: Math.ceil(coal)
    });
  };
  useEffect(() => {
    calculate();
  }, [men, women, kids, duration]);
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Churrasco",
    "description": "Calcule a quantidade ideal de carne, bebida e carvão para o seu churrasco.",
    "applicationCategory": "UtilityApplication",
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
        title: "Calculadora de Churrasco Online - Carne e Bebida",
        description: "Vai fazer um churrasco? Calcule a quantidade exata de carne, cerveja e refrigerante por pessoa e evite desperdícios.",
        canonical: "/calculadoras/churrasco"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": BBQ_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Churrasco", href: "/calculadoras/churrasco" }
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
                /* @__PURE__ */ jsx(Flame, { className: "w-4 h-4 text-rose-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Dia a Dia e Utilidades" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500", children: "Churrasco" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Garanta que não falte nada (e nem sobre muito). Calcule a quantidade ideal de comida e bebida para seus convidados." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Users, { className: "w-5 h-5 text-rose-500" }),
                "Convidados"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-center", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Homens" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 bg-[#0a0a0a] border border-white/10 rounded-xl p-3", children: [
                      /* @__PURE__ */ jsx("button", { onClick: () => setMen(Math.max(0, men - 1)), className: "text-gray-400 hover:text-white text-xl font-bold w-8", children: "-" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white w-8", children: men }),
                      /* @__PURE__ */ jsx("button", { onClick: () => setMen(men + 1), className: "text-rose-500 hover:text-rose-400 text-xl font-bold w-8", children: "+" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-center", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Mulheres" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 bg-[#0a0a0a] border border-white/10 rounded-xl p-3", children: [
                      /* @__PURE__ */ jsx("button", { onClick: () => setWomen(Math.max(0, women - 1)), className: "text-gray-400 hover:text-white text-xl font-bold w-8", children: "-" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white w-8", children: women }),
                      /* @__PURE__ */ jsx("button", { onClick: () => setWomen(women + 1), className: "text-rose-500 hover:text-rose-400 text-xl font-bold w-8", children: "+" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-center", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Crianças" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 bg-[#0a0a0a] border border-white/10 rounded-xl p-3", children: [
                      /* @__PURE__ */ jsx("button", { onClick: () => setKids(Math.max(0, kids - 1)), className: "text-gray-400 hover:text-white text-xl font-bold w-8", children: "-" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white w-8", children: kids }),
                      /* @__PURE__ */ jsx("button", { onClick: () => setKids(kids + 1), className: "text-rose-500 hover:text-rose-400 text-xl font-bold w-8", children: "+" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxs("label", { className: "text-sm text-gray-400 flex justify-between", children: [
                    /* @__PURE__ */ jsx("span", { children: "Duração do Churrasco" }),
                    /* @__PURE__ */ jsxs("span", { className: "text-white font-bold", children: [
                      duration,
                      " horas"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "range",
                      min: "2",
                      max: "12",
                      value: duration,
                      onChange: (e) => setDuration(parseInt(e.target.value)),
                      className: "w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-rose-500"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-4 text-center", children: "Lista de Compras Estimada" }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsxs("span", { className: "block text-2xl font-bold text-white", children: [
                        result == null ? void 0 : result.meat,
                        " kg"
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Carne" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsxs("span", { className: "block text-2xl font-bold text-white", children: [
                        result == null ? void 0 : result.beer,
                        " L"
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Cerveja" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsxs("span", { className: "block text-2xl font-bold text-white", children: [
                        result == null ? void 0 : result.soda,
                        " L"
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Refri/Água" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsxs("span", { className: "block text-2xl font-bold text-white", children: [
                        result == null ? void 0 : result.coal,
                        " kg"
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Carvão" })
                    ] })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(ShoppingCart, { className: "w-5 h-5 text-rose-500" }),
                "Sugestão de Carnes"
              ] }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Picanha:" }),
                    " A rainha do churrasco. Calcule 1 peça para cada 5-6 pessoas."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Linguiça:" }),
                    " Ótima para entrada. É barata e todo mundo gosta."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Frango:" }),
                    " Coxinha da asa ou coração. Tempere com antecedência."
                  ] })
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: BBQ_FAQS,
          title: "Dúvidas sobre Churrasco",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const BUSINESS_DAYS_FAQS = [
  {
    question: "O que são dias úteis?",
    answer: "São os dias da semana de segunda a sexta-feira, excluindo os feriados nacionais. Sábados e domingos são considerados dias não úteis para fins bancários e de prazos legais."
  },
  {
    question: "Considera feriados estaduais?",
    answer: "Esta calculadora considera apenas os feriados nacionais fixos e móveis do Brasil. Feriados estaduais e municipais não são contabilizados automaticamente."
  },
  {
    question: "Sábado conta como dia útil?",
    answer: "Para fins bancários (pagamento de boletos), não. Para fins trabalhistas (jornada de trabalho), o sábado é considerado dia útil não trabalhado (ou trabalhado meio período), dependendo da empresa."
  }
];
function BusinessDaysPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState(null);
  const isHoliday = (date) => {
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const dateString = `${d}/${m}`;
    const fixedHolidays = [
      "1/1",
      // Confraternização Universal
      "21/4",
      // Tiradentes
      "1/5",
      // Dia do Trabalho
      "7/9",
      // Independência
      "12/10",
      // Nossa Senhora Aparecida
      "2/11",
      // Finados
      "15/11",
      // Proclamação da República
      "25/12"
      // Natal
    ];
    return fixedHolidays.includes(dateString);
  };
  const calculate = () => {
    if (!startDate || !endDate) {
      setResult(null);
      return;
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) {
      setResult(null);
      return;
    }
    let businessDays = 0;
    let weekends = 0;
    let holidays = 0;
    let totalDays = 0;
    const current = new Date(start);
    while (current <= end) {
      totalDays++;
      const dayOfWeek = current.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekends++;
      } else if (isHoliday(current)) {
        holidays++;
      } else {
        businessDays++;
      }
      current.setDate(current.getDate() + 1);
    }
    setResult({
      businessDays,
      totalDays,
      weekends,
      holidays
    });
  };
  useEffect(() => {
    calculate();
  }, [startDate, endDate]);
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Dias Úteis",
    "description": "Conte quantos dias úteis existem entre duas datas, descontando fins de semana e feriados nacionais.",
    "applicationCategory": "UtilityApplication",
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
        title: "Calculadora de Dias Úteis - Contagem de Prazos",
        description: "Precisa contar prazos? Calcule a quantidade exata de dias úteis entre duas datas, excluindo sábados, domingos e feriados.",
        canonical: "/calculadoras/dias-uteis"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": BUSINESS_DAYS_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Dias Úteis", href: "/calculadoras/dias-uteis" }
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
                /* @__PURE__ */ jsx(CalendarDays, { className: "w-4 h-4 text-blue-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Trabalhistas e Previdenciárias" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500", children: "Dias Úteis" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Planeje seus prazos. Conte os dias de trabalho efetivo entre duas datas." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }),
                "Contar Dias"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Data Inicial" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "date",
                        value: startDate,
                        onChange: (e) => setStartDate(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark]"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Data Final" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "date",
                        value: endDate,
                        onChange: (e) => setEndDate(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark]"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-center mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-blue-400 block mb-2", children: "Dias Úteis" }),
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-white", children: result ? result.businessDays : "---" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Total Dias" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? result.totalDays : "---" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Fins de Semana" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? result.weekends : "---" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Feriados" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white", children: result ? result.holidays : "---" })
                    ] })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5 text-blue-500" }),
                "Calendário"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsx("p", { children: "Esta ferramenta é essencial para calcular prazos de entrega, vencimento de boletos e contagem de dias de férias." }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Feriados Nacionais" }),
                  "Consideramos os feriados fixos (Natal, Tiradentes, etc). Feriados móveis (Carnaval, Páscoa, Corpus Christi) e locais podem variar."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: BUSINESS_DAYS_FAQS,
          title: "Dúvidas sobre Dias Úteis",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const RULE_OF_THREE_FAQS = [
  {
    question: "Quando usar a Regra de Três Simples?",
    answer: "Use quando você tem três números e quer descobrir o quarto. Exemplo: Se 2kg custam R$10, quanto custam 5kg?"
  },
  {
    question: "O que é grandeza diretamente proporcional?",
    answer: "Quando uma aumenta, a outra também aumenta. Exemplo: Quanto mais gasolina, mais longe o carro vai."
  },
  {
    question: "O que é grandeza inversamente proporcional?",
    answer: "Quando uma aumenta, a outra diminui. Exemplo: Quanto mais velocidade, menos tempo leva a viagem."
  }
];
function RuleOfThreePage() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [result, setResult] = useState(null);
  const [inverse, setInverse] = useState(false);
  const calculate = () => {
    const valA = parseFloat(a.replace(",", "."));
    const valB = parseFloat(b.replace(",", "."));
    const valC = parseFloat(c.replace(",", "."));
    if (isNaN(valA) || isNaN(valB) || isNaN(valC) || valA === 0) {
      setResult(null);
      return;
    }
    if (inverse) {
      setResult(valA * valB / valC);
    } else {
      setResult(valB * valC / valA);
    }
  };
  useEffect(() => {
    calculate();
  }, [a, b, c, inverse]);
  const handleInput = (value, setter) => {
    if (/^[\d.,]*$/.test(value)) {
      setter(value);
    }
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Regra de Três",
    "description": "Resolva problemas de proporção direta e inversa com nossa calculadora de Regra de Três.",
    "applicationCategory": "EducationalApplication",
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
        title: "Calculadora de Regra de Três Simples - Direta e Inversa",
        description: "Resolva problemas de matemática e proporção em segundos. Calcule regra de três simples, direta ou inversamente proporcional.",
        canonical: "/calculadoras/regra-de-tres"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": RULE_OF_THREE_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Regra de Três", href: "/calculadoras/regra-de-tres" }
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
                /* @__PURE__ */ jsx(Divide, { className: "w-4 h-4 text-cyan-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Matemática e Saúde" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500", children: "Regra de Três" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "A ferramenta matemática mais útil do dia a dia. Resolva proporções diretas e inversas instantaneamente." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
                /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                  /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-cyan-500" }),
                  "Calcular"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: `text-sm ${!inverse ? "text-cyan-400 font-bold" : "text-gray-500"}`, children: "Direta" }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setInverse(!inverse),
                      className: `w-12 h-6 rounded-full p-1 transition-colors ${inverse ? "bg-cyan-500" : "bg-white/10"}`,
                      children: /* @__PURE__ */ jsx("div", { className: `w-4 h-4 bg-white rounded-full transition-transform ${inverse ? "translate-x-6" : "translate-x-0"}` })
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: `text-sm ${inverse ? "text-cyan-400 font-bold" : "text-gray-500"}`, children: "Inversa" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[1fr,auto,1fr] gap-4 items-center mb-8", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute -left-6 top-1/2 -translate-y-1/2 text-cyan-500 font-bold", children: "A" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: a,
                        onChange: (e) => handleInput(e.target.value, setA),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 px-4 text-center text-xl font-bold text-white focus:outline-none focus:border-cyan-500/50 transition-all",
                        placeholder: "0"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "text-center text-gray-500 text-sm", children: "está para" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute -left-6 top-1/2 -translate-y-1/2 text-cyan-500 font-bold", children: "C" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: c,
                        onChange: (e) => handleInput(e.target.value, setC),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 px-4 text-center text-xl font-bold text-white focus:outline-none focus:border-cyan-500/50 transition-all",
                        placeholder: "0"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "h-full w-px bg-white/10 mx-auto" }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute -right-6 top-1/2 -translate-y-1/2 text-cyan-500 font-bold", children: "B" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: b,
                        onChange: (e) => handleInput(e.target.value, setB),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 px-4 text-center text-xl font-bold text-white focus:outline-none focus:border-cyan-500/50 transition-all",
                        placeholder: "0"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "text-center text-gray-500 text-sm", children: "assim como" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute -right-6 top-1/2 -translate-y-1/2 text-cyan-500 font-bold", children: "X" }),
                    /* @__PURE__ */ jsx("div", { className: "w-full bg-cyan-500/10 border border-cyan-500/50 rounded-xl py-4 px-4 text-center text-xl font-bold text-cyan-400", children: result !== null ? result.toLocaleString("pt-BR", { maximumFractionDigits: 2 }) : "?" })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(HelpCircle, { className: "w-5 h-5 text-cyan-500" }),
                "Exemplos Práticos"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Proporção Direta" }),
                  "Se 10 litros de gasolina custam R$50 (A e B), quanto custam 25 litros (C)? O resultado é X."
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-white block mb-1", children: "Proporção Inversa" }),
                  "Se 2 pedreiros (A) levam 10 dias (B) para fazer um muro, quanto tempo levariam 5 pedreiros (C)? O resultado é X (menos tempo)."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: RULE_OF_THREE_FAQS,
          title: "Dúvidas sobre Regra de Três",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const PERCENTAGE_FAQS = [
  {
    question: "Como calcular porcentagem de um valor?",
    answer: "Multiplique o valor pela porcentagem e divida por 100. Exemplo: 30% de 200 = (200 * 30) / 100 = 60."
  },
  {
    question: "Como calcular desconto?",
    answer: "Subtraia a porcentagem do valor original. Exemplo: Produto de R$100 com 20% de desconto = R$100 - R$20 = R$80."
  },
  {
    question: "Como calcular aumento?",
    answer: "Some a porcentagem ao valor original. Exemplo: Salário de R$1000 com 10% de aumento = R$1000 + R$100 = R$1100."
  }
];
function PercentageCalculatorPage() {
  const [val1_X, setVal1_X] = useState("");
  const [val1_Y, setVal1_Y] = useState("");
  const [res1, setRes1] = useState("---");
  const [val2_X, setVal2_X] = useState("");
  const [val2_Y, setVal2_Y] = useState("");
  const [res2, setRes2] = useState("---");
  const [val3_X, setVal3_X] = useState("");
  const [val3_Y, setVal3_Y] = useState("");
  const [res3, setRes3] = useState("---");
  useEffect(() => {
    const x1 = parseFloat(val1_X.replace(",", "."));
    const y1 = parseFloat(val1_Y.replace(",", "."));
    if (!isNaN(x1) && !isNaN(y1)) {
      setRes1((x1 / 100 * y1).toLocaleString("pt-BR", { maximumFractionDigits: 2 }));
    } else {
      setRes1("---");
    }
    const x2 = parseFloat(val2_X.replace(",", "."));
    const y2 = parseFloat(val2_Y.replace(",", "."));
    if (!isNaN(x2) && !isNaN(y2) && y2 !== 0) {
      setRes2((x2 / y2 * 100).toLocaleString("pt-BR", { maximumFractionDigits: 2 }) + "%");
    } else {
      setRes2("---");
    }
    const x3 = parseFloat(val3_X.replace(",", "."));
    const y3 = parseFloat(val3_Y.replace(",", "."));
    if (!isNaN(x3) && !isNaN(y3) && x3 !== 0) {
      const diff = (y3 - x3) / x3 * 100;
      const sign = diff > 0 ? "+" : "";
      setRes3(`${sign}${diff.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}%`);
    } else {
      setRes3("---");
    }
  }, [val1_X, val1_Y, val2_X, val2_Y, val3_X, val3_Y]);
  const handleInput = (value, setter) => {
    if (/^[\d.,]*$/.test(value)) {
      setter(value);
    }
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Porcentagem",
    "description": "Calcule porcentagens, descontos e aumentos de forma simples e rápida.",
    "applicationCategory": "UtilityApplication",
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
        title: "Calculadora de Porcentagem Online - Descontos e Aumentos",
        description: "Precisa calcular 10%, 20% ou 50% de um valor? Use nossa calculadora de porcentagem gratuita para descontos, aumentos e variações.",
        canonical: "/calculadoras/porcentagem"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": PERCENTAGE_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Porcentagem", href: "/calculadoras/porcentagem" }
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
                /* @__PURE__ */ jsx(Percent, { className: "w-4 h-4 text-cyan-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Matemática e Saúde" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500", children: "Porcentagem" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Calcule descontos, aumentos e variações percentuais em segundos." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7 space-y-6",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-white mb-4", children: "Quanto é..." }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "relative flex-1 w-full", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: val1_X,
                        onChange: (e) => handleInput(e.target.value, setVal1_X),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all text-center",
                        placeholder: "0"
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { className: "absolute right-4 top-1/2 -translate-y-1/2 text-gray-500", children: "%" })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "de" }),
                  /* @__PURE__ */ jsx("div", { className: "relative flex-1 w-full", children: /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: val1_Y,
                      onChange: (e) => handleInput(e.target.value, setVal1_Y),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all text-center",
                      placeholder: "0"
                    }
                  ) }),
                  /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "=" }),
                  /* @__PURE__ */ jsx("div", { className: "bg-cyan-500/10 border border-cyan-500/50 rounded-xl py-3 px-6 text-cyan-400 font-bold min-w-[100px] text-center", children: res1 })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-white mb-4", children: "O valor..." }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "relative flex-1 w-full", children: /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: val2_X,
                      onChange: (e) => handleInput(e.target.value, setVal2_X),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all text-center",
                      placeholder: "0"
                    }
                  ) }),
                  /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-sm text-center", children: "é qual % de" }),
                  /* @__PURE__ */ jsx("div", { className: "relative flex-1 w-full", children: /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: val2_Y,
                      onChange: (e) => handleInput(e.target.value, setVal2_Y),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all text-center",
                      placeholder: "0"
                    }
                  ) }),
                  /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "=" }),
                  /* @__PURE__ */ jsx("div", { className: "bg-cyan-500/10 border border-cyan-500/50 rounded-xl py-3 px-6 text-cyan-400 font-bold min-w-[100px] text-center", children: res2 })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-white mb-4", children: "Variação de..." }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "relative flex-1 w-full", children: /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: val3_X,
                      onChange: (e) => handleInput(e.target.value, setVal3_X),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all text-center",
                      placeholder: "Valor Inicial"
                    }
                  ) }),
                  /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-sm", children: "para" }),
                  /* @__PURE__ */ jsx("div", { className: "relative flex-1 w-full", children: /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: val3_Y,
                      onChange: (e) => handleInput(e.target.value, setVal3_Y),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all text-center",
                      placeholder: "Valor Final"
                    }
                  ) }),
                  /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "=" }),
                  /* @__PURE__ */ jsx("div", { className: "bg-cyan-500/10 border border-cyan-500/50 rounded-xl py-3 px-6 text-cyan-400 font-bold min-w-[100px] text-center", children: res3 })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(HelpCircle, { className: "w-5 h-5 text-cyan-500" }),
                "Exemplos do Dia a Dia"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsxs("strong", { className: "text-white block mb-1 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(TrendingDown, { className: "w-4 h-4 text-green-400" }),
                    " Desconto"
                  ] }),
                  "Uma calça custa R$120 e tem 20% de desconto.",
                  /* @__PURE__ */ jsx("br", {}),
                  "Cálculo: 120 x 0,20 = R$24 de desconto.",
                  /* @__PURE__ */ jsx("br", {}),
                  "Preço final: R$96."
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5", children: [
                  /* @__PURE__ */ jsxs("strong", { className: "text-white block mb-1 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(TrendingUp, { className: "w-4 h-4 text-red-400" }),
                    " Aumento"
                  ] }),
                  "Conta de luz de R$150 aumentou 10%.",
                  /* @__PURE__ */ jsx("br", {}),
                  "Cálculo: 150 x 0,10 = R$15 de aumento.",
                  /* @__PURE__ */ jsx("br", {}),
                  "Valor final: R$165."
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: PERCENTAGE_FAQS,
          title: "Dúvidas sobre Porcentagem",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const HOURS_FAQS = [
  {
    question: "Como funciona a soma de horas?",
    answer: "O sistema converte tudo para minutos, realiza a soma e depois converte de volta para o formato Horas:Minutos. Exemplo: 01:30 + 00:40 = 02:10."
  },
  {
    question: "Posso usar para calcular banco de horas?",
    answer: "Sim! É ideal para somar todas as horas trabalhadas no mês e subtrair das horas devidas para saber seu saldo positivo ou negativo."
  },
  {
    question: "O cálculo considera segundos?",
    answer: "Não, esta calculadora foca apenas em Horas e Minutos, que é o padrão para folhas de ponto e banco de horas."
  }
];
function HoursCalculatorPage() {
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState("00:00");
  const calculateTime = () => {
    if (!time1 || !time2) return;
    const [h1, m1] = time1.split(":").map(Number);
    const [h2, m2] = time2.split(":").map(Number);
    if (isNaN(h1) || isNaN(m1) || isNaN(h2) || isNaN(m2)) return;
    const totalMinutes1 = h1 * 60 + m1;
    const totalMinutes2 = h2 * 60 + m2;
    let finalMinutes;
    if (operation === "add") {
      finalMinutes = totalMinutes1 + totalMinutes2;
    } else {
      finalMinutes = totalMinutes1 - totalMinutes2;
    }
    const isNegative = finalMinutes < 0;
    finalMinutes = Math.abs(finalMinutes);
    const hours = Math.floor(finalMinutes / 60);
    const minutes = finalMinutes % 60;
    const formattedResult = `${isNegative ? "-" : ""}${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    setResult(formattedResult);
  };
  useEffect(() => {
    calculateTime();
  }, [time1, time2, operation]);
  const handleTimeInput = (value, setter) => {
    if (/^[\d:]*$/.test(value)) {
      if (value.length === 2 && !value.includes(":")) {
        setter(value + ":");
      } else {
        setter(value);
      }
    }
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Horas e Minutos",
    "description": "Some ou subtraia horas e minutos facilmente. Ideal para banco de horas e folha de ponto.",
    "applicationCategory": "UtilityApplication",
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
        title: "Calculadora de Horas e Minutos Online - Somar e Subtrair",
        description: "Precisa calcular seu banco de horas? Use nossa calculadora gratuita para somar e subtrair horas e minutos de forma simples e rápida.",
        canonical: "/calculadoras/horas"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": HOURS_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Calculadora de Horas", href: "/calculadoras/horas" }
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
                /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-blue-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Trabalhistas e Previdenciárias" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500", children: "Horas" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Some ou subtraia horas e minutos facilmente. A ferramenta ideal para fechar sua folha de ponto ou banco de horas." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
                /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                  /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-blue-500" }),
                  "Calcular"
                ] }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => {
                      setTime1("");
                      setTime2("");
                      setResult("00:00");
                    },
                    className: "text-xs flex items-center gap-1 text-gray-400 hover:text-white transition-colors",
                    children: [
                      /* @__PURE__ */ jsx(RotateCcw, { className: "w-3 h-3" }),
                      " Limpar"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[1fr,auto,1fr] gap-4 items-center mb-8", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs text-gray-500 ml-1", children: "Horário 1" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: time1,
                      onChange: (e) => handleTimeInput(e.target.value, setTime1),
                      placeholder: "00:00",
                      maxLength: 5,
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 px-4 text-center text-2xl font-mono text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-700"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 pt-6", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setOperation("add"),
                      className: `p-2 rounded-lg transition-all ${operation === "add" ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" : "bg-white/5 text-gray-500 hover:bg-white/10"}`,
                      children: "+"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setOperation("subtract"),
                      className: `p-2 rounded-lg transition-all ${operation === "subtract" ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" : "bg-white/5 text-gray-500 hover:bg-white/10"}`,
                      children: "-"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs text-gray-500 ml-1", children: "Horário 2" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: time2,
                      onChange: (e) => handleTimeInput(e.target.value, setTime2),
                      placeholder: "00:00",
                      maxLength: 5,
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 px-4 text-center text-2xl font-mono text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-700"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-[#0a0a0a] rounded-2xl p-6 border border-white/5 text-center relative overflow-hidden", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-2", children: "Resultado Final" }),
                /* @__PURE__ */ jsx("div", { className: "text-5xl font-bold text-white font-mono tracking-wider", children: result }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-blue-400 mt-2 font-medium", children: operation === "add" ? "Soma realizada" : "Subtração realizada" })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
                /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                  /* @__PURE__ */ jsx(HelpCircle, { className: "w-5 h-5 text-blue-500" }),
                  "Como usar?"
                ] }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-sm text-gray-400", children: [
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" }),
                    /* @__PURE__ */ jsxs("span", { children: [
                      "Digite as horas no formato ",
                      /* @__PURE__ */ jsx("strong", { children: "HH:MM" }),
                      " (ex: 08:30)."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" }),
                    /* @__PURE__ */ jsxs("span", { children: [
                      "Use o botão ",
                      /* @__PURE__ */ jsx("strong", { children: "(+)" }),
                      " para somar horas extras ou períodos trabalhados."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" }),
                    /* @__PURE__ */ jsxs("span", { children: [
                      "Use o botão ",
                      /* @__PURE__ */ jsx("strong", { children: "(-)" }),
                      " para descontar intervalos ou atrasos."
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-blue-500/10 p-6 rounded-3xl border border-blue-500/20", children: [
                /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-blue-400", children: [
                  /* @__PURE__ */ jsx(Info, { className: "w-5 h-5" }),
                  "Dica Prática"
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300", children: "Para calcular seu saldo do dia: Some o horário de saída com o horário de entrada. Subtraia o tempo de almoço. O resultado é seu tempo total trabalhado." })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: HOURS_FAQS,
          title: "Dúvidas sobre Cálculo de Horas",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const TILE_FAQS = [
  {
    question: "Como medir a área da parede ou piso?",
    answer: "Multiplique a largura pelo comprimento (ou altura). Exemplo: Uma parede de 3 metros de largura por 2,5 metros de altura tem 7,5m² (3 x 2,5)."
  },
  {
    question: "O que é a margem de perda?",
    answer: "É uma quantidade extra de material comprada para cobrir quebras, recortes e ajustes nos cantos. Recomendamos 10% para colocação reta e 15% para diagonal."
  },
  {
    question: "Essa calculadora serve para qualquer tipo de piso?",
    answer: "Sim, serve para cerâmica, porcelanato, laminado, vinílico e até tijolos, desde que você saiba as medidas da peça."
  }
];
function TileBricksCalculatorPage() {
  const [areaWidth, setAreaWidth] = useState("");
  const [areaLength, setAreaLength] = useState("");
  const [pieceWidth, setPieceWidth] = useState("");
  const [pieceLength, setPieceLength] = useState("");
  const [margin, setMargin] = useState(10);
  const [result, setResult] = useState(null);
  const calculate = () => {
    const aw = parseFloat(areaWidth.replace(",", "."));
    const al = parseFloat(areaLength.replace(",", "."));
    const pw = parseFloat(pieceWidth.replace(",", "."));
    const pl = parseFloat(pieceLength.replace(",", "."));
    if (isNaN(aw) || isNaN(al) || isNaN(pw) || isNaN(pl) || pw === 0 || pl === 0) {
      setResult(null);
      return;
    }
    const areaM2 = aw * al;
    const pieceM2 = pw / 100 * (pl / 100);
    const rawPieces = areaM2 / pieceM2;
    const totalPieces = Math.ceil(rawPieces * (1 + margin / 100));
    setResult({
      pieces: totalPieces,
      totalArea: areaM2
    });
  };
  useEffect(() => {
    calculate();
  }, [areaWidth, areaLength, pieceWidth, pieceLength, margin]);
  const handleInput = (value, setter) => {
    if (/^[\d.,]*$/.test(value)) {
      setter(value);
    }
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Pisos e Tijolos",
    "description": "Calcule a quantidade exata de pisos, azulejos ou tijolos para sua obra.",
    "applicationCategory": "UtilityApplication",
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
        title: "Calculadora de Pisos e Tijolos Online - Quantidade Exata",
        description: "Vai reformar? Calcule a quantidade de pisos, porcelanato ou tijolos necessários para sua obra, já incluindo a margem de perda.",
        canonical: "/calculadoras/tijolos-pisos"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": TILE_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Pisos e Tijolos", href: "/calculadoras/tijolos-pisos" }
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
                /* @__PURE__ */ jsx(Layers, { className: "w-4 h-4 text-rose-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Dia a Dia e Utilidades" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500", children: "Pisos e Tijolos" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Evite sobras ou falta de material. Calcule a quantidade exata para sua reforma." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-rose-500" }),
                "Calcular Material"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("h3", { className: "text-sm font-medium text-gray-300 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(Ruler, { className: "w-4 h-4 text-rose-500" }),
                    "Dimensões da Área (Parede ou Chão)"
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsx("label", { className: "text-xs text-gray-500", children: "Largura (metros)" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: areaWidth,
                          onChange: (e) => handleInput(e.target.value, setAreaWidth),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                          placeholder: "Ex: 3,50"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsx("label", { className: "text-xs text-gray-500", children: "Comprimento (metros)" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: areaLength,
                          onChange: (e) => handleInput(e.target.value, setAreaLength),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                          placeholder: "Ex: 4,00"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4 pt-4 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("h3", { className: "text-sm font-medium text-gray-300 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(Grid, { className: "w-4 h-4 text-rose-500" }),
                    "Dimensões da Peça (Piso ou Tijolo)"
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsx("label", { className: "text-xs text-gray-500", children: "Largura (cm)" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: pieceWidth,
                          onChange: (e) => handleInput(e.target.value, setPieceWidth),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                          placeholder: "Ex: 60"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsx("label", { className: "text-xs text-gray-500", children: "Comprimento (cm)" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: pieceLength,
                          onChange: (e) => handleInput(e.target.value, setPieceLength),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                          placeholder: "Ex: 60"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2 pt-4 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxs("label", { className: "text-sm text-gray-400 flex justify-between", children: [
                    /* @__PURE__ */ jsx("span", { children: "Margem de Perda (Quebras/Recortes)" }),
                    /* @__PURE__ */ jsxs("span", { className: "text-white font-bold", children: [
                      margin,
                      "%"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "range",
                      min: "0",
                      max: "30",
                      step: "5",
                      value: margin,
                      onChange: (e) => setMargin(parseInt(e.target.value)),
                      className: "w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-rose-500"
                    }
                  ),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 text-right", children: "Recomendado: 10% a 15%" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5 text-center", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-2", children: "Quantidade Necessária" }),
                  /* @__PURE__ */ jsxs("div", { className: "text-5xl font-bold text-white mb-2", children: [
                    result ? result.pieces : "---",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "text-2xl text-gray-500 font-normal", children: "peças" })
                  ] }),
                  result && /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
                    "Para cobrir uma área de ",
                    result.totalArea.toLocaleString("pt-BR"),
                    "m²."
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(HelpCircle, { className: "w-5 h-5 text-rose-500" }),
                "Dicas Importantes"
              ] }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Rodapé:" }),
                    " Se for usar o mesmo piso para o rodapé, considere uma margem de perda maior (15-20%)."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Lote:" }),
                    " Compre tudo de uma vez. Lotes diferentes podem ter leve variação de cor."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Reserva:" }),
                    " Guarde sempre 2 ou 3 peças extras no sótão para reparos futuros."
                  ] })
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: TILE_FAQS,
          title: "Dúvidas sobre Cálculo de Pisos",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const TRAVEL_FAQS = [
  {
    question: "Como calcular o consumo médio do meu carro?",
    answer: "Encha o tanque e zere o hodômetro. Rode até precisar abastecer novamente. Divida a quilometragem rodada pela quantidade de litros que coube no tanque."
  },
  {
    question: "O cálculo inclui desgaste do veículo?",
    answer: "Não, esta calculadora foca nos custos diretos da viagem: combustível e pedágios. Custos de manutenção e depreciação variam muito."
  },
  {
    question: "Como estimar o custo de pedágio?",
    answer: "Recomendamos usar aplicativos de navegação como Waze ou Google Maps, que informam o valor total dos pedágios na rota traçada."
  }
];
function TravelCostCalculatorPage() {
  const [distance, setDistance] = useState("");
  const [consumption, setConsumption] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [tolls, setTolls] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const dist = parseFloat(distance.replace(",", "."));
    const cons = parseFloat(consumption.replace(",", "."));
    const price = parseFloat(fuelPrice.replace(",", "."));
    const toll = parseFloat(tolls.replace(",", ".") || "0");
    if (isNaN(dist) || isNaN(cons) || isNaN(price) || cons === 0) {
      setResult(null);
      return;
    }
    const fuelCost = dist / cons * price;
    setResult(fuelCost + toll);
  };
  useEffect(() => {
    calculate();
  }, [distance, consumption, fuelPrice, tolls]);
  const handleInput = (value, setter) => {
    if (/^[\d.,]*$/.test(value)) {
      setter(value);
    }
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Custo de Viagem",
    "description": "Calcule quanto vai gastar de combustível e pedágio na sua viagem.",
    "applicationCategory": "TravelApplication",
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
        title: "Calculadora de Custo de Viagem - Combustível e Pedágios",
        description: "Planeje sua viagem de carro. Calcule o gasto total com combustível e pedágios de forma simples e rápida.",
        canonical: "/calculadoras/custo-viagem"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": TRAVEL_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Custo de Viagem", href: "/calculadoras/custo-viagem" }
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
                /* @__PURE__ */ jsx(Car, { className: "w-4 h-4 text-rose-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Dia a Dia e Utilidades" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500", children: "Custo de Viagem" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Saiba exatamente quanto vai gastar na estrada. Planeje seu orçamento de viagem com precisão." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-rose-500" }),
                "Calcular Custo"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400 flex items-center gap-2", children: "Distância Total (km)" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx(MapPin, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: distance,
                          onChange: (e) => handleInput(e.target.value, setDistance),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all",
                          placeholder: "0"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400 flex items-center gap-2", children: "Consumo (km/l)" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx(Fuel, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: consumption,
                          onChange: (e) => handleInput(e.target.value, setConsumption),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all",
                          placeholder: "0"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400 flex items-center gap-2", children: "Preço Combustível" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: fuelPrice,
                          onChange: (e) => handleInput(e.target.value, setFuelPrice),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400 flex items-center gap-2", children: "Pedágios (Total)" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: tolls,
                          onChange: (e) => handleInput(e.target.value, setTolls),
                          className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all",
                          placeholder: "0,00"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-2 text-center", children: "Custo Total Estimado" }),
                  /* @__PURE__ */ jsx("div", { className: "text-4xl font-bold text-center mb-2 text-white", children: result !== null ? `R$ ${result.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "---" }),
                  result !== null && /* @__PURE__ */ jsxs("p", { className: "text-center text-sm text-gray-500", children: [
                    "Apenas ida. Para ida e volta, o valor seria R$ ",
                    (result * 2).toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
                    "."
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(HelpCircle, { className: "w-5 h-5 text-rose-500" }),
                "Dicas para Economizar"
              ] }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Calibragem:" }),
                    " Pneus calibrados economizam até 3% de combustível."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Velocidade:" }),
                    " Manter velocidade constante na estrada reduz o consumo."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Ar Condicionado:" }),
                    " Em altas velocidades, janelas abertas gastam mais que o ar condicionado (devido à aerodinâmica)."
                  ] })
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: TRAVEL_FAQS,
          title: "Dúvidas sobre Custo de Viagem",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const IMC_FAQS = [
  {
    question: "O que é IMC?",
    answer: "IMC significa Índice de Massa Corporal. É um cálculo simples que permite avaliar se a pessoa está dentro do peso ideal em relação à altura."
  },
  {
    question: "O IMC é válido para todos?",
    answer: "O IMC é uma referência geral para adultos. Ele pode não ser preciso para atletas (devido à massa muscular), idosos e gestantes."
  },
  {
    question: "Qual o IMC ideal?",
    answer: "Para adultos, o IMC considerado normal está entre 18,5 e 24,9. Abaixo disso é magreza e acima é sobrepeso ou obesidade."
  }
];
function IMCCalculatorPage() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState(null);
  const [classification, setClassification] = useState("");
  const calculate = () => {
    const w = parseFloat(weight.replace(",", "."));
    const h = parseFloat(height.replace(",", "."));
    if (isNaN(w) || isNaN(h) || h === 0) {
      setResult(null);
      setClassification("");
      return;
    }
    const heightInMeters = h > 3 ? h / 100 : h;
    const imc = w / (heightInMeters * heightInMeters);
    setResult(imc);
    if (imc < 18.5) setClassification("Abaixo do Peso");
    else if (imc < 24.9) setClassification("Peso Normal");
    else if (imc < 29.9) setClassification("Sobrepeso");
    else if (imc < 34.9) setClassification("Obesidade Grau I");
    else if (imc < 39.9) setClassification("Obesidade Grau II");
    else setClassification("Obesidade Grau III");
  };
  useEffect(() => {
    calculate();
  }, [weight, height]);
  const handleInput = (value, setter) => {
    if (/^[\d.,]*$/.test(value)) {
      setter(value);
    }
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de IMC",
    "description": "Calcule seu Índice de Massa Corporal (IMC) e descubra se está no peso ideal.",
    "applicationCategory": "HealthApplication",
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
        title: "Calculadora de IMC Online - Índice de Massa Corporal",
        description: "Calcule seu IMC grátis e veja se está no peso ideal. Ferramenta simples e rápida para acompanhar sua saúde.",
        canonical: "/calculadoras/imc"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": IMC_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "IMC", href: "/calculadoras/imc" }
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
                /* @__PURE__ */ jsx(Activity, { className: "w-4 h-4 text-cyan-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Matemática e Saúde" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500", children: "IMC" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Monitore sua saúde. Calcule seu Índice de Massa Corporal em segundos." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-cyan-500" }),
                "Calcular IMC"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Peso (kg)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: weight,
                        onChange: (e) => handleInput(e.target.value, setWeight),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all",
                        placeholder: "Ex: 70"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Altura (m)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: height,
                        onChange: (e) => handleInput(e.target.value, setHeight),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all",
                        placeholder: "Ex: 1,75"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5 text-center", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-2", children: "Seu IMC é" }),
                  /* @__PURE__ */ jsx("div", { className: "text-5xl font-bold text-white mb-2", children: result !== null ? result.toFixed(1) : "---" }),
                  result !== null && /* @__PURE__ */ jsx("div", { className: `inline-block px-4 py-1 rounded-full text-sm font-bold ${classification === "Peso Normal" ? "bg-green-500/20 text-green-400" : classification === "Abaixo do Peso" ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"}`, children: classification })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Heart, { className: "w-5 h-5 text-cyan-500" }),
                "Tabela de Referência"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-2 rounded bg-white/5", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Menor que 18,5" }),
                  /* @__PURE__ */ jsx("span", { className: "text-yellow-400 font-medium", children: "Abaixo do peso" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-2 rounded bg-green-500/10 border border-green-500/20", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "18,5 a 24,9" }),
                  /* @__PURE__ */ jsx("span", { className: "text-green-400 font-bold", children: "Peso normal" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-2 rounded bg-white/5", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "25 a 29,9" }),
                  /* @__PURE__ */ jsx("span", { className: "text-orange-400 font-medium", children: "Sobrepeso" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-2 rounded bg-white/5", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "30 a 34,9" }),
                  /* @__PURE__ */ jsx("span", { className: "text-red-400 font-medium", children: "Obesidade I" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-2 rounded bg-white/5", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Maior que 40" }),
                  /* @__PURE__ */ jsx("span", { className: "text-red-500 font-bold", children: "Obesidade III" })
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: IMC_FAQS,
          title: "Dúvidas sobre IMC",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const WATER_FAQS = [
  {
    question: "Por que beber água é importante?",
    answer: "A água regula a temperatura corporal, transporta nutrientes, lubrifica articulações e melhora o funcionamento dos rins e intestino."
  },
  {
    question: "Bebidas como suco e chá contam?",
    answer: "Sim, mas a água pura é a melhor opção. Sucos podem ter muito açúcar e chás/café podem ser diuréticos."
  },
  {
    question: "Beber água demais faz mal?",
    answer: "Sim, o excesso pode causar hiponatremia (baixa concentração de sódio no sangue), mas é raro em pessoas saudáveis."
  }
];
function WaterIntakeCalculatorPage() {
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [result, setResult] = useState(null);
  const calculate = () => {
    const w = parseFloat(weight.replace(",", "."));
    if (isNaN(w) || w === 0) {
      setResult(null);
      return;
    }
    let mlPerKg = 35;
    if (activityLevel === "low") mlPerKg = 30;
    if (activityLevel === "high") mlPerKg = 45;
    setResult(w * mlPerKg);
  };
  useEffect(() => {
    calculate();
  }, [weight, activityLevel]);
  const handleInput = (value, setter) => {
    if (/^[\d.,]*$/.test(value)) {
      setter(value);
    }
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Ingestão de Água",
    "description": "Descubra quanta água você deve beber por dia com base no seu peso e nível de atividade.",
    "applicationCategory": "HealthApplication",
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
        title: "Calculadora de Água Diária - Hidratação Ideal",
        description: "Quantos litros de água devo beber por dia? Calcule a meta ideal de hidratação para seu corpo e estilo de vida.",
        canonical: "/calculadoras/agua-diaria"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": WATER_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Ingestão de Água", href: "/calculadoras/agua-diaria" }
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
                /* @__PURE__ */ jsx(Droplets, { className: "w-4 h-4 text-cyan-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Matemática e Saúde" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500", children: "Ingestão de Água" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Mantenha-se hidratado. Descubra a quantidade ideal de água para o seu corpo." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-cyan-500" }),
                "Calcular Meta Diária"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Seu Peso (kg)" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: weight,
                      onChange: (e) => handleInput(e.target.value, setWeight),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all",
                      placeholder: "Ex: 70"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Nível de Atividade Física" }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => setActivityLevel("low"),
                        className: `py-3 rounded-xl text-sm font-medium transition-all border ${activityLevel === "low" ? "bg-cyan-500/20 border-cyan-500 text-cyan-400" : "bg-[#0a0a0a] border-white/10 text-gray-400 hover:border-white/30"}`,
                        children: "Sedentário"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => setActivityLevel("moderate"),
                        className: `py-3 rounded-xl text-sm font-medium transition-all border ${activityLevel === "moderate" ? "bg-cyan-500/20 border-cyan-500 text-cyan-400" : "bg-[#0a0a0a] border-white/10 text-gray-400 hover:border-white/30"}`,
                        children: "Moderado"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => setActivityLevel("high"),
                        className: `py-3 rounded-xl text-sm font-medium transition-all border ${activityLevel === "high" ? "bg-cyan-500/20 border-cyan-500 text-cyan-400" : "bg-[#0a0a0a] border-white/10 text-gray-400 hover:border-white/30"}`,
                        children: "Intenso"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5 text-center", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-2", children: "Sua meta diária é" }),
                  /* @__PURE__ */ jsxs("div", { className: "text-5xl font-bold text-white mb-2", children: [
                    result !== null ? (result / 1e3).toFixed(2) : "---",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "text-2xl text-gray-500 font-normal", children: "litros" })
                  ] }),
                  result !== null && /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
                    "Isso equivale a aproximadamente ",
                    Math.ceil(result / 250),
                    " copos de 250ml."
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(GlassWater, { className: "w-5 h-5 text-cyan-500" }),
                "Dicas de Hidratação"
              ] }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Ao acordar:" }),
                    " Beba um copo d'água para ativar o metabolismo."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Antes das refeições:" }),
                    " Ajuda na digestão e controle do apetite."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "Saborize:" }),
                    " Se não gosta de água pura, adicione rodelas de limão ou hortelã."
                  ] })
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: WATER_FAQS,
          title: "Dúvidas sobre Hidratação",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const CULINARY_FAQS = [
  {
    question: "Quanto pesa 1 xícara de farinha?",
    answer: "Aproximadamente 120g. O peso varia conforme o ingrediente (densidade). Por isso, 1 xícara de açúcar (160g) pesa mais que 1 xícara de farinha."
  },
  {
    question: "Posso usar qualquer xícara?",
    answer: "Em receitas profissionais, 'xícara' é uma medida padrão de 240ml. Xícaras de café ou chá da sua casa podem ter tamanhos diferentes."
  },
  {
    question: "Colher de sopa é medida padrão?",
    answer: "Sim, 1 colher de sopa padrão tem 15ml. Já a colher de chá tem 5ml."
  }
];
const INGREDIENTS = [
  { name: "Farinha de Trigo", density: 120 },
  // g per cup (240ml)
  { name: "Açúcar Refinado", density: 160 },
  { name: "Açúcar Mascavo", density: 150 },
  { name: "Arroz Cru", density: 185 },
  { name: "Aveia em Flocos", density: 80 },
  { name: "Cacau em Pó", density: 90 },
  { name: "Manteiga", density: 200 },
  { name: "Leite / Água", density: 240 },
  { name: "Mel", density: 340 }
];
function CulinaryConverterPage() {
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("cups");
  const [ingredientIndex, setIngredientIndex] = useState(0);
  const [result, setResult] = useState("---");
  const calculate = () => {
    const val = parseFloat(amount.replace(",", "."));
    if (isNaN(val)) {
      setResult("---");
      return;
    }
    const density = INGREDIENTS[ingredientIndex].density;
    if (unit === "cups") {
      const grams = val * density;
      setResult(`${Math.round(grams)}g`);
    } else {
      const cups = val / density;
      setResult(`${cups.toFixed(2)} xícaras`);
    }
  };
  useEffect(() => {
    calculate();
  }, [amount, unit, ingredientIndex]);
  const handleInput = (value) => {
    if (/^[\d.,]*$/.test(value)) {
      setAmount(value);
    }
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Conversor Culinário",
    "description": "Converta medidas culinárias (xícaras para gramas) facilmente.",
    "applicationCategory": "UtilityApplication",
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
        title: "Conversor de Medidas Culinárias - Xícaras para Gramas",
        description: "Não erre na receita. Converta xícaras para gramas (e vice-versa) para farinha, açúcar, manteiga e outros ingredientes.",
        canonical: "/calculadoras/conversor-culinario"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": CULINARY_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Conversor Culinário", href: "/calculadoras/conversor-culinario" }
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
                /* @__PURE__ */ jsx(ChefHat, { className: "w-4 h-4 text-rose-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Dia a Dia e Utilidades" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Conversor ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500", children: "Culinário" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Transforme xícaras em gramas e acerte o ponto da sua receita." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Scale, { className: "w-5 h-5 text-rose-500" }),
                "Converter"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Ingrediente" }),
                  /* @__PURE__ */ jsx(
                    "select",
                    {
                      value: ingredientIndex,
                      onChange: (e) => setIngredientIndex(parseInt(e.target.value)),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all appearance-none cursor-pointer",
                      children: INGREDIENTS.map((ing, index) => /* @__PURE__ */ jsx("option", { value: index, children: ing.name }, index))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Quantidade" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: amount,
                        onChange: (e) => handleInput(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                        placeholder: "Ex: 1"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Unidade" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex bg-[#0a0a0a] rounded-xl p-1 border border-white/10", children: [
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => setUnit("cups"),
                          className: `flex-1 py-2 rounded-lg text-sm font-medium transition-all ${unit === "cups" ? "bg-rose-500 text-white" : "text-gray-400 hover:text-white"}`,
                          children: "Xícaras"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => setUnit("grams"),
                          className: `flex-1 py-2 rounded-lg text-sm font-medium transition-all ${unit === "grams" ? "bg-rose-500 text-white" : "text-gray-400 hover:text-white"}`,
                          children: "Gramas"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5 text-center", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-2", children: "Resultado" }),
                  /* @__PURE__ */ jsx("div", { className: "text-5xl font-bold text-white", children: result })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(HelpCircle, { className: "w-5 h-5 text-rose-500" }),
                "Tabela Rápida"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-sm text-gray-400", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between py-2 border-b border-white/5", children: [
                  /* @__PURE__ */ jsx("span", { children: "1 xícara de Farinha" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: "120g" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between py-2 border-b border-white/5", children: [
                  /* @__PURE__ */ jsx("span", { children: "1 xícara de Açúcar" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: "160g" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between py-2 border-b border-white/5", children: [
                  /* @__PURE__ */ jsx("span", { children: "1 xícara de Chocolate em Pó" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: "90g" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between py-2 border-b border-white/5", children: [
                  /* @__PURE__ */ jsx("span", { children: "1 xícara de Manteiga" }),
                  /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: "200g" })
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: CULINARY_FAQS,
          title: "Dúvidas sobre Medidas Culinárias",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const GESTATIONAL_FAQS = [
  {
    question: "Como é calculada a idade gestacional?",
    answer: "A contagem começa a partir do primeiro dia da última menstruação (DUM), e não do dia da concepção, pois é a data mais precisa que a mulher costuma ter."
  },
  {
    question: "O cálculo é 100% preciso?",
    answer: "É uma estimativa muito próxima. A confirmação exata da idade gestacional e da data provável do parto deve ser feita através do ultrassom no primeiro trimestre."
  },
  {
    question: "Quantas semanas dura uma gravidez?",
    answer: "Uma gravidez completa dura em média 40 semanas (280 dias), podendo variar entre 37 e 42 semanas."
  }
];
function GestationalAgeCalculatorPage() {
  const [dum, setDum] = useState("");
  const [result, setResult] = useState(null);
  const calculate = () => {
    if (!dum) return;
    const dumDate = new Date(dum);
    const today = /* @__PURE__ */ new Date();
    if (isNaN(dumDate.getTime())) return;
    const diffTime = Math.abs(today.getTime() - dumDate.getTime());
    const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;
    const dueDate = new Date(dumDate);
    dueDate.setDate(dumDate.getDate() + 280);
    setResult({
      weeks,
      days,
      dueDate: dueDate.toLocaleDateString("pt-BR")
    });
  };
  useEffect(() => {
    calculate();
  }, [dum]);
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora Gestacional",
    "description": "Calcule a idade gestacional e a data provável do parto (DPP) a partir da DUM.",
    "applicationCategory": "HealthApplication",
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
        title: "Calculadora Gestacional - Semanas de Gravidez e DPP",
        description: "Descubra de quantas semanas você está e qual a data provável do parto. Acompanhe sua gravidez com nossa calculadora gestacional.",
        canonical: "/calculadoras/idade-gestacional"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": GESTATIONAL_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Idade Gestacional", href: "/calculadoras/idade-gestacional" }
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
                /* @__PURE__ */ jsx(Baby, { className: "w-4 h-4 text-cyan-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Matemática e Saúde" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Calculadora ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500", children: "Gestacional" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Acompanhe o desenvolvimento do seu bebê. Saiba a data provável do nascimento." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5 text-cyan-500" }),
                "Calcular Data"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Data da Última Menstruação (DUM)" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "date",
                      value: dum,
                      onChange: (e) => setDum(e.target.value),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all [color-scheme:dark]"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("div", { className: "pt-6 border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-white/5 p-4 rounded-xl border border-white/5 text-center", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 block mb-1", children: "Idade Gestacional" }),
                    /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-white", children: result ? `${result.weeks} Semanas` : "---" }),
                    result && result.days > 0 && /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-500 block", children: [
                      "+ ",
                      result.days,
                      " dias"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20 text-center", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-cyan-400 block mb-1", children: "Data Provável do Parto" }),
                    /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-white", children: result ? result.dueDate : "---" })
                  ] })
                ] }) })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 text-cyan-500" }),
                "Trimestres da Gravidez"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 relative pl-4 border-l border-white/10", children: [
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-cyan-500" }),
                  /* @__PURE__ */ jsx("strong", { className: "text-white block text-sm", children: "1º Trimestre" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Semana 1 a 13" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-blue-500" }),
                  /* @__PURE__ */ jsx("strong", { className: "text-white block text-sm", children: "2º Trimestre" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Semana 14 a 26" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-purple-500" }),
                  /* @__PURE__ */ jsx("strong", { className: "text-white block text-sm", children: "3º Trimestre" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Semana 27 a 40+" })
                ] })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: GESTATIONAL_FAQS,
          title: "Dúvidas sobre Gravidez",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const SECRET_SANTA_FAQS = [
  {
    question: "Funciona com número ímpar de pessoas?",
    answer: "Sim! A lógica do sorteio é circular (A tira B, B tira C, C tira A), então sempre funciona perfeitamente com qualquer número de participantes acima de 3."
  },
  {
    question: "Posso fazer o sorteio à distância?",
    answer: "Sim! Você pode realizar o sorteio e enviar para cada pessoa o nome de quem ela tirou (por WhatsApp ou e-mail), mantendo o sigilo."
  },
  {
    question: "O sistema garante que ninguém tire a si mesmo?",
    answer: "Sim. O algoritmo matemático utilizado bloqueia qualquer possibilidade de uma pessoa tirar o próprio nome."
  }
];
function SecretSantaPage() {
  const [participants, setParticipants] = useState([]);
  const [newName, setNewName] = useState("");
  const [isDrawComplete, setIsDrawComplete] = useState(false);
  const [revealedId, setRevealedId] = useState(null);
  const addParticipant = () => {
    if (!newName.trim()) return;
    const newParticipant = {
      id: Math.random().toString(36).substr(2, 9),
      name: newName.trim()
    };
    setParticipants([...participants, newParticipant]);
    setNewName("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addParticipant();
    }
  };
  const removeParticipant = (id) => {
    setParticipants(participants.filter((p) => p.id !== id));
  };
  const performDraw = () => {
    if (participants.length < 3) {
      alert("Adicione pelo menos 3 participantes para realizar o sorteio.");
      return;
    }
    const shuffled = [...participants];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const result = shuffled.map((p, index) => {
      const targetIndex = (index + 1) % shuffled.length;
      return {
        ...p,
        target: shuffled[targetIndex].name
      };
    });
    result.sort((a, b) => a.name.localeCompare(b.name));
    setParticipants(result);
    setIsDrawComplete(true);
    setRevealedId(null);
  };
  const resetDraw = () => {
    setIsDrawComplete(false);
    setParticipants(participants.map((p) => ({ ...p, target: void 0 })));
    setRevealedId(null);
  };
  const toggleReveal = (id) => {
    if (revealedId === id) {
      setRevealedId(null);
    } else {
      setRevealedId(id);
    }
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Sorteador de Amigo Secreto",
    "description": "Realize sorteios de Amigo Secreto online, rápido e sem papel.",
    "applicationCategory": "UtilityApplication",
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
        title: "Sorteador de Amigo Secreto Online - Rápido e Sem Papel",
        description: "Vai fazer Amigo Secreto? Aposente os papeizinhos. Faça o sorteio online agora mesmo, defina o valor do presente e organize sua festa de Natal.",
        canonical: "/calculadoras/amigo-secreto"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": SECRET_SANTA_FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Amigo Secreto", href: "/calculadoras/amigo-secreto" }
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
                /* @__PURE__ */ jsx(Gift, { className: "w-4 h-4 text-rose-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Dia a Dia e Utilidades" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Sorteador de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500", children: "Amigo Secreto" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Organize a troca de presentes da família ou empresa em segundos. Sem papelzinhos, sem repetições." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsx("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: !isDrawComplete ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs text-gray-500 mb-1", children: "Adicionar Participante" }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: newName,
                      onChange: (e) => setNewName(e.target.value),
                      onKeyDown: handleKeyDown,
                      placeholder: "Nome da pessoa...",
                      className: "flex-1 bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: addParticipant,
                      className: "bg-rose-500 hover:bg-rose-600 text-white p-3 rounded-xl transition-colors",
                      children: /* @__PURE__ */ jsx(Plus, { className: "w-6 h-6" })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar", children: [
                participants.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500 py-4 text-sm", children: "Nenhum participante adicionado ainda." }),
                participants.map((p) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5 group", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-medium text-white", children: p.name }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => removeParticipant(p.id),
                      className: "text-gray-500 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100",
                      children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                    }
                  )
                ] }, p.id))
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-white/5", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4 text-sm text-gray-400", children: [
                  /* @__PURE__ */ jsxs("span", { children: [
                    "Total: ",
                    participants.length,
                    " participantes"
                  ] }),
                  participants.length < 3 && /* @__PURE__ */ jsx("span", { className: "text-rose-400 text-xs", children: "Mínimo de 3 pessoas" })
                ] }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: performDraw,
                    disabled: participants.length < 3,
                    className: "w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20",
                    children: [
                      /* @__PURE__ */ jsx(Shuffle, { className: "w-5 h-5" }),
                      "Realizar Sorteio"
                    ]
                  }
                )
              ] })
            ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-green-500/10 border border-green-500/20 p-4 rounded-xl text-center mb-6", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { className: "w-8 h-8 text-green-500 mx-auto mb-2" }),
                /* @__PURE__ */ jsx("h3", { className: "text-green-400 font-bold", children: "Sorteio Realizado!" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Agora cada um pode ver quem tirou." })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar", children: participants.map((p) => /* @__PURE__ */ jsxs("div", { className: "bg-[#0a0a0a] p-4 rounded-xl border border-white/5", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-bold text-lg text-white", children: p.name }),
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      onClick: () => toggleReveal(p.id),
                      className: `flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg transition-colors ${revealedId === p.id ? "bg-rose-500/20 text-rose-400" : "bg-white/10 text-gray-400 hover:bg-white/20"}`,
                      children: [
                        revealedId === p.id ? /* @__PURE__ */ jsx(EyeOff, { className: "w-3 h-3" }) : /* @__PURE__ */ jsx(Eye, { className: "w-3 h-3" }),
                        revealedId === p.id ? "Ocultar" : "Ver quem tirei"
                      ]
                    }
                  )
                ] }),
                revealedId === p.id && /* @__PURE__ */ jsxs("div", { className: "mt-3 p-3 bg-white/5 rounded-lg text-center border border-white/5 animate-in fade-in slide-in-from-top-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 block mb-1", children: "Você tirou:" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-rose-400", children: p.target })
                ] })
              ] }, p.id)) }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: resetDraw,
                  className: "w-full mt-6 bg-white/5 hover:bg-white/10 text-gray-300 font-medium py-3 rounded-xl transition-colors border border-white/10",
                  children: "Reiniciar Sorteio"
                }
              )
            ] }) })
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-5 space-y-6",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
                /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-white", children: [
                  /* @__PURE__ */ jsx(Users, { className: "w-5 h-5 text-rose-500" }),
                  "Por que usar o Sorteador Online?"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-gray-400 text-sm leading-relaxed", children: [
                  /* @__PURE__ */ jsx("p", { children: "O sorteio digital elimina a falha humana (ninguém tira o próprio nome) e garante imparcialidade." }),
                  /* @__PURE__ */ jsxs("ul", { className: "space-y-2 mt-2", children: [
                    /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" }),
                      /* @__PURE__ */ jsxs("span", { children: [
                        /* @__PURE__ */ jsx("strong", { children: 'Sem "Autosorteio":' }),
                        " O sistema bloqueia matematicamente a chance de alguém tirar a si mesmo."
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" }),
                      /* @__PURE__ */ jsxs("span", { children: [
                        /* @__PURE__ */ jsx("strong", { children: "Imparcialidade:" }),
                        " Ninguém manipula o papelzinho."
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" }),
                      /* @__PURE__ */ jsxs("span", { children: [
                        /* @__PURE__ */ jsx("strong", { children: "Remoto:" }),
                        " Organize tudo pelo WhatsApp sem precisar reunir todos antes."
                      ] })
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-yellow-500/10 p-6 rounded-2xl border border-yellow-500/20", children: [
                /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2 text-yellow-400", children: [
                  /* @__PURE__ */ jsx(Info, { className: "w-5 h-5" }),
                  "Dica de Economia"
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300", children: "Amigo Secreto é ótimo para o Natal de grandes famílias. Em vez de comprar 15 presentes baratos, você compra apenas um presente de melhor qualidade. Gasta-se menos e a qualidade aumenta para todos." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4 text-white", children: "Regras de Ouro" }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-sm text-gray-400", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("strong", { className: "text-white block", children: "Faixa de Preço" }),
                    /* @__PURE__ */ jsx("p", { children: "Defina um valor mínimo e máximo para garantir igualdade nos presentes." })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "border-t border-white/5 pt-3", children: [
                    /* @__PURE__ */ jsx("strong", { className: "text-white block", children: "Lista de Desejos" }),
                    /* @__PURE__ */ jsx("p", { children: "Incentive cada um a dizer 3 opções de presente ou tamanho de roupa." })
                  ] })
                ] })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: SECRET_SANTA_FAQS,
          title: "Dúvidas Frequentes sobre Amigo Secreto",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
function crc16ccitt(str) {
  let crc = 65535;
  const strlen = str.length;
  for (let c = 0; c < strlen; c++) {
    crc ^= str.charCodeAt(c) << 8;
    for (let i = 0; i < 8; i++) {
      if (crc & 32768) {
        crc = crc << 1 ^ 4129;
      } else {
        crc = crc << 1;
      }
    }
  }
  let hex = (crc & 65535).toString(16).toUpperCase();
  if (hex.length < 4) {
    hex = "0".repeat(4 - hex.length) + hex;
  }
  return hex;
}
const PIX_FAQS = [
  {
    question: "O QR Code Pix gerado expira?",
    answer: "Não. O QR Code estático gerado aqui não tem data de validade, a menos que você defina um identificador de transação específico que seu banco trate de forma diferente. Mas, em geral, ele pode ser usado indefinidamente."
  },
  {
    question: "Tem alguma taxa para gerar?",
    answer: "Não! Nossa ferramenta é 100% gratuita. Você não paga nada para gerar o código e nem taxas sobre as transferências recebidas (para pessoas físicas)."
  },
  {
    question: "É seguro?",
    answer: "Sim. O código é gerado diretamente no seu navegador. Nós não armazenamos seus dados bancários nem temos acesso à sua conta. O QR Code apenas contém as informações para o pagamento."
  }
];
function PixGeneratorPage() {
  const [pixKey, setPixKey] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [amount, setAmount] = useState("");
  const [txid, setTxid] = useState("***");
  const [payload, setPayload] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!pixKey || !name || !city) {
      setPayload("");
      return;
    }
    const cleanAmount = amount.replace(/\./g, "").replace(",", ".");
    const formattedAmount = cleanAmount ? parseFloat(cleanAmount).toFixed(2) : "0.00";
    const formatField = (id, value) => {
      const len = value.length.toString().padStart(2, "0");
      return `${id}${len}${value}`;
    };
    let rawPayload = formatField("00", "01");
    const gui = formatField("00", "br.gov.bcb.pix");
    const key = formatField("01", pixKey);
    const merchantAccount = formatField("26", gui + key);
    rawPayload += merchantAccount;
    rawPayload += formatField("52", "0000");
    rawPayload += formatField("53", "986");
    if (parseFloat(formattedAmount) > 0) {
      rawPayload += formatField("54", formattedAmount);
    }
    rawPayload += formatField("58", "BR");
    rawPayload += formatField("59", name.substring(0, 25));
    rawPayload += formatField("60", city.substring(0, 15));
    const txidField = formatField("05", txid || "***");
    rawPayload += formatField("62", txidField);
    rawPayload += "6304";
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
  const handleCurrencyInput = (value) => {
    const number = value.replace(/\D/g, "");
    const formatted = (Number(number) / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
    setAmount(formatted);
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
        canonical: "/calculadoras/gerador-pix"
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
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { items: [
          { label: "Calculadoras", href: "/calculadoras" },
          { label: "Gerador de Pix", href: "/calculadoras/gerador-pix" }
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
                /* @__PURE__ */ jsx(QrCode, { className: "w-4 h-4 text-rose-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Utilidades" })
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight", children: [
                "Gerador de ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500", children: "QR Code Pix" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Crie cobranças instantâneas. Gere QR Codes estáticos para receber pagamentos de forma fácil e segura." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 mb-24", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "lg:col-span-5",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-white", children: [
                /* @__PURE__ */ jsx(RefreshCw, { className: "w-5 h-5 text-rose-500" }),
                "Dados do Recebedor"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Chave Pix" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: pixKey,
                      onChange: (e) => setPixKey(e.target.value),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                      placeholder: "CPF, CNPJ, E-mail ou Celular"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Nome do Beneficiário" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: name,
                      onChange: (e) => setName(e.target.value),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                      placeholder: "Nome completo ou Razão Social"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Cidade" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: city,
                      onChange: (e) => setCity(e.target.value),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                      placeholder: "Cidade do beneficiário"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Valor (Opcional)" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500", children: "R$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: amount,
                        onChange: (e) => handleCurrencyInput(e.target.value),
                        className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                        placeholder: "0,00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400", children: "Identificador (Opcional)" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: txid,
                      onChange: (e) => setTxid(e.target.value),
                      className: "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-rose-500/50 transition-all",
                      placeholder: "Código da transação (TXID)"
                    }
                  )
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsx("div", { className: "bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 h-full flex flex-col items-center justify-center text-center", children: payload ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("div", { className: "bg-white p-4 rounded-2xl mb-8 shadow-2xl shadow-rose-500/20", children: /* @__PURE__ */ jsx(
                QRCodeSVG,
                {
                  id: "qrcode-pix",
                  value: payload,
                  size: 250,
                  level: "H",
                  includeMargin: true
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 w-full max-w-md", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: handleCopy,
                    className: "flex-1 flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white py-3 px-6 rounded-xl font-medium transition-all active:scale-95",
                    children: [
                      copied ? /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Copy, { className: "w-5 h-5" }),
                      copied ? "Copiado!" : "Copiar Código"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: handleDownload,
                    className: "flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-xl font-medium transition-all active:scale-95 border border-white/10",
                    children: [
                      /* @__PURE__ */ jsx(Download, { className: "w-5 h-5" }),
                      "Baixar QR Code"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-6 max-w-sm", children: 'Abra o app do seu banco, escolha "Pagar com Pix" e escaneie o código ou use a opção "Pix Copia e Cola".' })
            ] }) : /* @__PURE__ */ jsxs("div", { className: "text-gray-500", children: [
              /* @__PURE__ */ jsx(QrCode, { className: "w-24 h-24 mx-auto mb-4 opacity-20" }),
              /* @__PURE__ */ jsx("p", { className: "text-lg", children: "Preencha os dados para gerar o QR Code" })
            ] }) })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        FAQ,
        {
          items: PIX_FAQS,
          title: "Dúvidas sobre Pix",
          className: "py-12",
          showSocialProof: false
        }
      ),
      /* @__PURE__ */ jsx(AppPromoBanner$1, {})
    ] })
  ] });
}
const WebStoryPage = () => {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const story = storiesData.find((s) => s.slug === storyId) || null;
  const currentSlide = story == null ? void 0 : story.slides[currentSlideIndex];
  useEffect(() => {
    if (!story) return;
  }, [story]);
  const goNext = () => {
    if (story && currentSlideIndex < story.slides.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    } else {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate("/");
      }
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
      /* @__PURE__ */ jsx("meta", { name: "theme-color", content: "#000000" }),
      /* @__PURE__ */ jsx("link", { rel: "amphtml", href: `https://junny.com.br/amp-stories/${story.slug}.html` }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "headline": story.title,
        "image": [story.posterPortrait],
        "datePublished": (/* @__PURE__ */ new Date()).toISOString(),
        "author": {
          "@type": "Organization",
          "name": story.publisher,
          "logo": {
            "@type": "ImageObject",
            "url": story.publisherLogo
          }
        },
        "publisher": {
          "@type": "Organization",
          "name": "Junny",
          "logo": {
            "@type": "ImageObject",
            "url": "https://junny.com.br/favicon.ico"
          }
        }
      }) })
    ] }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "relative w-full h-full md:w-[400px] md:h-[90vh] md:rounded-2xl overflow-hidden bg-gray-900 shadow-2xl",
        drag: "y",
        dragConstraints: { top: 0, bottom: 0 },
        dragElastic: { top: 0, bottom: 0.6 },
        onDragEnd: (_, info) => {
          if (info.offset.y > 100 || info.velocity.y > 200) {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate("/");
            }
          }
        },
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-0 w-full px-2 flex gap-1 z-30", children: story.slides.map((slide, index) => /* @__PURE__ */ jsx("div", { className: "h-1 flex-1 bg-white/30 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "h-full bg-white",
              style: {
                width: index < currentSlideIndex ? "100%" : index > currentSlideIndex ? "0%" : "auto",
                animation: index === currentSlideIndex ? `story-progress ${(currentSlide == null ? void 0 : currentSlide.duration) || 5}s linear forwards` : "none",
                animationPlayState: isPaused ? "paused" : "running"
              },
              onAnimationEnd: () => {
                if (index === currentSlideIndex) {
                  goNext();
                }
              }
            }
          ) }, slide.id)) }),
          /* @__PURE__ */ jsxs("div", { className: "absolute top-8 left-4 flex items-center gap-2 z-30", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  if (window.history.length > 1) {
                    navigate(-1);
                  } else {
                    navigate("/");
                  }
                },
                className: "text-white",
                children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-8 h-8 drop-shadow-md" })
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20", children: /* @__PURE__ */ jsx(Wallet, { className: "w-4 h-4 text-primary" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-white text-sm font-medium drop-shadow-md", children: story.publisher })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "absolute top-8 right-4 flex gap-4 z-30 text-white", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => setIsMuted(!isMuted), children: isMuted ? /* @__PURE__ */ jsx(VolumeX, { className: "w-6 h-6 drop-shadow-md" }) : /* @__PURE__ */ jsx(Volume2, { className: "w-6 h-6 drop-shadow-md" }) }),
            /* @__PURE__ */ jsx("button", { onClick: () => {
              if (window.history.length > 1) {
                navigate(-1);
              } else {
                navigate("/");
              }
            }, children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6 drop-shadow-md" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-10 flex", children: [
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
              className: "absolute inset-0 w-full h-full z-20 pointer-events-none",
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
                          to: currentSlide.cta.url.startsWith("https://junny.com.br") ? currentSlide.cta.url.replace("https://junny.com.br", "") : currentSlide.cta.url,
                          className: "bg-primary text-black font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2 pointer-events-auto",
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
        ]
      }
    )
  ] });
};
const StoriesGallery = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Web Stories Financeiras - Dicas Rápidas | Junny",
        description: "Confira nossas Web Stories com dicas rápidas de finanças, FGTS, investimentos e economia em formato visual e direto ao ponto.",
        canonical: "/stories"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsx(Breadcrumb, { items: [
        { label: "Stories", href: "/stories" }
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 text-yellow-400" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Conteúdo Rápido" })
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-6", children: [
          "Junny ",
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "Stories" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto", children: "Dicas financeiras, tutoriais e novidades em formato de tela cheia. Rápido de ler, fácil de entender." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", children: storiesData.map((story, index) => /* @__PURE__ */ jsxs(
        "a",
        {
          href: `/stories/${story.slug}`,
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
const CategoryList = ({ categories }) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-3 mb-12", children: [
    /* @__PURE__ */ jsx(
      Link,
      {
        to: "/blog",
        className: "px-4 py-2 rounded-full bg-primary text-background font-medium text-sm hover:bg-primary/90 transition-colors",
        children: "Todos"
      }
    ),
    categories.map((category) => /* @__PURE__ */ jsx(
      Link,
      {
        to: `/blog/${category.slug}`,
        className: "px-4 py-2 rounded-full bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:border-primary/30 hover:text-white transition-all text-sm",
        children: category.name
      },
      category.id
    ))
  ] });
};
const StoryList = ({ stories }) => {
  if (stories.length === 0) return null;
  return /* @__PURE__ */ jsxs("div", { className: "mb-20", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white", children: "Web Stories" }),
      /* @__PURE__ */ jsx("span", { className: "text-sm text-primary", children: "Ver todos" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide", children: stories.map((story) => /* @__PURE__ */ jsxs(
      "a",
      {
        href: `/stories/${story.slug}`,
        className: "flex-none w-[140px] md:w-[160px] aspect-[9/16] relative rounded-xl overflow-hidden group cursor-pointer snap-start border border-white/10",
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: story.posterPortrait,
              alt: story.title,
              className: "absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center border border-white/20", children: /* @__PURE__ */ jsx(Play, { className: "w-3 h-3 text-white fill-white" }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 p-3", children: /* @__PURE__ */ jsx("p", { className: "text-white text-sm font-medium leading-tight line-clamp-3", children: story.title }) })
        ]
      },
      story.slug
    )) })
  ] });
};
const BlogIndex = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const [postsData, categoriesData] = await Promise.all([
        blogService.getPosts(),
        blogService.getAllCategories()
      ]);
      setPosts(postsData);
      setCategories(categoriesData);
      setLoading(false);
    };
    fetchData();
  }, []);
  const filteredPosts = posts.filter(
    (post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen pt-32 pb-24 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Blog Junny - Educação Financeira Descomplicada",
        description: "Dicas práticas de economia, investimentos e planejamento financeiro para você dominar seu dinheiro.",
        canonical: "https://junny.com.br/blog"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsx(Breadcrumb, { items: [{ label: "Blog", href: "/blog" }] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight", children: [
          "Blog ",
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "Junny" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10", children: "Domine suas finanças com conteúdos práticos e diretos ao ponto." }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-xl mx-auto relative", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "O que você quer aprender hoje?",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value),
              className: "w-full px-6 py-4 pl-14 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all backdrop-blur-sm"
            }
          ),
          /* @__PURE__ */ jsx(Search, { className: "absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(CategoryList, { categories }),
      /* @__PURE__ */ jsxs("div", { className: "mb-24", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white", children: searchTerm ? "Resultados da busca" : "Últimos Artigos" }) }),
        loading ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsx("div", { className: "h-96 bg-white/5 rounded-2xl animate-pulse" }, i)) }) : filteredPosts.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: filteredPosts.map((post) => /* @__PURE__ */ jsx(PostCard, { post }, post.id)) }) : /* @__PURE__ */ jsx("div", { className: "text-center py-20 bg-white/5 rounded-3xl border border-white/5", children: /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg", children: "Nenhum artigo encontrado para sua busca." }) })
      ] }),
      !searchTerm && /* @__PURE__ */ jsx(StoryList, { stories: storiesData }),
      /* @__PURE__ */ jsx("div", { className: "mt-24", children: /* @__PURE__ */ jsx(AppPromoBanner$1, {}) }),
      /* @__PURE__ */ jsx("div", { className: "mt-16 max-w-4xl mx-auto text-center border-t border-white/5 pt-12", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
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
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      if (!categorySlug) return;
      setLoading(true);
      const postsData = await blogService.getPostsByCategory(categorySlug);
      setPosts(postsData);
      const categoriesData = await blogService.getAllCategories();
      setCategories(categoriesData);
      const currentCategory = categoriesData.find((c) => c.slug === categorySlug);
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
        title: `${(category == null ? void 0 : category.name) || "Categoria"} - Blog Junny`,
        description: `Artigos sobre ${(category == null ? void 0 : category.name) || "finanças"} no blog Junny.`,
        canonical: `https://junny.com.br/blog/${categorySlug}`
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsx(Breadcrumb, { items: [
        { label: "Blog", href: "/blog" },
        { label: (category == null ? void 0 : category.name) || "Categoria", href: `/blog/${categorySlug}` }
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsx(BookOpen, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: "Categoria" })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-4", children: category == null ? void 0 : category.name }),
        (category == null ? void 0 : category.description) && /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-400 max-w-2xl mx-auto", children: category.description })
      ] }),
      /* @__PURE__ */ jsx(CategoryList, { categories }),
      loading ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsx("div", { className: "h-96 bg-white/5 rounded-2xl animate-pulse" }, i)) }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: posts.map((post) => /* @__PURE__ */ jsx(PostCard, { post }, post.id)) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-24", children: [
        /* @__PURE__ */ jsx("div", { className: "mt-24", children: /* @__PURE__ */ jsx(AppPromoBanner$1, {}) }),
        /* @__PURE__ */ jsx("div", { className: "mt-16 max-w-4xl mx-auto text-center border-t border-white/5 pt-12", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
          /* @__PURE__ */ jsx("strong", { children: "Aviso legal:" }),
          " O conteúdo disponibilizado neste blog é apenas para fins informativos e educacionais. Embora busquemos manter as informações atualizadas, não nos responsabilizamos por eventuais divergências ou decisões tomadas com base nos artigos. Consulte sempre um profissional para orientações específicas ao seu caso."
        ] }) })
      ] })
    ] })
  ] });
};
const PostContent = ({ content }) => {
  const contentRef = React.useRef(null);
  React.useEffect(() => {
    if (!contentRef.current) return;
    const links = contentRef.current.getElementsByTagName("a");
    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      const href = link.getAttribute("href");
      if (href && (href.startsWith("/") || href.startsWith(window.location.origin))) {
        link.removeAttribute("target");
      }
    }
  }, [content]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: contentRef,
      className: "prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-primary prose-strong:text-white prose-code:text-primary prose-pre:bg-[#1a1a1a] prose-pre:border prose-pre:border-white/10",
      dangerouslySetInnerHTML: { __html: content }
    }
  );
};
const BlogPost = () => {
  var _a2, _b2, _c, _d, _e, _f, _g, _h, _i;
  const { category, slug } = useParams();
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
      "name": ((_a2 = post.author) == null ? void 0 : _a2.name) || "Junny Team",
      "url": (_b2 = post.author) == null ? void 0 : _b2.linkedin_url,
      "jobTitle": (_c = post.author) == null ? void 0 : _c.role
    },
    "publisher": {
      "@type": "Organization",
      "name": "Junny",
      "logo": {
        "@type": "ImageObject",
        "url": "https://junny.com.br/logo.png"
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
        canonical: `https://junny.com.br/blog/${((_d = post.category) == null ? void 0 : _d.slug) || "geral"}/${post.slug}`,
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
        ...post.category ? [{ label: post.category.name, href: `/blog/${post.category.slug}` }] : [],
        { label: post.title, href: `/blog/${((_e = post.category) == null ? void 0 : _e.slug) || "geral"}/${post.slug}` }
      ] }),
      /* @__PURE__ */ jsxs("header", { className: "mb-12 text-left", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-start justify-start gap-4 text-sm text-gray-400 mb-6", children: [
          post.category && /* @__PURE__ */ jsx("span", { className: "px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20", children: post.category.name }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" }),
              format(new Date(post.published_at), "d 'de' MMMM, yyyy", { locale: ptBR })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(BookOpen, { className: "w-4 h-4" }),
              post.reading_time || 5,
              " min de leitura"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-5xl font-bold text-white mb-6 leading-tight", children: post.title }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-300 max-w-2xl mr-auto leading-relaxed", children: post.excerpt }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-start gap-3 mt-8", children: [
          ((_f = post.author) == null ? void 0 : _f.avatar_url) && /* @__PURE__ */ jsx("img", { src: post.author.avatar_url, alt: post.author.name, className: "w-10 h-10 rounded-full border border-white/10" }),
          /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
            /* @__PURE__ */ jsx("p", { className: "text-white font-medium", children: (_g = post.author) == null ? void 0 : _g.name }),
            ((_h = post.author) == null ? void 0 : _h.role) && /* @__PURE__ */ jsx("p", { className: "text-xs text-primary mb-0.5", children: post.author.role }),
            ((_i = post.author) == null ? void 0 : _i.bio) && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: post.author.bio })
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
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 relative z-10", children: /* @__PURE__ */ jsx("div", { className: "mt-16 max-w-4xl mx-auto text-center border-t border-white/5 pt-12", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
      /* @__PURE__ */ jsx("strong", { children: "Aviso legal:" }),
      " O conteúdo disponibilizado neste blog é apenas para fins informativos e educacionais. Embora busquemos manter as informações atualizadas, não nos responsabilizamos por eventuais divergências ou decisões tomadas com base nos artigos. Consulte sempre um profissional para orientações específicas ao seu caso."
    ] }) }) })
  ] });
};
const NotFound = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen flex items-center justify-center overflow-hidden px-4", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Página não encontrada - Junny",
        description: "A página que você está procurando não existe ou foi movida.",
        canonical: "https://junny.com.br/404"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-center max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8 relative inline-block", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent opacity-20 select-none", children: "404" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-4xl md:text-5xl font-bold text-white", children: "Ops!" }) })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-white mb-4", children: "Página não encontrada" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg mb-10 max-w-md mx-auto", children: "Parece que você se perdeu no mundo das finanças. A página que você procura não existe ou foi movida." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/",
            className: "flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-background font-bold hover:bg-primary/90 transition-all hover:scale-105",
            children: [
              /* @__PURE__ */ jsx(Home$1, { className: "w-5 h-5" }),
              "Voltar para o Início"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => window.history.back(),
            className: "flex items-center gap-2 px-8 py-3 rounded-full bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 transition-all",
            children: [
              /* @__PURE__ */ jsx(ArrowLeft, { className: "w-5 h-5" }),
              "Voltar página anterior"
            ]
          }
        )
      ] })
    ] })
  ] });
};
const Terms = lazy(() => import("./assets/Terms-BQHgiGob.js").then((module) => ({ default: module.Terms })));
const Privacy = lazy(() => import("./assets/Privacy-zoKxadq7.js").then((module) => ({ default: module.Privacy })));
const Support = lazy(() => import("./assets/Support-D9DxTyiq.js").then((module) => ({ default: module.Support })));
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
        /* @__PURE__ */ jsx(Route, { path: "/calculadoras/tijolos-pisos", element: /* @__PURE__ */ jsx(TileBricksCalculatorPage, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/calculadoras/custo-viagem", element: /* @__PURE__ */ jsx(TravelCostCalculatorPage, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/calculadoras/imc", element: /* @__PURE__ */ jsx(IMCCalculatorPage, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/calculadoras/agua", element: /* @__PURE__ */ jsx(WaterIntakeCalculatorPage, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/calculadoras/conversor-culinario", element: /* @__PURE__ */ jsx(CulinaryConverterPage, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/calculadoras/idade-gestacional", element: /* @__PURE__ */ jsx(GestationalAgeCalculatorPage, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/calculadoras/amigo-secreto", element: /* @__PURE__ */ jsx(SecretSantaPage, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/calculadoras/gerador-pix", element: /* @__PURE__ */ jsx(PixGeneratorPage, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/blog", element: /* @__PURE__ */ jsx(BlogIndex, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/blog/:category/:slug", element: /* @__PURE__ */ jsx(BlogPost, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/blog/:categorySlug", element: /* @__PURE__ */ jsx(CategoryPage, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/stories/:storyId", element: /* @__PURE__ */ jsx(WebStoryPage, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/stories", element: /* @__PURE__ */ jsx(StoriesGallery, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/terms", element: /* @__PURE__ */ jsx(Terms, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/privacy", element: /* @__PURE__ */ jsx(Privacy, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/support", element: /* @__PURE__ */ jsx(Support, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) })
      ] }) }) }),
      /* @__PURE__ */ jsx(Footer, {}),
      /* @__PURE__ */ jsx(PromoPopup, {})
    ] })
  ] });
}
function render({ path, context = {}, initialData = null }) {
  const helmetContext = {};
  const html = ReactDOMServer.renderToString(
    /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(StaticRouter, { location: path, children: /* @__PURE__ */ jsx(HelmetProvider, { context: helmetContext, children: /* @__PURE__ */ jsx(ServerDataProvider, { value: initialData, children: /* @__PURE__ */ jsx(App, {}) }) }) }) })
  );
  return { html, helmetContext };
}
export {
  FAQ as F,
  SEO as S,
  render
};
//# sourceMappingURL=entry-server.js.map
