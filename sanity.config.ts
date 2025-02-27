import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { codeInput } from "@sanity/code-input";
import { projectId, dataset } from "./lib/env.api";
import { myTheme } from "./sanity-theme";
// import { createTheme, hues } from 'https://themer.sanity.build/api/hues?preset=rosabel';
import { theme } from 'https://themer.sanity.build/api/hues?preset=rosabel';

export default defineConfig({
  name: "SergeiVas",
  title: "sergeivas.com",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [deskTool(), visionTool(), codeInput()],
  schema: { types: schemaTypes },
  studio: {
    components: {
      // Настраиваем компоненты Studio
    }
  },
  // theme: createTheme({...hues, primary: {...hues.primary, mid: '#22fca8'}}),
  theme,
});

