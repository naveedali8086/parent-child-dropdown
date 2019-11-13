import ParentChildDropdown from './components/ParentChildDropdown.vue'


export default {

    install(Vue, options) {
        // Registering the component globally
        Vue.component("parent-child-dropdown", ParentChildDropdown);
    }

};