# UI-KIT

## <span style="color: #9f4a19">Archetypal design pattern:</span>

### <span style="color: #9f4a19">Atomic Development</span>

> The five distinct levels of atomic design — atoms > molecules > organisms > templates > pages — map incredibly well to React’s component-based architecture.

-   ### Atoms:

    > Basic building blocks of matter, such as a button, input or a form label. They’re not useful on their own.

-   ### Molecules:

    > Grouping atoms together, such as combining a button, input and form label to build functionality.

-   ### Organisms:

    > Combining molecules together to form organisms that make up a distinct section of an interface (i.e. navigation bar)

-   ### Templates:

    > Consisting mostly of groups of organisms to form a page — where clients can see a final design in place.

-   ### Pages:
    > An ecosystem that views different template renders. We can create multiple ecosystems into a single environment — the application.

## <span style="color: #9f4a19">Structure and naming from UI-KIT:</span>

<pre>
breef/
├── apps/
└── libs/
    ├── shared/
    └── ui-kit/src/lib
        ├── atoms/
        |   ├── button/
        |   |   ├── Input.component.tsx
        |   |   ├── Button.styled.tsx
        |   |   ├── Button.spec.tsx
        |   |   ├── Button.stories.tsx
        |   |   └── README.md
        |   ├── input/
        |   └──index.ts
        ├── molecules/
        |   ├── post/
        |   ├── nav/
        |   └──index.ts
        ├── organisms/
        |   ├── header/
        |   ├── footer/
        |   └──index.ts
        └── index.ts
</pre>

## <span style="color: #9f4a19">Set up Storybook for Project:</span>

</br>

-   ## Set up Storybook in your workspace

    > You first need to set up Storybook for your Nx workspace, if you haven't already. You can read the [Storybook plugin overview guide](https://nx.dev/packages/storybook) to get started.

    `yarn add -D @nx/storybook`

</br>

-   ## Generate Storybook Configuration

    > You can generate Storybook configuration for an individual React project by using the [@nx/react:storybook-configuration generator](https://nx.dev/packages/react/generators/storybook-configuration), like this:

    `nx g @nx/react:storybook-configuration <project-name>`

</br>

-   ## Auto-generate Stories

    > The [@nx/react:storybook-configuration generator](https://nx.dev/packages/react/generators/storybook-configuration) has the option to automatically generate \*.stories.ts|tsx files for each component declared in the library. The stories will be generated using [Component Story Format 3 (CSF3)](https://storybook.js.org/blog/storybook-csf3-is-here/).

    <pre>
    button/
    ├── Input.component.tsx
    └── Button.stories.tsx
    </pre>

    > If you add more components to your project, and want to generate stories for all your (new) components at any point, you can use the [@nx/react:stories generator](https://nx.dev/packages/react/generators/stories):

    `nx g @nx/react:stories --project=<project-name>`

    ### _<span style="color: #9f4a19">Example:</span>_

    Let's take for a example a library in your workspace, under **libs/ui-kit**, called **ui-kit**. This library contains a component, called **Button**.

    The command to generate stories for that library would be:

    `yarn nx generate @nrwl/react:storybook-configuration ui-kit --no-configureCypress --no-generateCypressSpecs --tsConfiguration --no-interactive`

    and the result would be the following:

    <pre>
    breef/
    ├── apps/
    └── libs/
        └── ui-kit/
            ├── .storybook/
            └── src/lib
                └── atoms/button
                    ├── Input.component.tsx
                    └── Button.stories.tsx
    </pre>

-   ## Generate Component Story

    > Generate storybook story for a react component.

    `nx generate component-story ...`

    ### _<span style="color: #9f4a19">Example:</span>_

    #### Component Path

    <pre>
    breef/
    └── libs/
        └── ui-kit/
            ├── .storybook/
            └── src/lib
                └── atoms/button
                    └── Input.component.tsx
    </pre>

    #### Command

    `nx generate @nrwl/react:component-story --componentPath=lib/atoms/button/Input.component.tsx --project=ui-kit`

-   ## Run UiKit Storybook
    `nx run ui-kit:storybook`
    Or
    `yarn storybook`
