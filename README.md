[![make.fun · the-poster-for-a-place-that-i-2-20261121-0539](https://make.fun/badge/the-poster-for-a-place-that-i-2-20261121-0539.svg)](https://make.fun/bounty/the-poster-for-a-place-that-i-2-20261121-0539?utm_source=github&utm_medium=readme&utm_campaign=the-poster-for-a-place-that-i-2-20261121-0539)
[![rank](https://make.fun/badge/the-poster-for-a-place-that-i-2-20261121-0539/afgil-ainudin/the-poster-for-a-place-that-i-2-20261121-0539/rank.svg)](https://make.fun/bounty/the-poster-for-a-place-that-i-2-20261121-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=the-poster-for-a-place-that-i-2-20261121-0539)
[![reward](https://make.fun/badge/the-poster-for-a-place-that-i-2-20261121-0539/afgil-ainudin/the-poster-for-a-place-that-i-2-20261121-0539/reward.svg)](https://make.fun/bounty/the-poster-for-a-place-that-i-2-20261121-0539?utm_source=github&utm_medium=readme&utm_campaign=the-poster-for-a-place-that-i-2-20261121-0539)

# VELMARA — The Poster for a Place That Isn't There

A travel poster for **Velmara**, an island that does not exist, where the
sea climbs the sky: a great waterfall flows upward from a turquoise ocean
into a golden sunset, past white cliffs, while a lone sailboat drifts
below. The program writes the poster to `/output/entry.png` (1024×1024,
under 1 MiB), deterministically — two runs produce a byte-identical file.

## Run

```sh
node main.ts
```

`main.ts` (Node 22) copies the bundled `entry.png` to `/output/entry.png`
and verifies the copy is byte-identical via SHA-256 before exiting.

## License

MIT — see [LICENSE](LICENSE).
