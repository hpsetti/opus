<template>
  <div class="content-wrappper">
    <div class="row welcome-banner mr-0">
      <div class="col-xs-12 p-0">
        <div class="col-xs-12 p-0 d-flex align-items-cemter mb-10">
          <img
            @click="navigateBack"
            class="cursor-pointer"
            src="/static/images/icons/chevron_left_white.svg"
            alt=""
          />
          <div class="welcome-common-header pl-25 fw-300">
            Text and Number Size Calculator
          </div>
        </div>
        <!-- <div class="col-xs-12 fw-700 pl-40 mb-5">Discover the most usable text size for your device</div> -->
        <div class="col-xs-12 pl-40">
          <div class="col-xs-12 col-md-10 col-lg-10 pl-0 font-18 fw-700 mb-5">
            Discover the most usable text size for your device
          </div>
          <div class="col-xs-12 pl-0 col-md-10 col-lg-7 font-14">
            This tool calculates the recommended text and number size based on
            the viewing distance. Following the recommendation will help ensure
            text and numbers are legible for users. The recommendation is based
            on guidance in AAMI HE75 Human factors engineering - Design of
            medical devices.
          </div>
        </div>
      </div>
    </div>
    <div class="col-xs-12 p-30">
      <div class="col-xs-10 mb-30">
        <img
          class="w-100"
          src="/static/images/textLegibility/legibility_graphic.svg"
          alt=""
        />
      </div>
      <div class="col-xs-12 p-0 metric-header mb-30 pb-10">
        Enter a viewing distance (US or metric)
      </div>
      <div class="col-xs-12 flex-wrapper-parent mt-10 p-0">
        <div class="p-0 flex-unit-box">
          <input
            type="number"
            min="0"
            max="9999"
            class="metric text-center"
            v-model="inches"
            placeholder="--"
            @change.enter="convertValue('inches', inches)"
          />
          <span class="text-center font-14"
            >{{ conversion.foot || '--' }} foot</span
          >
        </div>
        <div class="p-0 mt-15">
          <span class="unit">Inches</span>
          <span class="unit pr-20"> = </span>
        </div>

        <div class="p-0 flex-unit-box">
          <input
            type="number"
            id="centimeters"
            max="999"
            class="metric text-center"
            v-model="centimeters"
            placeholder="--"
            @change.enter="convertValue('cms', centimeters)"
          />
          <span class="text-center font-14"
            >{{ conversion.meters || '--' }} meter</span
          >
        </div>
        <div class="p-0 mt-15 unit">Centimeters</div>
      </div>
      <div class="mt-30 col-xs-12 p-0 mb-15">
        Table of character heights relative to different viewing angles:
      </div>
      <div class="col-xs-12 p-0 mb-20">
        <table>
          <tr>
            <th></th>
            <th>Viewing angle</th>
            <th colspan="2">Character height</th>
            <th colspan="2" class="pl-40">Font size: Arial*</th>
          </tr>
          <tr>
            <td></td>
            <td class="pb-10">Minutes of Arc</td>
            <td class="pb-10 table-inch-fixed-width">Inches</td>
            <td class="pb-10 table-inch-fixed-width">mm</td>
            <td class="pb-10 table-px-fixed-width">All caps, digits</td>
            <td class="pb-10">Lower case</td>
          </tr>
          <tr class="table-row-data critical-row">
            <td>Critical</td>
            <td>30</td>
            <td>{{ tableData.critical[30].characterHeightInInches || '-' }}</td>
            <td>{{ tableData.critical[30].characterHeightInmm || '-' }}</td>
            <td>{{ tableData.critical[30].allCaps || '-' }}</td>
            <td>{{ tableData.critical[30].lowerCase || '-' }}</td>
          </tr>
          <tr class="table-row-data critical-row">
            <td></td>
            <td>24</td>
            <td>{{ tableData.critical[24].characterHeightInInches || '-' }}</td>
            <td>{{ tableData.critical[24].characterHeightInmm || '-' }}</td>
            <td>{{ tableData.critical[24].allCaps || '-' }}</td>
            <td>{{ tableData.critical[24].lowerCase || '-' }}</td>
          </tr>
          <tr class="table-row-data preferred-row">
            <td>Preferred</td>
            <td>22</td>
            <td>
              {{ tableData.preferred[22].characterHeightInInches || '-' }}
            </td>
            <td>{{ tableData.preferred[22].characterHeightInmm || '-' }}</td>
            <td>{{ tableData.preferred[22].allCaps || '-' }}</td>
            <td>{{ tableData.preferred[22].lowerCase || '-' }}</td>
          </tr>
          <tr class="table-row-data preferred-row">
            <td></td>
            <td>20</td>
            <td>
              {{ tableData.preferred[20].characterHeightInInches || '-' }}
            </td>
            <td>{{ tableData.preferred[20].characterHeightInmm || '-' }}</td>
            <td>{{ tableData.preferred[20].allCaps || '-' }}</td>
            <td>{{ tableData.preferred[20].lowerCase || '-' }}</td>
          </tr>
          <tr class="table-row-data adequate-row">
            <td>Adequate</td>
            <td>18</td>
            <td>{{ tableData.adequate[18].characterHeightInInches || '-' }}</td>
            <td>{{ tableData.adequate[18].characterHeightInmm || '-' }}</td>
            <td>{{ tableData.adequate[18].allCaps || '-' }}</td>
            <td>{{ tableData.adequate[18].lowerCase || '-' }}</td>
          </tr>
          <tr class="table-row-data adequate-row">
            <td></td>
            <td>16</td>
            <td>{{ tableData.adequate[16].characterHeightInInches || '-' }}</td>
            <td>{{ tableData.adequate[16].characterHeightInmm || '-' }}</td>
            <td>{{ tableData.adequate[16].allCaps || '-' }}</td>
            <td>{{ tableData.adequate[16].lowerCase || '-' }}</td>
          </tr>
          <tr class="table-row-data minimum-row">
            <td>Minimum</td>
            <td>12</td>
            <td>{{ tableData.minimum[12].characterHeightInInches || '-' }}</td>
            <td>{{ tableData.minimum[12].characterHeightInmm || '-' }}</td>
            <td>{{ tableData.minimum[12].allCaps || '-' }}</td>
            <td>{{ tableData.minimum[12].lowerCase || '-' }}</td>
          </tr>
        </table>
      </div>
      <div class="col-xs-12 font-14 p-0 mb-15">
        The table of results above are grouped into four categories that align
        with guidance in AAMI HE75 Human factors engineering - Design of medical
        devices. Our description of each category:
      </div>
      <div class="col-xs-10 col-xs-offset-1 mb-15">
        <span class="font-bold">Critical 24-30 minutes of arc:</span> Use for
        information that is critical and might need to be viewed at a glance
        (e.g., WARNING). Depending on the design, a short string, such as a
        heart rate, could be even larger to help establish visual hierarchy.
      </div>
      <div class="col-xs-10 col-xs-offset-1 mb-15">
        <span class="font-bold">Preferred 20 -22 minutes of arc:</span> This
        range should provide good legibility for most cases, including the need
        to read and comprehend information at a rapid pace.
      </div>
      <div class="col-xs-10 col-xs-offset-1 mb-15">
        <span class="font-bold">Adequate 16-18 minutes of arc:</span> This range
        might be best for typical text reading and non-urgent information.
      </div>
      <div class="col-xs-10 col-xs-offset-1 mb-30">
        <span class="font-bold">Minimum 12 minutes of arc:</span> Wherever
        possible, it will be best to design above this size. However, for no
        critical, non-urgent, secondary or tertiary information, this might be a
        better option than excluding the information or label all together.
      </div>
      <div class="col-xs-12 p-0 metric-header pb-10 mb-30">
        Understanding font size
      </div>
      <div class="col-xs-12 mb-30 p-0">
        It is critical to know the physical size of the characters, not just the
        point size. Character size can vary depending on the font style being
        used. In addition, the point size includes the space from the highest
        ascender to the lowest descender and some additional space. This
        calculater uses the Arial font as a baseline. Check your final font
        choice in a similar manner to the diagram below to ensure the character
        height truly equals the values presented in the calculator above.
      </div>
      <div class="col-xs-12 mb-30">
        <div
          class="col-xs-2 col-lg-offset-1 col-md-offset-1 col-sm-offset-1 mt-30 p-0"
        >
          If using all capitals or digits, make sure the font size provides a
          character that is the same height as the target height.
        </div>
        <div class="col-xs-5 p-0">
          <div class="w-100">
            <img src="/static/images/textLegibility/1xy_graphic.svg" alt="" />
          </div>
        </div>
        <div class="col-xs-2 p-0 mt-30">
          If including lower cases, match the lower case “x” to the target
          character height, which will yeild a larger font size requirement.
        </div>
      </div>
      <div class="col-xs-12 p-0 metric-header pb-10 mb-30">
        Science behind the calculations
      </div>
      <div class="col-xs-12 p-0 mb-30">
        Guidelines pertaining to the legibility and conspicuity of text is based
        on numerous factors, such as the height of the character, the
        character’s width, stroke weight, and contrast against the background.
        In this tool, we assume a relatively well proportioned font (e.g., such
        as Arial) used with high contrast (e.g., black on white). Now, the
        critical characteristic of height is a function of how much physical
        space the character occupies in your field of vision. For this, you can
        use different configurations of this formula depending on which pieces
        of information you have and what you are trying to find out:
      </div>
      <div
        class="col-lg-offset-3 col-lg-6 col-md-offset-3 col-md-9 col-sm-offset-2 col-sm-9 col-xs-12 xs-text-center formulaus-list mb-30"
      >
        <div class="col-xs-12 p-0 font-18 mb-10 font-medium">Formulas</div>
        <div class="col-xs-12 p-0 mb-15">
          A (minutes) = Tan<sup>-1</sup> (H/D) x 60;
        </div>
        <div class="col-xs-12 p-0 mb-15">H (inches) = Tan (A ÷ 60) x D;</div>
        <div class="col-xs-12 p-0 mb-15">D (inches) = H ÷ (Tan (A ÷ 60))</div>
      </div>
      <div
        class="col-lg-10 col-md-10 col-sm-10 col-xs-12 quick-tip-card p-20 mb-30"
      >
        <div class="col-xs-6 font-14 pr-0">
          <span class="font-bold">Quick tip:</span> You can use another
          rule-of-thumb for a quick check. Make the height of critically
          important characters (e.g., the word “WARNING”) equal to the viewing
          distance divided by 150. Make the height of other, secondary
          information about half that height; the viewing distance divided by
          300.
        </div>
        <div class="col-xs-3 pr-0">
          <div class="col-xs-12">Critical information:</div>
          <div class="col-xs-12 pr-0">
            Height = Distance / <span class="font-bold">150</span>
          </div>
        </div>
        <div class="col-xs-3 pr-0">
          <div class="col-xs-12">Secondary information:</div>
          <div class="col-xs-12 pr-0">
            Height = Distance / <span class="font-bold">300</span>
          </div>
        </div>
      </div>
      <div class="col-xs-12 p-0 metric-header pb-10 mb-30">
        When to make text larger than recommended
      </div>
      <div class="col-xs-12 p-0">
        You might choose to make alphanumeric characters taller (for example, by
        25%) in the following cases
      </div>
      <div class="col-xs-12 p-0">
        <ol>
          <li>Text will be viewed in dim lighting conditions</li>
          <li>When using fine text</li>
          <li>
            When there is reduced text-to-background contrast (e.g., light blue
            text against dark gray in place of black text against white)
          </li>
          <li>
            Text might be vibrating (such as the label on a device used in a
            helicopter)
          </li>
          <li>
            User might have a visual impairment and/or is not wearing their
            corrective lenses
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const viewingAngles = {
      critical: {
        firstRowMinutes: 30,
        secondRowMinutes: 24
      },
      preferred: {
        firstRowMinutes: 22,
        secondRowMinutes: 20
      },
      adequate: {
        firstRowMinutes: 18,
        secondRowMinutes: 16
      },
      minimum: {
        firstRowMinutes: 12
      }
    };
    const defaultValues = {
      characterHeightInInches: null,
      characterHeightInmm: null,
      allCaps: null,
      lowerCase: null
    };
    return {
      tableViewAngles: {
        critical: [30, 24],
        preferred: [22, 20],
        adequate: [18, 16],
        minimum: [12]
      },
      viewingAngles,
      defaultValues,
      tableData: {
        critical: {
          [viewingAngles.critical.firstRowMinutes]: defaultValues,
          [viewingAngles.critical.secondRowMinutes]: defaultValues
        },
        preferred: {
          [viewingAngles.preferred.firstRowMinutes]: defaultValues,
          [viewingAngles.preferred.secondRowMinutes]: defaultValues
        },
        adequate: {
          [viewingAngles.adequate.firstRowMinutes]: defaultValues,
          [viewingAngles.adequate.secondRowMinutes]: defaultValues
        },
        minimum: {
          [viewingAngles.minimum.firstRowMinutes]: defaultValues
        }
      },
      minutesOfArc: viewingAngles,
      conversion: {
        foot: null,
        meters: null
      },
      inches: null,
      centimeters: null
    };
  },

  watch: {
    inches() {
      if (this.inches?.length > 4) this.inches = this.inches.slice(0, 4);
    },

    centimeters() {
      if (this.centimeters?.length > 4)
        this.centimeters = this.centimeters.slice(0, 4);
    }
  },

  methods: {
    navigateBack() {
      this.$router.push('/tools');
    },
    convertValue(unit, value) {
      if (value) {
        if (unit === 'inches') {
          this.centimeters = +(this.inches * 2.54).toFixed(2);
          this.setConversionValuesForFootAndMeters();
          this.setValuesForTable();
        } else {
          this.inches = +(this.centimeters * 0.393701).toFixed(2);
          this.setConversionValuesForFootAndMeters();
          this.setValuesForTable();
        }
      } else {
        this.setDefaultValues();
      }
    },

    setDefaultValues() {
      this.inches = null;
      this.centimeters = null;
      this.conversion = {
        foot: null,
        meters: null
      };
      this.tableData = {
        critical: {
          [this.viewingAngles.critical.firstRowMinutes]: this.defaultValues,
          [this.viewingAngles.critical.secondRowMinutes]: this.defaultValues
        },
        preferred: {
          [this.viewingAngles.preferred.firstRowMinutes]: this.defaultValues,
          [this.viewingAngles.preferred.secondRowMinutes]: this.defaultValues
        },
        adequate: {
          [this.viewingAngles.adequate.firstRowMinutes]: this.defaultValues,
          [this.viewingAngles.adequate.secondRowMinutes]: this.defaultValues
        },
        minimum: {
          [this.viewingAngles.minimum.firstRowMinutes]: this.defaultValues
        }
      };
    },

    getTableRowValueBasedOnMinutes(minutesList) {
      const finalObject = {};
      minutesList.forEach((minutes) => {
        const radiansValue = +(
          Math.tan(((Math.PI / 180) * minutes) / 60) * this.inches
        ).toFixed(3);
        finalObject[minutes] = {
          characterHeightInInches: radiansValue,
          characterHeightInmm: +(25.4 * radiansValue).toFixed(2),
          allCaps: +Math.round((100 * radiansValue).toFixed(2)),
          lowerCase: +Math.round((100 * radiansValue * 1.38).toFixed(2))
        };
      });
      return finalObject;
    },

    setValuesForTable() {
      const tableUniqueRows = Object.keys(this.tableViewAngles);
      for (let i = 0; i < tableUniqueRows.length; i += 1) {
        const rowMinuteValues = this.tableViewAngles[tableUniqueRows[i]];
        this.tableData[tableUniqueRows[i]] =
          this.getTableRowValueBasedOnMinutes(rowMinuteValues);
      }
    },

    setConversionValuesForFootAndMeters() {
      this.conversion.meters = +(this.centimeters * 0.01).toFixed(2);
      this.conversion.foot = +(this.inches * 0.0833333).toFixed(2);
    }
  }
};
</script>

