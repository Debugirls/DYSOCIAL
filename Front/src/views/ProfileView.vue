<template>
<section class="vh-100">
  <div class="container py-5 h-50">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-lg-6 mb-4 mb-lg-0">
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4 gradient-custom text-center text-white"
              style="border-top-left-radius: .5rem; border-bottom-left-radius: .5rem;">
              <img src="http://cdn.onlinewebfonts.com/svg/img_569204.png"
                alt="Avatar" class="img-fluid my-5" style="width: 80px; padding-top: 15%;" />
              <i class="far fa-edit mb-5"></i>
            </div>
            <div class="col-md-8">
              <div class="card-body p-4">
                <h5>Information</h5>
                <hr class="mt-0 mb-4">
                <div class="row pt-1">
                    <h6>Email</h6>
                    <p class="text-muted">mail@example.com</p>
                </div>
                <div class="row pt-1">
                    <h6>Nombre</h6>
                    <p class="text-muted">Name</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>



<style scoped>

.card{
  border-radius: .5rem;
  border: var(--color-greenviolet100);
  background-color: var(--color-violet700);
  box-shadow: var(--color-green100) 1px 2px;
}

.text-muted{
    color: var(--color-violet100) !important;
}

h6, h5{
    color: var(--color-green100);
}
.gradient-custom {
/* fallback for old browsers */
background: var(--color-violet600);

/* Chrome 10-2 */
background: -webkit-linear-gradient(to right bottom, var(--color-violet200), var(--color-violet600));

/* IE 10+/ Edge, Firefox 16+, Chrome 26+ */
background: linear-gradient(to right bottom, var(--color-violet200), var(--color-violet600));
}
</style>