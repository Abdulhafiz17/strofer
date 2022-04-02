<template>
  
</template>

<script>
import swal from 'sweetalert'
export default {
    name: "Network",
    props: {
        network: Boolean,
    },
    mounted() {
        setTimeout(() => {
            if (this.network == false) {
                swal({
                    icon: "error",
                    title: "Tarmoq bilan aloqa mavjud emas !",
                    closeOnClickOutside: false,
                    closeOnEsc: false,
                    // buttons: false
                })
            }
        }, 500);
    },
}
</script>

<style>

</style>