module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/mongodb.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const MONGODB_URI = ("TURBOPACK compile-time value", "mongodb+srv://Balujeswanth:Baluflix123@cluster0.hqqoxgl.mongodb.net/Teluguone?retryWrites=true&w=majority") || "";
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
let cached = global.mongooseCache || {
    conn: null,
    promise: null
};
if (!global.mongooseCache) {
    global.mongooseCache = cached;
}
async function connectDB() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        };
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].connect(MONGODB_URI, opts).then((mongoose)=>{
            console.log("MongoDB connected successfully");
            return mongoose;
        }).catch((err)=>{
            console.error("MongoDB connection error:", err);
            throw err;
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        console.error("Failed to connect to MongoDB:", e);
        throw e;
    }
    return cached.conn;
}
const __TURBOPACK__default__export__ = connectDB;
}),
"[project]/src/models/Content.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const EpisodeSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    episodeNumber: {
        type: Number,
        default: 1
    },
    episodeTitle: {
        type: String,
        default: ""
    },
    watchLink: {
        type: String,
        default: ""
    },
    downloadLink: {
        type: String,
        default: ""
    },
    quality: {
        type: String,
        default: "720p"
    }
}, {
    _id: false
});
const SeasonSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    seasonNumber: {
        type: Number,
        required: true
    },
    episodes: {
        type: [
            EpisodeSchema
        ],
        default: []
    }
}, {
    _id: false
});
const ContentSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    type: {
        type: String,
        required: true,
        enum: [
            "movie",
            "series"
        ]
    },
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    poster: {
        type: String,
        required: true
    },
    banner: {
        type: String
    },
    description: {
        type: String
    },
    year: {
        type: String
    },
    language: {
        type: String
    },
    category: {
        type: String
    },
    genre: {
        type: String
    },
    quality: {
        type: String
    },
    rating: {
        type: Number
    },
    tags: {
        type: [
            String
        ],
        default: []
    },
    watchLink: {
        type: String
    },
    downloadLink: {
        type: String
    },
    seasons: {
        type: [
            SeasonSchema
        ],
        default: []
    }
}, {
    timestamps: true
});
const Content = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.Content || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model("Content", ContentSchema);
const __TURBOPACK__default__export__ = Content;
}),
"[project]/src/app/api/content/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "OPTIONS",
    ()=>OPTIONS,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mongodb.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Content$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/Content.ts [app-route] (ecmascript)");
;
;
;
const generateSlug = (title)=>{
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + Date.now().toString(36);
};
// Helper function for API responses
const createResponse = (data, status = 200)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data, {
        status,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, x-admin-key'
        }
    });
};
async function OPTIONS() {
    return createResponse({}, 204);
}
async function GET(request) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const { searchParams } = new URL(request.url);
        const type = searchParams.get("type");
        const category = searchParams.get("category");
        const language = searchParams.get("language");
        const search = searchParams.get("search");
        let query = {};
        if (type && type !== "all") {
            query.type = type;
        }
        if (category) {
            query.category = category;
        }
        if (language) {
            query.language = language;
        }
        if (search) {
            query.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    description: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    tags: {
                        $in: [
                            new RegExp(search, "i")
                        ]
                    }
                }
            ];
        }
        const content = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Content$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find(query).sort({
            createdAt: -1
        });
        return createResponse({
            success: true,
            data: content
        }, 200);
    } catch (error) {
        console.error("Error fetching content:", error);
        return createResponse({
            success: false,
            error: "Failed to fetch content"
        }, 500);
    }
}
async function POST(request) {
    let adminKey = null;
    try {
        adminKey = request.headers.get("x-admin-key");
        console.log("POST /api/content - Admin key present:", !!adminKey);
        if (adminKey !== ("TURBOPACK compile-time value", "123")) {
            console.log("Invalid admin key. Expected:", ("TURBOPACK compile-time value", "123"), "Got:", adminKey);
            return createResponse({
                success: false,
                error: "Unauthorized - Invalid admin key"
            }, 401);
        }
        console.log("Connecting to DB...");
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        console.log("DB Connected");
        const body = await request.json();
        console.log("Request body:", JSON.stringify(body).substring(0, 200));
        if (!body.title || !body.poster) {
            return createResponse({
                success: false,
                error: "Title and poster are required"
            }, 400);
        }
        if (!body.slug) {
            body.slug = generateSlug(body.title);
        }
        console.log("Creating content with slug:", body.slug);
        const content = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Content$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].create(body);
        console.log("Content created with ID:", content._id);
        return createResponse({
            success: true,
            data: content,
            message: "Content created successfully"
        }, 201);
    } catch (error) {
        console.error("Full error:", error);
        console.error("Error stack:", error.stack);
        return createResponse({
            success: false,
            error: error.message || "Failed to create content"
        }, 500);
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__75c0e861._.js.map