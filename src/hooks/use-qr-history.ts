"use client";

import { useState, useEffect, useCallback } from "react";
import { QRCodeOptions } from "@/types/qr";

export interface QRHistoryItem {
  id: string;
  text: string;
  options: QRCodeOptions;
  createdAt: Date;
  dataUrl?: string;
}

const STORAGE_KEY = "airqr-history";
const MAX_HISTORY_ITEMS = 50;

export function useQRHistory() {
  const [history, setHistory] = useState<QRHistoryItem[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Convert date strings back to Date objects
        const historyWithDates = parsed.map(
          (item: Omit<QRHistoryItem, "createdAt"> & { createdAt: string }) => ({
            ...item,
            createdAt: new Date(item.createdAt),
          })
        );
        setHistory(historyWithDates);
      }
    } catch (error) {
      console.error("Failed to load QR history:", error);
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error("Failed to save QR history:", error);
    }
  }, [history]);

  const addToHistory = useCallback(
    (options: QRCodeOptions, dataUrl?: string) => {
      const newItem: QRHistoryItem = {
        id: `qr-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        text: options.text,
        options: { ...options },
        createdAt: new Date(),
        dataUrl,
      };

      setHistory((prev) => {
        // Remove duplicates (same text and size)
        const filtered = prev.filter(
          (item) =>
            !(item.text === options.text && item.options.size === options.size)
        );

        // Add new item to the beginning and limit to MAX_HISTORY_ITEMS
        return [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
      });

      return newItem.id;
    },
    []
  );

  const removeFromHistory = useCallback((id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const getHistoryItem = (id: string) => {
    return history.find((item) => item.id === id);
  };

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
    getHistoryItem,
  };
}