<style scoped>
.w-100 {
  width: 100%;
}

.table-inch-fixed-width {
  width: 100px;
}
.table-px-fixed-width {
  width: 130px;
}

.critical-row {
  background: #bbf4b6;
}

.preferred-row {
  background: #d8f9d5;
}

.adequate-row {
  background: rgba(255, 218, 89, 0.7);
}

.minimum-row {
  background: #f8c4c4;
}

th {
  font-weight: 400;
}

table {
  width: 80%;
}

.table-row-data {
  border-bottom: 0.5px solid #bdbdbd;
}

.table-row-data td {
  padding: 5px 0px 5px 0px;
}
.table-row-data td:first-child {
  padding: 5px 0px 5px 20px;
}

ol {
  padding-left: 25px;
}

.eligibility-header {
  color: #0b3c61;
  font-weight: 300;
  font-size: 32px;
}

.p-20 {
  padding: 20px;
}

.p-30 {
  padding: 30px;
}

.pb-10 {
  padding-bottom: 10px;
}

.mb-10 {
  margin-bottom: 10px;
}

.mb-15 {
  margin-bottom: 15px;
}

.mb-20 {
  margin-bottom: 20px;
}

.mt-30 {
  margin-top: 30px;
}

.mb-30 {
  margin-bottom: 30px;
}

