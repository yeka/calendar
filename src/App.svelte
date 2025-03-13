<script lang="ts">
    import type { Holiday } from './lib/Calendar';
    // import Calendar from './lib/Calendar.svelte';
    import {default as Calendar, type ICalendar} from './lib/Calendar.svelte'

    const holidaysaa: Holiday = {
        public: {
            "Tahun Baru 2025 Masehi": { "2025-1": [1] },
            "Isra Mikraj Nabi Muhammad SAW": { "2025-1": [27] },
            "Tahun Baru Imlek 2576 Kongzili": { "2025-1": [29] },
            "Hari Suci Nyepi Tahun Baru Saka 1947": { "2025-3": [29] },
            "Hari Raya Idul Fitri 1446 Hijriyah": { "2025-3": [31], "2025-4": [1] },
            "Wafat Yesus Kristus": { "2025-4": [18] },
            "Kebangkitan Yesus Kristus (Paskah)": { "2025-4": [20] },
            "Hari Buruh Internasional": { "2025-5": [1] },
            "Hari Raya Waisak 2569 BE": { "2025-5": [12] },
            "Kenaikan Yesus Kristus": { "2025-5": [29] },
            "Hari Lahir Pancasila": { "2025-6": [1] },
            "Hari Raya Idul Adha 1446 Hijriyah": { "2025-6": [6] },
            "Tahun Baru Islam 1447 Hijriyah": { "2025-6": [27] },
            "Hari Kemerdekaan Republik Indonesia": { "2025-8": [17] },
            "Maulid Nabi Muhammad SAW": { "2025-9": [5] },
            "Hari Raya Natal": { "2025-12": [25] },
        },
        joint: {
            "Tahun Baru Imlek 2576 Kongzili": { "2025-1": [28] },
            "Hari Suci Nyepi Tahun Baru Saka 1947": { "2025-3": [28] },
            "Hari Raya Idul Fitri 1446 Hijriyah": { "2025-4": [2, 3, 4, 7] },
            "Hari Raya Waisak 2569 BE": { "2025-5": [13] },
            "Kenaikan Yesus Kristus": { "2025-5": [30] },
            "Hari Raya Idul Adha 1446 Hijriyah": { "2025-6": [9] },
            "Hari Raya Natal": { "2025-12": [26] },
        },
    }

    let props: ICalendar = {
        year: 2025,
        holidays: holidaysaa,
        dayStartWithMonday: true,
    }

</script>

<Calendar {...props}/>
