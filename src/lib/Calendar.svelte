<script lang="ts">
    import { Calendar, type MonthInfo, type Holiday } from "./Calendar";
    import Wallpaper from "/Colourful-Wave-White-Abstract-Wallpaper-28538.jpg"

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
    <rect x={xAdjust + 50} y={yAdjust + y0 - 30} width="380" height="315" rx="15" fill="white" fill-opacity="40%"/>
    <!-- <rect x={xAdjust + 50} y={yAdjust + y0 - 30} width="190" height="315" rx="15" /> -->

    <rect x={xAdjust + 80} y={yAdjust + y0 + 11} width="320" height="26" rx="15" fill="white" fill-opacity="40%"/>

    <!-- <text class="month" transform="translate({xAdjust + dx}, {yAdjust + y0 + dy}) rotate(270)">{info.month}</text> -->
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

<svg {id} width="100%" height="100%" viewBox="0,0,1920,1080" style="background-color: #a0a0d0; background-image: url({Wallpaper})" xmlns="http://www.w3.org/2000/svg">
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

    <!-- <rect x=0 y=0 width=1920 height=1080 fill="none" style="stroke-width:1;stroke:rgb(255,0,0)"></rect> -->
<!--
    <rect x=0 y=90 width=480 height=330 fill="none" style="stroke-width:1;stroke:rgb(0,0,0)"></rect>
    <rect x=480 y=90 width=480 height=330 fill="none" style="stroke-width:1;stroke:rgb(0,0,0)"></rect>
    <rect x=960 y=90 width=480 height=330 fill="none" style="stroke-width:1;stroke:rgb(0,0,0)"></rect>
    <rect x=1440 y=90 width=480 height=330 fill="none" style="stroke-width:1;stroke:rgb(0,0,0)"></rect>

    <rect x=0 y=420 width=480 height=330 fill="none" style="stroke-width:1;stroke:rgb(0,0,0)"></rect>
    <rect x=480 y=420 width=480 height=330 fill="none" style="stroke-width:1;stroke:rgb(0,0,0)"></rect>
    <rect x=960 y=420 width=480 height=330 fill="none" style="stroke-width:1;stroke:rgb(0,0,0)"></rect>
    <rect x=1440 y=420 width=480 height=330 fill="none" style="stroke-width:1;stroke:rgb(0,0,0)"></rect>

    <rect x=0 y=750 width=480 height=330 fill="none" style="stroke-width:1;stroke:rgb(0,0,0)"></rect>
    <rect x=480 y=750 width=480 height=330 fill="none" style="stroke-width:1;stroke:rgb(0,0,0)"></rect>
    <rect x=960 y=750 width=480 height=330 fill="none" style="stroke-width:1;stroke:rgb(0,0,0)"></rect>
    <rect x=1440 y=750 width=480 height=330 fill="none" style="stroke-width:1;stroke:rgb(0,0,0)"></rect> -->

    {#each {length: 12} as _, i}
        {@render month(Calendar.getMonthInfo(year, 1+i, dayStartWithMonday), 142.5 + 385 * (i % 4), 10 + 320 * Math.floor(i/4))}
    {/each}
</svg>
