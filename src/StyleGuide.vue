<template>
  <div class="content-wrappper style-guide">
    <h1 class="title blue-3">OPUS Style Guide</h1>
    <div class="row m-0">
      <div class="col-xs-9 style-content">
        <section>
          <h3 ref="headers">Headers</h3>
          <h1>This is h1 text</h1>
          <h2>This is h2 text</h2>
          <h3>This is h3 text</h3>
          <h4>This is h4 text</h4>
          <h5>This is h5 text</h5>
          <h6>This is h6 text</h6>
        </section>

        <section>
          <h3 ref="font-family">Font Family</h3>
          <div
            class="mb-30"
            v-for="family in [
              'light',
              'regular',
              'medium',
              'semi-bold',
              'bold'
            ]"
            :key="family"
          >
            <div :class="`font-${family}`">Nunito {{ family }}</div>
            <div :class="`font-${family}`">ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
            <div :class="`font-${family}`">abcdefghijklmnopqrstuvwxyz</div>
            <div :class="`font-${family}`">1234567890!@#$%^&*()</div>
          </div>
        </section>

        <section>
          <h3 ref="font-system">Font System</h3>
          <div v-for="(row, index) in fonts" :key="row.class">
            <p class="mt-20 mb-0" :class="row.class">
              {{ index + '. ' + row.title }}
            </p>
            <p class="text-regular-large m-0">Class: {{ row.class }}</p>
            <p class="text-regular-large m-0">
              font-weight: {{ row['font-weight'] }}
            </p>
            <p class="text-regular-large m-0">
              font-size: {{ row['font-size'] }}
            </p>
            <p class="text-regular-large m-0">
              line-height: {{ row['line-height'] }}
            </p>
          </div>
        </section>

        <section>
          <h3 ref="colors">Colors</h3>
          <div v-for="color in Object.keys(colors)" :key="color.desc">
            <div class="text-h4-bold mb-10">
              {{ color.toUpperCase() + ': ' + colors[color].desc }}
            </div>
            <div class="d-flex align-items-start col-gap-15 flex-wrap">
              <div v-for="shade in colors[color].shades" :key="shade.name">
                <div style="width: 150px" class="mb-30 text-center">
                  <div
                    class="mx-auto"
                    :style="`width: 96px; height: 96px; border-radius: 96px; background: ${shade.background}`"
                  >
                    <div
                      v-if="shade.text"
                      class="text-subtitle-3"
                      :style="`color: ${shade.color}; line-height: 96px`"
                    >
                      {{ shade.text }}
                    </div>
                  </div>
                  <div class="text-subtitle-3">{{ shade.name }}</div>
                  <div>{{ shade.background }}</div>
                  <div v-for="name in shade.classes" :key="name">
                    {{ name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 ref="buttons">Buttons</h3>
          <h5>Primary Buttons</h5>
          <div class="d-flex col-gap-10 align-items-start">
            <BaseButton variant="primary" has-icon>
              <div class="d-flex">
                <img
                  src="/static/images/icons/download_icon_white.svg"
                  alt="Download"
                />
                <span class="pl-10">Download</span>
              </div>
            </BaseButton>
            <BaseButton variant="primary" size="lg" has-icon>
              <img
                src="/static/images/icons/download_icon_white.svg"
                alt="Download"
              />
              <span class="pl-10">Download</span>
            </BaseButton>
            <BaseButton variant="primary">Add</BaseButton>
            <BaseButton variant="primary" size="lg">Add</BaseButton>
            <BaseButton variant="primary" disabled>Add</BaseButton>
          </div>

          <h5>Secondary Buttons</h5>
          <div class="d-flex col-gap-10 align-items-start">
            <BaseButton variant="secondary" has-icon>
              <div class="d-flex">
                <img
                  src="/static/images/icons/download_icon.svg"
                  alt="Download"
                />
                <span class="pl-10">Download</span>
              </div>
            </BaseButton>
            <BaseButton variant="secondary" size="lg" has-icon>
              <img
                src="/static/images/icons/download_icon.svg"
                alt="Download"
              />
              <span class="pl-10">Download</span>
            </BaseButton>
            <BaseButton variant="secondary">Add</BaseButton>
            <BaseButton variant="secondary" size="lg">Add</BaseButton>
            <BaseButton variant="secondary" disabled>Add</BaseButton>
          </div>
          <h5>Tertiary Buttons</h5>
          <div class="d-flex col-gap-10 align-items-start">
            <BaseButton variant="tertiary" has-icon>
              <div class="d-flex">
                <img
                  src="/static/images/icons/download_icon_white.svg"
                  alt="Download"
                />
                <span class="pl-10">Download</span>
              </div>
            </BaseButton>
            <BaseButton variant="tertiary" size="lg" has-icon>
              <img
                src="/static/images/icons/download_icon_white.svg"
                alt="Download"
              />
              <span class="pl-10">Download</span>
            </BaseButton>
            <BaseButton variant="tertiary">Add</BaseButton>
            <BaseButton variant="tertiary" size="lg">Add</BaseButton>
            <BaseButton variant="tertiary" disabled>Add</BaseButton>
          </div>
          <h5>Error Buttons</h5>
          <div class="d-flex col-gap-10 align-items-start">
            <BaseButton variant="error" has-icon>
              <div class="d-flex">
                <img
                  src="/static/images/icons/download_icon_white.svg"
                  alt="Download"
                />
                <span class="pl-10">Download</span>
              </div>
            </BaseButton>
            <BaseButton variant="error" size="lg" has-icon>
              <img
                src="/static/images/icons/download_icon_white.svg"
                alt="Download"
              />
              <span class="pl-10">Download</span>
            </BaseButton>
            <BaseButton variant="error">Add</BaseButton>
            <BaseButton variant="error" size="lg">Add</BaseButton>
            <BaseButton variant="error" disabled>Add</BaseButton>
          </div>
        </section>

        <section>
          <h3 ref="tags">Tags</h3>
          <h5>Extra Small Tags</h5>
          <div class="d-flex col-gap-10 align-items-start">
            <OpusTag variant="green">word</OpusTag>
            <OpusTag variant="blue">word</OpusTag>
            <OpusTag variant="yellow">word</OpusTag>
            <OpusTag variant="orange">word</OpusTag>
          </div>
          <h5>Small Tags</h5>
          <div class="d-flex col-gap-10 align-items-start">
            <OpusTag variant="green" size="sm">word</OpusTag>
            <OpusTag variant="blue" size="sm">word</OpusTag>
            <OpusTag variant="yellow" size="sm">word</OpusTag>
            <OpusTag variant="orange" size="sm">word</OpusTag>
          </div>
          <h5>Large Tags</h5>
          <div class="d-flex col-gap-10 align-items-start">
            <OpusTag variant="green" size="lg">word</OpusTag>
            <OpusTag variant="blue" size="lg">word</OpusTag>
            <OpusTag variant="yellow" size="lg">word</OpusTag>
            <OpusTag variant="orange" size="lg">word</OpusTag>
          </div>
          <h5>Small Tags with custom backgrounds</h5>
          <div class="d-flex col-gap-10 align-items-start">
            <OpusTag size="sm" bg="rgb(255, 255, 0)">word</OpusTag>
            <OpusTag size="sm" bg="#124153">word</OpusTag>
          </div>
          <h5>Dismissible Tags</h5>
          <div class="d-flex align-items-start col-gap-10">
            <OpusTag size="xs" variant="green" class="mr-10" dismissible
              >word</OpusTag
            >
            <OpusTag size="sm" variant="green" class="mr-10" dismissible
              >word</OpusTag
            >
            <OpusTag size="lg" variant="green" dismissible>word</OpusTag>
          </div>
          <h5>Dismissible Tags with custom close icons</h5>
          <div class="d-flex align-items-start col-gap-10">
            <OpusTag variant="green" dismissible>
              <template v-slot:default>word</template>
              <template v-slot:close="{ dismissible, dismiss }">
                <img
                  v-if="dismissible"
                  src="/static/images/icons/danger_close_icon.svg"
                  class="cursor-pointer"
                  alt="Close Tag"
                  @click="dismiss"
                />
              </template>
            </OpusTag>
          </div>
        </section>

        <section>
          <h3 ref="html5editor">HTML5 Editor</h3>
          <h5>Default</h5>
          <!-- <OpusEditor id="ed1" v-model="content.ed1"></OpusEditor>
          <h5>With 30 maxlength prop</h5>
          <OpusEditor
            id="ed2"
            v-model="content.ed2"
            :maxlength="30"
          ></OpusEditor> -->
        </section>

        <section>
          <h3 ref="search-bar">Search Bar</h3>
          <OpusSearchBar></OpusSearchBar>
        </section>

        <section>
          <h3 ref="pagination">Pagination</h3>
          <OpusPagination
            :total="7"
            :perPage="2"
            :maxPages="3"
            :currentPage="currentPage"
            @pagechanged="selectPage"
          ></OpusPagination>
        </section>

        <section>
          <h3 ref="forms">Forms</h3>
          <h5>Small Variant</h5>
          <form class="opus-form">
            <div class="form-group">
              <label for="small-email">Email address</label>
              <input
                type="email"
                class="form-control"
                id="small-email"
                disabled
                placeholder="Email"
              />
            </div>
            <div class="form-group">
              <label for="small-password">Password</label>
              <input
                type="password"
                class="form-control"
                id="small-password"
                placeholder="Password"
              />
            </div>
            <div class="form-group">
              <label for="small-title">Title</label>
              <input
                type="text"
                class="form-control"
                id="small-title"
                placeholder="Title"
              />
            </div>
            <div class="form-group">
              <label for="small-textarea1">Content</label>
              <textarea
                class="form-control"
                id="small-textarea1"
                placeholder="Content"
                rows="3"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="exampleInputFile">File input</label>
              <input type="file" id="exampleInputFile" />
              <p class="help-block">Example block-level help text here.</p>
            </div>
            <BaseButton>Submit</BaseButton>
          </form>
          <h4>Large Variant</h4>
          <form class="opus-form">
            <div class="form-group">
              <label for="large-email">Email address</label>
              <input
                type="email"
                class="form-control large"
                id="large-email"
                disabled
                placeholder="Email"
              />
            </div>
            <div class="form-group">
              <label for="large-password">Password</label>
              <input
                type="password"
                class="form-control large"
                id="large-password"
                placeholder="Password"
              />
            </div>
            <div class="form-group">
              <label for="large-title">Title</label>
              <input
                type="text"
                class="form-control large success"
                id="large-title"
                placeholder="Title"
                value="OPUS"
              />
              <p class="help-block success">
                Example block-level success text here.
              </p>
            </div>
            <div class="form-group">
              <label for="large-desc">Description</label>
              <input
                type="text"
                class="form-control large error"
                id="large-desc"
                placeholder="Description"
              />
              <p class="help-block error">
                Example block-level error text here.
              </p>
            </div>
            <div class="form-group">
              <label for="large-textarea">Content</label>
              <textarea
                class="form-control large"
                id="large-textarea"
                placeholder="Content"
                rows="3"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="file">File input</label>
              <input type="file" id="file" />
              <p class="help-block">Example block-level help text here.</p>
            </div>
            <BaseButton size="lg">Submit</BaseButton>
          </form>
        </section>

        <section>
          <h3 ref="radio">Radio</h3>
          <h4>Simple Radio</h4>
          <div class="d-flex">
            <OpusRadio
              name="Simple Radio"
              value="apple"
              v-model="radio.simple"
              text="Apple"
            >
            </OpusRadio>
            <OpusRadio
              name="Simple Radio"
              value="orange"
              v-model="radio.simple"
              text="Orange"
            >
            </OpusRadio>
          </div>
          <p>Selected Value : {{ radio.simple }}</p>
          <h4>Simple Radio using slots</h4>
          <div class="d-flex">
            <OpusRadio name="Simple Radio" value="apple" v-model="radio.simple"
              >Apple
            </OpusRadio>
            <OpusRadio name="Simple Radio" value="orange" v-model="radio.simple"
              >Orange
            </OpusRadio>
          </div>
          <p>Selected Value : {{ radio.simple }}</p>
          <h4>Simple Radio group using options array</h4>
          <OpusRadioGroup
            :options="radio.group1.options"
            v-model="radio.group1.value"
          ></OpusRadioGroup>
          <p>Selected Value : {{ radio.group1.value }}</p>
          <h4>Simple Radio group using options array with custom fields</h4>
          <OpusRadioGroup
            :options="radio.group2.options"
            v-model="radio.group2.value"
            textField="name"
            valueField="amount"
          ></OpusRadioGroup>
          <p>Selected Value : {{ radio.group2.value }}</p>
          <h4>Simple Radio group that is stacked</h4>
          <OpusRadioGroup
            :options="radio.group2.options"
            v-model="radio.group2.value"
            stacked
            textField="name"
            valueField="amount"
          ></OpusRadioGroup>
          <p>Selected Value : {{ radio.group2.value }}</p>
        </section>

        <!-- <section>
          <h3 ref="checkbox">Checkbox</h3>
          <h4>Single Checkbox</h4>
          <OpusCheckbox v-model="checkBox.simple" text="I accept the terms">
          </OpusCheckbox>
          <p>Selected Values : {{ checkBox.simple }}</p>
          <h4>Single Checkbox with large content</h4>
          <OpusCheckbox v-model="checkBox.simple3">
            By submitting this form, I agree to EMERGO By UL Solutions’ Online
            Policies and agree to receive periodic emails from UL Solutions
            containing best practices, education, industry research, news,
            updates and promotions related to UL’s products and services. I
            understand that I can unsubscribe at any time by visiting our
            Preference Center.
          </OpusCheckbox>
          <p>Selected Values : {{ checkBox.simple3 }}</p>

          <h4>Single Checkbox with slots</h4>
          <OpusCheckbox name="Simple Checkbox" v-model="checkBox.simple2"
            >I accept the terms
          </OpusCheckbox>
          <p>Selected Values : {{ checkBox.simple2 }}</p>

          <h4>Single Checkbox (Custom Values)</h4>
          <OpusCheckbox
            id="accept"
            v-model="checkBox.custom"
            value="yes"
            unchecked-value="no"
            >I accept the terms
          </OpusCheckbox>
          <p>Selected value : {{ checkBox.custom }}</p>

          <h5>Checkbox Group</h5>
          <OpusCheckboxGroup
            id="fruits"
            stacked
            v-model="cbGroup.selected"
            :options="cbGroup.options"
          ></OpusCheckboxGroup>
          <p>Selected Values : {{ cbGroup.selected }}</p>

          <h5>Checkbox Group with custom field names</h5>
          <OpusCheckboxGroup
            id="fruits"
            v-model="cbGroup2.selected"
            :options="cbGroup2.options"
            textField="name"
            valueField="amount"
          ></OpusCheckboxGroup>
          <p>Selected Values : {{ cbGroup2.selected }}</p>
        </section> -->

        <section>
          <h3 ref="tabs">Tabs</h3>
          <h4>Simple Tab bar with array of strings as input</h4>
          <OpusTabs :tabs="tabs.short2" v-model="tabs.selected2"></OpusTabs>
          <h4>Simple Tab bar with pane contents</h4>
          <OpusTabs
            id="sample-tab"
            :tabs="tabs.short3"
            v-model="tabs.selected3"
          >
            <OpusTabPane label="general">Tab 1 Content</OpusTabPane>
            <OpusTabPane label="projects">Tab 2 Content</OpusTabPane>
            <OpusTabPane label="notifications">Tab 3 Content</OpusTabPane>
          </OpusTabs>

          <h4 class="mt-20">Simple Tab bar with array of objects as input</h4>
          <OpusTabs :tabs="tabs.short3" v-model="tabs.selected3"></OpusTabs>
          <h4 class="mt-20">
            Simple Tab bar - tab can be selected via router params
          </h4>
          <OpusTabs
            id="routerTab"
            :tabs="tabs.short3"
            hasRouterParams
            v-model="tabs.selected3"
          ></OpusTabs>
          <h4 class="mt-20">
            Simple Tab bar2 - tab can be selected via router params
          </h4>
          <OpusTabs
            id="routerTab2"
            :tabs="tabs.short3"
            hasRouterParams
            v-model="tabs.selected3"
          ></OpusTabs>
          <h4 class="mt-20">Simple tabs bar (with count)</h4>
          <OpusTabs :tabs="tabs.short3" showTabCount></OpusTabs>
          <h4 class="mt-20">Long tabs (with count)</h4>
          <OpusTabs :tabs="tabs.long" showTabCount></OpusTabs>
        </section>

        <section>
          <h3 ref="tables">Tables</h3>
          <p><strong>Size</strong></p>
          <input
            type="radio"
            v-model="tableOptions.size"
            value="sm"
            name="Size"
          />Small
          <input
            type="radio"
            v-model="tableOptions.size"
            value="lg"
            name="Size"
          />Large
          <p><strong>Options</strong></p>
          <input
            type="checkbox"
            v-model="tableOptions.responsive"
            name="Responsive"
          />Responsive
          <input
            type="checkbox"
            v-model="tableOptions.selectable"
            name="Responsive"
          />Selectable
          <p><strong>Type</strong></p>
          <input
            type="radio"
            v-model="tableOptions.layout"
            value="simple"
            name="Type"
          />Simple
          <input
            type="radio"
            v-model="tableOptions.layout"
            value="default"
            name="Type"
          />Default
          <p><strong>Table Styles</strong></p>
          <input
            type="radio"
            v-model="tableOptions.tableBorderStyle"
            value="default"
          />Default
          <input
            type="radio"
            v-model="tableOptions.tableBorderStyle"
            value="outline"
          />Outline
          <input
            type="radio"
            v-model="tableOptions.tableBorderStyle"
            value="borderless"
          />Borderless
          <input
            type="radio"
            v-model="tableOptions.tableBorderStyle"
            value="bordered"
          />Bordered
          <div :class="{ 'table-container': tableOptions.responsive }">
            <OpusTable
              id="opus-table"
              :layout="tableOptions.layout"
              :fields="tableOptions.fields"
              :items="tableOptions.items"
              :size="tableOptions.size"
              :menuOptions="tableOptions.menuOptions"
              :selectable="tableOptions.selectable"
              :tableBorderStyle="tableOptions.tableBorderStyle"
              thClasses="opus-bg-green-1"
              :perPage="3"
              :currentPage="1"
              filter="asdf"
            >
              <template #cell(index)="data">
                {{ data.index + 1 }}
              </template>
              <template #emptyfiltered="scope">
                <span class="red-1">{{ scope.emptyFilteredText }}</span>
              </template>
              <template #empty="scope">
                <span class="red-1">{{ scope.emptyText }}</span>
              </template>
            </OpusTable>
          </div>
        </section>

        <section>
          <h3 ref="course-cards">Course Selection Cards</h3>
          <div class="d-flex col-gap-20">
            <CourseSelectionCard
              type="live"
              :price="399"
              selected
            ></CourseSelectionCard>
            <CourseSelectionCard
              type="prerec"
              :price="199"
              has-shadow
            ></CourseSelectionCard>
            <CourseSelectionCard
              type="bundle"
              :price="499"
            ></CourseSelectionCard>
          </div>
        </section>

        <section>
          <h3 ref="crumbs">Bread Crumbs</h3>
          <h5>Small</h5>
          <OpusBreadCrumb variant="sm">Dashboard</OpusBreadCrumb>
          <h5>Large</h5>
          <OpusBreadCrumb variant="lg">Dashboard</OpusBreadCrumb>
        </section>

        <section>
          <h3 ref="dots">Pagination Dots</h3>
          <div class="opus-bg-green-1 p-15">
            <OpusDots :count="6" :position="4"></OpusDots>
          </div>
          <div class="opus-bg-blue-2 p-15">
            <OpusDots :count="6" :position="4" variant="white"></OpusDots>
          </div>
        </section>

        <!-- <section>
          <h3 ref="multiselect">Single Select (small)</h3>
          <OpusSelect
            :options="singleSelect.options"
            v-model="singleSelect.small"
            placeholder="Placeholder Text"
          ></OpusSelect>
          <p>Selected Value : {{ JSON.stringify(singleSelect.small) }}</p>
          <h3>Single Select (large)</h3>
          <OpusSelect
            :options="singleSelect.options"
            v-model="singleSelect.large"
            placeholder="Placeholder Text"
            size="lg"
          ></OpusSelect>
          <p>Selected Value : {{ JSON.stringify(singleSelect.large) }}</p>
          <h3>Multiselect - Inline selection summary</h3>
          <OpusSelect
            :options="multiSelect.options1"
            placeholder="Select one or more options"
            v-model="multiSelect.value1"
            multiple
            size="lg"
            :showOptions="true"
          ></OpusSelect>
          <p>Selected Value : {{ JSON.stringify(multiSelect.value1) }}</p>
          <h3>Multiselect - Cumulative selection Summary</h3>
          <OpusSelect
            :options="multiSelect.options1"
            placeholder="Select one or more options"
            v-model="multiSelect.value2"
            multiple
            size="lg"
          ></OpusSelect>
          <p>Selected Value : {{ JSON.stringify(multiSelect.value2) }}</p>
          <h3>
            Multiselect - Cumulative selection Summary with objects as input
          </h3>
          <OpusSelect
            :options="multiSelect.options3"
            placeholder="Select one or more options"
            v-model="multiSelect.value3"
            multiple
            trackBy="id"
            label="name"
            size="lg"
          ></OpusSelect>
          <p>Selected Value : {{ JSON.stringify(multiSelect.value3) }}</p>
          <h3>Multiselect - search</h3>
          <OpusSelect
            :options="multiSelect.options4"
            placeholder="Select one or more options"
            v-model="multiSelect.value4"
            multiple
            trackBy="id"
            label="country_name"
            size="lg"
            searchable
            :internal-search="false"
            :loading="multiSelect.isLoading"
            @search-change="getCountries"
            :showOptions="true"
          ></OpusSelect>
          <p>Selected Value : {{ JSON.stringify(multiSelect.value4) }}</p>
        </section> -->

        <section>
          <h3 ref="links">Text Links</h3>
          <OpusLink href="/styleguide">Text Link</OpusLink>
          <OpusLink disabled>Text Link</OpusLink>
          <OpusLink to="/home">Text Link</OpusLink>
        </section>

        <section>
          <h3 ref="toggle-tab">Toggle Tab</h3>
          <OpusToggleTab
            :labels="toggleTab.labels"
            v-model="toggleTab.value"
          ></OpusToggleTab>
        </section>

        <section>
          <h3 ref="switch">Switches (small/large)</h3>
          <OpusSwitch
            :labels="toggle.labels"
            v-model="toggle.value.sm"
          ></OpusSwitch>
          <br />
          <OpusSwitch
            :labels="toggle.labels"
            size="lg"
            v-model="toggle.value.lg"
          ></OpusSwitch>
        </section>

        <!-- <section>
          <h3 ref="slider">Slider</h3>
          <OpusSlider
            :max="100"
            :min="0"
            :marks="[0, 100]"
            :interval="10"
            tooltip="hover"
            v-model="slider.range"
          ></OpusSlider>
          <OpusSlider
            :max="25"
            :min="0"
            :marks="[0, 25]"
            :interval="1"
            variant="error"
            v-model="slider.range"
          ></OpusSlider>
        </section> -->

        <section>
          <h3 ref="pill">OpusPill</h3>
          <OpusPill>Pill Title</OpusPill>
        </section>

        <section>
          <h3 ref="dropdown">Dropdown</h3>
          <div class="d-flex col-gap-20">
            <OpusDropdown
              id="menu-dw1"
              position="dropup"
              align="left"
              :menuOptions="dropdown.menuOptions"
            >
            </OpusDropdown>
            <OpusDropdown
              id="menu-dw2"
              position="dropup"
              align="right"
              :menuOptions="dropdown.menuOptions"
            >
            </OpusDropdown>
            <OpusDropdown
              id="menu-dw3"
              position="dropdown"
              align="left"
              :menuOptions="dropdown.menuOptions"
            >
            </OpusDropdown>
            <OpusDropdown
              id="menu-dw4"
              no-arrow
              position="dropdown"
              align="right"
              :menuOptions="dropdown.menuOptions"
            >
            </OpusDropdown>
          </div>
          <div class="mt-15">
            <OpusDropdown
              id="menu-dw4"
              no-arrow
              position="dropdown"
              align="left"
              :menuOptions="dropdown.menuOptions"
            >
              <BaseButton
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                >Submit</BaseButton
              >
            </OpusDropdown>
          </div>
        </section>

        <section>
          <h3 ref="popover">Popover</h3>
          <OpusPopoverToolTip position="bottom"
            :title="popover.title"
            :content="popover.content"
            :trigger="popover.trigger"
          >
            <template #default>
              <p class="text-subtitle-1 d-inline-block" slot="reference">
                <span class="black-3">0 </span>
                <span class="blue-1">weeks</span>
              </p>
            </template>
          </OpusPopoverToolTip>
          <OpusPopoverToolTip position="bottom"
            :title="popover.title"
            :content="popover.content"
            :trigger="popover.trigger"
          >
            <template #content>
              <div>
                <div class="red-1">{{ popover.title }}</div>
                <p class="opus-bg-green-1">{{ popover.content }}</p>
              </div>
            </template>
            <template #default>
              <p class="text-subtitle-1 d-inline-block" slot="reference">
                <span class="black-3">Custom popover</span>
              </p>
            </template>
          </OpusPopoverToolTip>
        </section>

        <section>
          <h3 ref="circled-number">Circled Number</h3>
          <div class="d-flex col-gap-15">
            <OpusCircledNumber>1</OpusCircledNumber>
            <OpusCircledNumber>10</OpusCircledNumber>
            <OpusCircledNumber :selected="true">5</OpusCircledNumber>
          </div>
        </section>

        <section>
          <h3 ref="dialog">Dialogs</h3>
          <!-- Button trigger modal -->
          <BaseButton
            variant="error"
            data-toggle="modal"
            data-target="#deleteDialog"
          >
            Launch delete modal
          </BaseButton>
          <OpusDialog
            id="deleteDialog"
            title="Are you sure you want to delete?"
            desc="Space and color coding"
            note="Deleting will delete the record from the database permanently"
            okText="Yes, Delete"
            okVariant="error"
            cancelText="OK, Cancel"
            @ok="onOK"
          ></OpusDialog>
          <BaseButton
            class="ml-20"
            data-toggle="modal"
            data-target="#slotDialog"
          >
            Launch info modal
          </BaseButton>
          <OpusDialog
            id="slotDialog"
            title="Are you sure you want to delete?"
            desc="Space and color coding"
          >
            <template #footer>
              <BaseButton data-dismiss="modal" @click="onOK">OK</BaseButton>
            </template>
          </OpusDialog>
          <BaseButton
            class="ml-20"
            data-toggle="modal"
            data-target="#customDialog"
          >
            Launch custom modal
          </BaseButton>
          <OpusDialog
            id="customDialog"
            title="Are you sure you want to delete?"
            desc="Space and color coding"
            footerClasses="opus-bg-green-1 pt-30"
            no-header
          >
            <template #body>
              <div class="d-flex align-items-center justify-content-between">
                <span class="text-h3">Custom Content Title</span>
                <img src="/static/images/icons/close_icon.svg" />
              </div>
            </template>
            <template #footer>
              <BaseButton data-dismiss="modal" @click="onOK">OK</BaseButton>
            </template>
          </OpusDialog>
        </section>

        <section>
          <h3 ref="view-modal">View Details Modal</h3>
          <!-- Button trigger modal -->
          <BaseButton data-toggle="modal" data-target="#viewDocModal">
            View Doc Details
          </BaseButton>
          <OpusViewDetailsModal
            id="viewDocModal"
            :details="dialogs.doc"
            okText="Add to cart"
            @ok="onOK"
            @preview="onOK"
          ></OpusViewDetailsModal>
        </section>
        <section>
          <h3 ref="form-modal">Form Modals</h3>
          <!-- Button trigger modal -->
          <BaseButton data-toggle="modal" data-target="#formModal">
            Open Form
          </BaseButton>
          <OpusFormModal
            id="formModal"
            title="Ask us an HFE question!"
            okText="Submit"
            @ok="onOK"
          >
            <form class="opus-form">
              <div class="form-group">
                <label for="form-modal-email"
                  >Email address<span class="text-required"> *</span></label
                >
                <input
                  type="email"
                  class="form-control"
                  id="form-modal-email"
                  disabled
                  placeholder="Email"
                />
              </div>
              <div class="form-group">
                <label for="form-modal-password"
                  >Password<span class="text-required"> *</span></label
                >
                <input
                  type="password"
                  class="form-control"
                  id="form-modal-password"
                  placeholder="Password"
                />
              </div>
              <div class="form-group">
                <label for="form-modal-title"
                  >Title<span class="text-required"> *</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="form-modal-title"
                  placeholder="Title"
                />
              </div>
              <div class="form-group">
                <label for="form-modal-textarea"
                  >Content<span class="text-required"> *</span></label
                >
                <textarea
                  class="form-control"
                  id="form-modal-textarea"
                  placeholder="Content"
                  rows="3"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="form-modal-textarea1">Content</label>
                <textarea
                  class="form-control"
                  id="form-modal-textarea1"
                  placeholder="Content"
                  rows="3"
                ></textarea>
              </div>
            </form>
          </OpusFormModal>
          <BaseButton
            class="ml-20"
            data-toggle="modal"
            data-target="#customFormModal"
          >
            Open Custom Form
          </BaseButton>
          <OpusFormModal
            id="customFormModal"
            title="Consulting Request"
            okText="Submit"
            @ok="onOK"
          >
            <template #header>
              <div
                style="margin: 16px 12px; height: 40px; border-radius: 5px"
                class="d-flex align-items-center opus-bg-consulting"
              >
                <img
                  class="view-icon ml-20 mr-10"
                  src="/static/images/icons/close_icon_white.svg"
                  alt="Modal icon"
                />
                <span class="text-h3 white-1 flex-grow"
                  >Consulting Request</span
                >
                <img
                  data-dismiss="modal"
                  class="cursor-pointer mr-10 opus-icon"
                  src="/static/images/icons/close_icon_white.svg"
                  alt="Close modal"
                />
              </div>
            </template>
            <form class="opus-form">
              <span class="text-h4-bold mt-20 blue-1"
                >Provide us more details</span
              >
              <div class="form-group">
                <label for="custom-form-modal-email"
                  >Email address<span class="text-required"> *</span></label
                >
                <input
                  type="email"
                  class="form-control"
                  id="custom-form-modal-email"
                  disabled
                  placeholder="Email"
                />
              </div>
              <div class="form-group">
                <label for="custom-form-modal-password"
                  >Password<span class="text-required"> *</span></label
                >
                <input
                  type="password"
                  class="form-control"
                  id="custom-form-modal-password"
                  placeholder="Password"
                />
              </div>
              <hr />
            </form>
          </OpusFormModal>
        </section>

        <section>
          <h3>Icons using individual icon components</h3>
          <checkbox-checked></checkbox-checked>
          <h3>Icons using individual icon components with custom style</h3>
          <checkbox-checked
            style="width: 2em; height: 2em; color: #7952b3"
          ></checkbox-checked>
          <h3>Icons taking size of parent element</h3>
          <h1>Icon<checkbox-checked></checkbox-checked></h1>
          <h2>Icon<checkbox-checked></checkbox-checked></h2>
          <h3>Icon<checkbox-checked></checkbox-checked></h3>
          <h4>Icon<checkbox-checked></checkbox-checked></h4>
          <h5>Icon<checkbox-checked></checkbox-checked></h5>
          <h6>Icon<checkbox-checked></checkbox-checked></h6>
          <h3 ref="icons">Icons using OpusIcon helper component</h3>
          <OpusIcon
            icon="checkbox-checked"
            class="red-1"
            font-scale="0.75"
          ></OpusIcon>
          <OpusIcon icon="checkbox-unchecked" class="green-4"></OpusIcon>
          <OpusIcon
            icon="checkbox-indeterminate"
            class="orange-1"
            style="width: 120px; height: 120px"
          ></OpusIcon>
        </section>
      </div>
      <div class="col-xs-3">
        <div class="toc opus-scrollbar">
          <p class="text-h3">Components</p>
          <ul>
            <li><a @click="$refs['headers'].scrollIntoView()">Headers</a></li>
            <li>
              <a @click="$refs['font-family'].scrollIntoView()">Font-family</a>
            </li>
            <li>
              <a @click="$refs['font-system'].scrollIntoView()">Font System</a>
            </li>
            <li><a @click="$refs['colors'].scrollIntoView()">Colors</a></li>
            <li><a @click="$refs['buttons'].scrollIntoView()">Buttons</a></li>
            <li><a @click="$refs['tags'].scrollIntoView()">Tags</a></li>
            <li>
              <a @click="$refs['htnl5editor'].scrollIntoView()">HTML5 Editor</a>
            </li>
            <li>
              <a @click="$refs['search-bar'].scrollIntoView()">Search Bar</a>
            </li>
            <li>
              <a @click="$refs['pagination'].scrollIntoView()">Pagination</a>
            </li>
            <li><a @click="$refs['forms'].scrollIntoView()">Forms</a></li>
            <li><a @click="$refs['radio'].scrollIntoView()">Radio</a></li>
            <li><a @click="$refs['checkbox'].scrollIntoView()">Checkbox</a></li>
            <li><a @click="$refs['tabs'].scrollIntoView()">Tabs</a></li>
            <li><a @click="$refs['tables'].scrollIntoView()">Tables</a></li>
            <li>
              <a @click="$refs['course-cards'].scrollIntoView()"
                >Course Selection Cards</a
              >
            </li>
            <li>
              <a @click="$refs['crumbs'].scrollIntoView()">Bread Crumbs</a>
            </li>
            <li>
              <a @click="$refs['dots'].scrollIntoView()">Pagination Dots</a>
            </li>
            <li>
              <a @click="$refs['multiselect'].scrollIntoView()">Multiselect</a>
            </li>
            <li><a @click="$refs['links'].scrollIntoView()">Links</a></li>
            <li>
              <a @click="$refs['toggle-tab'].scrollIntoView()">Toggle Tab</a>
            </li>
            <li><a @click="$refs['switch'].scrollIntoView()">Switch</a></li>
            <li><a @click="$refs['slider'].scrollIntoView()">Slider</a></li>
            <li><a @click="$refs['pill'].scrollIntoView()">Pill</a></li>
            <li><a @click="$refs['dropdown'].scrollIntoView()">Dropdown</a></li>
            <li><a @click="$refs['popover'].scrollIntoView()">Popover</a></li>
            <li>
              <a @click="$refs['circled-number'].scrollIntoView()"
                >Circled Number</a
              >
            </li>
            <li>
              <a @click="$refs['dialog'].scrollIntoView()">Dialog Modal</a>
            </li>
            <li>
              <a @click="$refs['view-modal'].scrollIntoView()"
                >View Details Modal</a
              >
            </li>
            <li>
              <a @click="$refs['form-modal'].scrollIntoView()">Form Modal</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from './components/UIComponents/BaseButton.vue';
import OpusTag from './components/UIComponents/OpusTag.vue';
// import OpusEditor from './components/UIComponents/OpusEditor.vue';
import OpusSearchBar from './components/UIComponents/OpusSearchBar.vue';
import OpusPagination from './components/UIComponents/OpusPagination.vue';
import OpusTabs from './components/UIComponents/OpusTabs.vue';
import OpusTabPane from './components/UIComponents/OpusTabPane.vue';
import OpusTable from './components/UIComponents/OpusTable.vue';
import OpusRadio from './components/UIComponents/OpusRadio.vue';
import OpusRadioGroup from './components/UIComponents/OpusRadioGroup.vue';
// import OpusCheckbox from './components/UIComponents/OpusCheckbox.vue';
// import OpusCheckboxGroup from './components/UIComponents/OpusCheckboxGroup.vue';
import CourseSelectionCard from './components/Training/CourseSelectionCard.vue';
import OpusBreadCrumb from './components/UIComponents/OpusBreadCrumb.vue';
import OpusDots from './components/UIComponents/OpusDots.vue';
// import OpusSelect from './components/UIComponents/OpusSelect.vue';
import OpusLink from './components/UIComponents/OpusLink.vue';
import OpusToggleTab from './components/UIComponents/OpusToggleTab.vue';
import OpusSwitch from './components/UIComponents/OpusSwitch.vue';
// import OpusSlider from './components/UIComponents/OpusSlider.vue';
import OpusPill from './components/UIComponents/OpusPill.vue';
import OpusDropdown from './components/UIComponents/OpusDropdown.vue';
import OpusPopoverToolTip from './components/UIComponents/OpusPopoverToolTip.vue';
import OpusCircledNumber from './components/UIComponents/OpusCircledNumber.vue';
import OpusDialog from './components/UIComponents/OpusDialog.vue';
import OpusViewDetailsModal from './components/UIComponents/OpusViewDetailsModal.vue';
import OpusFormModal from './components/UIComponents/OpusFormModal.vue';
import OpusIcon from './components/UIComponents/OpusIcon.vue';
import CheckboxChecked from './components/UIComponents/icons/system/checkbox-checked.vue';
import { getAllCountries } from './apis/countriesList';

export default {
  name: 'StyleGuide',
  components: {
    BaseButton,
    OpusTag,
    // OpusEditor,
    OpusSearchBar,
    OpusPagination,
    OpusTabs,
    OpusTabPane,
    OpusTable,
    OpusRadio,
    OpusRadioGroup,
    // OpusCheckbox,
    // OpusCheckboxGroup,
    CourseSelectionCard,
    OpusBreadCrumb,
    OpusDots,
    // OpusSelect,
    OpusLink,
    OpusToggleTab,
    OpusSwitch,
    // OpusSlider,
    OpusPill,
    OpusDropdown,
    OpusPopoverToolTip,
    OpusCircledNumber,
    OpusDialog,
    OpusViewDetailsModal,
    OpusFormModal,
    OpusIcon,
    CheckboxChecked
  },
  created() {
    this.populateTableItems();
  },
  data() {
    return {
      fonts: [
        {
          title: 'Header 1 Nunito Light 42pt',
          class: 'text-h1',
          'font-weight': '300',
          'font-size': '42px',
          'line-height': '57px'
        },
        {
          title: 'Header 2 Nunito Light 36pt',
          class: 'text-h2',
          'font-weight': '300',
          'font-size': '36px',
          'line-height': '49px'
        },
        {
          title: 'Header 3 Nunito Regular 32pt',
          class: 'text-h3',
          'font-weight': '400',
          'font-size': '32px',
          'line-height': '44px'
        },
        {
          title: 'Header 4 Nunito Light 24pt',
          class: 'text-h4',
          'font-weight': '300',
          'font-size': '24px',
          'line-height': '33px'
        },
        {
          title: 'Header 4 Nunito Bold 24pt',
          class: 'text-h4-bold',
          'font-weight': '700',
          'font-size': '24px',
          'line-height': '33px'
        },
        {
          title: 'Header 5 Nunito Regular 24pt',
          class: 'text-h5',
          'font-weight': '600',
          'font-size': '24px',
          'line-height': '33px'
        },
        {
          title: 'Subtitle Nunito Bold 18pt',
          class: 'text-subtitle-1',
          'font-weight': '700',
          'font-size': '18px',
          'line-height': '25px'
        },
        {
          title: 'Subtitle Nunito Light 18pt',
          class: 'text-subtitle-2',
          'font-weight': '300',
          'font-size': '18px',
          'line-height': '25px'
        },
        {
          title: 'Subtitle Nunito Bold Small 18pt',
          class: 'text-subtitle-3',
          'font-weight': '700',
          'font-size': '16px',
          'line-height': '22px'
        },
        {
          title: 'Button Label Nunito Regular 18pt',
          class: 'text-button-label',
          'font-weight': '600',
          'font-size': '18px',
          'line-height': '25px'
        },
        {
          title: 'Button Label Nunito Regular 16pt',
          class: 'text-button-label-2',
          'font-weight': '600',
          'font-size': '16px',
          'line-height': '22px'
        },
        {
          title: 'Body 1 Nunito Regular 16pt',
          class: 'text-regular-large',
          'font-weight': '300',
          'font-size': '16px',
          'line-height': '22px'
        },
        {
          title: 'Body 1 Nunito Regular 14pt',
          class: 'text-regular-small',
          'font-weight': '300',
          'font-size': '14px',
          'line-height': '19px'
        },
        {
          title: 'Body 2 Nunito Regular 16pt',
          class: 'text-body-light',
          'font-weight': '400',
          'font-size': '14px',
          'line-height': '19px'
        },
        {
          title: 'Body 1 Nunito Small 12pt',
          class: 'text-regular-xsmall',
          'font-weight': '300',
          'font-size': '12px',
          'line-height': '16px'
        }
      ],
      colors: {
        green: {
          desc: 'Used for Buttons, Labels, Graphics, Buttons, Backgrounds, Hero Image and Training Badges',
          shades: [
            { background: '#204B5A', name: 'Green 1', classes: ['green-1'] },
            { background: '#007584', name: 'Green 2', classes: ['green-2'] },
            { background: '#1E5632', name: 'Green 3', classes: ['green-3'] },
            { background: '#42883B', name: 'Green 4', classes: ['green-4'] },
            { background: '#4C9E45', name: 'Green 5', classes: ['green-5'] },
            { background: '#EDF5EC', name: 'Green 6', classes: ['green-6'] }
          ]
        },
        blue: {
          desc: 'Used for Icons, Hyperlinks, Text Buttons and Backgrounds',
          shades: [
            { background: '#0B3C61', name: 'Blue 1', classes: ['blue-1'] },
            { background: '#0C3859', name: 'Blue 2', classes: ['blue-2'] },
            { background: '#00518A', name: 'Blue 3', classes: ['blue-3'] },
            { background: '#2055C0', name: 'Blue 4', classes: ['blue-4'] },
            { background: '#43B4E4', name: 'Blue 5', classes: ['blue-5'] },
            { background: '#0B3C61', name: 'Blue 6', classes: ['blue-6'] }
          ]
        },
        white: {
          desc: 'Used for Buttons and Backgrounds',
          shades: [
            { background: '#FFFFFF', name: 'White 1', classes: ['white-1'] },
            { background: '#F2F2F2', name: 'White 2', classes: ['white-2'] }
          ]
        },
        black: {
          desc: 'Used for Body Text, Outlines, Dividers',
          shades: [
            { background: '#000000', name: 'Black 1', classes: ['black-1'] },
            { background: '#333333', name: 'Black 2', classes: ['black-2'] },
            { background: '#828282', name: 'Black 3', classes: ['black-3'] },
            { background: '#D3D6D9', name: 'Black 4', classes: ['black-4'] }
          ]
        },
        red: {
          desc: 'Used to highlight Error and Warning messages',
          shades: [
            { background: '#B00505', name: 'Red 1', classes: ['red-1'] },
            { background: '#CF5F28', name: 'Red 2', classes: ['red-2'] },
            { background: '#FFC62F', name: 'Red 3', classes: ['red-3'] }
          ]
        },
        teal: {
          desc: 'Used for Document Graphics',
          shades: [
            { background: '#59B7B3', name: 'Teal 1', classes: ['teal-1'] },
            { background: '#38CAC7', name: 'Teal 2', classes: ['teal-2'] }
          ]
        },
        orange: {
          desc: 'Used for LED Course Graphics',
          shades: [
            { background: '#EC8D25', name: 'Orange 1', classes: ['orange-1'] },
            { background: '#FFD362', name: 'Orange 2', classes: ['orange-2'] }
          ]
        },
        'light-blue': {
          desc: 'Used for Training Graphics',
          shades: [
            {
              background: '#43B4E4',
              name: 'Light Blue 1',
              classes: ['light-blue-1']
            },
            {
              background: '#79B0DE',
              name: 'Light Blue 2',
              classes: ['light-blue-2']
            }
          ]
        },
        main: {
          desc: 'Used for Main Tile Design of Graphics, Root Cause Graphics',
          shades: [
            {
              background: '#92C83E',
              name: 'Main Green',
              classes: ['green-main']
            }
          ]
        },
        background: {
          desc: 'Background colors',
          shades: [
            {
              color: '#000000',
              background: '#F0F6FF',
              name: 'Blue 1',
              text: 'Text',
              classes: ['opus-bg-blue-1']
            },
            {
              color: '#FFFFFF',
              background: '#0B3C61',
              name: 'Blue 2',
              text: 'Text',
              classes: ['opus-bg-blue-2']
            },
            {
              color: '#000000',
              background: '#EDF5EC',
              name: 'Green 1',
              text: 'Text',
              classes: ['opus-bg-green-1']
            },
            {
              color: '#FFFFFF',
              background: '#59B7B3',
              name: 'Documents',
              text: 'Text',
              classes: ['opus-bg-doc', 'opus-bg-teal-1']
            },
            {
              color: '#FFFFFF',
              background: '#43B4E4',
              name: 'Trainings',
              text: 'Text',
              classes: ['opus-bg-training', 'opus-bg-blue-5']
            },
            {
              color: '#FFFFFF',
              background: '#92C83E',
              name: 'Tools',
              text: 'Text',
              classes: ['opus-bg-tool', 'opus-bg-green-main']
            },
            {
              color: '#FFFFFF',
              background: '#79B0DE',
              name: 'Consulting',
              text: 'Text',
              classes: ['opus-bg-consulting', 'opus-bg-light-blue-2']
            }
          ]
        },
        variants: {
          desc: 'Showing info/success/warning/error variants',
          shades: [
            {
              color: '#333333',
              background: '#F2F2F2',
              name: 'Info',
              text: 'Info',
              classes: ['.opus-form .help-block.info']
            },
            {
              color: '#1E5632',
              background: '#EDF5EC',
              name: 'Success',
              text: 'Success',
              classes: ['.opus-form .help-block.success']
            },
            {
              color: '#B00505',
              background: '#FFEBEB',
              name: 'Error',
              text: 'Error',
              classes: ['.opus-form .help-block.error']
            }
          ]
        }
      },
      content: {
        ed1: '',
        ed2: '',
        ed3: ''
      },
      currentPage: 1,
      radio: {
        simple: 'apple',
        group1: {
          options: [
            'A',
            'B',
            { text: 'C', value: { c: false } },
            { text: 'D', value: { d: 1 }, disabled: true },
            'E',
            'F'
          ],
          value: 'A'
        },
        group2: {
          options: [
            { name: 'Apples', amount: 10 },
            { name: 'Oranges', amount: 12 },
            { name: 'Grapes', amount: 14 }
          ],
          value: 12
        }
      },
      checkBox: {
        simple: false,
        custom: 'yes',
        simple2: true,
        simple3: false
      },
      cbGroup: {
        selected: [],
        options: [
          { text: 'Oranges', value: 'oranges' },
          { text: 'Apples', value: 'apples' },
          { text: 'Grapes', value: 'grapes' }
        ]
      },
      cbGroup2: {
        selected: ['grapes'],
        options: [
          { name: 'Oranges', amount: 'oranges' },
          { name: 'Apples', amount: 'apples' },
          { name: 'Grapes', amount: 'grapes' },
          { name: 'Pineapple', amount: 'pineapple', disabled: true }
        ]
      },
      tabs: {
        short2: ['Tab 1', 'Tab 2', 'Tab 3'],
        selected2: 'Tab 1',
        short3: [
          {
            key: 'general',
            name: 'General',
            name2: 'General2',
            count: 4,
            count2: 8
          },
          {
            key: 'projects',
            name: 'Projects',
            name2: 'Projects2',
            count: 3,
            count2: 5
          },
          {
            key: 'notifications',
            name: 'Notifications',
            name2: 'Notifications2',
            count: 1,
            count2: 10
          }
        ],
        selected3: 'projects',
        long: [
          { key: 'tab1', name: 'Long Tab 1', count: 1 },
          { key: 'tab2', name: 'Long Tab 2', count: 2 },
          { key: 'tab3', name: 'Long Tab 3', count: 3 },
          { key: 'tab4', name: 'Long Tab 4', count: 4 },
          { key: 'tab5', name: 'Long Tab 5', count: 5 },
          { key: 'tab6', name: 'Long Tab 6', count: 6 },
          { key: 'tab7', name: 'Long Tab 7', count: 7 },
          { key: 'tab8', name: 'Long Tab 8', count: 8 },
          { key: 'tab9', name: 'Long Tab 9', count: 9 },
          { key: 'tab1', name: 'Long Tab 10', count: 10 }
        ]
      },
      tableOptions: {
        layout: 'simple',
        fields: [
          { key: 'id', label: 'ID', thStyle: { width: '50px' } },
          { key: 'name', label: 'Name', sortable: true },
          { key: 'email', label: 'Email', sortable: true },
          { key: 'company', label: 'Company' },
          { key: 'desc', label: 'Description', thStyle: { width: '25%' } }
        ],
        items: [],
        size: 'sm',
        responsive: false,
        filterItems: (item) => item.email.includes('user2'),
        menuOptions: [
          {
            key: 'email',
            icon: '/static/images/icons/edit_icon_new.svg',
            name: this.getName,
            fn: this.show
          },
          {
            key: 'edit',
            name: 'Edit',
            icon: '/static/images/icons/edit_icon_new.svg',
            fn: this.show
          },
          {
            key: 'delete',
            name: 'Delete',
            icon: '/static/images/icons/delete_icon.svg',
            classList: ['opus-bg-green-1 green-1'],
            fn: this.show
          }
        ],
        selectable: false,
        tableBorderStyle: 'default'
      },
      singleSelect: {
        options: [
          'list item 1',
          'list item 2',
          'list item 3',
          'list item 4',
          'list item 5',
          'list item 6',
          'list item 7',
          'list item 8',
          'list item 9',
          'list item 10',
          'list item 11',
          'list item 12'
        ],
        small: 'list item 1',
        large: 'list item 1'
      },
      multiSelect: {
        options1: [
          'list item 1',
          'list item 2',
          'list item 3',
          'list item 4',
          'list item 5',
          'list item 6',
          'list item 7',
          'list item 8',
          'list item 9',
          'list item 10',
          'list item 11',
          'list item 12'
        ],
        value1: ['list item 1'],
        value2: ['list item 1'],
        options3: [
          { id: 'id1', name: 'Option1', title: 'Title1' },
          { id: 'id2', name: 'Option2', title: 'Title2' },
          { id: 'id3', name: 'Option3', title: 'Title3' }
        ],
        value3: [],
        options4: [],
        value4: [],
        isLoading: false
      },
      toggleTab: {
        value: 'start',
        labels: {
          start: 'Large Large Large Large Large Large Text Title 1',
          end: 'Large Large Large Large Large Large Text Title 1'
        }
      },
      toggle: {
        value: {
          sm: true,
          lg: false
        },
        labels: {
          on: 'On',
          off: 'Off'
        }
      },
      slider: {
        range: 0
      },
      dropdown: {
        menuOptions: [
          {
            key: 'menu1',
            name: 'Custom Menu Item 1',
            classes: 'opus-bg-green-1 gray-1',
            contentClasses: ['red-1']
          },
          {
            key: 'menu2',
            name: 'Menu Item 2'
          },
          {
            key: 'menu3',
            name: 'Menu Item 3'
          },
          {
            key: 'divider1',
            role: 'divider'
          },
          {
            key: 'edit',
            name: 'Edit',
            icon: '/static/images/icons/edit_icon_new.svg',
            fn: this.show
          },
          {
            key: 'manage',
            name: 'Disabled Menu',
            disabled: true,
            fn: this.show
          },
          {
            key: 'delete',
            name: 'Delete',
            icon: '/static/images/icons/delete_icon.svg',
            fn: this.show,
            classes: 'opus-bg-red-1',
            contentClasses: 'red-1'
          }
        ]
      },
      popover: {
        title: 'Sample Title',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut neque, nisl elit, odio elit. Sagittis non, vitae neque lectus vitae augue arcu vitae. Est cursus non commodo odio. Non cras mattis tristique faucibus adipiscing turpis lacus risus id.',
        placement: 'bottom',
        trigger: 'hover'
      },
      dialogs: {
        doc: {
          icon: '/static/images/icons/close_icon_white.svg',
          resource_category: 'Document',
          background: 'opus-doc-bg',
          sub_category: 'Use Profile',
          title: 'Nursing Profile',
          desc: 'The All Access purchase provides access to all of OPUS’ use environment descriptions for 1 year from the purchase date. The purchase includes unlimited downloads, so you can download the same use environment description multiple times.',
          items: [
            'Demographic characteristics',
            'Occupation',
            'Education/certification'
          ],
          price: 999
        }
      }
    };
  },
  methods: {
    show(arg) {
      console.log(`show args : ${JSON.stringify(arg)}`);
    },
    getName(row) {
      return `View ${row.name}`;
    },
    selectPage(page) {
      this.currentPage = page;
    },
    populateTableItems() {
      const numItems = 50;
      for (let i = 0; i < numItems; i += 1) {
        this.tableOptions.items.push({
          id: i,
          name: `Test User${i}`,
          email: `test.user${i}@ul.com`,
          company: 'UL.com',
          // desc: `Large Description about the company${i} owned by Test User${i}`,
          desc: 'Description'
        });
      }
    },
    onOK() {
      this.$notify({
        type: 'success',
        title: 'Success',
        text: 'Successful Operation'
      });
    },
    getAllCountries,
    async getCountries(query) {
      this.multiSelect.isLoading = true;
      const list = await this.getAllCountries();
      console.log(list.length);
      this.multiSelect.options4 = list.filter((item) =>
        item.country_name.includes(query)
      );
      this.multiSelect.isLoading = false;
    }
  }
};
</script>

<style scoped>
.style-guide {
  margin-bottom: 300px;
}
h1.title {
  padding-right: 25px;
  padding-left: 25px;
  font-size: 48px;
}
.toc {
  position: fixed;
  top: 0;
  bottom: 0;
  margin-top: 80px;
  padding: 15px;
  overflow-y: auto;
  right: 0;
  border: 0.5px solid #e3e3e3;
  background: white;
}
.toc ul {
  margin-left: 30px;
}
.toc ul li a {
  cursor: pointer;
}
section {
  padding-right: 25px;
  padding-left: 25px;
  padding-bottom: 25px;
  border-bottom: 0.5px solid #e3e3e3;
}
.table-container {
  width: 500px;
  height: 400px;
}
section h3 {
  text-decoration: underline;
  margin-bottom: 30px;
}
p {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
