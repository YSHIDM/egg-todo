/*
 Navicat Premium Data Transfer

 Source Server         : local-docker_l
 Source Server Type    : PostgreSQL
 Source Server Version : 120004
 Source Host           : localhost:5435
 Source Catalog        : test
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 120004
 File Encoding         : 65001

 Date: 12/03/2021 21:21:56
*/


-- ----------------------------
-- Sequence structure for cities_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."cities_id_seq";
CREATE SEQUENCE "public"."cities_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."cities_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Table structure for cities
-- ----------------------------
DROP TABLE IF EXISTS "public"."cities";
CREATE TABLE "public"."cities" (
  "id" int4 NOT NULL DEFAULT nextval('cities_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "population" int4
)
;
ALTER TABLE "public"."cities" OWNER TO "postgres";

-- ----------------------------
-- Records of cities
-- ----------------------------
BEGIN;
INSERT INTO "public"."cities" VALUES (1, 'Bratislava', 432000);
INSERT INTO "public"."cities" VALUES (2, 'Budapest', 1759000);
INSERT INTO "public"."cities" VALUES (3, 'Prague', 1280000);
INSERT INTO "public"."cities" VALUES (4, 'Warsaw', 1748000);
INSERT INTO "public"."cities" VALUES (5, 'Los Angeles', 3971000);
INSERT INTO "public"."cities" VALUES (6, 'New York', 8550000);
INSERT INTO "public"."cities" VALUES (7, 'Edinburgh', 464000);
INSERT INTO "public"."cities" VALUES (8, 'Berlin', 3671000);
COMMIT;

-- ----------------------------
-- Table structure for image_store
-- ----------------------------
DROP TABLE IF EXISTS "public"."image_store";
CREATE TABLE "public"."image_store" (
  "id" varchar(20) COLLATE "pg_catalog"."default" NOT NULL,
  "foreign_key" varchar(20) COLLATE "pg_catalog"."default" NOT NULL,
  "source_type" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "filename" varchar(50) COLLATE "pg_catalog"."default",
  "space_size" int4,
  "url" varchar(255) COLLATE "pg_catalog"."default",
  "path" varchar(255) COLLATE "pg_catalog"."default",
  "creator" varchar(50) COLLATE "pg_catalog"."default",
  "created_at" time(6),
  "modifier" varchar(50) COLLATE "pg_catalog"."default",
  "updated_at" time(6)
)
;
ALTER TABLE "public"."image_store" OWNER TO "postgres";

-- ----------------------------
-- Records of image_store
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for json_test
-- ----------------------------
DROP TABLE IF EXISTS "public"."json_test";
CREATE TABLE "public"."json_test" (
  "id" varchar(20) COLLATE "pg_catalog"."default" NOT NULL,
  "str_arr" json,
  "obj_arr" json,
  "obj_obj" json,
  "obj" json,
  "creator" varchar(50) COLLATE "pg_catalog"."default",
  "created_at" time(6),
  "modifier" varchar(50) COLLATE "pg_catalog"."default",
  "updated_at" time(6)
)
;
ALTER TABLE "public"."json_test" OWNER TO "postgres";

-- ----------------------------
-- Records of json_test
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for route
-- ----------------------------
DROP TABLE IF EXISTS "public"."route";
CREATE TABLE "public"."route" (
  "id" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "line" line,
  "user_id" int4,
  "created_at" varchar(255) COLLATE "pg_catalog"."default",
  "updated_at" date,
  "box" box,
  "circle" circle,
  "lseg" lseg,
  "path" path,
  "point" point,
  "polygon" polygon
)
;
ALTER TABLE "public"."route" OWNER TO "postgres";

-- ----------------------------
-- Records of route
-- ----------------------------
BEGIN;
INSERT INTO "public"."route" VALUES ('123', '{0.10000000000000142,-1,23.599999999999838}', 1, '2019-01-01', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."route" VALUES ('122', '{1,-1,0}', 1, '2019-01-01', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."route" VALUES ('121', '{2,-1,0}', 1, '2019-01-01', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for schedule_record
-- ----------------------------
DROP TABLE IF EXISTS "public"."schedule_record";
CREATE TABLE "public"."schedule_record" (
  "id" varchar(25) COLLATE "pg_catalog"."default" NOT NULL,
  "source_id" varchar(25) COLLATE "pg_catalog"."default",
  "type" varchar(50) COLLATE "pg_catalog"."default",
  "time_offsets" json,
  "cron" json,
  "receiver" json,
  "state" int4,
  "desc" varchar(50) COLLATE "pg_catalog"."default",
  "creator" varchar(50) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6),
  "modifier" varchar(50) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6)
)
;
ALTER TABLE "public"."schedule_record" OWNER TO "postgres";
COMMENT ON COLUMN "public"."schedule_record"."id" IS '主键';
COMMENT ON COLUMN "public"."schedule_record"."source_id" IS '定时器记录来源id';
COMMENT ON COLUMN "public"."schedule_record"."type" IS '定时器类型';
COMMENT ON COLUMN "public"."schedule_record"."time_offsets" IS '提醒时间偏移时间，形如：[{"unit":"days","num":1,"state":1}]';
COMMENT ON COLUMN "public"."schedule_record"."cron" IS '提醒时间，字符串数组，形如：["0","9","30","*","*","*"]';
COMMENT ON COLUMN "public"."schedule_record"."receiver" IS '消息接收人';
COMMENT ON COLUMN "public"."schedule_record"."state" IS '状态; 1:开启, 0: 关闭; 默认值为 1';
COMMENT ON COLUMN "public"."schedule_record"."desc" IS '定时器描述';
COMMENT ON COLUMN "public"."schedule_record"."creator" IS '创建人';
COMMENT ON COLUMN "public"."schedule_record"."created_at" IS '创建时间';
COMMENT ON COLUMN "public"."schedule_record"."modifier" IS '修改人';
COMMENT ON COLUMN "public"."schedule_record"."updated_at" IS '修改时间';

-- ----------------------------
-- Records of schedule_record
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for todo
-- ----------------------------
DROP TABLE IF EXISTS "public"."todo";
CREATE TABLE "public"."todo" (
  "id" varchar(32) COLLATE "pg_catalog"."default" NOT NULL,
  "title" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "content" varchar(100) COLLATE "pg_catalog"."default",
  "node" varchar(10) COLLATE "pg_catalog"."default" NOT NULL,
  "is_archive" bool NOT NULL,
  "is_close" bool NOT NULL,
  "creator" varchar(50) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "modifier" varchar(50) COLLATE "pg_catalog"."default",
  "updated_at" timestamp(6),
  "history" jsonb
)
;
ALTER TABLE "public"."todo" OWNER TO "postgres";

-- ----------------------------
-- Records of todo
-- ----------------------------
BEGIN;
INSERT INTO "public"."todo" VALUES ('TODOtssFGkKVFm', '一段文字', '以上这些聚合函数中，可以通过options.attributes、options.attributes属性指定分组相关字段', 'done', 't', 'f', NULL, '2020-12-24 17:12:03.869', NULL, '2020-12-30 12:00:24.918', '[{"node": "planning", "time": "2020-12-24T09:12:03.868Z"}, {"node": "inProgress", "time": "2020-12-24T09:16:55.012Z"}]');
INSERT INTO "public"."todo" VALUES ('TODOdnLeoJJUz', '测试一', '测试 123', 'planning', 'f', 't', NULL, '2020-12-30 14:13:04.92', NULL, '2020-12-30 16:52:57.705', '[{"node": "planning", "time": "2020-12-30T06:13:04.919Z"}]');
INSERT INTO "public"."todo" VALUES ('216969987dc34ecdb9a110fc73c07e97', '测试', '内容', 'planning', 'f', 'f', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('c9aadd560fba4fc6aa1a317387860c8d', '测试', '内容', 'planning', 'f', 'f', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('f6346ca7fd12496aa50f1723d0fc3622', '测试', '内容', 'planning', 'f', 'f', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('499f7a11194b46d282b88b0c304b25ec', '测试', '内容', 'planning', 'f', 'f', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('6dfe591c0f854cbda137280b2a06e14b', '测试', '内容', 'planning', 'f', 'f', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('TODO3TZ428AXm', '步骤条', '用于展示操作流程的各个环节，让用户了解当前的操作在整体流程中的位置。', 'planning', 'f', 'f', NULL, '2020-12-30 13:53:43.294', NULL, '2020-12-30 13:53:43.294', '[{"node": "todo", "time": "2020-12-30T05:53:43.282Z"}]');
INSERT INTO "public"."todo" VALUES ('21002d86f7cb4c63bb426e29dab4c4a8', '测试', '内容', 'planning', 'f', 'f', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('1f224723f4004f1f84b4d4751493d5c2', '测试', '内容', 'planning', 'f', 'f', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('TODOd_0OzNR5-', 'vue', '以上这些聚合函数中，可以通过options.attributes、options.attributes属性指定分组相关字段', 'planning', 'f', 'f', NULL, '2020-12-30 14:17:40.733', NULL, '2020-12-30 14:28:08.027', '[{"node": "planning", "time": "2020-12-30T06:17:40.733Z"}]');
INSERT INTO "public"."todo" VALUES ('TODOJ3ndEWn5H6', '咨询', '周六咨询', 'inProgress', 'f', 'f', NULL, '2020-12-25 11:32:27.703', NULL, '2020-12-30 15:20:35.417', '[{"node": "planning", "time": "2020-12-25T03:32:27.703Z"}, {"node": "inProgress", "time": "2020-12-30T07:20:35.417Z"}]');
INSERT INTO "public"."todo" VALUES ('8f1f675f79804e4493b95eb97c7c5103', '测试', '内容', 'planning', 'f', 'f', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('50ecba6042a146bc9389ab057f64d9a4', '测试', '内容', 'planning', 'f', 'f', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('c879604ea8874d82a8db57471733f40e', '测试', '内容', 'planning', 'f', 'f', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('TODOWovQqtBbVd', '测试一', '测试二', 'done', 't', 'f', NULL, '2020-12-25 15:23:53.453', NULL, '2020-12-30 15:21:09.482', '[{"node": "planning", "time": "2020-12-25T07:23:53.453Z"}, {"node": "inProgress", "time": "2020-12-28T08:00:48.224Z"}, {"node": "testing", "time": "2020-12-30T07:20:45.340Z"}, {"node": "done", "time": "2020-12-30T07:21:06.041Z"}]');
INSERT INTO "public"."todo" VALUES ('TODOF3RCTnjMKn', '测试', '测试', 'done', 't', 'f', NULL, '2020-12-25 15:07:10.721', NULL, '2020-12-30 15:21:11.759', '[{"node": "planning", "time": "2020-12-25T07:07:10.721Z"}, {"node": "testing", "time": "2020-12-30T05:46:51.013Z"}, {"node": "done", "time": "2020-12-30T05:47:02.891Z"}]');
COMMIT;

-- ----------------------------
-- Table structure for todo_node
-- ----------------------------
DROP TABLE IF EXISTS "public"."todo_node";
CREATE TABLE "public"."todo_node" (
  "id" varchar(20) COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "title" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "alias" varchar(10) COLLATE "pg_catalog"."default",
  "creator" varchar(50) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "modifier" varchar(50) COLLATE "pg_catalog"."default",
  "updated_at" timestamp(6),
  "sort" int2 NOT NULL
)
;
ALTER TABLE "public"."todo_node" OWNER TO "postgres";

-- ----------------------------
-- Records of todo_node
-- ----------------------------
BEGIN;
INSERT INTO "public"."todo_node" VALUES ('TONO4tIDXRDZza', 'planning', '待办', '计划', NULL, '2021-02-23 10:36:56.798', NULL, '2021-02-23 10:36:56.798', 0);
INSERT INTO "public"."todo_node" VALUES ('TONOy1Dde8btfog', 'inProgress', '进行中', '进行', NULL, '2021-02-23 10:36:56.798', NULL, '2021-02-23 10:36:56.798', 1);
INSERT INTO "public"."todo_node" VALUES ('TONOSnc---Ah6nc', 'testing', '测试中', '测试', NULL, '2021-02-23 10:36:56.798', NULL, '2021-02-23 10:36:56.798', 2);
INSERT INTO "public"."todo_node" VALUES ('TONOWiIlo22Gq3x', 'done', '已完成', '完成', NULL, '2021-02-23 10:36:56.798', NULL, '2021-02-23 10:36:56.798', 3);
COMMIT;

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."cities_id_seq"
OWNED BY "public"."cities"."id";
SELECT setval('"public"."cities_id_seq"', 9, true);

-- ----------------------------
-- Primary Key structure for table cities
-- ----------------------------
ALTER TABLE "public"."cities" ADD CONSTRAINT "cities_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table image_store
-- ----------------------------
ALTER TABLE "public"."image_store" ADD CONSTRAINT "image_store_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table json_test
-- ----------------------------
ALTER TABLE "public"."json_test" ADD CONSTRAINT "json_test_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table route
-- ----------------------------
ALTER TABLE "public"."route" ADD CONSTRAINT "route_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table schedule_record
-- ----------------------------
ALTER TABLE "public"."schedule_record" ADD CONSTRAINT "schedule_record_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table todo
-- ----------------------------
ALTER TABLE "public"."todo" ADD CONSTRAINT "todo_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table todo_node
-- ----------------------------
ALTER TABLE "public"."todo_node" ADD CONSTRAINT "todo_Node_pkey" PRIMARY KEY ("id");
