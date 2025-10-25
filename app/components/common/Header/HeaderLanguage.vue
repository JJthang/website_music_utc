<template>
  <div class="bg-primary text-white">
    <BaseContainer>
      <div
        class="lg:px-0 flex pb-0 lg:pb-2.5 py-2.5 justify-end lg:border-b-2 border-b-primary-light relative"
      >
        <div class="flex items-center hover:cursor-pointer" @click="toggle">
          <img
            :src="currentLanguage?.flag"
            :alt="currentLanguage?.alt"
            class="mr-1.5 w-4 h-3"
            data-not-lazy
            width="144"
            height="59"
          />
          <span class="px-1">{{ currentLanguage?.text }}</span>
          <MhIcon name="Arrow-Small-Down" class="fill-white size-3" />
        </div>
        <MhDropdownTransition v-model="isOpen" class="top-12">
          <ul class="w-[120px] bg-white py-1 border-b-4 border-yellow">
            <nuxt-link to="" v-for="item in languageArr" :key="item.code">
              <li
                class="flex items-center py-1.5 hover:bg-yellow-light cursor-pointer px-3"
                @click="onChangeLanguage(item.prefix)"
              >
                <NuxtImg
                  :src="item.flag"
                  width="200"
                  height="200"
                  class="w-4 mr-1.5"
                />
                <span class="text-black text-sm">{{ item.text }}</span>
              </li>
            </nuxt-link>
          </ul>
        </MhDropdownTransition>
      </div>
    </BaseContainer>
  </div>
</template>

<script setup>
import useDisclosure from "~/hooks/useDisclosure";

const { locale, setLocale } = useI18n();
const { isOpen, toggle, onClose } = useDisclosure();

const languageArr = computed(() =>
  Languages.filter((lang) => lang.prefix !== locale.value)
);
const currentLanguage = computed(() =>
  Languages.find((item) => item.prefix === locale.value)
);

const onChangeLanguage = (prefix) => {
  setLocale(prefix);
  onClose();
};
</script>

<style lang="scss" scoped>
</style>