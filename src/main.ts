import { mount } from 'svelte';
import './app.css';
import App from './App.svelte';
import { profiles } from './lib/Stores/Profiles.svelte';
console.log(profiles.isSetup)
const app = mount(App, { target: document.body });

export default app;
