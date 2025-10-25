<template>
  <div class="bg-primary text-white pt-3 pb-7 lg:py-6">
    <BaseContainer
      class="flex justify-between items-center flex-col lg:flex-row"
    >
      <div class="flex flex-col lg:flex-row items-center">
        <nuxt-link to="/">
          <div>
            <img
              src="~/assets/images/Mystays_logo.png"
              alt="Mystays logo hotel"
              class="cursor-pointer w-36"
              loading="lazy"
            />
          </div>
        </nuxt-link>
        <span class="lg:ml-8"> © 2020 MyStays Hotel Management Co., Ltd. </span>
      </div>
      <div class="flex lg:flex-row flex-col items-center">
        <nuxt-link
          to="https://www.mystays.com/en/privacy-policy/"
          target="_blank"
          class="flex flex-col lg:flex-row items-center lg:mr-10 cursor-pointer"
        >
          <MhIcon name="Icon-Undo" class="mr-3" />
          <span>{{ $t("cancelreservation.cancel_reservation") }}</span>
        </nuxt-link>
        <nuxt-link
          to="https://www.mystays.com/en/privacy-policy/"
          target="_blank"
          class="cursor-pointer"
        >
          {{ $t("headers.private_policy") }}
        </nuxt-link>
      </div>
    </BaseContainer>
  </div>
</template>