<template>
    <div class="tableWrap">
        <b-container class="my-5">
            <h1 class="w-100 tableWrap__title">Table UI</h1>
            <div class="tableWrap__filters d-flex align-items-center justify-content-between">
                <div class="sorting d-flex justify-content-between align-items-center col-6 px-0">
                    <b>Sorting by:</b>
                    <b-button
                        variant="outline-success"
                        class="sorting__btn"
                        v-for="(select,id) in selected" :key="id"
                        :class="{'active':!id}"
                        @click="selectedFirst(select)"
                    >
                        {{select.text}}
                    </b-button>
                </div>
                <div class="d-flex align-items-center justify-content-between col-6 pl-4 pr-0">
                    <b-button
                        variant="outline-danger"
                        v-if="forDelete.length === 0"
                        disabled
                        class="btn__delete"
                    >Delete</b-button>
                    <b-button
                        v-else
                        variant="outline-danger"
                        class="btn__delete"
                        @click="checkDelete()"
                    >Delete ({{forDelete.length}})</b-button>
                    <b-form-select class="select-page" :options="options" v-model="select"></b-form-select>
                    <div class="pagination">
                        <b-button
                            variant="outline-success"
                            @click="prevPage"
                            class="btn__page"
                            :class="{disabled:!page.current}"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="5" height="8" viewBox="0 0 5 8" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4 0L0 4L4 8L4.9375 7.0625L1.875 4L4.9375 0.9375L4 0Z" fill="#333333"/>
                            </svg>
                        </b-button>
                        <span class="pagination__val">
                            <b>{{page.current+1}}-{{select}}</b> of <b>{{page.all}}</b>
                        </span>
                        <b-button
                            variant="outline-success"
                            @click="nextPage"
                            class="btn__page"
                            :class="{disabled:page.current+1===page.all}"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="5" height="8" viewBox="0 0 5 8" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.9375 0L4.9375 4L0.9375 8L0 7.0625L3.0625 4L0 0.9375L0.9375 0Z" fill="#5B5E77"/>
                            </svg>
                        </b-button>
                    </div>
                    <b-dropdown id="selectCol" :text="selected.length+' columns selected'" class="select__columns">
                        <b-form-checkbox
                            v-model="allSelected"
                            :indeterminate="indeterminate"
                            aria-describedby="flavours"
                            aria-controls="flavours"
                            class="ml-2"
                            @change="toggleAll"
                        >
                            <b>{{ allSelected ? 'Un-select All' : 'Select All' }}</b>
                        </b-form-checkbox>
                        <b-form-checkbox-group
                            id="flavors"
                            v-model="selected"
                            :options="flavours"
                            name="flavors"
                            class="mx-2"
                            aria-label="Individual flavours"
                            stacked
                        ></b-form-checkbox-group>
                    </b-dropdown>
                </div>
            </div>
            <div class="tableContent">
                <b-row>
                    <b-col class="col-1">
                        <b-form-checkbox
                            v-model="deleteAll"
                            :indeterminate="deleteInter"
                        /></b-col>
                    <b-col
                        v-for="(select, id) in selected"
                        :key="id"
                        :class="{'col-2':select.text==='Product (100g serving)','d-flex':!id}"
                    >
                        <b-form-checkbox
                            v-if="!id"
                            v-model="sorting"
                            :indeterminate="sortingInter"
                            class="btn__sorting"
                            :value='{status: true, name: select.value}'
                            :unchecked-value='{status: false, name: select.value}'
                        >
                            {{select.text}}
                        </b-form-checkbox>
                        <span
                            v-else
                        >{{select.text}}</span>
                    </b-col>
                    <b-col/>
                </b-row>
                <b-row
                    v-for="(product, id) in products"
                    class="productRow"
                    :key="id"
                >
                    <b-col class="col-1">
                        <b-form-checkbox
                            v-model="forDelete"
                            :key="product.id"
                            :value="product.id"
                        />
                    </b-col>
                    <b-col
                        v-for="(select, id) in selected"
                        :key="id"
                        :class="{'col-2':select.text==='Product (100g serving)'}"
                    >
                        {{product[select.value]}}
                    </b-col>
                    <b-col class="d-flex">
                        <b-button
                            class="deleteBtn"
                            variant="outline-danger"
                            @click="checkDelete(product.id)"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
                                <path d="M12.2326 1.88398H10.0963V0.495768C10.0963 0.216339 9.8709 0 9.59149 0C9.56438 0 9.54629 0.00905115 9.53747 0.0180816C9.52842 0.00905115 9.51034 0 9.50131 0H4.48046H4.4445H4.40834C4.12893 0 3.91259 0.216339 3.91259 0.495768V1.884H1.76726C1.1542 1.884 0.676514 2.36169 0.676514 2.97475V3.76801V4.75952H1.62302V14.9183C1.62302 15.5314 2.09168 16 2.70474 16H11.2951C11.9082 16 12.3859 15.5314 12.3859 14.9183V4.75952H13.3233V3.76801V2.97475C13.3233 2.36169 12.8455 1.88398 12.2326 1.88398ZM4.90411 0.991515H9.09574V1.88398H4.90411V0.991515ZM11.3853 14.9183C11.3853 14.9816 11.3582 15.0085 11.2951 15.0085H2.70474C2.64167 15.0085 2.61456 14.9816 2.61456 14.9183V4.7595H11.3853V14.9183ZM12.3228 3.76799H1.67706V2.97473C1.67706 2.91164 1.70417 2.8755 1.76724 2.8755H12.2326C12.2957 2.8755 12.3228 2.91164 12.3228 2.97473V3.76799Z" fill="#5B5E77"/>
                                <path d="M9.81689 5.92236H8.81635V14.1251H9.81689V5.92236Z" fill="#5B5E77"/>
                                <path d="M7.50915 5.92236H6.50861V14.1251H7.50915V5.92236Z" fill="#5B5E77"/>
                                <path d="M5.20153 5.92236H4.20099V14.1251H5.20153V5.92236Z" fill="#5B5E77"/>
                            </svg>
                            delete
                        </b-button>
                    </b-col>
                </b-row>
            </div>
            <b-modal v-model="deleteModal" hide-footer hide-header centered class="deleteModal">
                <p class="text-center">Are you sure you want to <b>delete {{this.forDelete.length}} item</b>?</p>
                <div class="d-flex align-items-center justify-content-around">
                    <b-button @click="deleteModal = false" class="deleteModal__cancel">Cancel</b-button>
                    <b-button @click="deleteArr" class="deleteModal__confirm">Confirm</b-button>
                </div>
            </b-modal>
            <b-modal v-model="deleteErrorModal" hide-footer hide-header centered>
                <p class="text-center">Error for <b>delete {{this.forDelete.length}} item</b></p>
                <div class="d-flex align-items-center justify-content-around">
                    <b-button @click="deleteErrorModal= false">Okay :(</b-button>
                </div>
            </b-modal>
        </b-container>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import { deleteProducts } from '../store/request'

export default {
    name: 'tableWrap',
    computed: {
        ...mapGetters([
            'getProducts',
        ]),
    },
    data(){
        return {
            products: [],
            productsAll: [],
            flavours: [
                { text: 'Product (100g serving)', value: { text: 'Product (100g serving)', value: 'product' } },
                { text: 'Calories', value: { text: 'Calories', value: 'calories' } },
                { text: 'Fat (g) ', value: { text: 'Fat (g) ', value: 'fat' } },
                { text: 'Carbs (g)', value: { text: 'Carbs (g)', value: 'carbs' } },
                { text: 'Protein (g)', value: { text: 'Protein (g)', value: 'protein' } },
                { text: 'Iron (%)', value: { text: 'Iron (%)', value: 'iron' } }
            ],
            selected: [
                { text: 'Product (100g serving)', value: 'product' },
                { text: 'Calories', value: 'calories' },
                { text: 'Fat (g) ', value: 'fat' },
                { text: 'Carbs (g)', value: 'carbs' },
                { text: 'Protein (g)', value: 'protein' },
                { text: 'Iron (%)', value: 'iron' }
            ],
            allSelected: true,
            indeterminate: false,
            select: '10',
            options: [
                { value: '10', text: '10 Per Page' },
                { value: '15', text: '15 Per Page' },
                { value: '20', text: '20 Per Page' }
            ],
            page: {
                current: 0,
                all: 0,
            },
            forDelete:[],
            deleteAll: false,
            deleteInter: false,
            deleteModal: false,
            deleteErrorModal: false,
            sorting: true,
            sortingInter: true
        }
    },
    methods: {
        toggleAll(checked) {
            if (checked){
                this.selected.splice(0, this.selected.length)
                for (let id in this.flavours){
                    this.selected.push(this.flavours[id].value)
                }
            }
        },
        nextPage(){
            if (this.page.current+2<=this.page.all){
                this.page.current++
                this.pageSelect()
            }
        },
        prevPage(){
            if (this.page.current) {
                this.page.current--
                this.pageSelect()
            }
        },
        pageSelect(){
            this.products = this.getProducts.slice((this.page.current * this.select),  ((this.page.current+1) * this.select))
        },
        selectedFirst(item){
            let curId = this.selected.findIndex(select => select.value === item.value)
            this.selected.splice(curId, 1)
            this.selected.unshift(item)
        },
        checkDelete(id){
            this.deleteModal = true
            if (this.forDelete.indexOf(id) === -1 && id) this.forDelete.push(id)
        },
        deleteArr(){
            this.deleteModal = false
            deleteProducts().then(this.delete, this.deleteError)
        },
        deleteError(){
            this.deleteErrorModal = true
        },
        delete(){
            this.forDelete.map((id)=>{
                let curId = this.productsAll.findIndex(product => product.id === id)
                this.productsAll.splice(curId, 1)
            })
            this.forDelete.splice(0,this.forDelete.length)
            this.pageSelect()
        },
        startSorting(bool, founded){
            this.productsAll = this.productsAll.sort((prev, next) => {
                if (bool){
                    if (prev[founded] > next[founded]) return 1;
                    if (prev[founded] < next[founded]) return -1;
                }else {
                    if (prev[founded] < next[founded]) return 1;
                    if (prev[founded] > next[founded]) return -1;
                }
            })
            this.pageSelect()
        }
    },
    watch: {
        selected(newVal) {
            if (newVal.length === 0) {
                this.indeterminate = false
                this.allSelected = false
            } else if (newVal.length === this.flavours.length) {
                this.indeterminate = false
                this.allSelected = true
            } else {
                this.indeterminate = true
                this.allSelected = false
            }
        },
        select(){
            this.page.all = Math.ceil(this.productsAll.length/this.select)
            if (this.page.current+1>this.page.all){
                this.page.current = this.page.all-1
            }
            this.pageSelect()
        },
        forDelete(val){
            if (val.length === 0) {
                this.deleteInter = false
                this.deleteAll = false
            } else if (val.length === this.products.length) {
                this.deleteInter = false
                this.deleteAll = true
            } else {
                this.deleteInter = true
                this.deleteAll = false
            }
        },
        deleteAll(checked){
            if (checked){
                this.forDelete.splice(0, this.forDelete.length)
                for (let index in this.products){
                    this.forDelete.push(this.products[index].id)
                }
            }
            if (!checked && !this.deleteInter){
                this.forDelete.splice(0, this.forDelete.length)
            }
        },
        sorting(val){
            this.startSorting(val.status, val.name)
        }
    },
    mounted() {
        this.pageSelect()
        this.productsAll = this.getProducts
        this.page.all = Math.ceil(this.productsAll.length/this.select)
    }
}
</script>
<style lang="sass">
    .tableContent
        margin-top: 15px
        background: #fff
        .row
            margin: 0
            .col
                font-size: 14px
            &:first-child
                padding: 16px 0
                border-bottom: 1px solid #EDEDED
                .col
                    font-weight: bold
            &:not(:first-child) .col
                display: flex
                align-items: center
                padding-top: 6px
                padding-bottom: 7px
            &:nth-child(2n+3)
                background: #F8F9FA
            &:hover
                cursor: pointer
                background: rgba(0, 161, 30, 0.07)
                .col:nth-child(2)
                    font-weight: bold
    .tableWrap
        width: 100%
        &__title
            font-weight: 600
            padding-bottom: 16px
            border-bottom: 2px solid #EDEDED
            margin-bottom: 16px
        &__filters
            button
                padding: 6px
            button, select, label, b
                font-size: 14px
            label
                line-height: 1.8

        .custom-select.select-page
            background: transparent no-repeat right center url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgb3BhY2l0eT0iMC44Ij4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNS4wNjI1IDEwTDE2IDEwLjkzNzVMMTIgMTQuOTM3NUw4IDEwLjkzNzVMOC45Mzc1IDEwTDEyIDEzLjA2MjVMMTUuMDYyNSAxMFoiIGZpbGw9IiM1QjVFNzciLz4KPG1hc2sgaWQ9Im1hc2swIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4PSI4IiB5PSIxMCIgd2lkdGg9IjgiIGhlaWdodD0iNSI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTUuMDYyNSAxMEwxNiAxMC45Mzc1TDEyIDE0LjkzNzVMOCAxMC45Mzc1TDguOTM3NSAxMEwxMiAxMy4wNjI1TDE1LjA2MjUgMTBaIiBmaWxsPSJ3aGl0ZSIvPgo8L21hc2s+CjxnIG1hc2s9InVybCgjbWFzazApIj4KPC9nPgo8L2c+Cjwvc3ZnPgo=")
            width: max-content
            height: auto
            padding: 5px 25px 5px 14px
            border: 1px solid #D5DAE0
            cursor: pointer
            &:focus
                box-shadow: 0 0 0 0.2rem rgba(0, 161, 30, 0.5)
        .sorting__btn
            border: 0 none
            color: #212529
            &:focus, .btn-outline-success.focus
                box-shadow: none
            &:hover
                color: #fff
                box-shadow: 0 0 0 0.2rem rgba(0, 161, 30, 0.5)
        .deleteBtn
            display: flex
            align-items: center
            border: 0 none
            color: #5B5E77
            opacity: 0
            transition: .2s
            & svg
                margin-right: 5px
            & path
                transition: .3s
            &:hover
                color: #fff
                & path
                    fill: #fff
        .custom-control
            padding-left: 0
            width: max-content
            display: flex
            align-items: center
            justify-content: center
            &-label
                cursor: pointer
                position: relative
                &:after, &:before
                    top: -7px
                    left: auto
            &-input
                &:checked ~ .custom-control-label:before
                    border-color: #00A11E
                    background-color: #00a11e
                &:focus ~ .custom-control-label:before
                    box-shadow: 0 0 0 0.2rem rgba(0, 161, 30, 0.25)
                &:indeterminate ~ .custom-control-label:before
                    border-color: #00A11E !important
                    background-color: #00a11e !important
        .pagination__val
            padding: 0 8px
            line-height: 2
        .btn
            &__delete
                padding: 5px 15px
                background: #00A11E
                color: #fff
                border: 1px solid transparent
                &.disabled
                    color: #fff
                    border: 1px solid #C6CBD4
                    opacity: 0.3
            &__page
                display: flex
                align-items: center
                justify-content: center
                padding: 11px 13px
                border: 1px solid #D5DAE0
                &.disabled
                    cursor: default
                    opacity: 0.3
                    &:hover path
                        fill: #333333
                    &:focus
                        box-shadow: none
                &:hover path
                    fill: #fff
            &__sorting
                position: relative
                width: max-content
                align-items: flex-start
                & .custom-control-input
                    &:focus
                        & ~ .custom-control-label
                            &:before
                                box-shadow: none
                    & ~ .custom-control-label
                        color: #00A11E
                        &:before
                            border-color: transparent !important
                            background-color: transparent !important
                        &:after
                            top: -4px
                            right: -17px
                            height: 30px
                            transition: .3s
                            transform: rotate(0deg)
                            background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDggMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMy4zNDM3NSAxMlYyLjU2MjVMMC45Mzc1IDQuOTM3NUwwIDRMNCAwTDggNEw3LjA2MjUgNC45Mzc1TDQuNjU2MjUgMi41NjI1VjEySDMuMzQzNzVaIiBmaWxsPSIjMzMzMzMzIi8+Cjwvc3ZnPgo=)
                    &:indeterminate ~ .custom-control-label
                        color: #212529
                        &:after
                            transform: rotate(-90deg)
                            background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDggMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMy4zNDM3NSAxMlYyLjU2MjVMMC45Mzc1IDQuOTM3NUwwIDRMNCAwTDggNEw3LjA2MjUgNC45Mzc1TDQuNjU2MjUgMi41NjI1VjEySDMuMzQzNzVaIiBmaWxsPSIjMzMzMzMzIi8+Cjwvc3ZnPgo=)
                    &:checked ~ .custom-control-label
                        color: #00A11E
                        &:after
                            transform: rotate(180deg)
                            background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDggMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMy4zNDM3NSAxMlYyLjU2MjVMMC45Mzc1IDQuOTM3NUwwIDRMNCAwTDggNEw3LjA2MjUgNC45Mzc1TDQuNjU2MjUgMi41NjI1VjEySDMuMzQzNzVaIiBmaWxsPSIjMzMzMzMzIi8+Cjwvc3ZnPgo=)
        .select
            &__columns
                button
                    border: 1px solid #D5DAE0
                    background: transparent
                    color: #5B5E77
                    display: flex
                    padding: 5px 5px 5px 15px
                    &:after
                        border: 0 none
                        margin-left: 0
                        margin-top: -2px
                        content: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgb3BhY2l0eT0iMC44Ij4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNS4wNjI1IDEwTDE2IDEwLjkzNzVMMTIgMTQuOTM3NUw4IDEwLjkzNzVMOC45Mzc1IDEwTDEyIDEzLjA2MjVMMTUuMDYyNSAxMFoiIGZpbGw9IiM1QjVFNzciLz4KPG1hc2sgaWQ9Im1hc2swIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4PSI4IiB5PSIxMCIgd2lkdGg9IjgiIGhlaWdodD0iNSI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTUuMDYyNSAxMEwxNiAxMC45Mzc1TDEyIDE0LjkzNzVMOCAxMC45Mzc1TDguOTM3NSAxMEwxMiAxMy4wNjI1TDE1LjA2MjUgMTBaIiBmaWxsPSJ3aGl0ZSIvPgo8L21hc2s+CjxnIG1hc2s9InVybCgjbWFzazApIj4KPC9nPgo8L2c+Cjwvc3ZnPgo=")
                        width: 20px
                        height: 20px
                    &:not(:disabled):not(.disabled):active
                        color: #5B5E77
                        background: transparent
                        border: 1px solid #D5DAE0
                &.show button
                    color: #5B5E77
                    background: transparent
                    border: 1px solid #D5DAE0
                .dropdown-menu
                    width: max-content
        .dropdown-menu
            max-height: 240px
            overflow-y: scroll
            .custom-checkbox label
                width: 100%
                display: flex
                align-items: center
                justify-content: space-between
                padding: 7px 14px 7px 34px
                &:before,&:after
                    top: 50%
                    transform: translateY(-50%)
                    left: 5px
    .productRow:hover .deleteBtn
        opacity: 1
    #selectFirst label
        border: 0 none
        color: #212529
        padding: 3px 6px
    .modal .modal-dialog
        max-width: 300px
        p
            font-size: 14px
    .deleteModal
        &__cancel.btn-secondary
            color: #212529
            background: transparent
            &:hover
                color: #fff
                background: #dc3545
        &__confirm.btn-secondary
            border: 1px solid #00A11E
            background: #00A11E
            &:hover
                box-shadow: 0 0 0 0.2rem rgba(0, 161, 30, 0.25)
                border: 1px solid #00A11E
                background: #00A11E
</style>
