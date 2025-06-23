import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { bstoast } from "./bstoast.js";
import { JSDOM } from "jsdom";

// Set up DOM environment
const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
  url: "http://localhost/",
  pretendToBeVisual: true,
  runScripts: "dangerously",
});

// Set up global window and document
global.window = dom.window;
global.document = dom.window.document;
global.HTMLElement = dom.window.HTMLElement;
global.Element = dom.window.Element;
global.Node = dom.window.Node;

describe("bstoast", () => {
  beforeEach(() => {
    // Reset DOM before each test
    document.body.innerHTML = "";

    // Mock Bootstrap
    window.bootstrap = {
      Toast: vi.fn().mockImplementation(() => ({
        show: vi.fn(),
      })),
    };

    // Reset module state by re-importing
    vi.resetModules();
    require("./bstoast.js");
  });

  afterEach(() => {
    // Clean up after each test
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  const waitForToast = async (maxAttempts = 20) => {
    for (let i = 0; i < maxAttempts; i++) {
      const container = document.querySelector(".toast-container");
      if (container) {
        return container;
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    throw new Error("Toast container not found after multiple attempts");
  };

  it("should create a basic toast with default options", async () => {
    bstoast({ body: "Test message" });
    const container = await waitForToast();

    expect(container.className).toBe("toast-container position-fixed top-0 end-0 p-3");

    const toast = container.querySelector(".toast");
    expect(toast).toBeTruthy();
    expect(toast.innerHTML).toContain("Alert");
    expect(toast.innerHTML).toContain("Test message");
    expect(toast.innerHTML).toContain("text-bg-primary");
  });

  it("should accept string as body parameter", async () => {
    bstoast("Simple message");
    const container = await waitForToast();

    const toast = container.querySelector(".toast");
    expect(toast).toBeTruthy();
    expect(toast.innerHTML).toContain("Simple message");
  });

  it("should handle different positions", async () => {
    bstoast({ body: "Test", position: "bottom-0 start-0" });
    const container = await waitForToast();

    expect(container.className).toContain("bottom-0 start-0");
  });

  it("should handle different colors", async () => {
    bstoast({ body: "Test", color: "success" });
    const container = await waitForToast();

    const toast = container.querySelector(".toast");
    expect(toast).toBeTruthy();
    expect(toast.innerHTML).toContain("text-bg-success");
  });

  it("should handle custom icons", async () => {
    bstoast({ body: "Test", icon: "check-circle" });
    const container = await waitForToast();

    const toast = container.querySelector(".toast");
    expect(toast).toBeTruthy();
    expect(toast.innerHTML).toContain("bi-check-circle");
  });

  it("should handle custom timeout", () => {
    bstoast({ body: "Test", timeout: 10000 });

    expect(window.bootstrap.Toast).toHaveBeenCalledWith(
      expect.any(HTMLElement),
      expect.objectContaining({ delay: 10000 }),
    );
  });

  it("should handle HTML escaping", async () => {
    bstoast({ body: '<script>alert("xss")</script>' });
    const container = await waitForToast();

    const toast = container.querySelector(".toast");
    expect(toast).toBeTruthy();
    const toastBody = toast.querySelector(".toast-body");
    expect(toastBody.innerHTML).toBe('&lt;script&gt;alert("xss")&lt;/script&gt;');
  });

  it("should throw error when body is missing", () => {
    expect(() => bstoast({})).toThrow("bstoast: body is required");
  });

  it("should throw error when Bootstrap is not available", () => {
    delete window.bootstrap;
    expect(() => bstoast({ body: "Test" })).toThrow("bstoast: Bootstrap 5 is required");
  });

  it("should clear container when append is false", async () => {
    bstoast({ body: "First toast" });
    await waitForToast();

    bstoast({ body: "Second toast", append: false });
    const container = await waitForToast();

    const toasts = container.querySelectorAll(".toast");
    expect(toasts.length).toBe(1);
    expect(toasts[0].innerHTML).toContain("Second toast");
  });
});
