export default {

    props: {

        'label': String,
        'get_data_url': String,
        name: {type: String, default: ''},
        required: {type: Boolean, default: false},
        get_data_url_param: {type: String, default: ''},
        edit_url: {type: String, default: ''},
        delete_url: {type: String, default: ''},
        event_to_fire: {type: String, default: ''},
        event_to_listen: {type: String, default: ''},
        old_selected_option: {type: String, default: ''},
        err_msg_from_parent: {type: String, default: ''},
        hide_if_no_data_found: {type: Boolean, default: false}

    },

    data(){

        return {

            dropdown_data: [], // this array will be used to create dropdown options

            curr_selected_option: '', // currently selected dropDown value

            pre_selected_option: this.old_selected_option, // previously selected dropDown value (i.e. before page reloading)

            base_url: window.location.origin,

            show_loader: false,

            get_data_url_val: '', // filter to be used while getting data for the dropDown

            time_out_duration: 5000, // automatically hide error/success message after 5 seconds from screen

            err_msg: this.err_msg_from_parent, // on redirect, show errors if the validations fail

            /*
             * by default the dropdown will be keep showing, its visibility will be changed based on the
             * data from server + 'hide_if_no_data_found' value*/
            make_dropdown_visible: true

        }

    },

    created() {

        // load dropDown data on page load, only if 'event_to_listen' is empty.
        // Remember 'event_to_listen' would be empty for independent dropDowns (i.e. country dropDown)
        if (!this.event_to_listen) {

            this.getDropdownData(this.get_data_url_val);

        }

    },

    mounted(){

        // add event listener callback only if 'event_to_listen' property is not empty i.e. has some value
        if (this.event_to_listen) {

            this.$root.$on(this.event_to_listen, (selected_item_id) => {

                if (selected_item_id) {

                    this.get_data_url_val = selected_item_id;

                    this.getDropdownData(this.get_data_url_val);

                } else {

                    this.curr_selected_option = '';
                    this.dropdown_data = [];
                    this.fireEvent(this.curr_selected_option);

                }

            });

        }

    },

    watch: {

        err_msg: function () {

            if (this.err_msg.length) {

                setTimeout(() => {

                    this.err_msg = '';

                }, this.time_out_duration);

            }

        }

    },

    methods: {

        getDropdownData(selected_item_id){

            this.show_loader = true;

            /* there should not be any space before and after the '?' in following line */
            let url = `${this.base_url}${this.get_data_url}?${this.get_data_url_param}=${selected_item_id}`;

            axios.get(url)
                .then(response => {

                    this.dropdown_data = response.data;

                    if (this.dropdown_data.length) {

                        // selecting previously selected option on page reload
                        this.curr_selected_option = this.pre_selected_option;

                        this.make_dropdown_visible = true;

                        // firing event so that dependent dropDowns loads the data a/c to their parent
                        this.fireEvent(this.curr_selected_option);

                    } else {

                        this.err_msg = `Sorry! No data found or access denied to `;

                        if (this.hide_if_no_data_found) {
                            this.make_dropdown_visible = false;
                        }
                        // passing empty value. i.e. the listener dropDown will reset itself with empty dropdown
                        this.fireEvent('');

                    }

                    this.pre_selected_option = '';

                })
                .catch(error => {

                    this.err_msg = 'Some error occurred';

                }).finally(() => {

                this.show_loader = false;

            });

        },

        onChangeListener(){

            // passing curr_selected_option value to listeners
            this.fireEvent(this.curr_selected_option);

        },

        fireEvent(value){

            if (this.event_to_fire) {

                this.$root.$emit(this.event_to_fire, value);

            }
        }

    }

}
