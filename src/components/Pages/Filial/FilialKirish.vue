<template>
    <div class="container-fluid">
        <div class="card shadow">
            <div class="card-header">
                <h3> {{ filial.name }} </h3>
                <div class="row text-center">
                    <div class="col-md-3"></div>
                    <div class="col-md-2">
                        <div class="card">
                            <div class="card-body">
                                <a :href="'tel:+998' + filial.phone"> <span class="fa fa-phone"/> +998{{ filial.phone }} </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="card">
                            <div class="card-body">
                                <span class="fa fa-location-arrow"/> {{ filial.address }}
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="card">
                            <div class="card-body">
                                <a @click="shareToHodimlar()" style="cursor: pointer;"> <span class="fa fa-user"/> </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { instance } from "../Api";
export default {
    data() {
        return {
            branch_id: this.$route.params.id,
            filial: {},
            hodimlar: "",
        }
    },
    methods: {
        getData() {
            instance.get("this_branch/" + this.branch_id)
            .then((res) => {
                this.filial = res.data
                console.log(res.data)
            })

            instance.get("branch_users/" + this.branch_id + "/unblock")
            .then((res) => {
                this.hodimlar = res.data.length
                console.log(res.data)
            })
        },

        shareToHodimlar() {
            this.$router.push({ path: "/hodimlar", params: {id: this.branch_id} })
        },
    },
    mounted() {
        this.getData();
    },
}
</script>

<style>

</style>