import assert from "node:assert/strict";
import test from "node:test";
import { getAdminAccess } from "./admin-auth";
const user = { userId: "site-scoped-user", email: "owner@example.com", displayName: "Owner", fullName: null };

test("owner authorization fails closed without an explicit runtime allowlist", () => {
  assert.equal(getAdminAccess(user, undefined).allowed, false);
  assert.equal(getAdminAccess(user, "").allowed, false);
  assert.equal(getAdminAccess(user, "*").allowed, false);
});

test("requires both platform identity and an exact permitted email", () => {
  assert.equal(getAdminAccess(null, "owner@example.com").allowed, false);
  assert.equal(getAdminAccess({ ...user, userId: "" }, "owner@example.com").allowed, false);
  assert.equal(getAdminAccess({ ...user, email: "owner@example.com.evil" }, "owner@example.com").allowed, false);
  assert.equal(getAdminAccess({ ...user, email: "visitor@example.com" }, "owner@example.com").allowed, false);
  assert.equal(getAdminAccess(user, " OWNER@EXAMPLE.COM ").allowed, true);
});
