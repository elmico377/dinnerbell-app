import Link from "next/link";
import { notFound } from "next/navigation";
import { recipes } from "@/lib/recipes";

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export default async function RecipeDetailsPage({
  params,
}: PageProps<"/recipes/[slug]">) {
  const { slug } = await params;
  const recipe = recipes.find((item) => item.slug === slug);

  if (!recipe) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f8f6f0] px-5 py-8 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
          href="/recipe-search"
        >
          <span aria-hidden="true">←</span> Back to recipes
        </Link>

        <article className="mt-10 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <header className="border-b border-zinc-100 px-6 py-8 dark:border-zinc-800 sm:px-10 sm:py-12">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${recipe.accent}`}
            >
              {recipe.category}
            </span>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              {recipe.name}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
              {recipe.description}
            </p>
            <p className="mt-5 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Ready in {recipe.time}
            </p>
          </header>

          <div className="grid gap-10 px-6 py-8 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:px-10 sm:py-10">
            <section aria-labelledby="ingredients-heading">
              <h2
                className="text-xl font-semibold"
                id="ingredients-heading"
              >
                Ingredients
              </h2>
              <ul className="mt-5 space-y-3">
                {recipe.ingredients.map((ingredient) => (
                  <li
                    className="flex gap-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300"
                    key={ingredient}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-4 w-4 shrink-0 rounded border border-zinc-300 dark:border-zinc-600"
                    />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="instructions-heading">
              <h2
                className="text-xl font-semibold"
                id="instructions-heading"
              >
                How to make it
              </h2>
              <ol className="mt-5 space-y-5">
                {recipe.instructions.map((instruction, index) => (
                  <li
                    className="flex gap-4 text-sm leading-6 text-zinc-700 dark:text-zinc-300"
                    key={instruction}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
                      {index + 1}
                    </span>
                    <span className="pt-0.5">{instruction}</span>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
