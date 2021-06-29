<script>
export default {
  created() {
    this.$axios.setToken(false)
    this.$store.commit('deleteUser')
    this.$router.push('/')
  },
}
</script>
