module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/error.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/error.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/loading.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/loading.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/not-found.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/not-found.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/lib/mongodb.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const MONGODB_URI = ("TURBOPACK compile-time value", "mongodb+srv://Balujeswanth:Baluflix123@cluster0.hqqoxgl.mongodb.net/baluflix?retryWrites=true&w=majority") || "";
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
"[project]/src/models/Content.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/src/lib/content.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dynamic",
    ()=>dynamic,
    "getContent",
    ()=>getContent,
    "getContentById",
    ()=>getContentById
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mongodb.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/Content.ts [app-rsc] (ecmascript)");
;
;
const dynamic = "force-dynamic";
async function getContent() {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const content = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].find({}).sort({
            createdAt: -1
        }).lean();
        return JSON.parse(JSON.stringify(content));
    } catch (error) {
        console.error("Error fetching content:", error);
        return [];
    }
}
async function getContentById(id) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const content = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findById(id).lean();
        return content ? JSON.parse(JSON.stringify(content)) : null;
    } catch (error) {
        console.error("Error fetching content by id:", error);
        return null;
    }
}
}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/content.ts [app-rsc] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module './ClientHome'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
;
;
const getCachedContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getContent"]);
async function Home() {
    const allContent = await getCachedContent();
    const featuredContent = allContent.length > 0 ? allContent[0] : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(ClientHome, {
        allContent: allContent,
        featuredContent: featuredContent
    }, void 0, false, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6502d336._.js.map