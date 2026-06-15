import assert from 'node:assert/strict';
import { test } from 'node:test';

import { comparableGithubStats, githubStatsMatchRenderedFields } from '../../scripts/lib/github-stats-output.mjs';

test('github stats rendered comparison ignores fetched_at changes', () => {
  const previous = {
    alpha: {
      full_name: 'example/alpha',
      stars: 10,
      topics: ['ai', 'tools'],
      fetched_at: '2026-06-01T00:00:00.000Z',
    },
  };
  const next = {
    alpha: {
      fetched_at: '2026-06-16T00:00:00.000Z',
      topics: ['ai', 'tools'],
      stars: 10,
      full_name: 'example/alpha',
    },
  };

  assert.equal(githubStatsMatchRenderedFields(previous, next), true);
  assert.deepEqual(comparableGithubStats(next), {
    alpha: {
      full_name: 'example/alpha',
      stars: 10,
      topics: ['ai', 'tools'],
    },
  });
});

test('github stats rendered comparison detects visible stat changes', () => {
  assert.equal(
    githubStatsMatchRenderedFields(
      {
        alpha: {
          full_name: 'example/alpha',
          stars: 10,
          fetched_at: '2026-06-01T00:00:00.000Z',
        },
      },
      {
        alpha: {
          full_name: 'example/alpha',
          stars: 11,
          fetched_at: '2026-06-16T00:00:00.000Z',
        },
      },
    ),
    false,
  );
});

test('github stats rendered comparison detects stale-state changes', () => {
  assert.equal(
    githubStatsMatchRenderedFields(
      {
        alpha: {
          full_name: 'example/alpha',
          stars: 10,
          stale: true,
          fetched_at: '2026-06-01T00:00:00.000Z',
        },
      },
      {
        alpha: {
          full_name: 'example/alpha',
          stars: 10,
          fetched_at: '2026-06-16T00:00:00.000Z',
        },
      },
    ),
    false,
  );
});
