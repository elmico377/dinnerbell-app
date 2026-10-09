"use client";

import Link from "next/link";
import { useState } from "react";
import { recipes } from "@/lib/recipes";

export default function RecipeSearchPage() {
  const [query, setQuery] = useState("");
  const keywords = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const matchingRecipes = recipes.filter((recipe) => {
    const searchableText = [
      recipe.name,
      recipe.description,
      recipe.category,
      ...recipe.ingredients,
    ]
      .join(" ")
      .toLowerCase();

    return keywords.every((keyword) => searchableText.includes(keyword));
  });

  return (
    <main className="min-h-screen bg-[#f8f6f0] px-5 py-8 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
          href="/"
        >
          <span aria-hidden="true">←</span> Dinnerbell
        </Link>

        <header className="mx-auto mt-16 max-w-2xl text-center sm:mt-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
            Dinner inspiration
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            What sounds good?
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Search by dish, ingredient, or craving to find your next meal.
          </p>

          <label className="mt-8 flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 shadow-sm transition focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/20 dark:border-zinc-700 dark:bg-zinc-900">
            <svg
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="11" cy="11" r="7" />
              <path strokeLinecap="round" d="m16 16 4 4" />
            </svg>
            <input
              className="h-14 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-zinc-400"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try “chicken”, “lemon”, or “quick”"
              type="search"
              value={query}
            />
            {query && (
              <button
                aria-label="Clear search"
                className="rounded-full px-2 py-1 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
                onClick={() => setQuery("")}
                type="button"
              >
                Clear
              </button>
            )}
          </label>
        </header>

        <section aria-live="polite" className="mt-14 pb-16">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="text-xl font-semibold">
              {query ? "Search results" : "Popular ideas"}
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {matchingRecipes.length}{" "}
              {matchingRecipes.length === 1 ? "recipe" : "recipes"}
            </p>
          </div>

          {matchingRecipes.length > 0 ? (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {matchingRecipes.map((recipe) => (
                <li key={recipe.slug}>
                  <Link
                    className="block h-full rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 dark:border-zinc-800 dark:bg-zinc-900 dark:focus-visible:outline-emerald-400"
                    href={`/recipes/${recipe.slug}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${recipe.accent}`}
                      >
                        {recipe.category}
                      </span>
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        {recipe.time}
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-semibold">{recipe.name}</h3>
                    <p className="mt-2 min-h-12 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                      {recipe.description}
                    </p>
                    <p className="mt-4 border-t border-zinc-100 pt-4 text-xs leading-5 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                      {recipe.ingredients
                        .map((ingredient) => ingredient.replace(/^[^ ]+ /, ""))
                        .join(" · ")}
                    </p>
                    <span className="mt-4 inline-flex text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                      View recipe <span aria-hidden="true" className="ml-1">→</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-2xl border border-dashed border-zinc-300 px-6 py-14 text-center dark:border-zinc-700">
              <h3 className="text-lg font-semibold">No recipes found</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Try another ingredient or a shorter search.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
