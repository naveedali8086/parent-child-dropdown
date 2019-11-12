<template>

    <div>

        <div class="form-group" v-if="make_dropdown_visible">

            <label>{{ label }} <span class="required">*</span></label>

            <select v-bind:name="name" class="form-control" @change="onChangeListener"

                    v-bind:class="{'is-invalid' : err_msg}" v-bind:required="required"

                    v-model="curr_selected_option">

                <option disabled value="">Select</option>

                <option v-for="option in dropdown_data" v-bind:value="option.id">

                    {{option.name}}

                </option>

            </select>

            <div class="loader" v-if="show_loader">

                <i class="fa fa-spinner fa-spin fa-2x"></i>

            </div>

            <div class="invalid-feedback">{{ err_msg }}</div>

        </div>

    </div>

</template>

<style>

    .loader {

        position: absolute;
        width: 95%;
        top: 39%;
        height: 30px;
        text-align: center;

    }

</style>

<script>

    import DropDown from './mixins/DropDown'

    export default {
        mixins: [DropDown]
    }

</script>