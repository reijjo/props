use axum::{
    extract::Request,
    middleware::Next,
    response::Response,
};

pub async fn log_middleware(req: Request, next: Next) -> Response {
    let method = req.method().clone();
    let path = req.uri().path().to_string();

    tracing::info!("→ {} {}", method, path);

    let response = next.run(req).await;
    tracing::info!("← {} {} {}", method, path, response.status().as_u16());

    response
}