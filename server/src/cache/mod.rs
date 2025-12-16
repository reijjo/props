pub mod keys;

use std::collections::HashMap;
use std::sync::Arc;
use std::time::{Duration, Instant};
use tokio::sync::RwLock;

#[derive(Clone)]
pub struct CacheEntry<T> {
    pub data: T,
    pub cached_at: Instant,
}

// Generic cache that works with any clonable type
pub struct AppCache<T> {
    store: Arc<RwLock<HashMap<String, CacheEntry<T>>>>,
}

impl<T: Clone> AppCache<T> {
    // Create an empty cache
    pub fn new() -> Self {
        Self {
            store: Arc::new(RwLock::new(HashMap::new())),
        }
    }

    // Get data from cache if it exists and hasn't expired
    // key = identifier
    // ttl = Time To Live (how log before it expires)
    pub async fn get(&self, key: &str, ttl: Duration) -> Option<T> {
        let cache = self.store.read().await; // Read the lock

        if let Some(entry) = cache.get(key) {
            if entry.cached_at.elapsed() < ttl {
                return Some(entry.data.clone());
            }
        }
        None
    }

    // Store data in the cache
    pub async fn set(&self, key: String, data: T) {
        let mut cache = self.store.write().await; // Write the lock
        cache.insert(
            key,
            CacheEntry {
                data,
                cached_at: Instant::now(),
            },
        );
    }

    // Remove a key (useful for manual invalidation)
    pub async fn _invalidate(&self, key: &str) {
        let mut cache = self.store.write().await;
        cache.remove(key);
    }
}