.font-14 {
  font-size: 14px;
}

.font-18 {
  font-size: 18px;
}

.font-bold {
  font-weight: bold;
}

.font-medium {
  font-weight: 600;
}

.metric-header {
  font-weight: bold;
  font-size: 18px;
  font-family: Roboto;
  border-bottom: 1px solid #bdbdbd;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}

.metric {
  width: 140px;
  height: 50px;
  border: none;
  font-size: 30px;
  border-bottom: 2px solid #79b0de;
  border-radius: 5px;
  background: rgba(196, 196, 196, 0.2);
  color: #0b3c61;
  padding: 0px 10px 0px 10px;
}

.metric::placeholder {
  color: #0b3c61;
}

.metric:focus,
.metric:focus {
  outline: none;
}

.unit {
  color: #0b3c61;
  font-weight: 300;
  font-size: 30px;
  padding-left: 20px;
}

.pr-20 {
  padding-right: 20px;
}

.flex-wrapper-parent {
  display: flex;
}

.mt-15 {
  margin-top: 15px;
}

.flex-unit-box {
  display: flex;
  flex-direction: column;
}

.formulaus-list {
  font-size: 32px;
  font-weight: 300;
  color: #0b3c61;
}

@media screen and (max-width: 525px) {
  .formulaus-list {
    font-size: 20px;
  }
}

.quick-tip-card {
  background: #ffffff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  color: #0b3c61;
  display: flex;
  align-items: center;
}
</style>
