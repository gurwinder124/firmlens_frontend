<template>
  <div class="row">
    <!-- Big Chart -->


    
    <h2>Index</h2>
    
    
  </div>
</template>
<script>




export default {
  name: 'dashboard',
  components: {
    
  },
  data () {
    return {
      
      
    };
  },
  computed: {
    enableRTL () {
      return this.$route.query.enableRTL;
    },
    isRTL () {
      return this.$rtl.isRTL;
    },
    bigLineChartCategories () {
      return [{ name: 'Accounts', icon: 'tim-icons icon-single-02' }, {
        name: 'Purchases',
        icon: 'tim-icons icon-gift-2'
      }, { name: 'Sessions', icon: 'tim-icons icon-tap-02' }];
    }
  },
  mounted () {
    this.initBigChart(0);
  }
}
</script>
<style></style>
