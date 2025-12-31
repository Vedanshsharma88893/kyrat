'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './EventsTimeline.module.css';
import { timelineEvents, type TimelineEvent } from '@/lib/event-timeline-data';

type Props = {
    events?: TimelineEvent[];
    initialActiveId?: string;
};

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

export default function EventsTimeline({ events, initialActiveId }: Props) {
    const items = events ?? timelineEvents;

    const initial = initialActiveId ?? items[0]?.id ?? null;

    const [activeId, setActiveId] = useState<string | null>(initial);
    const activeIdRef = useRef<string | null>(initial);

    const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

    useEffect(() => {
        activeIdRef.current = activeId;
    }, [activeId]);

    useEffect(() => {
        if (!items.length) return;

        let raf = 0;

        const updateFocusAndArc = () => {
            raf = 0;

            const vh = window.innerHeight || 1;
            const centerY = vh / 2;

            // Arc controls (tweak freely)
            const band = vh * 0.65; // how tall the arc "window" is around center
            const amplitude = 280; // px: how far it bulges sideways

            const nodes = itemRefs.current.filter((n): n is HTMLLIElement => n !== null);
            if (!nodes.length) return;

            // Only one item can be full focus: the closest to the viewport center
            const best: { node: HTMLLIElement | null; dist: number } = {
                node: null,
                dist: Number.POSITIVE_INFINITY,
            };

            const measures = nodes.map((node) => {
                const rect = node.getBoundingClientRect();
                const nodeCenter = rect.top + rect.height / 2;

                const dist = Math.abs(nodeCenter - centerY);
                if (dist < best.dist) {
                    best.dist = dist;
                    best.node = node;
                }

                const rawFocus = clamp01(1 - dist / (vh * 0.25));

                // Shared arc based on viewport position (same arc for all items)
                const ySigned = (nodeCenter - centerY) / band; // roughly -1..1
                const y = Math.max(-1, Math.min(1, ySigned));
                const arc = Math.sqrt(1 - y * y); // 1 at center, 0 at top/bottom of band
                const x = arc * amplitude;

                return { node, rawFocus, x };
            });

            for (const { node, rawFocus, x } of measures) {
                const isBest = node === best.node;

                // Only one item gets 1.0; everyone else is capped < 1
                const focus = isBest ? 2 : Math.min(0.44, rawFocus * 0.88);

                node.style.setProperty('--focus', focus.toFixed(3));
                node.style.setProperty('--curve-x', `${x.toFixed(1)}px`);
            }

            const bestId = best.node?.dataset.eventId ?? null;
            if (bestId && bestId !== activeIdRef.current) {
                activeIdRef.current = bestId;
                setActiveId(bestId);
            }
        };

        const onScrollOrResize = () => {
            if (raf) return;
            raf = window.requestAnimationFrame(updateFocusAndArc);
        };

        updateFocusAndArc();
        window.addEventListener('scroll', onScrollOrResize, { passive: true });
        window.addEventListener('resize', onScrollOrResize);

        return () => {
            window.removeEventListener('scroll', onScrollOrResize);
            window.removeEventListener('resize', onScrollOrResize);
            if (raf) window.cancelAnimationFrame(raf);
        };
    }, [items]);

    return (
        <section className={styles.wrap} aria-label="Events timeline">
            <ol className={styles.list}>
                {items.map((ev, idx) => {
                    const isActive = ev.id === activeId;

                    return (
                        <li
                            key={ev.id}
                            ref={(el: HTMLLIElement | null) => {
                                itemRefs.current[idx] = el;
                            }}
                            data-event-id={ev.id}
                            className={`${styles.item} ${isActive ? styles.active : ''}`}
                            aria-current={isActive ? 'step' : undefined}
                        >
                            <span className={styles.marker} aria-hidden="true" />

                            {/* New "formula" / format */}
                            <div className={styles.text}>
                                <div className={styles.date}>{ev.date}</div>
                                <div className={styles.time}>{ev.time}</div>
                                <div className={styles.name}>{ev.name}</div>
                                <div className={styles.venue}>{ev.venue}</div>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </section>
    );
}
