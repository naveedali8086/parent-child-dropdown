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

                <img alt="loader icon" src="../assets/spinner.gif">

            </div>

            <div class="invalid-feedback">{{ err_msg }}</div>

        </div>

    </div>

</template>

<style>

    .loader {

        position: absolute;
        width: 88%;
        top: 33%;
        text-align: center;
        padding-bottom: 5px

    }

</style>

<script>

    import DropDown from '../mixins/DropDown'

    export default {
        mixins: [DropDown]
    }

</script>