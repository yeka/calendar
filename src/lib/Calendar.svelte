<script lang="ts">
    import { Calendar, type MonthInfo, type Holiday } from "./Calendar";

    export interface ICalendar {
        id: string,
        year: number,
        holidays?: Holiday,
        dayStartWithMonday?: boolean,
    }


    let {id, year, holidays = {public: {}, joint: {}}, dayStartWithMonday = true}: ICalendar = $props()
    Calendar.setHolidays(holidays)

    const x1 = 120
    const dx = 40 // distance between dates
    const y0 = 120
    const y1 = 180
    const dy = 25

    const mx = 400
    const my = 330

</script>

{#snippet month(info: MonthInfo, xAdjust = 0, yAdjust = 0)}
    <rect x={xAdjust + 50} y={yAdjust + y0 - 30} width="380" height="315" rx="15" fill="#d0d0ff" fill-opacity="40%"/>

    <rect x={xAdjust + 80} y={yAdjust + y0 + 11} width="320" height="26" rx="15" fill="white" fill-opacity="40%"/>

    <text class="month" x={xAdjust + x1 + 3 * dx} y={yAdjust + y0 - 0}>{info.month}</text>

    {#each info.days as day,k}
    <text class="day{(k + (dayStartWithMonday ? 1 : 0)) % 7}" x={xAdjust + x1 + k*dx} y={yAdjust + y0 + 30}>{day}</text>
    {/each}

    {#each {length: info.lines} as _, i}
    <g class="week">
        {#each info.days as day,k}
        <g class="day {info.isPublicHoliday(i,k)?"public":""} {info.isJointHoliday(i,k)?"joint":""}">
            {#if info.isPublicHoliday(i,k) || info.isJointHoliday(i,k)}
            <circle r=15 cx={xAdjust + x1 + k * dx} cy={yAdjust + y1 + i * dy - 6.5} fill="{info.isPublicHoliday(i,k) ? "red" : "blue"}" />
            <title>{(info.isJointHoliday(i,k) ? "Cuti Bersama ":"") + info.holiday(i, k)}</title>
            {/if}
            <text class="day{(k + (dayStartWithMonday ? 1 : 0)) % 7}" x={xAdjust + x1 + k*dx} y={yAdjust + y1 + dy * i}>{info.dayNum(i,k)}</text>
        </g>
        {/each}
    </g>
    {/each}

    {#each info.holidays() as v, i}
    <text class="holiday" x={xAdjust + x1 - 30} y={yAdjust + y1 + i*16 + 150}>{v}</text>
    {/each}
{/snippet}

<svg {id} width="100%" height="100%" viewBox="0,0,1920,1080" xmlns="http://www.w3.org/2000/svg">
    <style>
        text {
            font-weight: bold;
            font-family: arial;
            fill: black;
            text-anchor: middle;
            font-size: 18px;
        }
        text.day0 {
            fill: red;
        }
        text.day6 {
            fill: blue;
        }
        .public text, .joint text {
            fill: white;
        }
        text.holiday {
            text-anchor: start;
            font-size: 14px;
            font-family: arial;
        }
        text.month {
            font-size: 24px;
            fill: #303090;
        }
        text.year {
            font-size: 72px;
            text-anchor: middle;
        }
    </style>

    <text class="year" x=960 y=80>{year}</text>

    {#each {length: 12} as _, i}
        {@render month(Calendar.getMonthInfo(year, 1+i, dayStartWithMonday), 142.5 + 385 * (i % 4), 10 + 320 * Math.floor(i/4))}
    {/each}
</svg>

<style>
    svg {
        background-color: #ffffff;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cdefs%3E%3CradialGradient id='a' cx='400' cy='400' r='50%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%230EF'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='400' cy='400' r='70%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%230FF'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='800'/%3E%3Cg fill-opacity='.8'%3E%3Cpath fill='url(%23b)' d='M998.7 439.2c1.7-26.5 1.7-52.7 0.1-78.5L401 399.9c0 0 0-0.1 0-0.1l587.6-116.9c-5.1-25.9-11.9-51.2-20.3-75.8L400.9 399.7c0 0 0-0.1 0-0.1l537.3-265c-11.6-23.5-24.8-46.2-39.3-67.9L400.8 399.5c0 0 0-0.1-0.1-0.1l450.4-395c-17.3-19.7-35.8-38.2-55.5-55.5l-395 450.4c0 0-0.1 0-0.1-0.1L733.4-99c-21.7-14.5-44.4-27.6-68-39.3l-265 537.4c0 0-0.1 0-0.1 0l192.6-567.4c-24.6-8.3-49.9-15.1-75.8-20.2L400.2 399c0 0-0.1 0-0.1 0l39.2-597.7c-26.5-1.7-52.7-1.7-78.5-0.1L399.9 399c0 0-0.1 0-0.1 0L282.9-188.6c-25.9 5.1-51.2 11.9-75.8 20.3l192.6 567.4c0 0-0.1 0-0.1 0l-265-537.3c-23.5 11.6-46.2 24.8-67.9 39.3l332.8 498.1c0 0-0.1 0-0.1 0.1L4.4-51.1C-15.3-33.9-33.8-15.3-51.1 4.4l450.4 395c0 0 0 0.1-0.1 0.1L-99 66.6c-14.5 21.7-27.6 44.4-39.3 68l537.4 265c0 0 0 0.1 0 0.1l-567.4-192.6c-8.3 24.6-15.1 49.9-20.2 75.8L399 399.8c0 0 0 0.1 0 0.1l-597.7-39.2c-1.7 26.5-1.7 52.7-0.1 78.5L399 400.1c0 0 0 0.1 0 0.1l-587.6 116.9c5.1 25.9 11.9 51.2 20.3 75.8l567.4-192.6c0 0 0 0.1 0 0.1l-537.3 265c11.6 23.5 24.8 46.2 39.3 67.9l498.1-332.8c0 0 0 0.1 0.1 0.1l-450.4 395c17.3 19.7 35.8 38.2 55.5 55.5l395-450.4c0 0 0.1 0 0.1 0.1L66.6 899c21.7 14.5 44.4 27.6 68 39.3l265-537.4c0 0 0.1 0 0.1 0L207.1 968.3c24.6 8.3 49.9 15.1 75.8 20.2L399.8 401c0 0 0.1 0 0.1 0l-39.2 597.7c26.5 1.7 52.7 1.7 78.5 0.1L400.1 401c0 0 0.1 0 0.1 0l116.9 587.6c25.9-5.1 51.2-11.9 75.8-20.3L400.3 400.9c0 0 0.1 0 0.1 0l265 537.3c23.5-11.6 46.2-24.8 67.9-39.3L400.5 400.8c0 0 0.1 0 0.1-0.1l395 450.4c19.7-17.3 38.2-35.8 55.5-55.5l-450.4-395c0 0 0-0.1 0.1-0.1L899 733.4c14.5-21.7 27.6-44.4 39.3-68l-537.4-265c0 0 0-0.1 0-0.1l567.4 192.6c8.3-24.6 15.1-49.9 20.2-75.8L401 400.2c0 0 0-0.1 0-0.1L998.7 439.2z'/%3E%3C/g%3E%3C/svg%3E");
        background-attachment: fixed;
        background-size: cover;
    }
</style>