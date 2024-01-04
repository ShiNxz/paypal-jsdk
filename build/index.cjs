"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/dotenv/package.json
var require_package = __commonJS({
  "node_modules/dotenv/package.json"(exports2, module2) {
    module2.exports = {
      name: "dotenv",
      version: "16.3.1",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          types: "./lib/main.d.ts",
          require: "./lib/main.js",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        "lint-readme": "standard-markdown",
        pretest: "npm run lint && npm run dts-check",
        test: "tap tests/*.js --100 -Rspec",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      funding: "https://github.com/motdotla/dotenv?sponsor=1",
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@definitelytyped/dtslint": "^0.0.133",
        "@types/node": "^18.11.3",
        decache: "^4.6.1",
        sinon: "^14.0.1",
        standard: "^17.0.0",
        "standard-markdown": "^7.1.0",
        "standard-version": "^9.5.0",
        tap: "^16.3.0",
        tar: "^6.1.11",
        typescript: "^4.8.4"
      },
      engines: {
        node: ">=12"
      },
      browser: {
        fs: false
      }
    };
  }
});

// node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/dotenv/lib/main.js"(exports2, module2) {
    "use strict";
    var fs = require("fs");
    var path = require("path");
    var os = require("os");
    var crypto = require("crypto");
    var packageJson = require_package();
    var version = packageJson.version;
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _parseVault(options) {
      const vaultPath = _vaultPath(options);
      const result = DotenvModule.configDotenv({ path: vaultPath });
      if (!result.parsed) {
        throw new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
      }
      const keys = _dotenvKey(options).split(",");
      const length = keys.length;
      let decrypted;
      for (let i = 0; i < length; i++) {
        try {
          const key = keys[i].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error) {
          if (i + 1 >= length) {
            throw error;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    function _log(message) {
      console.log(`[dotenv@${version}][INFO] ${message}`);
    }
    function _warn(message) {
      console.log(`[dotenv@${version}][WARN] ${message}`);
    }
    function _debug(message) {
      console.log(`[dotenv@${version}][DEBUG] ${message}`);
    }
    function _dotenvKey(options) {
      if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
        return options.DOTENV_KEY;
      }
      if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
        return process.env.DOTENV_KEY;
      }
      return "";
    }
    function _instructions(result, dotenvKey) {
      let uri;
      try {
        uri = new URL(dotenvKey);
      } catch (error) {
        if (error.code === "ERR_INVALID_URL") {
          throw new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenv.org/vault/.env.vault?environment=development");
        }
        throw error;
      }
      const key = uri.password;
      if (!key) {
        throw new Error("INVALID_DOTENV_KEY: Missing key part");
      }
      const environment = uri.searchParams.get("environment");
      if (!environment) {
        throw new Error("INVALID_DOTENV_KEY: Missing environment part");
      }
      const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
      const ciphertext = result.parsed[environmentKey];
      if (!ciphertext) {
        throw new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
      }
      return { ciphertext, key };
    }
    function _vaultPath(options) {
      let dotenvPath = path.resolve(process.cwd(), ".env");
      if (options && options.path && options.path.length > 0) {
        dotenvPath = options.path;
      }
      return dotenvPath.endsWith(".vault") ? dotenvPath : `${dotenvPath}.vault`;
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function _configVault(options) {
      _log("Loading env from encrypted .env.vault");
      const parsed = DotenvModule._parseVault(options);
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsed, options);
      return { parsed };
    }
    function configDotenv(options) {
      let dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug = Boolean(options && options.debug);
      if (options) {
        if (options.path != null) {
          dotenvPath = _resolveHome(options.path);
        }
        if (options.encoding != null) {
          encoding = options.encoding;
        }
      }
      try {
        const parsed = DotenvModule.parse(fs.readFileSync(dotenvPath, { encoding }));
        let processEnv = process.env;
        if (options && options.processEnv != null) {
          processEnv = options.processEnv;
        }
        DotenvModule.populate(processEnv, parsed, options);
        return { parsed };
      } catch (e) {
        if (debug) {
          _debug(`Failed to load ${dotenvPath} ${e.message}`);
        }
        return { error: e };
      }
    }
    function config2(options) {
      const vaultPath = _vaultPath(options);
      if (_dotenvKey(options).length === 0) {
        return DotenvModule.configDotenv(options);
      }
      if (!fs.existsSync(vaultPath)) {
        _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`);
        return DotenvModule.configDotenv(options);
      }
      return DotenvModule._configVault(options);
    }
    function decrypt(encrypted, keyStr) {
      const key = Buffer.from(keyStr.slice(-64), "hex");
      let ciphertext = Buffer.from(encrypted, "base64");
      const nonce = ciphertext.slice(0, 12);
      const authTag = ciphertext.slice(-16);
      ciphertext = ciphertext.slice(12, -16);
      try {
        const aesgcm = crypto.createDecipheriv("aes-256-gcm", key, nonce);
        aesgcm.setAuthTag(authTag);
        return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
      } catch (error) {
        const isRange = error instanceof RangeError;
        const invalidKeyLength = error.message === "Invalid key length";
        const decryptionFailed = error.message === "Unsupported state or unable to authenticate data";
        if (isRange || invalidKeyLength) {
          const msg = "INVALID_DOTENV_KEY: It must be 64 characters long (or more)";
          throw new Error(msg);
        } else if (decryptionFailed) {
          const msg = "DECRYPTION_FAILED: Please check your DOTENV_KEY";
          throw new Error(msg);
        } else {
          console.error("Error: ", error.code);
          console.error("Error: ", error.message);
          throw error;
        }
      }
    }
    function populate(processEnv, parsed, options = {}) {
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      if (typeof parsed !== "object") {
        throw new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
      }
      for (const key of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
          if (override === true) {
            processEnv[key] = parsed[key];
          }
          if (debug) {
            if (override === true) {
              _debug(`"${key}" is already defined and WAS overwritten`);
            } else {
              _debug(`"${key}" is already defined and was NOT overwritten`);
            }
          }
        } else {
          processEnv[key] = parsed[key];
        }
      }
    }
    var DotenvModule = {
      configDotenv,
      _configVault,
      _parseVault,
      config: config2,
      decrypt,
      parse,
      populate
    };
    module2.exports.configDotenv = DotenvModule.configDotenv;
    module2.exports._configVault = DotenvModule._configVault;
    module2.exports._parseVault = DotenvModule._parseVault;
    module2.exports.config = DotenvModule.config;
    module2.exports.decrypt = DotenvModule.decrypt;
    module2.exports.parse = DotenvModule.parse;
    module2.exports.populate = DotenvModule.populate;
    module2.exports = DotenvModule;
  }
});

// index.ts
var PaypalSubscriptionSDK_exports = {};
__export(PaypalSubscriptionSDK_exports, {
  ActivatePlan: () => ActivatePlan_default,
  ActivateSubscription: () => ActivateSubscription_default,
  AddTracking: () => AddTracking_default,
  CancelSubscription: () => CancelSubscription_default,
  CapturePayment: () => CapturePayment_default,
  CatalogProducts: () => CatalogProducts_default,
  Config: () => config_default,
  CreatePlan: () => CreatePlan_default,
  CreateProduct: () => CreateProduct_default,
  CreateSubscription: () => CreateSubscription_default,
  DeactivatePlan: () => DeactivatePlan_default,
  EditTracking: () => EditTracking_default,
  Init: () => Init_default,
  ListPlans: () => ListPlans_default,
  ListProducts: () => ListProducts_default,
  ListTransactions: () => ListTransactions_default,
  Payments: () => Payments_default,
  PaypalEventType: () => PaypalEventType,
  PlanDetails: () => PlanDetails_default,
  PlanStatus: () => PlanStatus,
  Plans: () => Plans_default,
  PricingSchemeModel: () => PricingSchemeModel,
  ProductDetails: () => ProductDetails_default,
  RevisePlan: () => RevisePlan_default,
  ShowAuthorizedPaymentDetails: () => ShowAuthorizedPaymentDetails_default,
  ShowSubscriptionDetails: () => ShowSubscriptionDetails_default,
  ShowTrackingInformation: () => ShowTracking_default,
  Subscriptions: () => Subscriptions_default,
  SuspendSubscription: () => SuspendSubscription_default,
  Tracking: () => Tracking_default,
  UpdatePlanPricing: () => UpdatePlanPricing_default,
  default: () => PaypalSubscriptionSDK_default
});
module.exports = __toCommonJS(PaypalSubscriptionSDK_exports);

// @types/plans.ts
var PlanStatus = /* @__PURE__ */ ((PlanStatus3) => {
  PlanStatus3["CREATED"] = "CREATED";
  PlanStatus3["INACTIVE"] = "INACTIVE";
  PlanStatus3["ACTIVE"] = "ACTIVE";
  return PlanStatus3;
})(PlanStatus || {});
var PricingSchemeModel = /* @__PURE__ */ ((PricingSchemeModel3) => {
  PricingSchemeModel3["VOLUME"] = "VOLUME";
  PricingSchemeModel3["TIERED"] = "TIERED";
  return PricingSchemeModel3;
})(PricingSchemeModel || {});

// @types/webhooks.ts
var PaypalEventType = /* @__PURE__ */ ((PaypalEventType2) => {
  PaypalEventType2["BILLING.SUBSCRIPTION.CREATED"] = "BILLING.SUBSCRIPTION.CREATED";
  PaypalEventType2["BILLING.SUBSCRIPTION.ACTIVATED"] = "BILLING.SUBSCRIPTION.ACTIVATED";
  PaypalEventType2["BILLING.SUBSCRIPTION.RE-ACTIVATED"] = "BILLING.SUBSCRIPTION.RE-ACTIVATED";
  PaypalEventType2["BILLING.SUBSCRIPTION.UPDATED"] = "BILLING.SUBSCRIPTION.UPDATED";
  PaypalEventType2["BILLING.SUBSCRIPTION.EXPIRED"] = "BILLING.SUBSCRIPTION.EXPIRED";
  PaypalEventType2["BILLING.SUBSCRIPTION.CANCELLED"] = "BILLING.SUBSCRIPTION.CANCELLED";
  PaypalEventType2["BILLING.SUBSCRIPTION.SUSPENDED"] = "BILLING.SUBSCRIPTION.SUSPENDED";
  PaypalEventType2["BILLING.SUBSCRIPTION.PAYMENT.FAILED"] = "BILLING.SUBSCRIPTION.PAYMENT.FAILED";
  PaypalEventType2["PAYMENT.SALE.COMPLETED"] = "PAYMENT.SALE.COMPLETED";
  return PaypalEventType2;
})(PaypalEventType || {});

// config.ts
var import_dotenv = __toESM(require_main(), 1);
import_dotenv.default.config();
var config = {
  clientId: process.env.PAYPAL_CLIENT_ID || "",
  clientSecret: process.env.PAYPAL_CLIENT_SECRET || "",
  mode: process.env.PAYPAL_MODE || "LIVE"
};
var config_default = config;

// Init.ts
var Init = (clientId, clientSecret, mode) => {
  config_default.clientId = clientId;
  config_default.clientSecret = clientSecret;
  config_default.mode = mode;
};
var Init_default = Init;

// schemas/Tracking.ts
var import_zod = require("zod");
var trackerSchema = import_zod.z.object({
  transaction_id: import_zod.z.string(),
  tracking_number: import_zod.z.string().optional(),
  carrier_name_other: import_zod.z.string().optional(),
  notify_buyer: import_zod.z.boolean().default(false),
  shipment_direction: import_zod.z.enum(["FORWARD", "RETURN"]),
  tracking_url: import_zod.z.string().optional(),
  tracking_number_type: import_zod.z.enum(["CARRIER_PROVIDED", "E2E_PARTNER_PROVIDED"]).optional(),
  status: import_zod.z.enum(["CANCELLED", "DELIVERED", "LOCAL_PICKUP", "ON_HOLD", "SHIPPED"]),
  shipment_date: import_zod.z.string().optional(),
  carrier: import_zod.z.string().optional(),
  last_updated_time: import_zod.z.string().optional()
});
var trackersSchema = import_zod.z.array(trackerSchema);

// utils/AccessToken.ts
var import_axios = __toESM(require("axios"), 1);
var baseURL = config_default.mode === "SANDBOX" ? "https://api-m.sandbox.paypal.com/" : "https://api-m.paypal.com/";
var GetPayPalAccessToken = async (version) => {
  try {
    const options = {
      url: baseURL + version + "/oauth2/token",
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Accept-Language": "en_US",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      auth: {
        username: config_default.clientId,
        password: config_default.clientSecret
      },
      params: {
        grant_type: "client_credentials"
      }
    };
    const { data } = await (0, import_axios.default)(options);
    return data.access_token;
  } catch (error) {
    console.log(error);
    return new Error("Error getting PayPal access token");
  }
};
var AccessToken_default = GetPayPalAccessToken;

// utils/Axios.ts
var import_axios2 = __toESM(require("axios"), 1);
var baseURL2 = config_default.mode === "SANDBOX" ? "https://api-m.sandbox.paypal.com" : "https://api-m.paypal.com";
var Paypal = import_axios2.default.create({
  baseURL: baseURL2 + "/v1",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});
var PaypalV2 = import_axios2.default.create({
  baseURL: baseURL2 + "/v2",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});
Paypal.interceptors.request.use(async (config2) => {
  try {
    const token = await AccessToken_default("v1");
    config2.headers.Authorization = `Bearer ${token}`;
    return config2;
  } catch (error) {
    console.log(error);
    return config2;
  }
});
PaypalV2.interceptors.request.use(async (config2) => {
  try {
    const token = await AccessToken_default("v1");
    console.log({ token });
    config2.headers.Authorization = `Bearer ${token}`;
    return config2;
  } catch (error) {
    console.log(error);
    return config2;
  }
});
var Axios_default = Paypal;

// functions/Tracking/AddTracking.ts
var AddTracking = async (trackers) => {
  try {
    const body = trackersSchema.parse(trackers);
    await Axios_default.post(`/shipping/trackers-batch`, body);
  } catch (error) {
    throw error;
  }
};
var AddTracking_default = AddTracking;

// functions/Tracking/EditTracking.ts
var EditTracking = async (trackerId, options) => {
  try {
    const body = trackerSchema.parse(options);
    await Axios_default.put(`/shipping/trackers/${trackerId}`, body);
  } catch (error) {
    throw error;
  }
};
var EditTracking_default = EditTracking;

// functions/Tracking/ShowTracking.ts
var ShowTrackingInformation = async (trackerId) => {
  try {
    const { data } = await Axios_default.get(`/shipping/get/${trackerId}`);
    return data;
  } catch (error) {
    throw error;
  }
};
var ShowTracking_default = ShowTrackingInformation;

// functions/Tracking/index.ts
var Tracking_default = {
  add: AddTracking_default,
  edit: EditTracking_default,
  showInformation: ShowTracking_default
};

// schemas/Products.ts
var import_zod2 = require("zod");
var productSchema = import_zod2.z.object({
  id: import_zod2.z.string().optional(),
  name: import_zod2.z.string(),
  description: import_zod2.z.string().optional(),
  type: import_zod2.z.enum(["PHYSICAL", "DIGITAL", "SERVICE"]),
  category: import_zod2.z.string().optional(),
  image_url: import_zod2.z.string().optional(),
  home_url: import_zod2.z.string().optional()
});

// functions/CatalogProducts/CreateProduct.ts
var CreateProduct = async (options) => {
  try {
    const product = productSchema.parse(options);
    const { data } = await Axios_default.post(`/catalogs/products`, product);
    return data;
  } catch (error) {
    throw error;
  }
};
var CreateProduct_default = CreateProduct;

// functions/CatalogProducts/ListProducts.ts
var ListProducts = async (query) => {
  try {
    const { data } = await Axios_default.get(`/catalogs/products`, {
      params: query
    });
    return data;
  } catch (error) {
    throw error;
  }
};
var ListProducts_default = ListProducts;

// functions/CatalogProducts/ProductDetails.ts
var ShowProductDetails = async (productId) => {
  try {
    const { data } = await Axios_default.get(`/catalogs/products/${productId}`);
    return data;
  } catch (error) {
    throw error;
  }
};
var ProductDetails_default = ShowProductDetails;

// functions/CatalogProducts/index.ts
var CatalogProducts_default = {
  create: CreateProduct_default,
  list: ListProducts_default,
  showDetails: ProductDetails_default
};

// functions/Plans/ActivatePlan.ts
var ActivatePlan = async (planId) => {
  try {
    return await Axios_default.post(`/billing/plans/${planId}/activate`);
  } catch (error) {
    throw error;
  }
};
var ActivatePlan_default = ActivatePlan;

// schemas/Plans.ts
var import_zod3 = require("zod");
var PlanStatus2 = import_zod3.z.enum(["CREATED", "INACTIVE", "ACTIVE"]);
var Frequency = import_zod3.z.object({
  interval_unit: import_zod3.z.enum(["DAY", "WEEK", "MONTH", "YEAR"]),
  interval_count: import_zod3.z.number().optional().default(1)
});
var AmountPrice = import_zod3.z.object({
  currency_code: import_zod3.z.string().length(3).regex(/[A-Z]{3}/),
  value: import_zod3.z.string()
});
var PricingSchemeTier = import_zod3.z.object({
  starting_quantity: import_zod3.z.string(),
  ending_quantity: import_zod3.z.string().optional(),
  price: AmountPrice
});
var PricingSchemeModel2 = import_zod3.z.enum(["VOLUME", "TIERED"]);
var PricingScheme = import_zod3.z.object({
  pricing_model: PricingSchemeModel2.optional(),
  tiers: import_zod3.z.array(PricingSchemeTier).optional(),
  fixed_price: AmountPrice.optional()
});
var PlanBillingCycle = import_zod3.z.object({
  tenure_type: import_zod3.z.enum(["REGULAR", "TRIAL"]),
  sequence: import_zod3.z.number(),
  total_cycles: import_zod3.z.number().optional().default(0),
  pricing_scheme: PricingScheme.optional(),
  frequency: Frequency
});
var SetupFeeFailureAction = import_zod3.z.enum(["CANCEL", "CONTINUE"]);
var PaymentPreferences = import_zod3.z.object({
  auto_bill_outstanding: import_zod3.z.boolean().optional().default(true),
  setup_fee_failure_action: SetupFeeFailureAction.optional(),
  payment_failure_threshold: import_zod3.z.number().default(0).optional(),
  setup_fee: AmountPrice.optional()
});
var PlanBody = import_zod3.z.object({
  product_id: import_zod3.z.string(),
  name: import_zod3.z.string(),
  status: PlanStatus2.optional(),
  description: import_zod3.z.string().optional(),
  billing_cycles: import_zod3.z.array(PlanBillingCycle),
  quantity_supported: import_zod3.z.boolean().optional().default(false),
  payment_preferences: PaymentPreferences.optional()
});
var PlansQuery = import_zod3.z.object({
  product_id: import_zod3.z.string().min(6).max(50).optional(),
  plan_ids: import_zod3.z.string().min(3).max(270).optional(),
  page_size: import_zod3.z.number().optional(),
  page: import_zod3.z.number().optional(),
  total_required: import_zod3.z.boolean().optional()
}).optional();

// functions/Plans/CreatePlan.ts
var CreatePlan = async (body) => {
  try {
    const { product_id, name, billing_cycles, payment_preferences, quantity_supported, description, status } = PlanBody.parse(body);
    const { data } = await Axios_default.post(`/billing/plans`, {
      product_id,
      name,
      billing_cycles,
      payment_preferences,
      quantity_supported,
      description,
      status
    });
    return data;
  } catch (error) {
    throw error;
  }
};
var CreatePlan_default = CreatePlan;

// functions/Plans/DeactivatePlan.ts
var DeactivatePlan = async (planId) => {
  try {
    return await Axios_default.post(`/billing/plans/${planId}/deactivate`);
  } catch (error) {
    throw error;
  }
};
var DeactivatePlan_default = DeactivatePlan;

// functions/Plans/ListPlans.ts
var ListPlans = async (query) => {
  try {
    const params = PlansQuery.parse(query);
    const { data } = await Axios_default.get(`/billing/plans`, {
      params
    });
    return data;
  } catch (error) {
    throw error;
  }
};
var ListPlans_default = ListPlans;

// functions/Plans/PlanDetails.ts
var PlanDetails = async (planId) => {
  try {
    const { data } = await Axios_default.get(`/billing/plans/${planId}`);
    return data;
  } catch (error) {
    throw error;
  }
};
var PlanDetails_default = PlanDetails;

// functions/Plans/UpdatePlanPricing.ts
var import_zod4 = require("zod");
var PricingSchemas = import_zod4.z.array(
  import_zod4.z.object({
    billing_cycle_sequence: import_zod4.z.number(),
    pricing_scheme: PricingScheme
  })
);
var UpdatePlanPricing = async (planId, newPricing) => {
  try {
    const pricing_schemes = PricingSchemas.parse(newPricing);
    const { data } = await Axios_default.post(`/billing/plans/${planId}/update-pricing-schemes`, {
      pricing_schemes
    });
    return data;
  } catch (error) {
    throw error;
  }
};
var UpdatePlanPricing_default = UpdatePlanPricing;

// functions/Plans/index.ts
var Plans_default = {
  active: ActivatePlan_default,
  create: CreatePlan_default,
  deactivate: DeactivatePlan_default,
  list: ListPlans_default,
  plan: PlanDetails_default,
  updatePricing: UpdatePlanPricing_default
};

// functions/Subscriptions/ActivateSubscription.ts
var ActivateSubscription = async (subId, reason) => {
  try {
    await Axios_default.post(`/billing/subscriptions/${subId}/activate`, {
      reason
    });
  } catch (error) {
    throw error;
  }
};
var ActivateSubscription_default = ActivateSubscription;

// functions/Subscriptions/CancelSubscription.ts
var CancelSubscription = async (subId, reason) => {
  try {
    await Axios_default.post(`/billing/subscriptions/${subId}/cancel`, {
      reason
    });
  } catch (error) {
    throw error;
  }
};
var CancelSubscription_default = CancelSubscription;

// schemas/Subscriptions.ts
var import_zod5 = require("zod");
var Name = import_zod5.z.object({
  given_name: import_zod5.z.string().optional(),
  surname: import_zod5.z.string().optional()
});
var Address = import_zod5.z.object({
  address_line_1: import_zod5.z.string().optional(),
  address_line_2: import_zod5.z.string().optional(),
  admin_area_2: import_zod5.z.string().optional(),
  admin_area_1: import_zod5.z.string().optional(),
  postal_code: import_zod5.z.string().optional(),
  country_code: import_zod5.z.string().optional()
});
var Card = import_zod5.z.object({
  name: import_zod5.z.string().optional(),
  number: import_zod5.z.string(),
  security_code: import_zod5.z.string().optional(),
  expiry: import_zod5.z.string(),
  billing_address: Address.optional()
});
var Taxes = import_zod5.z.object({
  inclusive: import_zod5.z.boolean().optional().default(true),
  percentage: import_zod5.z.string()
});
var CreateSubscriptionBody = import_zod5.z.object({
  quantity: import_zod5.z.string().optional(),
  auto_renewal: import_zod5.z.boolean().optional(),
  custom_id: import_zod5.z.string().optional(),
  start_time: import_zod5.z.string().optional(),
  shipping_amount: AmountPrice.optional(),
  subscriber: import_zod5.z.object({
    email_address: import_zod5.z.string().optional(),
    name: Name.optional()
  }).optional(),
  phone: import_zod5.z.object({
    phone_type: import_zod5.z.enum(["FAX", "HOME", "MOBILE", "OTHER", "PAGER"]).optional(),
    phone_number: import_zod5.z.object({
      national_number: import_zod5.z.string()
    })
  }).optional(),
  shipping_address: import_zod5.z.object({
    type: import_zod5.z.enum(["SHIPPING", "PICKUP_IN_PERSON"]).optional(),
    name: Name.optional(),
    address: Address.optional(),
    payment_source: import_zod5.z.object({
      card: Card.optional()
    }).optional()
  }).optional(),
  application_context: import_zod5.z.object({
    brand_name: import_zod5.z.string().optional(),
    shipping_preference: import_zod5.z.enum(["GET_FROM_FILE", "NO_SHIPPING", "SET_PROVIDED_ADDRESS"]).optional(),
    user_action: import_zod5.z.enum(["CONTINUE", "SUBSCRIBE_NOW"]).optional(),
    return_url: import_zod5.z.string(),
    cancel_url: import_zod5.z.string(),
    locale: import_zod5.z.string().optional(),
    payment_method: import_zod5.z.object({
      payer_selected: import_zod5.z.string().optional(),
      payee_preferred: import_zod5.z.enum(["UNRESTRICTED", "IMMEDIATE_PAYMENT_REQUIRED"]).optional()
    }).optional()
  }).optional(),
  plan: import_zod5.z.object({
    billing_cycles: PlanBillingCycle,
    payment_preferences: PaymentPreferences,
    taxes: Taxes
  }).optional()
});
var CapturePaymentBody = import_zod5.z.object({
  notes: import_zod5.z.string(),
  capture_type: import_zod5.z.literal("OUTSTANDING_BALANCE"),
  amount: AmountPrice
});

// functions/Subscriptions/CapturePayment.ts
var CapturePayment = async (subId, options) => {
  try {
    const body = CapturePaymentBody.parse(options);
    await Axios_default.post(`/billing/subscriptions/${subId}/capture`, body);
  } catch (error) {
    throw error;
  }
};
var CapturePayment_default = CapturePayment;

// functions/Subscriptions/CreateSubscription.ts
var CreateSubscription = async (plan_id, options) => {
  try {
    const body = CreateSubscriptionBody.parse(options ?? {});
    const { data } = await Axios_default.post(`/billing/subscriptions`, {
      plan_id,
      ...body
    });
    const paymentUrl = data.links ? data.links.find((link) => link.rel === "approve")?.href || null : null;
    return { ...data, paymentUrl };
  } catch (error) {
    throw error;
  }
};
var CreateSubscription_default = CreateSubscription;

// functions/Subscriptions/ListTransactions.ts
var ListTransactions = async (subId, params) => {
  try {
    const res = await Axios_default.get(`/billing/subscriptions/${subId}/transactions`, {
      params
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
var ListTransactions_default = ListTransactions;

// functions/Subscriptions/RevisePlan.ts
var RevisePlan = async (subId, options) => {
  try {
    const body = CreateSubscriptionBody.parse(options ?? {});
    const { data } = await Axios_default.post(`/billing/subscriptions/${subId}/revise`, body);
    return data;
  } catch (error) {
    throw error;
  }
};
var RevisePlan_default = RevisePlan;

// functions/Subscriptions/ShowSubscriptionDetails.ts
var ShowSubscriptionDetails = async (subId, params) => {
  try {
    const { data } = await Axios_default.get(`/billing/subscriptions/${subId}`, {
      params
    });
    return data;
  } catch (error) {
    throw error;
  }
};
var ShowSubscriptionDetails_default = ShowSubscriptionDetails;

// functions/Subscriptions/SuspendSubscription.ts
var SuspendSubscription = async (subId, reason) => {
  try {
    await Axios_default.post(`/billing/subscriptions/${subId}/suspend`, {
      reason
    });
  } catch (error) {
    throw error;
  }
};
var SuspendSubscription_default = SuspendSubscription;

// functions/Subscriptions/index.ts
var Subscriptions_default = {
  activate: ActivateSubscription_default,
  cancel: CancelSubscription_default,
  capturePayment: CapturePayment_default,
  create: CreateSubscription_default,
  listTransactions: ListTransactions_default,
  revisePlan: RevisePlan_default,
  show: ShowSubscriptionDetails_default,
  suspend: SuspendSubscription_default
};

// functions/Payments/ShowAuthorizedPaymentDetails.ts
var ShowAuthorizedPaymentDetails = async (authorizationId) => {
  try {
    const { data } = await PaypalV2.get(`/payments/authorizations/${authorizationId}`);
    return data;
  } catch (error) {
    throw error;
  }
};
var ShowAuthorizedPaymentDetails_default = ShowAuthorizedPaymentDetails;

// functions/Payments/index.ts
var Payments_default = {
  showAuthorizedDetails: ShowAuthorizedPaymentDetails_default
};

// index.ts
var PaypalSubscriptionSDK_default = {
  config: config_default,
  init: Init_default,
  tracking: Tracking_default,
  catalogProducts: CatalogProducts_default,
  plans: Plans_default,
  subscriptions: Subscriptions_default,
  payments: Payments_default
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ActivatePlan,
  ActivateSubscription,
  AddTracking,
  CancelSubscription,
  CapturePayment,
  CatalogProducts,
  Config,
  CreatePlan,
  CreateProduct,
  CreateSubscription,
  DeactivatePlan,
  EditTracking,
  Init,
  ListPlans,
  ListProducts,
  ListTransactions,
  Payments,
  PaypalEventType,
  PlanDetails,
  PlanStatus,
  Plans,
  PricingSchemeModel,
  ProductDetails,
  RevisePlan,
  ShowAuthorizedPaymentDetails,
  ShowSubscriptionDetails,
  ShowTrackingInformation,
  Subscriptions,
  SuspendSubscription,
  Tracking,
  UpdatePlanPricing
});
//# sourceMappingURL=index.cjs.map