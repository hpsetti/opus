<template>
  <div class="col-xs-12 ref-guide-container p-0">
    <div
      class="col-xs-12 bg-emergo-green header font-32 pt-10 pb-10 pl-15 p4-15 d-flex justify-content-between align-items-center"
    >
      <div class="d-flex align-items-center">
        <img src="/static/images/icons/touchtool_guide.svg" />
        <span class="ml-10">Guidance from different standards</span>
      </div>
      <div>
        <img
          class="cursor-pointer"
          @click="$emit('close')"
          src="/static/images/icons/popup_close.svg"
          alt=""
        />
      </div>
    </div>
    <div class="col-xs-12 pl-15 text-justify font-16 content">
      <div class="section">
        <p>
          Consider how different standards might relate to your development
          efforts when making a final design decision. It is also important to
          recognize that these are minimum touch target size recommendations,
          and you should consider increasing the relative size and spacing of
          touch targets as criticality, risk, and/or urgency of use increase.
          For example AAMI HE75, Section 18.3.2.2.2 suggests that errors are
          more likely as the size decreases below 23 mm, whereas sizes of 30.5
          mm or larger should provide much higher accuracy. While these
          references provide helpful guidance, user testing should always be
          done to validate the safety and effectiveness of touch target designs.
        </p>
      </div>
      <div class="section">
        <p class="section-title text-color-blue font-bold font-18">
          ANSI/AAMI HE75: HFE - Design of Medical Devices
        </p>
        <p>
          The Association for the Advancement of Medical Instrumentation (AAMI)
          recommends a minimum touch target of 13 mm (0.5 in) and at least 6 mm
          (0.25 in) of spacing in between adjacent targets. However,
          “center-to-center key spacing should not be less than 20 mm (0.8
          inches)”.
        </p>
        <p>
          Human factors engineering – Design of medical devices; ANSI/AAMI
          HE75:2009 Section 18.3.2.2.2
        </p>
      </div>
      <div class="section urls">
        <p class="section-title text-color-blue font-bold font-18">
          WCAG (AAA) Accessibility Principles
        </p>
        <p>
          W3C’s Web Content Accessibility Guidelines (WCAG) recommends a minimum
          touch target of 11.4 mm (.45 in, or 44 CSS pixels). A CSS pixel is
          equal to a visual angle of 0.213 degrees. At a standard 28 in viewing
          distance, a CSS pixel would therefore correspond to about 0.26 mm.
          Note, this reference does not provide a specific recommendation for
          minimum spacing.
        </p>
        <div class="pt-10">
          <a
            class="pointer-cursor"
            href="https://www.w3.org/WAI/standards-guidelines/wcag/new-in-21/#255-target-size-aaa"
            target="blank"
            style="display: block"
          >
            https://www.w3.org/WAI/standards-guidelines/wcag/new-in-21/#255-target-size-aaa
          </a>
          <a
            class="pointer-cursor"
            href="https://www.w3.org/TR/css3-values/#reference-pixel"
            target="blank"
            style="display: block"
          >
            https://www.w3.org/TR/css3-values/#reference-pixel
          </a>
        </div>
      </div>
      <div class="section urls">
        <p class="section-title text-color-blue font-bold font-18">
          Google Material Design
        </p>
        <p>
          Google Material Design recommends a minimum touch target of 9 mm (48 x
          48 dp) with at least 1.5 mm (8 dp) between each touch target.
        </p>
        <div class="pt-10">
          <a
            class="pointer-cursor"
            href="https://material.io/design/usability/accessibility.html#layout-typography"
            target="blank"
          >
            https://material.io/design/usability/accessibility.html#layout-typography
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'StandardRefGuide',
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
.ref-guide-container {
  background: white;
  border-radius: 5px;
}
.header {
  color: white;
  border-radius: 5px;
}
.content {
  max-height: 70vh;
  overflow: auto;
  word-wrap: break-word;
}
.section {
  margin-top: 15px;
  padding-bottom: 5px;
}
.section.urls {
  padding-bottom: 15px;
}
.section:not(:last-child) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
